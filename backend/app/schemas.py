from pydantic import BaseModel
from typing import Optional, List

class Bilingual(BaseModel):
    english: str
    tamil: str
    advice: str
    mood_reply: str

class WeatherOut(BaseModel):
    city: str
    temp: float
    humidity: float
    condition: str
    rain_chance: Optional[float] = None
    bilingual: Bilingual

class WeatherIn(BaseModel):
    city: str
    user_query: Optional[str] = None

class VoiceIn(BaseModel):
    transcript: str

class RouteIn(BaseModel):
    cities: List[str]

class MoodIn(BaseModel):
    text: str

class MoodOut(BaseModel):
    mood: str
    score: float

class RouteOut(BaseModel):
    results: List[WeatherOut]


class KeyStatus(BaseModel):
    configured: bool
    reachable: bool
    message: Optional[str] = None
    model: Optional[str] = None


class KeysOut(BaseModel):
    openweathermap: KeyStatus
    gemini: KeyStatus


class GeminiModelInfo(BaseModel):
    id: str
    supports_generate: bool


class GeminiModelsOut(BaseModel):
    models: List[GeminiModelInfo]


class ChatIn(BaseModel):
    message: str
    lang: str = "en"
    context: Optional[dict] = None


class ChatOut(BaseModel):
    response: str


class CitiesOut(BaseModel):
    cities: List[str]


class PreferenceIn(BaseModel):
    id: str
    language: str = "en"
    notification_time: str = "08:00"
    voice_enabled: bool = True
    assistant_name: str = "Maya"


class PreferenceOut(BaseModel):
    id: str
    language: str
    notification_time: str
    voice_enabled: bool
    assistant_name: str
