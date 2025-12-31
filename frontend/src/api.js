export const getWeatherData = async (cityName) => {
  const response = await fetch(
    `http://localhost:5000/api/weather?city=${cityName}`
  );

  if (!response.ok) {
    throw new Error('City not found or server error');
  }

  return response.json();
};
