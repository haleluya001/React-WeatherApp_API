import './App.css';
import { useEffect, useState } from 'react';
import { getWeatherData } from './api';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import WeeklyForecast from './components/WeeklyForecast';
import SearchBar from './components/SearchBar';
import { parse } from 'date-fns';

/**
 * getGradientClass: Determines the CSS background class based on the local time
 * of the city being searched to reflect sunrise, day, sunset, or night.
 */
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
  
  // NEW: State for temperature unit ('C' or 'F')
  const [unit, setUnit] = useState('C');
  
  // NEW: State for search history
  const [history, setHistory] = useState([]);

  // Calculate local hour for background gradients
  const hour = weatherData?.location?.localtime
    ? parse(weatherData.location.localtime, 'yyyy-MM-dd HH:mm', new Date()).getHours()
    : new Date().getHours();

  const gradientClass = getGradientClass(hour);

  /**
   * handleSearch: Triggered when a user selects a city. 
   * Updates the city state and adds it to the recent history list.
   */
  const handleSearch = (newCity) => {
    setCity(newCity);
    setHistory((prev) => {
      const filtered = prev.filter(item => item.toLowerCase() !== newCity.toLowerCase());
      const updated = [newCity, ...filtered].slice(0, 5); // Keep last 5
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  };

  /**
   * handleGeolocation: Uses the Browser API to find user coordinates 
   * and fetches weather based on "lat,lon".
   */
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

  // Load history from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  /**
   * fetchWeather (inside useEffect): The core data fetching logic.
   * Runs every time 'city' changes or every 5 minutes.
   */
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
          weekly: data.forecast.forecastday.slice(1),
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
        
        {/* Pass search handler and history to SearchBar */}
        <SearchBar 
          onSearch={handleSearch} 
          onGeoClick={handleGeolocation} 
          history={history} 
        />

        <div className="controls">
          <button className="refresh-btn" onClick={() => setCity(city)} disabled={loading}>
            🔄 Refresh
          </button>

          {/* NEW: Toggle Button for C/F */}
          <button className="unit-toggle" onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}>
            Switch to °{unit === 'C' ? 'F' : 'C'}
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <div className="error-message">⚠️ {error}</div>}

        {weatherData && (
          <>
            <CurrentWeather 
              data={weatherData.current} 
              location={weatherData.location} 
              unit={unit} 
            />
            <HourlyForecast data={weatherData.hourly} unit={unit} />
            <WeeklyForecast data={weatherData.weekly} unit={unit} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;