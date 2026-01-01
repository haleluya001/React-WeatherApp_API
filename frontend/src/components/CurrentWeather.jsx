import { format, parse } from 'date-fns';
import './CurrentWeather.css';

/**
 * getDayAndHHMM: Formats the raw local time string from the API
 * into a readable format like "Monday, 3:30 PM"
 */
const getDayAndHHMM = (rawDate) => {
  const date = parse(rawDate, 'yyyy-MM-dd HH:mm', new Date());
  return format(date, 'EEEE, h:mm a');
};

const CurrentWeather = ({ data, location, unit }) => {
  const { localtime, name } = location;
  
  // Logic to check if we are currently using Celsius
  const isC = unit === 'C';

  // Destructuring the weather data for cleaner code
  // We extract both _c and _f variants from the data object
  const {
    temp_c,
    temp_f,
    condition,
    feelslike_c,
    feelslike_f,
    maxtemp_c,
    maxtemp_f,
    mintemp_c,
    mintemp_f,
  } = data;

  return (
    <div className="current-weather">
      <div className="left-card card">
        <div>
          {/* Display City Name */}
          <h2>{name}</h2>
          
          {/* Main Temperature: Changes based on unit state */}
          <h1 className="temp">
            {Math.round(isC ? temp_c : temp_f)}°{unit}
          </h1>
          
          {/* High and Low temperatures for the day */}
          <p>
            ↑{Math.round(isC ? maxtemp_c : maxtemp_f)}° / ↓{Math.round(isC ? mintemp_c : mintemp_f)}°
          </p>
          
          {/* "Feels like" display */}
          <p>Feels like {Math.round(isC ? feelslike_c : feelslike_f)}°{unit}</p>
          
          {/* Formatted Local Time */}
          <p>{getDayAndHHMM(localtime)}</p>
        </div>

        <div className="condition">
          {/* Weather Icon and Description (e.g., Sunny, Cloudy) */}
          <img src={condition.icon} alt={condition.text} />
          <h2 className="condition-text">{condition.text}</h2>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;