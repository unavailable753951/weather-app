import React from 'react';

const WeatherIcon = ({ condition, size = 'medium' }) => {
  const getIcon = (condition) => {
    const icons = {
      Clear: '☀️',
      Clouds: '☁️',
      Rain: '🌧️',
      Drizzle: '🌦️',
      Thunderstorm: '⛈️',
      Snow: '❄️',
      Mist: '🌫️',
      Smoke: '💨',
      Haze: '🌫️',
      Dust: '💨',
      Fog: '🌫️',
      Sand: '💨',
      Ash: '💨',
      Squall: '💨',
      Tornado: '🌪️'
    };

    return icons[condition] || '☀️';
  };

  const sizes = {
    small: '24px',
    medium: '48px',
    large: '64px'
  };

  return (
    <span 
      className="weather-icon"
      style={{ fontSize: sizes[size] }}
      role="img" 
      aria-label={condition}
    >
      {getIcon(condition)}
    </span>
  );
};

export default WeatherIcon;