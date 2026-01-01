import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onGeoClick, history }) => {
  const [city, setCity] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  // handleSubmit: Prevents page reload, triggers search, and clears input
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      onSearch(city);
      setCity('');
      setShowHistory(false);
    }
  };

  return (
    <div className="search-wrapper">
      <form onSubmit={handleSubmit} className="search-form">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="text"
          value={city}
          onFocus={() => setShowHistory(true)}
          // Blur delay allows the user to click a history item before the list disappears
          onBlur={() => setTimeout(() => setShowHistory(false), 200)}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          required
        />
        
        {/* GEOLOCATION BUTTON: Triggers the browser's GPS logic in App.jsx */}
        <button type="button" onClick={onGeoClick} className="geo-btn">
          📍
        </button>
      </form>

      {/* RECENT SEARCH LIST: Shows the last 5 searched cities */}
      {showHistory && history && history.length > 0 && (
        <ul className="history-list">
          {history.map((item, index) => (
            <li 
              key={index} 
              onMouseDown={() => {
                onSearch(item);
                setCity('');
              }}
              className="history-item"
            >
              🕒 {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;