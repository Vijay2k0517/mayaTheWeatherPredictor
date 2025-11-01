"use client";
import { motion } from "framer-motion";

export default function MoodIndicator({ mood, score }: { mood: string; score: number }) {
  const color = mood === 'cheerful' ? 'text-emerald-300' : mood === 'calm' ? 'text-sky-300' : mood === 'formal' ? 'text-indigo-300' : 'text-amber-300';
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`text-xs ${color} `}>
      Mood: {mood} ({Math.round(score * 100)}%)
    </motion.div>
  );
}
