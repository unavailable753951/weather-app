import axios from 'axios';

const API_KEY = '047e8fd04e236457b0b614cfe15894ac';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherData = async (cityName) => {
  try {
    const currentResponse = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: cityName,
        appid: API_KEY,
        units: 'metric',
        lang: 'pl'
      }
    });

    const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: cityName,
        appid: API_KEY,
        units: 'metric',
        cnt: 5
      }
    });

    const currentData = currentResponse.data;
    const forecastData = forecastResponse.data;

    const forecastDays = forecastData.list.slice(0, 5).map(day => ({
      date: new Date(day.dt * 1000),
      temp: day.main.temp,
      condition: day.weather[0].main,
      icon: day.weather[0].icon,
      precipitation: day.pop * 100,
      windSpeed: day.wind.speed,
      windDirection: day.wind.deg,
      clouds: day.clouds.all
    }));

    return {
      name: currentData.name,
      current: {
        temp: currentData.main.temp,
        condition: currentData.weather[0].main,
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        humidity: currentData.main.humidity,
        pressure: currentData.main.pressure,
        windSpeed: currentData.wind.speed,
        windDirection: currentData.wind.deg,
        clouds: currentData.clouds.all,
        precipitation: currentData.rain ? currentData.rain['1h'] || 0 : 0
      },
      forecast: forecastDays
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};