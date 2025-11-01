import axios from "axios";

export const api = axios.create({ baseURL: "/api" });

export type BilingualResponse = {
  english: string;
  tamil: string;
  advice: string;
  mood_reply: string;
};

export type WeatherResponse = {
  city: string;
  temp: number;
  humidity: number;
  condition: string;
  rain_chance?: number;
  bilingual: BilingualResponse;
};

export async function fetchWeather(city: string, userQuery?: string) {
  const { data } = await api.post<WeatherResponse>("/weather", { city, user_query: userQuery ?? `Weather in ${city}` });
  return data;
}

export async function analyzeMood(text: string) {
  const { data } = await api.post<{ mood: string; score: number }>("/mood", { text });
  return data;
}

export async function routeWeather(cities: string[]) {
  const { data } = await api.post<{ results: WeatherResponse[] }>("/route", { cities });
  return data;
}

export async function voiceProcess(transcript: string) {
  const { data } = await api.post<{ bilingual: BilingualResponse; city?: string }>("/voice", { transcript });
  return data;
}
