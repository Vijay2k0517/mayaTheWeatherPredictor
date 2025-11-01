"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import AssistantAvatar from "./AssistantAvatar";
import VoiceButton from "./VoiceButton";
import LanguageToggle, { Language } from "./LanguageToggle";
import { fetchWeather, voiceProcess, type WeatherResponse } from "@/lib/api";

function setBackgroundForCondition(condition: string) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement as HTMLElement;
  const c = condition.toLowerCase();
  if (c.includes('rain')) {
    root.style.setProperty('--weather-bg', 'url("/backgrounds/rainy.jpg")');
    root.style.setProperty('--bg-start', '#0b1220');
    root.style.setProperty('--bg-end', '#0f172a');
  } else if (c.includes('cloud')) {
    root.style.setProperty('--weather-bg', 'url("/backgrounds/cloudy.jpg")');
    root.style.setProperty('--bg-start', '#0b1220');
    root.style.setProperty('--bg-end', '#1f2937');
  } else if (c.includes('sun') || c.includes('clear')) {
    root.style.setProperty('--weather-bg', 'url("/backgrounds/sunny.jpg")');
    root.style.setProperty('--bg-start', '#061a2b');
    root.style.setProperty('--bg-end', '#0b3a5b');
  } else if (c.includes('mist') || c.includes('fog')) {
    root.style.setProperty('--weather-bg', 'url("/backgrounds/foggy.jpg")');
    root.style.setProperty('--bg-start', '#0a0f1a');
    root.style.setProperty('--bg-end', '#202a38');
  } else if (c.includes('storm') || c.includes('thunder')) {
    root.style.setProperty('--weather-bg', 'url("/backgrounds/stormy.jpg")');
    root.style.setProperty('--bg-start', '#0a0a15');
    root.style.setProperty('--bg-end', '#1a1a2e');
  } else {
    root.style.setProperty('--weather-bg', 'url("/backgrounds/default.jpg")');
    root.style.setProperty('--bg-start', '#0b1220');
    root.style.setProperty('--bg-end', '#111827');
  }
}

