import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeatherData } from '../redux/weatherSlice';
import WeatherIcon from './WeatherIcon';

const CityDetails = ({ convertTemperature }) => {
  const { cityName } = useParams();
  const dispatch = useDispatch();
  const cities = useSelector(state => state.weather.cities);
  const [city, setCity] = useState(null);

  useEffect(() => {
    const foundCity = cities.find(c => c.name === cityName);
    if (foundCity) {
      setCity(foundCity);
    } else {
      dispatch(fetchWeatherData(cityName));
    }
  }, [cityName, cities, dispatch]);

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degrees % 360) / 45);
    return directions[index % 8];
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('pl-PL', { 
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  if (!city) {
    return <div className="loading">Ładowanie szczegółów miasta...</div>;
  }

  return (
    <div className="details-page">
      <Link to="/" className="back-btn">← Powrót do listy</Link>
      
      <div className="city-header">
        <h1>{city.name}</h1>
      </div>

      <div className="weather-info-large">
        <WeatherIcon condition={city.current.condition} size="large" />
        <div className="current-weather">
          <div className="temperature-large">
            {convertTemperature(city.current.temp)}
          </div>
          <div className="weather-description-large">
            {city.current.description}
          </div>
        </div>
      </div>

      <div className="details-grid-large">
        <div className="detail-item">
          <span className="detail-label">Temperatura odczuwalna</span>
          <span className="detail-value">
            {convertTemperature(city.current.temp)}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wilgotność</span>
          <span className="detail-value">{city.current.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Ciśnienie</span>
          <span className="detail-value">{city.current.pressure} hPa</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wiatr</span>
          <span className="detail-value">
            {city.current.windSpeed} m/s {getWindDirection(city.current.windDirection)}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Zachmurzenie</span>
          <span className="detail-value">{city.current.clouds}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Opady</span>
          <span className="detail-value">{city.current.precipitation} mm</span>
        </div>
      </div>

      <div className="forecast-container">
        <h2 className="forecast-title">Prognoza na 5 dni</h2>
        <div className="forecast-grid">
          {city.forecast.map((day, index) => (
            <div key={index} className="forecast-card">
              <div className="forecast-day">{formatDate(day.date)}</div>
              <WeatherIcon condition={day.condition} />
              <div className="forecast-temp">
                {convertTemperature(day.temp)}
              </div>
              <div className="forecast-details">
                <div>Opady: {day.precipitation.toFixed(0)}%</div>
                <div>Wiatr: {day.windSpeed} m/s</div>
                <div>Chmury: {day.clouds}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityDetails;