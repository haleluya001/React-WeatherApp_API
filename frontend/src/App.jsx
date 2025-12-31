import './App.css';
import { useEffect, useState } from 'react';
import { getWeatherData } from './api';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import WeeklyForecast from './components/WeeklyForecast';
import SearchBar from './components/SearchBar';

function App() {
  const [city, setCity] = useState('Addis Ababa');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getWeatherData(city);

        setWeatherData({
          current: data.current,
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

  //console.log(weatherData);

  return (
    <div className="app">
      <div className="container">
        <SearchBar onSearch={setCity} />

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

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
