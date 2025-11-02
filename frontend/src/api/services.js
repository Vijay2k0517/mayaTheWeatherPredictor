import axios from "axios";
import { API_BASE, API_ENDPOINTS } from "./config";

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// API Service
export const weatherService = {
  // Get list of cities
  getCities: async () => {
    const response = await apiClient.get(API_ENDPOINTS.cities);
    return response.data;
  },

  // Get weather for a city
  getWeather: async (city, userQuery = null) => {
    const response = await apiClient.post(API_ENDPOINTS.weather, {
      city,
      user_query: userQuery,
    });
    return response.data;
  },

  // Get route weather
  getRouteWeather: async (cities) => {
    const response = await apiClient.post(API_ENDPOINTS.route, {
      cities,
    });
    return response.data;
  },

  // Voice assistant
  processVoice: async (transcript) => {
    const response = await apiClient.post(API_ENDPOINTS.voice, {
      transcript,
    });
    return response.data;
  },

  // Chat endpoint
  chat: async (message, lang = "en", context = null) => {
    const response = await apiClient.post(API_ENDPOINTS.chat, {
      message,
      lang,
      context,
    });
    return response.data;
  },

  // Get mood
  getMood: async (text) => {
    const response = await apiClient.post(API_ENDPOINTS.mood, {
      text,
    });
    return response.data;
  },

  // Get API key status
  getKeyStatus: async () => {
    const response = await apiClient.get(API_ENDPOINTS.keys);
    return response.data;
  },

  // Get Gemini models
  getGeminiModels: async () => {
    const response = await apiClient.get(API_ENDPOINTS.geminiModels);
    return response.data;
  },
};

export const preferenceService = {
  // Get user preferences
  getPreferences: async (userId = "default-user") => {
    const response = await apiClient.get(
      `${API_ENDPOINTS.preferences}/${userId}`
    );
    return response.data;
  },

  // Save user preferences
  savePreferences: async (preferences) => {
    const response = await apiClient.post(
      API_ENDPOINTS.preferences,
      preferences
    );
    return response.data;
  },
};

export default apiClient;
