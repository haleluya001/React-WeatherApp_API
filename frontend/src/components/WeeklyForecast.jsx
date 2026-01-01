import { format, parseISO } from 'date-fns';
import './WeeklyForecast.css';

const WeeklyForecast = ({ data, unit }) => {
  // Check if current unit is Celsius
  const isC = unit === 'C';

  return (
    <div className="weekly-container card">
      {data.map((day, index) => (
        <div className="week-card" key={index}>
          <div className="week-day">
            {format(parseISO(day.date), 'EEEE')}
          </div>
          <img src={day.day.condition.icon} alt="icon" className="week-icon" />
          <div className="week-temp">
            {/* Logic: Choose C or F values based on the 'unit' prop */}
            ↑{Math.round(isC ? day.day.maxtemp_c : day.day.maxtemp_f)}° / 
            ↓{Math.round(isC ? day.day.mintemp_c : day.day.mintemp_f)}°
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyForecast;