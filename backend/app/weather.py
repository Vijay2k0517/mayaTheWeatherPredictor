import os
import requests
from typing import Dict, Any
from dotenv import load_dotenv

# Ensure .env is loaded before reading environment variables
load_dotenv()

OWM_BASE = "https://api.openweathermap.org/data/2.5/weather"
OWM_KEY = os.getenv("OWM_API_KEY", "")

# Helper to fetch weather for a city (metric units)
def fetch_weather(city: str) -> Dict[str, Any]:
    if not OWM_KEY:
        # Return deterministic stub for development if no key
        return {
            "name": city,
            "main": {"temp": 31.2, "humidity": 58},
            "weather": [{"main": "Clear", "description": "clear sky"}],
            "rain": {"1h": 0.0}
        }
    params = {"q": city, "appid": OWM_KEY, "units": "metric"}
    r = requests.get(OWM_BASE, params=params, timeout=15)
    r.raise_for_status()
    return r.json()

def shape_basic_weather(raw: Dict[str, Any]) -> Dict[str, Any]:
    temp = float(raw.get("main", {}).get("temp", 0))
    humidity = float(raw.get("main", {}).get("humidity", 0))
    condition = raw.get("weather", [{}])[0].get("description", "Unknown")
    city = raw.get("name") or "Unknown"
    rain_1h = raw.get("rain", {}).get("1h", 0.0)
    rain_chance = 70.0 if rain_1h and rain_1h > 0 else 10.0 if "cloud" in condition.lower() else 0.0
    return {
        "city": city,
        "temp": temp,
        "humidity": humidity,
        "condition": condition.title(),
        "rain_chance": rain_chance,
    }


def check_openweather_key() -> Dict[str, Any]:
    """Verify OpenWeatherMap API key configuration and basic reachability.
    Returns a dict: {configured, reachable, message}
    """
    configured = bool(OWM_KEY)
    if not configured:
        return {"configured": False, "reachable": False, "message": "OWM_API_KEY is not set"}
    try:
        # Make a tiny request to validate the key. Use a common TN city.
        params = {"q": "Chennai", "appid": OWM_KEY, "units": "metric"}
        r = requests.get(OWM_BASE, params=params, timeout=8)
        if r.status_code == 401:
            return {"configured": True, "reachable": False, "message": "Invalid OpenWeatherMap API key (401)"}
        r.raise_for_status()
        return {"configured": True, "reachable": True, "message": "OpenWeatherMap reachable"}
    except Exception as e:
        return {"configured": True, "reachable": False, "message": str(e)}
