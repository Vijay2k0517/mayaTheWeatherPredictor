"use client";
import { motion } from "framer-motion";
import { Cloud, CloudRain, CloudSnow, CloudSun, Droplets, Sun, Thermometer, Wind } from "lucide-react";

interface WeatherCardProps {
  city: string;
  temp: number;
  humidity: number;
  condition: string;
}

function getWeatherIcon(condition: string) {
  const c = condition.toLowerCase();
  if (c.includes("rain") || c.includes("drizzle")) return <CloudRain className="text-blue-400" size={32} />;
  if (c.includes("cloud")) return <Cloud className="text-slate-300" size={32} />;
  if (c.includes("sun") || c.includes("clear")) return <Sun className="text-yellow-400" size={32} />;
  if (c.includes("snow")) return <CloudSnow className="text-cyan-300" size={32} />;
  if (c.includes("mist") || c.includes("fog")) return <Wind className="text-gray-400" size={32} />;
  return <CloudSun className="text-orange-300" size={32} />;
}

function getWeatherGradient(condition: string) {
  const c = condition.toLowerCase();
  if (c.includes("rain")) return "from-blue-500/30 via-blue-600/20 to-indigo-900/20";
  if (c.includes("cloud")) return "from-slate-500/30 via-slate-600/20 to-slate-800/20";
  if (c.includes("sun") || c.includes("clear")) return "from-orange-400/30 via-yellow-500/20 to-amber-600/20";
  if (c.includes("storm")) return "from-purple-600/30 via-indigo-700/20 to-slate-900/20";
  if (c.includes("mist") || c.includes("fog")) return "from-gray-400/30 via-slate-500/20 to-slate-700/20";
  return "from-blue-400/30 via-purple-500/20 to-slate-800/20";
}

export default function WeatherCard({ city, temp, humidity, condition }: WeatherCardProps) {
  const gradient = getWeatherGradient(condition);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }} 
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3 }}
      className={`glass-premium rounded-2xl p-5 bg-gradient-to-br ${gradient} border border-white/20 shadow-xl hover:shadow-2xl cursor-pointer`}
    > 
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-1">{city}</h3>
          <p className="text-white/60 text-sm">{condition}</p>
        </div>
        <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
          {getWeatherIcon(condition)}
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div className="text-5xl font-bold text-white">
          {Math.round(temp)}°
          <span className="text-2xl text-white/60">C</span>
        </div>
        
        <div className="flex flex-col gap-2 text-right">
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Droplets size={16} className="text-blue-300" />
            <span>{humidity}%</span>
          </div>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Thermometer size={16} className="text-red-300" />
            <span>Feels {Math.round(temp - 2)}°</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
