import { useState, useEffect } from 'react';
import { MessageCircle, Cloud, MapPin, Settings as SettingsIcon, Route } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import WeatherCard from './WeatherCard';
import VoiceAssistant from './VoiceAssistant';
import { weatherService } from '@/api/services';

const Dashboard = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('Chennai');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isListening, setIsListening] = useState(false);
  const [showVoice, setShowVoice] = useState(false);

  useEffect(() => {
    fetchCities();
    fetchWeather('Chennai');
  }, []);

  const fetchCities = async () => {
    try {
      const data = await weatherService.getCities();
      setCities(data.cities);
    } catch (error) {
      console.error('Error fetching cities:', error);
      toast.error('Failed to load cities');
    }
  };

  const fetchWeather = async (city) => {
    setLoading(true);
    try {
      const data = await weatherService.getWeather(city, `Weather in ${city}`);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
      toast.error('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    fetchWeather(city);
  };

  const getWeatherClass = () => {
    if (!weatherData) return 'weather-bg-clear';
    const condition = weatherData.condition.toLowerCase();
    if (condition.includes('rain')) return 'weather-bg-rain';
    if (condition.includes('cloud')) return 'weather-bg-clouds';
    return 'weather-bg-clear';
  };

  return (
    <div className={`min-h-screen ${getWeatherClass()} transition-all duration-1000`} data-testid="dashboard">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#342721] to-[#5a453a] rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-[#ddc5a3]">M</span>
            </div>
            <h1 className="text-2xl font-bold text-[#342721]">Maya</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32 bg-white/80" data-testid="language-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ta">தமிழ்</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/route')}
              className="text-[#342721] hover:bg-white/20"
              data-testid="route-nav-btn"
            >
              <Route className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/settings')}
              className="text-[#342721] hover:bg-white/20"
              data-testid="settings-nav-btn"
            >
              <SettingsIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* City Selection */}
        <div className="mb-8 fade-in">
          <Card className="glass p-6">
            <div className="flex items-center space-x-4">
              <MapPin className="w-6 h-6 text-[#342721]" />
              <Select value={selectedCity} onValueChange={handleCityChange}>
                <SelectTrigger className="flex-1 bg-white/80" data-testid="city-select">
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {cities.map((city) => (
                    <SelectItem key={city} value={city} data-testid={`city-option-${city.toLowerCase()}`}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>

        {/* Weather Display */}
        {loading ? (
          <div className="flex items-center justify-center py-20" data-testid="loading-spinner">
            <Cloud className="w-16 h-16 text-[#342721] animate-pulse" />
          </div>
        ) : weatherData ? (
          <div className="space-y-6">
            <WeatherCard weatherData={weatherData} city={selectedCity} language={language} />
            
            {/* Bilingual Information */}
            {weatherData.bilingual && (
              <Card className="glass p-6 fade-in" data-testid="bilingual-card">
                <h3 className="text-xl font-bold text-[#342721] mb-4">
                  {language === 'ta' ? 'தகவல்' : 'Information'}
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/30 p-4 rounded-lg backdrop-blur-sm">
                    <p className="text-[#342721] mb-2">
                      {language === 'ta' ? weatherData.bilingual.tamil : weatherData.bilingual.english}
                    </p>
                    {weatherData.bilingual.advice && (
                      <p className="text-[#5a453a] text-sm mt-2">
                        💡 {weatherData.bilingual.advice}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            )}
          </div>
        ) : null}

        {/* Voice Assistant Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <Button
            size="lg"
            onClick={() => setShowVoice(!showVoice)}
            className={`w-16 h-16 rounded-full bg-gradient-to-br from-[#342721] to-[#5a453a] hover:from-[#5a453a] hover:to-[#342721] text-white shadow-2xl ${
              isListening ? 'voice-pulse' : ''
            }`}
            data-testid="voice-assistant-btn"
          >
            <MessageCircle className="w-8 h-8" />
          </Button>
        </div>
      </main>

      {/* Voice Assistant Modal */}
      {showVoice && (
        <VoiceAssistant
          isOpen={showVoice}
          onClose={() => setShowVoice(false)}
          language={language}
          currentCity={selectedCity}
          currentWeather={weatherData}
          onListeningChange={setIsListening}
        />
      )}
    </div>
  );
};

export default Dashboard;