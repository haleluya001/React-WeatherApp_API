const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/weather', async (req, res) => {
  const { city } = req.query;

  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${encodeURIComponent(city)}&days=7`
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('WeatherAPI error:', errorData);
      return res.status(response.status).json({ error: errorData.error?.message || 'Failed to fetch weather data' });
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('Weather API fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
