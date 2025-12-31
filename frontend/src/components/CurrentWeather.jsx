import { format, parse } from 'date-fns';
import './CurrentWeather.css';

const getWindDescription = (windKph) => {
  if (windKph < 10) return 'Calm';
  if (windKph < 20) return 'A little breezy';
  if (windKph < 30) return 'Windy';
  return 'Very windy';
};

const getHumidityDescription = (humidity) => {
  if (humidity < 30) return 'Dry';
  if (humidity < 60) return 'Comfortable';
  if (humidity < 80) return 'Humid';
  return 'Sticky';
};

const getUVDescription = (uv) => {
  if (uv < 3) return 'Low';
  if (uv < 6) return 'Moderate';
  if (uv < 8) return 'High';
  if (uv < 11) return 'Very high';
  return 'Extreme';
};

const getDayAndHHMM = (rawDate) => {
  const date = parse(rawDate, 'yyyy-MM-dd HH:mm', new Date());
  return format(date, 'EEEE, h:mm a');
};

const CurrentWeather = ({ data, location, loading }) => {
  if (loading) {
    return (
      <div className="current-weather skeleton">
        <div className="left-card card">
          <div className="skeleton-text skeleton-title"></div>
          <div className="skeleton-text skeleton-large"></div>
          <div className="skeleton-text skeleton-medium"></div>
        </div>
        <div className="right-card card">
          <div className="skeleton-text skeleton-small"></div>
          <div className="skeleton-text skeleton-small"></div>
          <div className="skeleton-text skeleton-small"></div>
        </div>
      </div>
    );
  }

  const { localtime, name } = location;
  const {
    temp_c,
    condition,
    feelslike_c,
    maxtemp_c,
    mintemp_c,
    wind_kph,
    humidity,
    uv,
  } = data;

  return (
    <div className="current-weather">
      <div className="left-card card">
        <div>
          <h2>{name}</h2>
          <h1 className="temp">{Math.round(temp_c)}°</h1>
          <p>
            ↑{Math.round(maxtemp_c)}° / ↓{Math.round(mintemp_c)}°
          </p>
          <p>Feels like {Math.round(feelslike_c)}°</p>
          <p>{getDayAndHHMM(localtime)}</p>
        </div>
        <div className="condition">
          <img src={condition.icon} alt={condition.text} />
          <h2 className="condition-text">{condition.text}</h2>
        </div>
      </div>
      <div className="right-card card">
        <div className="detail-item">
          <span className="detail-label">💨 Wind</span>
          <span className="detail-value">
            {wind_kph} km/h
            <br />
            <small>{getWindDescription(wind_kph)}</small>
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">💧 Humidity</span>
          <span className="detail-value">
            {humidity}%
            <br />
            <small>{getHumidityDescription(humidity)}</small>
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">🔆 UV Index</span>
          <span className="detail-value">
            {uv}
            <br />
            <small>{getUVDescription(uv)}</small>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
