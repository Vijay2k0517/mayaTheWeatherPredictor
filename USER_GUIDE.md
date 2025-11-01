# Maya AI Weather Assistant - User Guide

## 🚀 Getting Started

### Starting the Application

**Backend (FastAPI)**:

```powershell
cd c:\Users\vijay\OneDrive\Desktop\wheatherApp\backend
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

**Frontend (Next.js)**:

```powershell
cd c:\Users\vijay\OneDrive\Desktop\wheatherApp\frontend
npm run dev
```

**Access**: http://localhost:3000

---

## 🎙️ Using Voice Features

### Starting Voice Input

1. Click the **microphone icon** (🎤)
2. Button turns red when listening
3. Speak clearly: "What's the weather in Coimbatore?"
4. Maya will process and respond automatically

### Stopping Voice Output

- Click the **red Stop button** (⏹) that appears while Maya is speaking
- Voice stops immediately
- You can then ask a new question

### Voice Tips

- **Clear Speech**: Speak at normal pace, not too fast
- **City Names**: Pronounce Tamil Nadu cities clearly
- **Language**: Speak in English; Maya responds in Tamil + English
- **Quiet Environment**: Better voice recognition in quiet spaces

---

## 💬 Chat Interface

### Asking Questions

**Example Queries**:

- "What's the weather in Chennai?"
- "Tell me about Madurai weather"
- "How's the weather in Coimbatore today?"
- "Is it raining in Tiruchirappalli?"

### Response Format

- **English**: Natural conversational response
- **Tamil**: தமிழில் பதில் (Tanglish style)
- **Advice**: What to wear, what to bring
- **Mood Reply**: Friendly closing message

### City Input

- Top-right corner has a city field
- Default: Chennai
- Change to any Tamil Nadu city
- Applies to text queries

### Language Toggle

- **Both**: See Tamil + English (default)
- **English**: English only
- **Tamil**: Tamil only (தமிழ் மட்டும்)

---

## 🗺️ Route Planner

### How to Use

1. Click **Route Planner** tab
2. Enter cities separated by commas
   - Example: `Chennai, Coimbatore, Madurai, Tiruchirappalli`
3. Click **Plan Route** button
4. See weather cards for all cities simultaneously

### Use Cases

- Planning a road trip across Tamil Nadu
- Checking weather at multiple locations
- Comparing conditions between cities
- Travel itinerary planning

---

## 📅 Daily Update

### Features

- Shows weather for **5 major cities**:
  - Chennai
  - Coimbatore
  - Madurai
  - Tiruchirappalli
  - Salem
- **Auto-loads** on page load
- **Refresh button** to get latest data
- Shows **last update time**

### When to Use

- Morning weather check
- Quick overview of Tamil Nadu weather
- Comparing regional conditions
- Daily weather monitoring

---

## 🎨 UI Features

### Tab Navigation

- **💬 Chat**: Main conversation interface
- **📈 Route Planner**: Multi-city weather
- **📅 Daily Update**: Major cities snapshot

### Weather Cards

- **Hover Effect**: Cards lift when you hover
- **Temperature**: Large display in Celsius
- **Humidity**: Percentage indicator
- **Condition**: Current weather description
- **Icons**: Visual representation of weather

### Status Indicators

- **Thinking...**: Processing your request
- **Speaking...**: Maya is talking
- **Ready to assist**: Idle, waiting for input
- **Loading spinner**: Fetching data

---

## ⌨️ Keyboard Shortcuts

| Key      | Action                            |
| -------- | --------------------------------- |
| `Enter`  | Send message (in input field)     |
| `Esc`    | Stop voice output (when speaking) |
| `Tab`    | Navigate between inputs           |
| `Ctrl+R` | Refresh page                      |

---

## 🎭 Maya's Personality

### Voice Characteristics

- **Tone**: Friendly, warm, helpful
- **Accent**: Indian English (en-IN)
- **Style**: Conversational, not robotic
- **Tamil**: Natural pronunciation

### Response Style

- **Casual**: Uses "pa", "friend", "buddy"
- **Informative**: Clear weather details
- **Helpful**: Practical advice
- **Empathetic**: Acknowledges conditions

---

## 🛠️ Troubleshooting

### Voice Not Working

1. **Check Browser**: Use Chrome, Edge, or Safari
2. **Microphone Permission**: Allow in browser settings
3. **Test Mic**: Try on another site (Google Voice Search)
4. **Background Noise**: Reduce ambient sound

### No Weather Data

1. **Check Backend**: Is port 8000 running?
2. **API Keys**: Verify `.env` file has keys
3. **Internet**: Requires connection for live data
4. **City Name**: Use exact Tamil Nadu city names

### Layout Issues

1. **Clear Cache**: Ctrl+Shift+R to hard refresh
2. **Browser Width**: Expand window if too narrow
3. **Zoom Level**: Reset to 100% (Ctrl+0)

### Voice Sounds Robotic

1. **Load Voices**: Wait 2-3 seconds after page load
2. **Browser Default**: Some browsers have limited voices
3. **Install Voices**: Windows Settings > Time & Language > Speech
4. **Try Different Browser**: Chrome has best voice quality

---

## 📱 Mobile Usage

### Responsive Design

- **Phone**: Single column layout
- **Tablet**: 2-column cards
- **Desktop**: Full layout with 3-5 columns

### Mobile Tips

- Tap microphone icon to speak
- Scroll to see all messages
- Use landscape for better view
- Pinch to zoom (not recommended, UI is optimized)

---

## 🌟 Pro Tips

### Best Practices

1. **Quiet Environment**: Voice works best without background noise
2. **Clear Questions**: Be specific about city names
3. **Wait for Response**: Let Maya finish speaking before next question
4. **Tab Navigation**: Use tabs for different features
5. **Refresh Daily Update**: Get latest data with refresh button

### Advanced Usage

1. **Multiple Cities**: Use Route Planner for batch queries
2. **Compare Weather**: Open multiple weather cards side-by-side
3. **Voice Only Mode**: Close eyes and interact completely by voice
4. **Quick Check**: Daily Update for instant overview

### Customization

1. **Language Preference**: Set to Tamil-only if preferred
2. **City Default**: Change city input to your location
3. **Conversation History**: Auto-saved in browser localStorage

---

## 🔒 Privacy & Data

### What's Stored

- **LocalStorage**: Conversation history (on your device only)
- **Database**: Query logs (on backend SQLite)
- **No Cloud**: No data sent to external servers except APIs

### What's Sent

- **OpenWeatherMap**: City name for weather data
- **Gemini AI**: Weather data + query for response generation
- **No Personal Info**: No location tracking, no user identification

---

## 🎯 Use Cases

### Daily Routine

- Morning: Check Daily Update
- Planning: Use Route Planner for day trips
- Quick Check: Voice query while getting ready

### Travel

- Road Trip: Plan multi-city route
- Weekend: Check destination weather
- Emergency: Quick weather alerts

### Work

- Office: Check commute conditions
- Meetings: Weather for client city
- Presentations: Show professional weather interface

---

## 📊 Feature Comparison

| Feature      | Basic | Maya AI (Ours)             |
| ------------ | ----- | -------------------------- |
| Voice Input  | ❌    | ✅ Natural Tamil + English |
| Voice Output | ❌    | ✅ Human-like speech       |
| Bilingual    | ❌    | ✅ Tamil + English         |
| UI Quality   | Basic | ✅ Premium glassmorphism   |
| Animations   | ❌    | ✅ Smooth 60fps            |
| Multi-City   | ❌    | ✅ Route Planner           |
| Real-time    | ✅    | ✅ Live OpenWeatherMap     |
| AI Responses | ❌    | ✅ Gemini AI powered       |

---

## 🆘 Support

### Common Questions

**Q: Can I use this offline?**  
A: No, requires internet for weather data and AI responses.

**Q: What cities are supported?**  
A: All Tamil Nadu cities (Chennai, Coimbatore, Madurai, etc.)

**Q: Can I change the voice?**  
A: Uses browser default voices. Install more voices in OS settings.

**Q: Is it free to use?**  
A: Yes, but requires your own OpenWeatherMap and Gemini API keys.

**Q: Can I host it online?**  
A: Yes! Deploy frontend to Vercel, backend to Railway/Render.

---

## 🎓 Learning Resources

### Technologies Used

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: FastAPI, Python, SQLAlchemy, SQLite
- **APIs**: Google Gemini AI, OpenWeatherMap
- **Voice**: Web Speech API (browser native)

### Documentation

- Next.js: https://nextjs.org/docs
- FastAPI: https://fastapi.tiangolo.com
- Gemini AI: https://ai.google.dev/docs
- OpenWeatherMap: https://openweathermap.org/api

---

**Enjoy your professional AI weather assistant!** 🌤️✨

For questions or issues, check the `IMPROVEMENTS.md` file for technical details.
