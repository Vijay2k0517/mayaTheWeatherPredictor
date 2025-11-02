<div align="center">

# 🌤️ Maya - AI Weather Assistant for Tamil Nadu

**A Professional Bilingual Weather Companion with Natural Voice Interaction**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.10+-blue?style=flat&logo=python)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Documentation](#-documentation) • [Tech Stack](#-tech-stack) • [API](#-api-documentation)

</div>

---

## 📖 Overview

**Maya** is a production-ready, full-stack AI weather assistant designed specifically for Tamil Nadu. It combines cutting-edge AI technology with intuitive voice interaction to deliver real-time weather information in both Tamil and English (Tanglish style).

Built with modern web technologies and powered by Google's Gemini AI and OpenWeatherMap API, Maya offers a premium user experience with glassmorphism design, smooth animations, and natural voice synthesis.

### 🎯 Key Highlights

- 🎙️ **Natural Voice Interaction** - Speak naturally and get human-like responses
- 🌐 **Bilingual Support** - Tamil and English with Tanglish conversational style
- 🗺️ **19 Tamil Nadu Cities** - Complete coverage with intelligent city detection
- 🎨 **Premium UI/UX** - Glassmorphism design with 60fps animations
- 🚀 **Production Ready** - Optimized, tested, and documented

---

## ✨ Features

### 🎙️ Voice & AI

- **Voice Input** - Web Speech API with intelligent city extraction from natural speech
- **Voice Output** - Natural Tamil/English voice synthesis with stop control
- **AI Responses** - Context-aware bilingual responses powered by Gemini 2.5 Flash
- **Smart City Detection** - Longest-first matching algorithm for accurate location recognition

### 🌦️ Weather Intelligence

- **Real-Time Data** - Live weather from OpenWeatherMap API
- **Multi-City Planning** - Route planner for travel across Tamil Nadu
- **Daily Updates** - Automated weather snapshots for major cities
- **Weather Moods** - Sentiment analysis for personalized advice

### 🎨 User Experience

- **Glassmorphism Design** - Modern translucent UI with blur effects
- **Dynamic Backgrounds** - Weather-adaptive gradients and themes
- **Responsive Layout** - Optimized for mobile, tablet, and desktop
- **Smooth Animations** - 60fps transitions with Framer Motion
- **Dark Mode Optimized** - Eye-friendly color palette

### 💾 Data Management

- **SQLite Database** - Persistent storage for queries and weather logs
- **Local History** - Browser-based conversation history
- **API Health Monitoring** - Real-time status checks for external services

---

## 🎬 Demo

<div align="center">

### Main Interface

<img src="docs/images/main-interface.png" alt="Maya Main Interface" width="800" />

### Voice Interaction

<img src="docs/images/voice-demo.png" alt="Voice Interaction" width="800" />

</div>

**Live Demo**: [Coming Soon]  
**Video Walkthrough**: [Coming Soon]

---

## 🚀 Installation

### Prerequisites

- **Node.js** 18+ and npm/yarn
- **Python** 3.10+ with pip
- **API Keys**:
  - [OpenWeatherMap API Key](https://openweathermap.org/api) (Free tier available)
  - [Google Gemini API Key](https://ai.google.dev/) (Free tier available)

### Quick Start

#### 1️⃣ Clone the Repository

```powershell
git clone https://github.com/Vijay2k0517/mayaTheWeatherPredictor.git
cd maya-weather-assistant
```

#### 2️⃣ Backend Setup

```powershell
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
.\.venv\Scripts\Activate.ps1  # Windows PowerShell
# source .venv/bin/activate    # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Create environment file
copy .env.example .env
# Edit .env and add your API keys:
# OWM_API_KEY=your_openweathermap_key
# GEMINI_API_KEY=your_gemini_key

# Start backend server
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Backend will be available at: `http://127.0.0.1:8000`  
API Documentation: `http://127.0.0.1:8000/docs`

#### 3️⃣ Frontend Setup

```powershell
# Navigate to frontend directory (new terminal)
cd frontend

# Install dependencies
npm install
# or
yarn install

# Create environment file
copy .env.example .env.local
# Edit .env.local (optional):
# NEXT_PUBLIC_ASSISTANT_NAME=Maya

# Start development server
npm run dev
# or
yarn dev
```

Frontend will be available at: `http://localhost:3000`

#### 4️⃣ Verify Installation

Open `http://localhost:3000` in your browser. You should see:

- ✅ Maya's avatar with "Ready to assist" status
- ✅ Chat interface with input box
- ✅ Voice button, language toggle, and city selector
- ✅ Daily Update showing weather for 5 cities

---

## 📁 Project Structure

```
maya-weather-assistant/
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py            # FastAPI application & routes
│   │   ├── database.py        # SQLAlchemy setup
│   │   ├── models.py          # Database models
│   │   ├── schemas.py         # Pydantic models
│   │   ├── weather.py         # OpenWeatherMap integration
│   │   └── gemini.py          # Gemini AI integration
│   ├── .env.example           # Environment template
│   ├── requirements.txt       # Python dependencies
│   └── .gitignore
├── frontend/                   # Next.js 14 frontend
│   ├── app/
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Main page with tabs
│   │   ├── globals.css        # Global styles & glassmorphism
│   │   └── components/        # React components
│   │       ├── ChatInterface.tsx
│   │       ├── VoiceButton.tsx
│   │       ├── WeatherCard.tsx
│   │       ├── AssistantAvatar.tsx
│   │       ├── LanguageToggle.tsx
│   │       ├── RoutePlanner.tsx
│   │       ├── DailyUpdate.tsx
│   │       └── MoodIndicator.tsx
│   ├── lib/
│   │   └── api.ts             # API client functions
│   ├── public/
│   │   └── backgrounds/       # Weather background images
│   ├── next.config.mjs        # Next.js configuration
│   ├── tailwind.config.ts     # Tailwind CSS configuration
│   └── .gitignore
├── docs/                       # Documentation
│   ├── IMPROVEMENTS.md        # Detailed upgrade log
│   ├── USER_GUIDE.md          # User manual
│   ├── COMPONENT_VERIFICATION.md
│   └── VOICE_FIX.md
├── .gitignore                 # Root gitignore
└── README.md                  # This file
```

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript 5.6](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Animations**: [Framer Motion 11.2](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios 1.7](https://axios-http.com/)

### Backend

- **Framework**: [FastAPI 0.115](https://fastapi.tiangolo.com/)
- **Language**: [Python 3.10+](https://www.python.org/)
- **Database**: SQLite with [SQLAlchemy 2.0](https://www.sqlalchemy.org/)
- **Validation**: [Pydantic 2.9](https://docs.pydantic.dev/)
- **ASGI Server**: [Uvicorn 0.30](https://www.uvicorn.org/)

### External APIs

- **Weather Data**: [OpenWeatherMap API](https://openweathermap.org/api)
- **AI Responses**: [Google Gemini AI 2.5 Flash](https://ai.google.dev/)
- **Voice**: Web Speech API (Browser Native)

### Development Tools

- **Package Managers**: npm/yarn (frontend), pip (backend)
- **Version Control**: Git with comprehensive `.gitignore`
- **API Documentation**: FastAPI Swagger/ReDoc
- **Type Safety**: TypeScript + Pydantic

---

## 📚 Documentation

### User Guides

- 📖 [**User Guide**](docs/USER_GUIDE.md) - Complete usage instructions
- 🎙️ [**Voice Features**](docs/USER_GUIDE.md#-using-voice-features) - Voice interaction guide
- 🗺️ [**Route Planner**](docs/USER_GUIDE.md#-route-planner) - Multi-city planning
- ❓ [**Troubleshooting**](docs/USER_GUIDE.md#-troubleshooting) - Common issues & solutions

### Technical Documentation

- ⚡ [**Component Verification**](docs/COMPONENT_VERIFICATION.md) - All tests & status
- 🔧 [**Improvements Log**](docs/IMPROVEMENTS.md) - Upgrade details
- 🎯 [**Voice Fix Documentation**](docs/VOICE_FIX.md) - City detection algorithm

### Quick References

- 🌆 [**Adding Background Images**](frontend/public/backgrounds/QUICK_GUIDE.md)
- 🔑 [**Environment Variables**](#-environment-variables)
- 🚀 [**Deployment Guide**](#-deployment) (Coming Soon)

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

```env
# OpenWeatherMap API (Required)
OWM_API_KEY=your_openweathermap_api_key_here

# Google Gemini AI API (Required)
GEMINI_API_KEY=your_gemini_api_key_here
```

**Get Your API Keys**:

- OpenWeatherMap: https://openweathermap.org/api (Free tier: 1000 calls/day)
- Gemini AI: https://ai.google.dev/ (Free tier: 60 requests/minute)

### Frontend (`frontend/.env.local`)

```env
# Optional: Customize assistant name (Default: Maya)
NEXT_PUBLIC_ASSISTANT_NAME=Maya
```

---

## 🌐 API Documentation

### Backend Endpoints

#### Health Check

```http
GET /api/health
```

Returns server status.

#### Weather Query

```http
POST /api/weather
Content-Type: application/json

{
  "city": "Chennai",
  "user_query": "What's the weather like?"
}
```

Returns bilingual weather response with AI-generated advice.

#### Voice Processing

```http
POST /api/voice
Content-Type: application/json

{
  "transcript": "What is the weather in Coimbatore?"
}
```

Extracts city from speech transcript and returns weather with bilingual response.

#### Route Planner

```http
POST /api/route
Content-Type: application/json

{
  "cities": ["Chennai", "Coimbatore", "Madurai"]
}
```

Returns weather data for multiple cities (max 8).

#### Mood Analysis

```http
POST /api/mood
Content-Type: application/json

{
  "text": "The weather is sunny and beautiful!"
}
```

Analyzes sentiment and returns mood score.

#### API Keys Health

```http
GET /api/keys
```

Checks connectivity to OpenWeatherMap and Gemini APIs.

**Interactive API Docs**: Visit `http://127.0.0.1:8000/docs` when backend is running.

---

## 🏙️ Supported Cities

Maya supports **19 major Tamil Nadu cities**:

Chennai • Coimbatore • Madurai • Tiruchirappalli • Salem • Tirunelveli • Thanjavur • Erode • Vellore • Thoothukudi • Tiruppur • Dindigul • Kanchipuram • Nagercoil • Karur • Cuddalore • Nagapattinam • Pudukkottai • Sivagangai

---

## 🎯 Usage Examples

### Voice Queries

- "What's the weather in Chennai?"
- "Tell me about Coimbatore weather"
- "Is it raining in Madurai?"
- "Coimbatore-la weather eppadi irukku?" (Tanglish)

### Route Planning

Enter multiple cities: `Chennai, Coimbatore, Madurai, Salem`

### Language Options

- **Tamil**: தமிழில் மட்டும்
- **English**: English only
- **Both**: Tamil + English (default)

---

## 🧪 Testing

### Backend Tests

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
pytest
```

### Frontend Tests

```powershell
cd frontend
npm test
# or
yarn test
```

### Manual Testing Checklist

- [ ] Voice input detects correct city
- [ ] Voice output speaks in selected language
- [ ] Stop button halts speech immediately
- [ ] Weather cards display correct data
- [ ] Route planner handles multiple cities
- [ ] Daily update loads 5 cities
- [ ] Language toggle switches responses
- [ ] Mobile layout is responsive

---

## 🚀 Deployment

### Frontend (Vercel)

```powershell
cd frontend
vercel deploy --prod
```

### Backend (Railway/Render)

1. Create new service
2. Connect GitHub repository
3. Set environment variables (OWM_API_KEY, GEMINI_API_KEY)
4. Deploy from `backend/` directory

**Full deployment guide coming soon.**

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style (TypeScript/Python)
- Add tests for new features
- Update documentation
- Ensure all tests pass

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

**Your Name**

- GitHub: [@Vijay2k0517](https://github.com/Vijay2k0517)
- Email: vijaynarayanancool@gmail.com

---

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data API
- [Google Gemini AI](https://ai.google.dev/) for natural language processing
- [Next.js Team](https://nextjs.org/) for the amazing framework
- [FastAPI](https://fastapi.tiangolo.com/) for the elegant Python framework
- Tamil Nadu weather enthusiasts for inspiration

---

## 📞 Support

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/maya-weather-assistant/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/maya-weather-assistant/discussions)

---

## 🗺️ Roadmap

- [ ] PWA support for mobile installation
- [ ] Weather alerts and notifications
- [ ] Historical weather data visualization
- [ ] Multi-language support (Hindi, Telugu, Kannada)
- [ ] Weather forecasts (5-day, 7-day)
- [ ] Offline mode with cached data
- [ ] User accounts and preferences
- [ ] Weather comparison tools
- [ ] Social sharing features
- [ ] iOS/Android mobile apps

---

<div align="center">

**Made with ❤️ for Tamil Nadu**

⭐ Star this repo if you find it useful!

[Report Bug](https://github.com/yourusername/maya-weather-assistant/issues) • [Request Feature](https://github.com/yourusername/maya-weather-assistant/issues) • [Documentation](docs/)

</div>
