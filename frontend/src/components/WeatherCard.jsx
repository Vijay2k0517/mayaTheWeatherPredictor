import { Cloud, CloudRain, Sun, Wind, Droplets } from 'lucide-react';
import { Card } from '@/components/ui/card';

const WeatherCard = ({ weatherData, city, language = 'en' }) => {
  if (!weatherData) return null;

  // Use city from API response if available, otherwise use prop
  const displayCity = weatherData.city || city;
  const temp = Math.round(weatherData.temp);
  const humidity = weatherData.humidity;
  const condition = weatherData.condition;
  const rainChance = weatherData.rain_chance || 0;

  const getWeatherIcon = () => {
    switch (condition.toLowerCase()) {
      case 'rain':
      case 'drizzle':
        return <CloudRain className="w-24 h-24 text-blue-600" />;
      case 'clouds':
        return <Cloud className="w-24 h-24 text-gray-600" />;
      case 'clear':
        return <Sun className="w-24 h-24 text-yellow-500" />;
      default:
        return <Cloud className="w-24 h-24 text-gray-600" />;
    }
  };

  return (
    <Card className="glass p-8 fade-in" data-testid="weather-card">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Main Weather */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold text-[#342721]" data-testid="city-name">{displayCity}</h2>
              <p className="text-lg text-[#5a453a] capitalize" data-testid="weather-description">{condition}</p>
            </div>
            <div data-testid="weather-icon">{getWeatherIcon()}</div>
          </div>
          
          <div className="mt-6">
            <div className="text-7xl font-bold text-[#342721]" data-testid="temperature">
              {temp}°C
            </div>
            {rainChance > 0 && (
              <p className="text-xl text-[#5a453a] mt-2" data-testid="rain-chance">
                {language === 'ta' ? 'மழை வாய்ப்பு' : 'Rain chance'}: {Math.round(rainChance * 100)}%
              </p>
            )}
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/30 p-4 rounded-lg backdrop-blur-sm" data-testid="humidity-card">
            <div className="flex items-center space-x-2 mb-2">
              <Droplets className="w-5 h-5 text-[#342721]" />
              <span className="text-sm text-[#5a453a]">
                {language === 'ta' ? 'ஈரப்பதம்' : 'Humidity'}
              </span>
            </div>
            <p className="text-2xl font-bold text-[#342721]" data-testid="humidity-value">{humidity}%</p>
          </div>

          <div className="bg-white/30 p-4 rounded-lg backdrop-blur-sm" data-testid="condition-card">
            <div className="flex items-center space-x-2 mb-2">
              <Cloud className="w-5 h-5 text-[#342721]" />
              <span className="text-sm text-[#5a453a]">
                {language === 'ta' ? 'நிலை' : 'Condition'}
              </span>
            </div>
            <p className="text-lg font-bold text-[#342721]" data-testid="condition-value">{condition}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;