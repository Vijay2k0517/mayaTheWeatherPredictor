"use client";
import { useState } from "react";

export type Language = "english" | "tamil" | "both";

export default function LanguageToggle({ value = "both", onChange }: { value?: Language; onChange?: (v: Language) => void }) {
  const [lang, setLang] = useState<Language>(value);
  const update = (v: Language) => { setLang(v); onChange?.(v); };
  return (
    <div className="flex items-center gap-1 rounded-full glass px-1 py-1 text-xs">
      {(["tamil", "both", "english"] as Language[]).map((l) => (
        <button key={l} onClick={() => update(l)} className={`px-3 py-1 rounded-full transition-colors ${lang === l ? "bg-white/20 text-white" : "text-white/70 hover:text-white"}`}>
          {l === "tamil" ? "தமிழ்" : l === "english" ? "English" : "Both"}
        </button>
      ))}
    </div>
  );
}
