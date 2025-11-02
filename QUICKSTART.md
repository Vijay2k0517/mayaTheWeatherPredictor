# Tamil Nadu Weather App - Quick Start Guide

## 🚀 Quick Start (5 minutes)

### Step 1: Install Backend Dependencies

```powershell
cd backend
pip install -r requirements.txt
```

### Step 2: Start Backend Server

Open a terminal and run:

```powershell
cd backend
$env:PYTHONPATH = "$PWD"
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Backend will run at: **http://localhost:8000**  
API Docs at: **http://localhost:8000/docs**

### Step 3: Install Frontend Dependencies (First Time Only)

In a **new terminal**:

```powershell
cd frontend
npm install
```

### Step 4: Start Frontend Server

```powershell
cd frontend
npm start
```

Frontend will run at: **http://localhost:3000**

## 🎯 Using Startup Scripts

### Windows PowerShell:

```powershell
# Terminal 1 - Backend
.\start-backend.ps1

# Terminal 2 - Frontend
.\start-frontend.ps1
```

### Windows Command Prompt:

```cmd
# Terminal 1 - Backend
start-backend.bat

# Terminal 2 - Frontend
start-frontend.bat
```

## ✅ Verify Connection

1. Open your browser to `http://localhost:3000`
2. You should see the Maya splash screen
3. After 3 seconds, the dashboard should load
4. Try selecting different cities to test the weather API
5. Click the microphone button to test voice assistant

## 🔧 Troubleshooting

### Backend Issues

**"Module not found" error:**

```powershell
cd backend
$env:PYTHONPATH = "$PWD"
pip install -r requirements.txt
```

**Port 8000 already in use:**

```powershell
# Use port 8001 instead
uvicorn app.main:app --reload --host 127.0.0.1 --port 8001

# Update frontend/.env:
# REACT_APP_BACKEND_URL=http://localhost:8001
```

### Frontend Issues

**"Module not found" errors:**

```powershell
cd frontend
rm -r node_modules package-lock.json
npm install
```

**Port 3000 already in use:**
The app will prompt to use port 3001 automatically.

**API connection errors:**

- Verify backend is running on `http://localhost:8000`
- Check browser console (F12) for errors
- Verify `frontend/.env` has `REACT_APP_BACKEND_URL=http://localhost:8000`

## 📚 Features to Test

### Dashboard

- Select different Tamil Nadu cities from dropdown
- View real-time weather with bilingual (English/Tamil) info
- See smart suggestions based on weather conditions

### Voice Assistant

- Click the microphone button (bottom right)
- Allow microphone permissions
- Say something like "What's the weather in Chennai?"
- Get spoken responses in your preferred language

### Route Weather

- Click the route icon in header
- Select start city, destination city
- Add stops if needed
- Get weather for entire route

### Settings

- Change language preference (English/Tamil)
- Customize assistant name (Maya/Venba)
- Set daily notification time
- Toggle voice assistant on/off

## 🔑 API Keys

The app is already configured with working API keys in `backend/.env`:

- OpenWeatherMap API
- Google Gemini AI

To use your own keys, edit `backend/.env`:

```env
OWM_API_KEY=your_openweathermap_key
GEMINI_API_KEY=your_gemini_api_key
```

## 🌐 API Endpoints

All endpoints are available at `http://localhost:8000/api/`

- `GET /api/health` - Health check
- `GET /api/cities` - List Tamil Nadu cities
- `POST /api/weather` - Get weather for a city
- `POST /api/voice` - Process voice transcript
- `POST /api/route` - Get route weather
- `POST /api/chat` - Chat with assistant
- `POST /api/mood` - Analyze mood
- `GET /api/preferences/{user_id}` - Get preferences
- `POST /api/preferences` - Save preferences
- `GET /api/keys` - Check API key status

Full interactive API documentation: **http://localhost:8000/docs**

## 💡 Tech Stack

### Backend

- FastAPI (Python web framework)
- SQLAlchemy (Database ORM)
- Google Gemini AI (Bilingual responses)
- OpenWeatherMap API (Weather data)

### Frontend

- React 19
- TailwindCSS (Styling)
- Shadcn/ui (UI components)
- Axios (API calls)
- React Router (Navigation)
- Web Speech API (Voice features)

## 📝 Project Structure

```
abc/
├── backend/
│   ├── app/
│   │   ├── main.py          # API routes
│   │   ├── models.py        # Database models
│   │   ├── schemas.py       # Request/response schemas
│   │   ├── weather.py       # Weather API integration
│   │   ├── gemini.py        # Gemini AI integration
│   │   └── database.py      # DB configuration
│   ├── requirements.txt
│   └── .env                 # API keys
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── config.js    # API configuration
│   │   │   └── services.js  # API service layer
│   │   ├── components/      # React components
│   │   ├── App.js          # Main app component
│   │   └── index.js        # Entry point
│   ├── package.json
│   └── .env                # Backend URL configuration
│
├── start-backend.ps1       # Backend startup script (PowerShell)
├── start-frontend.ps1      # Frontend startup script (PowerShell)
├── start-backend.bat       # Backend startup script (CMD)
├── start-frontend.bat      # Frontend startup script (CMD)
└── README.md              # Full documentation
```

## 🎨 UI Features

- **Dynamic backgrounds** that change based on weather conditions
- **Smooth animations** for page transitions
- **Glass-morphism** design with blur effects
- **Bilingual support** with seamless language switching
- **Voice recognition** with visual feedback
- **Speech synthesis** for assistant responses
- **Responsive design** that works on all screen sizes

## 📱 Browser Compatibility

- Chrome/Edge (Recommended) - Full voice features
- Firefox - Full features
- Safari - Full features (iOS 14.5+)

Voice recognition works best in Chrome/Edge.

## 🔐 Privacy & Data

- Weather queries are logged in local SQLite database
- No user data is sent to third parties except:
  - OpenWeatherMap (for weather data)
  - Google Gemini (for AI responses)
- Voice data is processed locally in browser
- User preferences stored in local database

## 📄 License

Educational and demonstration purposes.

## 🤝 Support

If you encounter issues:

1. Check the troubleshooting section
2. Verify both servers are running
3. Check browser console for errors (F12)
4. Ensure API keys are valid in `backend/.env`

Enjoy using Maya, your Tamil Nadu weather companion! 🌤️
