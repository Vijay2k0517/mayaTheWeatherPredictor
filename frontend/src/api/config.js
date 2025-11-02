// API Configuration
export const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
export const API_BASE = `${BACKEND_URL}/api`;

// API Endpoints
export const API_ENDPOINTS = {
  health: "/health",
  weather: "/weather",
  voice: "/voice",
  route: "/route",
  mood: "/mood",
  cities: "/cities",
  chat: "/chat",
  preferences: "/preferences",
  keys: "/keys",
  geminiModels: "/gemini/models",
};
