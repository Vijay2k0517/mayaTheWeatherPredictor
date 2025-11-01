import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Maya - AI Weather Assistant | Tamil Nadu",
  description: "Professional bilingual weather assistant with natural voice interaction. Real-time weather updates for Tamil Nadu in Tamil and English. Powered by Gemini AI and OpenWeatherMap.",
  keywords: "weather, Tamil Nadu, AI assistant, voice assistant, bilingual, Tamil, English, Chennai weather, Coimbatore weather",
  authors: [{ name: "Maya AI Team" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen antialiased selection:bg-purple-500/30 selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
