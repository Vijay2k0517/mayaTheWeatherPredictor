"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, TrendingUp } from "lucide-react";
import { routeWeather } from "@/lib/api";
import WeatherCard from "./WeatherCard";

const DEFAULT_CITIES = ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"];

export default function DailyUpdate() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await routeWeather(DEFAULT_CITIES);
      setData(res.results);
      setLastUpdate(new Date());
    } catch (e) { 
      console.error(e); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="glass-premium rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
            <TrendingUp size={20} className="text-emerald-300" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Major Cities Weather</h3>
            {lastUpdate && (
              <p className="text-white/60 text-xs">
                Updated {lastUpdate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </p>
            )}
          </div>
        </div>
        
        <button
          onClick={fetchData}
          disabled={loading}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all disabled:opacity-50"
          title="Refresh"
        >
          <RefreshCw size={18} className={`text-white/70 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <AnimatePresence mode="wait">
        {loading && !data.length ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12 gap-3"
          >
            <div className="w-12 h-12 border-4 border-white/10 border-t-blue-400 rounded-full animate-spin" />
            <p className="text-white/60 text-sm">Loading weather data...</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
          >
            {data.map((r, i) => (
              <motion.div
                key={r.city}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <WeatherCard 
                  city={r.city} 
                  temp={r.temp} 
                  humidity={r.humidity} 
                  condition={r.condition} 
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
