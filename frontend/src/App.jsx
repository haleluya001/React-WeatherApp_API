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

  const hour = weatherData?.location?.localtime
    ? parse(
        weatherData.location.localtime,
        'yyyy-MM-dd HH:mm',
        new Date()
      ).getHours()
    : new Date().getHours();

  const gradientClass = getGradientClass(hour);

  useEffect(() => {
    let intervalId;

    const fetchWeather = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getWeatherData(city);

        const currentWithDay = {
          ...data.current,
          maxtemp_c: data.forecast.forecastday[0].day.maxtemp_c,
          mintemp_c: data.forecast.forecastday[0].day.mintemp_c,
        };

        setWeatherData({
          current: currentWithDay,
          hourly: data.forecast.forecastday[0].hour,
          weekly: data.forecast.forecastday.slice(1),
          location: data.location,
        });
      } catch (e) {
        if (e.message.includes('City')) {
          setError('City not found. Please check the spelling.');
        } else {
          setError('Network error. Please try again later.');
        }
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
        <SearchBar onSearch={setCity} />

        <button
          className="refresh-btn"
          onClick={() => setCity((prev) => prev)}
          disabled={loading}
        >
          🔄 Refresh
        </button>

        {loading && <p>Loading...</p>}
        {error && <div className="error-message">⚠️ {error}</div>}

        {weatherData && (
          <>
            <CurrentWeather
              data={weatherData.current}
              location={weatherData.location}
            />
            <HourlyForecast data={weatherData.hourly} />
            <WeeklyForecast data={weatherData.weekly} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
