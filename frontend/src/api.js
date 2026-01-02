/**
 * getWeatherData: Fetches weather data.
 * It automatically switches between your local Node server and Netlify Functions.
 */
export const getWeatherData = async (query) => {
  const encodedQuery = encodeURIComponent(query);
  
  // 1. Determine the Base URL
  // If we are on our local machine, use localhost. 
  // If we are on Netlify, use the relative path to the function.
  const isLocal = import.meta.env.DEV; 
  
  const url = isLocal
    ? `http://localhost:5000/api/weather?city=${encodedQuery}`
    : `/.netlify/functions/weather?city=${encodedQuery}`;

  console.log(`Fetching from: ${url}`); // Helpful for debugging

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('City not found or server error');
  }

  return response.json();
};