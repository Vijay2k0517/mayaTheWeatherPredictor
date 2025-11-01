"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { routeWeather } from "@/lib/api";
import WeatherCard from "./WeatherCard";

export default function RoutePlanner() {
  const [cities, setCities] = useState<string>("Chennai, Coimbatore, Madurai, Tiruchirappalli, Tirunelveli");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const plan = async () => {
    setLoading(true);
    setResults(null);
    try {
      const list = cities.split(",").map(c => c.trim()).filter(Boolean);
      const { results } = await routeWeather(list);
      setResults(results);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-premium rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
          <Navigation size={20} className="text-blue-300" />
        </div>
        <div>
          <h3 className="text-white font-semibold">Plan Your Route</h3>
          <p className="text-white/60 text-xs">Enter cities separated by commas</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input 
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all"
            value={cities} 
            onChange={(e) => setCities(e.target.value)} 
            placeholder="Chennai, Coimbatore, Madurai..."
            disabled={loading}
          />
        </div>
        <button 
          onClick={plan} 
          disabled={loading || !cities.trim()}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Planning...
            </span>
          ) : "Plan Route"}
        </button>
      </div>
      
      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border-t border-white/10 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((r, i) => (
                  <motion.div
                    key={i}
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
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
