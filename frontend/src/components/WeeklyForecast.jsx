import { format, parseISO } from 'date-fns';
import './WeeklyForecast.css';

const WeeklyForecast = ({ data }) => {
  console.log(data);
  return (
    <div className="daily-container card">
      {data.map((day, index) => {
        return (
          <div className="daily-row" key={index}>
            <div className="daily-day">{format(parseISO(day.date), 'EEE')}</div>

            <div className="daily-rain">💧{day.day.daily_chance_of_rain}%</div>
            <div className="daily-condition">
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                className="daily-icon"
              />
              <span className="daily-text">{day.day.condition.text}</span>
            </div>
            <div className="daily-temp">
              {Math.round(day.day.maxtemp_c)}° {Math.round(day.day.mintemp_c)}°
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeeklyForecast;