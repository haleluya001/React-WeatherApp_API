export const getWeatherData = async (cityName) => {
  const response = await fetch(
    `http://localhost:5000/api/weather?city=${encodeURIComponent(cityName)}`
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch weather data');
  }

  return response.json();
};
