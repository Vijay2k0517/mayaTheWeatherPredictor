import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import WeatherCard from './WeatherCard';
import { weatherService } from '@/api/services';

const RouteWeather = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [startCity, setStartCity] = useState('Chennai');
  const [destinationCity, setDestinationCity] = useState('Madurai');
  const [stops, setStops] = useState([]);
  const [routeWeather, setRouteWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const data = await weatherService.getCities();
      setCities(data.cities);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchRouteWeather = async () => {
    if (!startCity || !destinationCity) {
      toast.error('Please select start and destination cities');
      return;
    }

    setLoading(true);
    try {
      // Build list of cities in order
      const allCities = [startCity, ...stops, destinationCity];
      const data = await weatherService.getRouteWeather(allCities);
      setRouteWeather(data.results);
    } catch (error) {
      console.error('Error fetching route weather:', error);
      toast.error('Failed to fetch route weather');
    } finally {
      setLoading(false);
    }
  };

  const addStop = () => {
    setStops([...stops, 'Coimbatore']);
  };

  const removeStop = (index) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  const updateStop = (index, value) => {
    const newStops = [...stops];
    newStops[index] = value;
    setStops(newStops);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ddc5a3] via-[#c9b8a0] to-[#b8a892]" data-testid="route-weather-page">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-[#342721] hover:bg-white/20"
              data-testid="back-to-dashboard-btn"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-2xl font-bold text-[#342721]">Route Weather</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Route Planner */}
        <Card className="glass p-6 mb-8" data-testid="route-planner-card">
          <h2 className="text-xl font-bold text-[#342721] mb-4">Plan Your Route</h2>
          
          <div className="space-y-4">
            {/* Start City */}
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-green-600" />
              <Select value={startCity} onValueChange={setStartCity}>
                <SelectTrigger className="flex-1 bg-white/80" data-testid="start-city-select">
                  <SelectValue placeholder="Start City" />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {cities.map((city) => (
                    <SelectItem key={city} value={city} data-testid={`start-city-${city.toLowerCase()}`}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Stops */}
            {stops.map((stop, index) => (
              <div key={index} className="flex items-center space-x-3" data-testid={`stop-${index}`}>
                <MapPin className="w-5 h-5 text-blue-600" />
                <Select value={stop} onValueChange={(value) => updateStop(index, value)}>
                  <SelectTrigger className="flex-1 bg-white/80" data-testid={`stop-select-${index}`}>
                    <SelectValue placeholder={`Stop ${index + 1}`} />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeStop(index)}
                  className="text-red-600 hover:bg-red-100"
                  data-testid={`remove-stop-${index}`}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            ))}

            {/* Add Stop Button */}
            <Button
              variant="outline"
              onClick={addStop}
              className="w-full border-dashed border-2 border-[#342721]/30 hover:bg-white/20"
              data-testid="add-stop-btn"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Stop
            </Button>

            {/* Destination City */}
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-red-600" />
              <Select value={destinationCity} onValueChange={setDestinationCity}>
                <SelectTrigger className="flex-1 bg-white/80" data-testid="destination-city-select">
                  <SelectValue placeholder="Destination City" />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {cities.map((city) => (
                    <SelectItem key={city} value={city} data-testid={`dest-city-${city.toLowerCase()}`}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Get Weather Button */}
            <Button
              onClick={fetchRouteWeather}
              className="w-full bg-gradient-to-r from-[#342721] to-[#5a453a] hover:from-[#5a453a] hover:to-[#342721] text-white"
              disabled={loading}
              data-testid="get-route-weather-btn"
            >
              {loading ? 'Loading...' : 'Get Route Weather'}
            </Button>
          </div>
        </Card>

        {/* Route Weather Display */}
        {routeWeather.length > 0 && (
          <div className="space-y-6" data-testid="route-weather-results">
            <h2 className="text-2xl font-bold text-[#342721]">Weather Along Your Route</h2>
            {routeWeather.map((item, index) => (
              <div key={index} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <WeatherCard weatherData={item} city={item.city} language={language} />
                {item.bilingual && (
                  <Card className="glass p-4 mt-2" data-testid={`route-suggestions-${index}`}>
                    <div className="space-y-2">
                      <p className="text-sm text-[#342721]">
                        {language === 'ta' ? item.bilingual.tamil : item.bilingual.english}
                      </p>
                      {item.bilingual.advice && (
                        <p className="text-sm text-[#5a453a]">
                          💡 {item.bilingual.advice}
                        </p>
                      )}
                    </div>
                  </Card>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default RouteWeather;