"use client";
import { useEffect, useRef, useState } from "react";
import { Mic, Square } from "lucide-react";

interface Props {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export default function VoiceButton({ onTranscript, disabled = false }: Props) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const rec = new SpeechRecognition();
    rec.lang = 'en-IN';
    rec.interimResults = true;
    rec.continuous = true;
    rec.onresult = (event: any) => {
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const res = event.results[i];
        if (res.isFinal) final += res[0].transcript + ' ';
      }
      if (final.trim()) onTranscript(final.trim());
    };
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
  }, [onTranscript]);

  const toggle = () => {
    if (disabled) return;
    const rec = recognitionRef.current;
    if (!rec) return alert('SpeechRecognition not supported in this browser.');
    if (listening) {
      rec.stop();
      setListening(false);
    } else {
      rec.start();
      setListening(true);
    }
  };

  return (
    <button 
      onClick={toggle} 
      disabled={disabled}
      className={`relative h-12 w-12 rounded-full grid place-items-center transition-all ${
        disabled ? 'bg-white/5 cursor-not-allowed opacity-50' :
        listening ? "bg-red-500/80 hover:bg-red-500" : "bg-white/10 hover:bg-white/20"
      } shadow-glow`} 
      aria-label={listening ? "Stop" : "Speak"}
    >
      <div className={`absolute inset-0 rounded-full ${listening && !disabled ? "animate-pulse" : ""} bg-red-500/10`} />
      {listening ? <Square size={22} className="text-white"/> : <Mic size={22} className="text-white"/>}
    </button>
  );
}
