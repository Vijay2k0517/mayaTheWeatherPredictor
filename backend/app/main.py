import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from dotenv import load_dotenv
from typing import List

from .database import Base, engine, get_db
from .models import Query, WeatherLog, UserPreference
from .schemas import (
    WeatherIn, WeatherOut, VoiceIn, RouteIn, RouteOut, MoodIn, MoodOut, 
    Bilingual, KeysOut, GeminiModelsOut, ChatIn, ChatOut, CitiesOut, 
    PreferenceIn, PreferenceOut
)
from .weather import fetch_weather, shape_basic_weather, check_openweather_key
from .gemini import generate_bilingual, check_gemini_key, list_gemini_models

load_dotenv()

app = FastAPI(title="AI-Based Weather Prediction and Voice Assistant — Tamil Nadu")

# For direct access if needed (dev). The Next.js dev proxy makes this optional.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

TN_CITIES = [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Tiruppur",
    "Dindigul", "Thanjavur", "Kanchipuram", "Nagercoil", "Karur", "Cuddalore", "Nagapattinam", "Pudukkottai", "Sivagangai",
]

@app.get("/api/health")
def health():
    return {"status": "ok"}

# Convenience aliases to avoid 404s when hitting root paths during development
@app.get("/")
def root():
    return {"message": "FastAPI backend running. Try GET /api/health, POST /api/weather, /api/voice, /api/route, /api/mood"}

@app.get("/health")
def health_alias():
    return health()

@app.post("/api/weather", response_model=WeatherOut)
def api_weather(payload: WeatherIn, db: Session = Depends(get_db)):
    raw = fetch_weather(payload.city)
    shaped = shape_basic_weather(raw)
    bilingual = generate_bilingual(
        shaped["city"], shaped["temp"], shaped["humidity"], shaped["condition"], shaped.get("rain_chance", 0.0), payload.user_query or f"Weather in {payload.city}"
    )
    # store logs
    q = Query(city=shaped["city"], query_text=payload.user_query or "weather", response_text=bilingual.get("english", ""))
    db.add(q)
    db.add(WeatherLog(city=shaped["city"], temp=shaped["temp"], humidity=shaped["humidity"], condition=shaped["condition"]))
    db.commit()

    return {**shaped, "bilingual": bilingual}

@app.post("/api/voice")
def api_voice(payload: VoiceIn, db: Session = Depends(get_db)):
    # Extract city from transcript - match longest city name first to avoid false matches
    transcript = payload.transcript.lower()
    city = "Chennai"  # default
    
    # Sort cities by length (longest first) to match specific cities before shorter ones
    sorted_cities = sorted(TN_CITIES, key=len, reverse=True)
    for c in sorted_cities:
        if c.lower() in transcript:
            city = c
            break
    
    data = api_weather(WeatherIn(city=city, user_query=payload.transcript), db)  # type: ignore
    return {"bilingual": data["bilingual"], "city": city}

@app.post("/api/route", response_model=RouteOut)
def api_route(payload: RouteIn, db: Session = Depends(get_db)):
    results: List[WeatherOut] = []
    for c in payload.cities[:8]:  # limit to 8 cities to keep it quick
        raw = fetch_weather(c)
        shaped = shape_basic_weather(raw)
        bilingual = generate_bilingual(shaped["city"], shaped["temp"], shaped["humidity"], shaped["condition"], shaped.get("rain_chance", 0.0), f"Route planner for {c}")
        results.append({**shaped, "bilingual": bilingual})  # type: ignore
    return {"results": results}

@app.post("/api/mood", response_model=MoodOut)
def api_mood(payload: MoodIn):
    text = payload.text
    # simple heuristic: punctuation + keywords => cheerful vs calm vs formal
    exclam = text.count("!")
    keywords = {"rain": -0.2, "storm": -0.3, "sunny": 0.2, "cool": 0.1, "hot": -0.1}
    score = 0.5 + sum(v for k,v in keywords.items() if k in text.lower()) + min(exclam * 0.05, 0.2)
    score = max(0.0, min(1.0, score))
    mood = "cheerful" if score > 0.65 else "calm" if score > 0.45 else "formal"
    return {"mood": mood, "score": score}


@app.get("/api/keys", response_model=KeysOut)
def api_keys():
    owm = check_openweather_key()
    gem = check_gemini_key()
    return {"openweathermap": owm, "gemini": gem}


@app.get("/api/gemini/models", response_model=GeminiModelsOut)
def api_gemini_models():
    models = list_gemini_models()
    return {"models": models}


@app.get("/api/cities", response_model=CitiesOut)
def api_cities():
    """Return list of Tamil Nadu cities"""
    return {"cities": TN_CITIES}


@app.post("/api/chat", response_model=ChatOut)
def api_chat(payload: ChatIn, db: Session = Depends(get_db)):
    """Chat endpoint for voice assistant"""
    # Extract context
    city = payload.context.get("city", "Chennai") if payload.context else "Chennai"
    
    # Get weather if not in context
    if payload.context and payload.context.get("weather"):
        # Use provided weather
        weather_data = payload.context["weather"]
        temp = weather_data.get("main", {}).get("temp", 25)
        humidity = weather_data.get("main", {}).get("humidity", 50)
        condition = weather_data["weather"][0]["main"] if weather_data.get("weather") else "Clear"
    else:
        # Fetch fresh weather
        raw = fetch_weather(city)
        shaped = shape_basic_weather(raw)
        temp = shaped["temp"]
        humidity = shaped["humidity"]
        condition = shaped["condition"]
    
    # Generate bilingual response
    bilingual = generate_bilingual(
        city, temp, humidity, condition, 0.0, payload.message
    )
    
    # Store query
    q = Query(city=city, query_text=payload.message, response_text=bilingual.get("english", ""))
    db.add(q)
    db.commit()
    
    # Return response in requested language
    response_text = bilingual.get("tamil" if payload.lang == "ta" else "english", "")
    return {"response": response_text}


@app.get("/api/preferences/{user_id}", response_model=PreferenceOut)
def get_preferences(user_id: str, db: Session = Depends(get_db)):
    """Get user preferences"""
    pref = db.query(UserPreference).filter(UserPreference.id == user_id).first()
    if not pref:
        # Create default preferences
        pref = UserPreference(id=user_id)
        db.add(pref)
        db.commit()
        db.refresh(pref)
    
    return PreferenceOut(
        id=pref.id,
        language=pref.language,
        notification_time=pref.notification_time,
        voice_enabled=bool(pref.voice_enabled),
        assistant_name=pref.assistant_name
    )


@app.post("/api/preferences", response_model=PreferenceOut)
def save_preferences(payload: PreferenceIn, db: Session = Depends(get_db)):
    """Save user preferences"""
    pref = db.query(UserPreference).filter(UserPreference.id == payload.id).first()
    
    if pref:
        # Update existing
        pref.language = payload.language
        pref.notification_time = payload.notification_time
        pref.voice_enabled = int(payload.voice_enabled)
        pref.assistant_name = payload.assistant_name
    else:
        # Create new
        pref = UserPreference(
            id=payload.id,
            language=payload.language,
            notification_time=payload.notification_time,
            voice_enabled=int(payload.voice_enabled),
            assistant_name=payload.assistant_name
        )
        db.add(pref)
    
    db.commit()
    db.refresh(pref)
    
    return PreferenceOut(
        id=pref.id,
        language=pref.language,
        notification_time=pref.notification_time,
        voice_enabled=bool(pref.voice_enabled),
        assistant_name=pref.assistant_name
    )
