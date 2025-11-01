"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AssistantAvatar({ name = process.env.NEXT_PUBLIC_ASSISTANT_NAME || "Maya", speaking = false }: { name?: string; speaking?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <motion.div
        className={`relative h-12 w-12 rounded-full bg-gradient-to-br from-glow-purple via-glow-blue to-glow-teal shadow-glow ${speaking ? "animate-pulse" : ""}`}
        animate={{ scale: speaking ? [1, 1.06, 1] : 1 }}
        transition={{ repeat: speaking ? Infinity : 0, duration: 1.6 }}
      >
        <div className="absolute inset-[3px] rounded-full glass" />
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ boxShadow: speaking ? ["0 0 0 0 rgba(155,140,255,0.0)", "0 0 0 12px rgba(155,140,255,0.08)", "0 0 0 0 rgba(155,140,255,0.0)"] : "0 0 0 0 rgba(0,0,0,0)" }}
          transition={{ repeat: speaking ? Infinity : 0, duration: 2.2 }}
        />
      </motion.div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1 text-sm text-white/90">
          <Sparkles size={16} className="text-glow-blue" />
          <span className="font-medium">{name}</span>
        </div>
        <span className="text-xs text-white/60">AI Weather Assistant</span>
      </div>
    </div>
  );
}
