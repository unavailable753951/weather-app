import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import CityCard from './CityCard';

const FavoriteCities = ({ convertTemperature }) => {
  const cities = useSelector(state => state.weather.cities);
  const favoriteCities = useSelector(state => state.weather.favoriteCities);

  const favoriteCityData = useMemo(() => {
    return cities.filter(city => favoriteCities.includes(city.name));
  }, [cities, favoriteCities]);

  if (favoriteCityData.length === 0) {
    return (
      <div className="no-favorites">
        <h2>Ulubione miasta</h2>
        <p>Nie masz jeszcze ulubionych miast. Kliknij gwiazdkę przy mieście, aby dodać je do ulubionych.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Ulubione miasta</h2>
      <div className="city-grid">
        {favoriteCityData.map((city, index) => (
          <CityCard 
            key={`${city.name}-${index}`} 
            city={city}
            convertTemperature={convertTemperature}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteCities;