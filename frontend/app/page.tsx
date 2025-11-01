"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, Calendar } from "lucide-react";
import ChatInterface from "./components/ChatInterface";
import RoutePlanner from "./components/RoutePlanner";
import DailyUpdate from "./components/DailyUpdate";

export default function Page() {
  const [activeTab, setActiveTab] = useState<'chat' | 'route' | 'daily'>('chat');

  return (
    <main className="min-h-screen px-4 py-6 sm:py-8">
      <div className="mx-auto max-w-6xl">
        {/* Premium Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-glow">
              <MapPin className="text-white" size={24} />
            </div>
            <div className="text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-gradient text-glow">
                Maya AI Weather Assistant
              </h1>
              <p className="text-white/70 text-sm sm:text-base">Tamil Nadu · Bilingual · Voice Enabled</p>
            </div>
          </div>
          <p className="text-white/60 text-sm max-w-2xl mx-auto leading-relaxed">
            Professional weather guidance powered by Gemini AI and OpenWeatherMap. 
            Get real-time updates in Tamil and English with natural voice interaction.
          </p>
        </motion.header>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="glass-premium rounded-2xl p-1.5 inline-flex gap-1">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-white/60 hover:text-white/90'
              }`}
            >
              💬 Chat
            </button>
            <button
              onClick={() => setActiveTab('route')}
              className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'route'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-white/60 hover:text-white/90'
              }`}
            >
              <TrendingUp size={16} />
              Route Planner
            </button>
            <button
              onClick={() => setActiveTab('daily')}
              className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'daily'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-white/60 hover:text-white/90'
              }`}
            >
              <Calendar size={16} />
              Daily Update
            </button>
          </div>
        </div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'chat' && <ChatInterface />}
          
          {activeTab === 'route' && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-white mb-2">🗺️ Multi-City Route Planner</h2>
                <p className="text-white/60 text-sm">Plan your journey across Tamil Nadu with weather insights for each stop.</p>
              </div>
              <RoutePlanner />
            </div>
          )}
          
          {activeTab === 'daily' && (
            <div className="max-w-6xl mx-auto">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-white mb-2">📅 Today's Weather Snapshot</h2>
                <p className="text-white/60 text-sm">Current conditions across major Tamil Nadu cities.</p>
              </div>
              <DailyUpdate />
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-white/40 text-xs"
        >
          <p>Powered by Google Gemini AI & OpenWeatherMap API</p>
          <p className="mt-1">Built with Next.js 14, TypeScript, FastAPI & Tailwind CSS</p>
        </motion.footer>
      </div>
    </main>
  );
}
