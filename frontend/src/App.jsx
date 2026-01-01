import './App.css';
import { useEffect, useState } from 'react';
import { getWeatherData } from './api';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import WeeklyForecast from './components/WeeklyForecast';
import SearchBar from './components/SearchBar';
import { parse } from 'date-fns';

const getGradientClass = (hour) => {
  if (hour >= 6 && hour < 9) return 'bg-sunrise';
  if (hour >= 9 && hour < 17) return 'bg-day';
  if (hour >= 17 && hour < 20) return 'bg-sunset';
  return 'bg-night';
};

function App() {
  const [city, setCity] = useState('Addis Ababa');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('C');
  const [history, setHistory] = useState([]);

  const hour = weatherData?.location?.localtime
    ? parse(weatherData.location.localtime, 'yyyy-MM-dd HH:mm', new Date()).getHours()
    : new Date().getHours();

  const gradientClass = getGradientClass(hour);

  const handleSearch = (newCity) => {
    setCity(newCity);
    setHistory((prev) => {
      const filtered = prev.filter(item => item.toLowerCase() !== newCity.toLowerCase());
      const updated = [newCity, ...filtered].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = `${position.coords.latitude},${position.coords.longitude}`;
        setCity(coords); 
      }, () => {
        setError("Location access denied.");
      });
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    let intervalId;
    const fetchWeather = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getWeatherData(city);
        setWeatherData({
          current: {
            ...data.current,
            maxtemp_c: data.forecast.forecastday[0].day.maxtemp_c,
            mintemp_c: data.forecast.forecastday[0].day.mintemp_c,
            maxtemp_f: data.forecast.forecastday[0].day.maxtemp_f,
            mintemp_f: data.forecast.forecastday[0].day.mintemp_f,
          },
          hourly: data.forecast.forecastday[0].hour,
          weekly: data.forecast.forecastday, // Changed to include today for a full week view
          location: data.location,
        });
      } catch (e) {
        setError(e.message.includes('City') ? 'City not found.' : 'Network error.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    intervalId = setInterval(fetchWeather, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [city]);

  return (
    <div className={`app ${gradientClass}`}>
      <div className="container">
        
        {/* Header Section: Search and Controls */}
        <header className="app-header">
          <SearchBar 
            onSearch={handleSearch} 
            onGeoClick={handleGeolocation} 
            history={history} 
          />

          <div className="controls">
            <button className="refresh-btn" onClick={() => setCity(city)} disabled={loading}>
              {loading ? '...' : '🔄 Refresh'}
            </button>
            <button className="unit-toggle" onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}>
              °{unit === 'C' ? 'F' : 'C'}
            </button>
          </div>
        </header>

        {error && <div className="error-message">⚠️ {error}</div>}

        {weatherData && (
          <main className="weather-content">
            {/* Top Section: Main Weather Stats */}
            <section className="main-section">
               <CurrentWeather 
                data={weatherData.current} 
                location={weatherData.location} 
                unit={unit} 
              />
            </section>

            {/* Middle Section: Hourly (Horizontal Scroll) */}
            <section className="forecast-section">
               <HourlyForecast data={weatherData.hourly} unit={unit} />
            </section>

            {/* Bottom Section: Weekly List */}
            <section className="forecast-section">
               <WeeklyForecast data={weatherData.weekly} unit={unit} />
            </section>
          </main>
        )}
      </div>
    </div>
  );
}

export default App;