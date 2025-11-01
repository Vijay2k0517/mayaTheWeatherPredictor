import os
from typing import Dict, Any
from dotenv import load_dotenv

# Ensure .env is loaded before reading environment variables
load_dotenv()

try:
    import google.generativeai as genai
    GENAI_AVAILABLE = True
except Exception:
    GENAI_AVAILABLE = False

GEMINI_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

FALLBACK_MODELS = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-flash-latest",
    "gemini-pro-latest",
    "gemini-2.5-pro",
    "gemini-2.0-pro-exp",
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash",
    "gemini-1.5-pro",
]

if GENAI_AVAILABLE and GEMINI_KEY:
    genai.configure(api_key=GEMINI_KEY)
    try:
        model = genai.GenerativeModel(GEMINI_MODEL)
    except Exception:
        model = None
else:
    model = None

PROMPT_TEMPLATE = (
"""
You are **Maya**, a warm, friendly, and emotionally intelligent **weather voice assistant** designed for users in **Tamil Nadu**.  
Your goal is to deliver **hyperlocal weather updates**, **clothing/travel suggestions**, and **friendly emotional remarks** that feel caring and human.

Context Data:
City: {city}
Temperature: {temp}°C
Humidity: {humidity}%
Weather Condition: {condition}
Chance of Rain: {rain_chance}%

User’s Query: "{user_query}"

Tone & Style Guidelines:
- Speak naturally in a **Tamil-English mix** (Tanglish) — friendly, conversational, and regionally relatable.
- Use short, emotionally warm sentences — imagine speaking to a friend.
- Be culturally aware — mention things like heat, rain, or humidity in Tamil Nadu context (e.g., “mazhai”, “velicham”, “kulir”).
- Give useful, **actionable advice** (like what to wear, whether to carry an umbrella, etc.).
- Always end with a short **emotional or mood-based line** (e.g., “Stay cool and happy!”, “Enjoy the breeze!”, “Innaikku super pleasant-a iruku!”).

Expected Output Format (JSON):
{{
    "english": "Friendly English response summarizing the weather and mood",
    "tamil": "Tanglish version of the same message (Tamil + English mix)",
    "advice": "Specific clothing, travel, or lifestyle suggestion",
    "mood_reply": "Short, emotional closing line to make user smile"
}}

Example Behavior:
If it’s raining — suggest carrying an umbrella, mention “mazhai”.
If it’s sunny — suggest wearing cotton clothes, mention “velicham”.
If it’s humid — suggest staying hydrated.
If it’s pleasant — express joy and relaxation.

Your reply should feel like a short chat with a friend, not a robotic forecast.
"""

)

def _try_generate_with_model(model_name: str, prompt: str) -> Dict[str, Any]:
    import json
    temp_model = genai.GenerativeModel(model_name)
    resp = temp_model.generate_content(prompt)
    text = resp.text
    start = text.find('{')
    end = text.rfind('}')
    if start != -1 and end != -1:
        text = text[start:end+1]
    return json.loads(text)


def generate_bilingual(city: str, temp: float, humidity: float, condition: str, rain_chance: float, user_query: str) -> Dict:
    prompt = PROMPT_TEMPLATE.format(city=city, temp=temp, humidity=humidity, condition=condition, rain_chance=rain_chance, user_query=user_query)
    if model is None:
        # Fallback deterministic text when Gemini is not configured
        return {
            "english": f"In {city}, it's {condition.lower()} around {round(temp)}°C with {round(humidity)}% humidity. Carry an umbrella if needed.",
            "tamil": f"{city} நகரத்தில் இன்று {round(temp)}°C; {condition} நிலை. தேவையெனில் குடை எடுத்துச் செல்லவும்.",
            "advice": "Wear light, breathable clothes; stay hydrated.",
            "mood_reply": "Stay positive and enjoy your day!"
        }
    # Try preferred model first, then fallbacks
    try_order = [GEMINI_MODEL] + [m for m in FALLBACK_MODELS if m != GEMINI_MODEL]
    for mname in try_order:
        try:
            return _try_generate_with_model(mname, prompt)
        except Exception as e:
            # If model not found/unsupported, try next; otherwise continue
            msg = str(e).lower()
            if ("not found" in msg) or ("404" in msg) or ("unsupported" in msg):
                continue
            # For rate limits/transient errors, we also try next model
            continue
    # If all models failed, return deterministic fallback
    return {
        "english": f"In {city}, it's {condition.lower()} around {round(temp)}°C with {round(humidity)}% humidity.",
        "tamil": f"{city} நகரத்தில் {round(temp)}°C; {condition}.",
        "advice": "Carry water and wear comfortable clothing.",
        "mood_reply": "Wishing you a wonderful day!"
    }


def check_gemini_key() -> Dict[str, Any]:
    """Verify Gemini API key configuration and basic reachability.
    Returns a dict: {configured, reachable, message, model}
    """
    configured = bool(GEMINI_KEY) and GENAI_AVAILABLE
    if not configured:
        return {"configured": False, "reachable": False, "message": "google-generativeai not available or GEMINI_API_KEY not set", "model": None}
    try:
        # Try preferred then fallbacks
        for mname in [GEMINI_MODEL] + [m for m in FALLBACK_MODELS if m != GEMINI_MODEL]:
            try:
                temp_model = genai.GenerativeModel(mname)
                # Use a tiny request
                try:
                    _ = temp_model.count_tokens("ping")  # type: ignore[attr-defined]
                    return {"configured": True, "reachable": True, "message": "count_tokens ok", "model": mname}
                except Exception:
                    resp = temp_model.generate_content("ok")
                    if getattr(resp, 'text', None):
                        return {"configured": True, "reachable": True, "message": "generate_content ok", "model": mname}
            except Exception as e:
                # Try next model if not found/unsupported
                msg = str(e).lower()
                if ("not found" in msg) or ("404" in msg) or ("unsupported" in msg):
                    continue
                continue
        return {"configured": True, "reachable": False, "message": "No supported Gemini model reachable", "model": GEMINI_MODEL}
    except Exception as e:
        return {"configured": True, "reachable": False, "message": str(e), "model": GEMINI_MODEL}


def list_gemini_models() -> list[dict[str, Any]]:
    """Return available model IDs and whether they support generateContent."""
    if not (GENAI_AVAILABLE and GEMINI_KEY):
        return []
    try:
        models = []
        for m in genai.list_models():
            # Some SDKs expose attributes slightly differently; be defensive
            name = getattr(m, 'name', None) or getattr(m, 'model', None) or str(m)
            methods = set(getattr(m, 'supported_generation_methods', []) or [])
            supports = "generateContent" in methods or "generate_content" in methods
            models.append({"id": name, "supports_generate": supports})
        return models
    except Exception:
        return []
