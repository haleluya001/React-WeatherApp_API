import { format, parse } from 'date-fns';
import './HourlyForecast.css';

const HourlyForecast = ({ data, unit }) => {
  // isC: A helper boolean to check if we should display Celsius
  const isC = unit === 'C';

  return (
    <div className="hourly-container card">
      {data.map((hour, index) => (
        <div className="hour-card" key={index}>
          <div className="hour-time">
            {/* Formats the full date string into a readable '3 PM' style */}
            {format(parse(hour.time, 'yyyy-MM-dd HH:mm', new Date()), 'h a')}
          </div>
          <img src={hour.condition.icon} alt="icon" className="hour-icon" />
          
          {/* Dynamically switches temperature values based on unit prop */}
          <div className="hour-temp">
            {Math.round(isC ? hour.temp_c : hour.temp_f)}°
          </div>
          
          <div className="hour-rain">💧 {hour.chance_of_rain}%</div>
        </div>
      ))}
    </div>
  );
};

export default HourlyForecast;