import { format, parseISO } from 'date-fns';
import './WeeklyForecast.css';

const WeeklyForecast = ({ data }) => {
  return (
    <div className="weekly-container card">
      {data.map((day, index) => (
        <div className="week-card" key={index}>
          <div className="week-day">
            {format(parseISO(day.date), 'EEEE')}
          </div>
          <img src={day.day.condition.icon} alt="icon" className="week-icon" />
          <div className="week-temp">
            ↑{Math.round(day.day.maxtemp_c)}° / ↓{Math.round(day.day.mintemp_c)}°
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyForecast;
