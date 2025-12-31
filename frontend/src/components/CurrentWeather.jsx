import { format, parse } from 'date-fns';
import './CurrentWeather.css';

const getDayAndHHMM = (rawDate) => {
  const date = parse(rawDate, 'yyyy-MM-dd HH:mm', new Date());
  return format(date, 'EEEE, h:mm a');
};

const CurrentWeather = ({ data, location }) => {
  const { localtime, name } = location;
  const {
    temp_c,
    condition,
    feelslike_c,
    maxtemp_c,
    mintemp_c,
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
          <p>Feels like {feelslike_c}°</p>
          <p>{getDayAndHHMM(localtime)}</p>
        </div>
        <div className="condition">
          <img src={condition.icon} alt={condition.text} />
          <h2 className="condition-text">{condition.text}</h2>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
