# Tamil Nadu Weather App - Setup Guide

This application consists of a FastAPI backend and a React frontend that work together to provide weather information for Tamil Nadu cities with bilingual support (English & Tamil).

## Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn package manager

## Backend Setup

### 1. Navigate to the backend directory

```powershell
cd backend
```

### 2. Create a virtual environment (optional but recommended)

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### 3. Install Python dependencies

```powershell
pip install -r requirements.txt
```

### 4. Environment Variables

The `.env` file is already configured with API keys for:

- OpenWeatherMap API (`OWM_API_KEY`)
- Google Gemini API (`GEMINI_API_KEY`)

If you need to update these, edit the `.env` file.

### 5. Start the backend server

```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at `http://localhost:8000`

## Frontend Setup

### 1. Navigate to the frontend directory (in a new terminal)

```powershell
cd frontend
```

### 2. Install Node dependencies

```powershell
npm install
# or
yarn install
```

### 3. Environment Variables

The `.env` file is already configured to connect to the local backend at `http://localhost:8000`

### 4. Start the frontend development server

```powershell
npm start
# or
yarn start
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

The backend provides the following endpoints:

- `GET /api/health` - Health check
- `GET /api/cities` - Get list of Tamil Nadu cities
- `POST /api/weather` - Get weather for a specific city
- `POST /api/voice` - Process voice transcript and return weather
- `POST /api/route` - Get weather for multiple cities along a route
- `POST /api/chat` - Chat with the voice assistant
- `POST /api/mood` - Analyze mood from text
- `GET /api/preferences/{user_id}` - Get user preferences
- `POST /api/preferences` - Save user preferences
- `GET /api/keys` - Check API key status
- `GET /api/gemini/models` - List available Gemini models

## Features

### Frontend Features

- 🌤️ Real-time weather data for 19 Tamil Nadu cities
- 🗣️ Voice assistant with speech recognition and synthesis
- 🌐 Bilingual support (English & Tamil)
- 🛣️ Route weather planning with multiple stops
- ⚙️ User preferences and settings
- 🎨 Beautiful, animated UI with weather-based backgrounds

### Backend Features

- 🔌 FastAPI with automatic API documentation
- 🤖 Google Gemini AI integration for bilingual responses
- 🌍 OpenWeatherMap API integration
- 💾 SQLite database for query logging and user preferences
- 🔄 CORS enabled for frontend communication

## Testing the Connection

1. Make sure both backend and frontend servers are running
2. Open your browser and navigate to `http://localhost:3000`
3. You should see the splash screen followed by the dashboard
4. Try selecting different cities to see weather data
5. Click the microphone button to test the voice assistant
6. Navigate to the Route Weather page to plan a route
7. Visit Settings to customize your preferences

## Troubleshooting

### Backend Issues

**Port already in use:**

```powershell
# Use a different port
uvicorn app.main:app --reload --port 8001
# Then update frontend/.env with REACT_APP_BACKEND_URL=http://localhost:8001
```

**Module not found errors:**

```powershell
# Reinstall dependencies
pip install -r requirements.txt
```

**Database errors:**

```powershell
# Delete the database and let it recreate
rm weather.db
```

### Frontend Issues

**Module not found errors:**

```powershell
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Port already in use:**
The app will automatically prompt to use a different port (3001, 3002, etc.)

**API connection errors:**

- Verify backend is running on `http://localhost:8000`
- Check `frontend/.env` has correct `REACT_APP_BACKEND_URL`
- Check browser console for CORS errors

## Development

### Backend Development

- API documentation is available at `http://localhost:8000/docs`
- Interactive API testing at `http://localhost:8000/redoc`

### Frontend Development

- Hot reload is enabled - changes will reflect automatically
- Uses Create React App with CRACO for custom configuration
- TailwindCSS for styling
- Shadcn/ui components for UI elements

## Project Structure

```
abc/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py          # FastAPI app and routes
│   │   ├── database.py      # Database configuration
│   │   ├── models.py        # SQLAlchemy models
│   │   ├── schemas.py       # Pydantic schemas
│   │   ├── weather.py       # Weather API integration
│   │   └── gemini.py        # Gemini AI integration
│   ├── requirements.txt
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   ├── config.js    # API configuration
    │   │   └── services.js  # API service layer
    │   ├── components/      # React components
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── .env
```

## License

This project is for educational purposes.
