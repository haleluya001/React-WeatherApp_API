import { format, parseISO } from 'date-fns';
import './WeeklyForecast.css';

/**
 * WeeklyForecast Component
 * Displays a 7-day or 3-day forecast list.
 */
const WeeklyForecast = ({ data, unit }) => {
  const isC = unit === 'C';

  return (
    /* Removed .card here to allow the CSS to handle mobile-specific padding */
    <div className="weekly-forecast-wrapper">
      <h3 className="section-title">Weekly Forecast</h3>
      <div className="weekly-container">
        {data.map((day, index) => (
          <div className="week-card" key={index}>
            <div className="week-day">
              {format(parseISO(day.date), 'EEEE')}
            </div>
            
            <div className="week-condition">
               <img src={day.day.condition.icon} alt="icon" className="week-icon" />
               <span className="mobile-only-text">{day.day.condition.text}</span>
            </div>

            <div className="week-temp">
              <span className="high">
                ↑{Math.round(isC ? day.day.maxtemp_c : day.day.maxtemp_f)}°
              </span>
              <span className="temp-divider"> / </span>
              <span className="low">
                ↓{Math.round(isC ? day.day.mintemp_c : day.day.mintemp_f)}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;