// frontend/netlify/functions/weather.js
const axios = require('axios');

exports.handler = async (event) => {
  const { city } = event.queryStringParameters;
  const API_KEY = process.env.VITE_WEATHER_API_KEY; // Pulled from Netlify Dashboard

  try {
    const res = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`);
    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed fetching weather' }) };
  }
};