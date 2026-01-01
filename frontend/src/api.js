/**
 * getWeatherData: Fetches weather data from the local proxy server.
 * @param {string} query - Can be a city name (Addis Ababa) or coordinates (lat,lon).
 * @returns {Promise<Object>} The JSON weather data.
 */
export const getWeatherData = async (query) => {
  // We encode the query to handle spaces in city names safely
  const response = await fetch(
    `http://localhost:5000/api/weather?city=${encodeURIComponent(query)}`
  );

  // If the server returns a 404 or 500, we throw an error for App.jsx to catch
  if (!response.ok) {
    throw new Error('City not found or server error');
  }

  return response.json();
};