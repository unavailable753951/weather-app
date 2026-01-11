import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleFavorite } from '../redux/weatherSlice';
import WeatherIcon from './WeatherIcon';

const CityCard = ({ city, convertTemperature }) => {
  const dispatch = useDispatch();
  const favoriteCities = useSelector(state => state.weather.favoriteCities);
  const isFavorite = favoriteCities.includes(city.name);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(city.name));
  };

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degrees % 360) / 45);
    return directions[index % 8];
  };

  return (
    <Link to={`/city/${city.name}`} className="city-card">
      <div className="city-header">
        <h3 className="city-name">{city.name}</h3>
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleToggleFavorite}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
      
      <div className="weather-info">
        <WeatherIcon condition={city.current.condition} />
        <div>
          <div className="temperature">
            {convertTemperature(city.current.temp)}
          </div>
          <div className="weather-description">
            {city.current.description}
          </div>
        </div>
      </div>

      <div className="details-grid">
        <div className="detail-item">
          <span className="detail-label">Wilgotność</span>
          <span className="detail-value">{city.current.humidity}%</span>
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
    </Link>
  );
};

export default CityCard;