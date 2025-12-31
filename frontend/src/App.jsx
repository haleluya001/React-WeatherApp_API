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

  const GradientClass = getGradientClass(hour);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getWeatherData(city);

        // merge max/min temps into current
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
        setError(e?.message || 'Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className={`app ${GradientClass}`}>
      <div className="container">
        <SearchBar onSearch={setCity} />

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {weatherData && (
          <>
            <CurrentWeather
              data={weatherData.current}
              location={weatherData.location}
              loading={loading}
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