// Natural voice selection with Tamil support
function selectVoice(lang: 'en' | 'ta'): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined') return null;
  const voices = window.speechSynthesis.getVoices();
  
  if (lang === 'ta') {
    // Prioritize Tamil voices
    return voices.find(v => v.lang.startsWith('ta')) || 
           voices.find(v => v.lang.startsWith('hi')) || // Hindi as fallback for Indian accent
           voices.find(v => v.name.includes('Female')) ||
           voices[0];
  } else {
    // Prioritize natural English (Indian/British female voices)
    return voices.find(v => v.lang === 'en-IN' && v.name.includes('Female')) ||
           voices.find(v => v.lang === 'en-IN') ||
           voices.find(v => v.lang === 'en-GB' && v.name.includes('Female')) ||
           voices.find(v => v.lang.startsWith('en') && v.name.includes('Female')) ||
           voices.find(v => v.lang.startsWith('en')) ||
           voices[0];
  }
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<{ user?: string; bot?: WeatherResponse }[]>([]);
  const [input, setInput] = useState("");
  const [city, setCity] = useState("Chennai");
  const [lang, setLang] = useState<Language>("both");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  // Load voices on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const loadVoices = () => setVoicesLoaded(true);
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  const speak = useCallback((text: string, language: 'en' | 'ta') => {
    if (typeof window === 'undefined' || !voicesLoaded) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = selectVoice(language);
    
    if (voice) utterance.voice = voice;
    utterance.lang = language === 'ta' ? 'ta-IN' : 'en-IN';
    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.05; // Slightly higher for friendliness
    utterance.volume = 1.0;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  }, [voicesLoaded]);

  const stopSpeaking = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const ask = useCallback(async (q: string, useVoiceEndpoint = false) => {
    if (isSpeaking) return; // Prevent new requests while speaking
    
    setLoading(true);
    setMessages(m => [...m, { user: q }]);
    try {
      let data: WeatherResponse;
      
      if (useVoiceEndpoint) {
        // Use voice endpoint which extracts city from transcript
        const voiceData = await voiceProcess(q);
        // Fetch full weather data for the detected city
        data = await fetchWeather(voiceData.city || city, q);
      } else {
        // Use regular weather endpoint with manual city input
        data = await fetchWeather(city, q);
      }
      
      setMessages(m => [...m, { bot: data }]);
      setBackgroundForCondition(data.condition);
      
      // Speak based on language preference
      if (lang === 'english') {
        speak(data.bilingual.english, 'en');
      } else if (lang === 'tamil') {
        speak(data.bilingual.tamil, 'ta');
      } else {
        // For "both", speak English first, then Tamil
        speak(data.bilingual.english + '. ' + data.bilingual.tamil, 'en');
      }
    } catch (e) {
      console.error(e);
    } finally { 
      setLoading(false); 
    }
  }, [city, lang, speak, isSpeaking]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem('ai-weather-history');
      if (raw) setMessages(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try { localStorage.setItem('ai-weather-history', JSON.stringify(messages)); } catch {}
  }, [messages]);

  const handleTranscript = useCallback((t: string) => { 
    setInput(t); 
    ask(t, true); // Use voice endpoint to extract city from transcript
  }, [ask]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header Controls - Fixed Layout */}
      <div className="glass-premium rounded-2xl p-4 mb-6 border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AssistantAvatar speaking={isSpeaking || loading} />
            <div>
              <h3 className="text-white font-semibold">Maya</h3>
              <p className="text-white/60 text-xs">
                {isSpeaking ? 'Speaking...' : loading ? 'Thinking...' : 'Ready to assist'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <input 
              className="glass-input w-36 sm:w-44" 
              value={city} 
              onChange={(e) => setCity(e.target.value)} 
              placeholder="City"
              disabled={loading || isSpeaking}
            />
            <LanguageToggle value={lang} onChange={setLang} />
            <VoiceButton onTranscript={handleTranscript} disabled={loading || isSpeaking} />
            
            {/* Stop Voice Button */}
            {isSpeaking && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={stopSpeaking}
                className="p-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-300 transition-all duration-200 hover:scale-105"
                title="Stop Voice"
              >
                <VolumeX size={18} />
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Voice Activity Indicator */}
      <AnimatePresence>
        {isSpeaking && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center gap-2 mb-4 text-white/70 text-sm"
          >
            <Volume2 size={16} className="animate-pulse" />
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-blue-400 to-purple-400 rounded-full"
                  animate={{
                    height: [4, 16, 4],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
            <span>Maya is speaking...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Messages - Fixed Width Container */}
      <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`w-full ${m.user ? 'flex justify-end' : ''}`}
            >
              {m.user && (
                <div className="glass-card rounded-2xl p-4 max-w-[85%] border border-blue-400/20">
                  <div className="text-white/90 font-medium break-words">{m.user}</div>
                </div>
              )}
              {m.bot && (
                <div className="glass-premium rounded-2xl p-5 w-full border border-white/20 shadow-xl">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                      M
                    </div>
                    <div className="flex-1">
                      <div className="text-white/60 text-xs mb-1">{m.bot.city} · {m.bot.temp}°C</div>
                      <div className="text-white text-sm font-medium">{m.bot.condition}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {(lang === 'both' || lang === 'english') && (
                      <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                        <div className="text-blue-300 text-xs font-semibold mb-1.5 uppercase tracking-wide">English</div>
                        <p className="text-white/90 leading-relaxed break-words">{m.bot.bilingual.english}</p>
                      </div>
                    )}
                    {(lang === 'both' || lang === 'tamil') && (
                      <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                        <div className="text-purple-300 text-xs font-semibold mb-1.5 uppercase tracking-wide">தமிழ்</div>
                        <p className="text-white/90 leading-relaxed break-words">{m.bot.bilingual.tamil}</p>
                      </div>
                    )}
                    
                    <div className="pt-2 border-t border-white/5">
                      <div className="text-emerald-300 text-xs font-semibold mb-1.5">💡 Advice</div>
                      <p className="text-white/80 text-sm break-words">{m.bot.bilingual.advice}</p>
                    </div>
                    
                    <div className="text-white/60 text-xs italic break-words">
                      {m.bot.bilingual.mood_reply}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      {/* Input Form - Fixed Position */}
      <form 
        className="glass-premium rounded-2xl p-3 border border-white/20 shadow-2xl"
        onSubmit={(e) => { 
          e.preventDefault(); 
          if (input.trim() && !loading && !isSpeaking) { 
            ask(input.trim()); 
            setInput(""); 
          } 
        }}
      >
        <div className="flex items-center gap-3">
          <input 
            className="flex-1 bg-transparent px-4 py-3 text-white placeholder:text-white/40 focus:outline-none"
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Ask about weather in any Tamil Nadu city..."
            disabled={loading || isSpeaking}
          />
          <button 
            type="submit"
            disabled={loading || isSpeaking || !input.trim()}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}
