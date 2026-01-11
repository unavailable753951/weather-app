import React, { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CityCard from './CityCard';
import SearchForm from './SearchForm';
import UnitToggle from './UnitToggle';
import { fetchWeatherData } from '../redux/weatherSlice';

const CityList = ({ convertTemperature }) => {
  const dispatch = useDispatch();
  const cities = useSelector(state => state.weather.cities);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleAddCity = useCallback((cityName) => {
    const cityExists = cities.some(
      city => city.name.toLowerCase() === cityName.toLowerCase()
    );
    
    if (!cityExists) {
      dispatch(fetchWeatherData(cityName))
        .unwrap()
        .then(() => {
          console.log(`Dodano miasto: ${cityName}`);
        })
        .catch((error) => {
          console.error(`Błąd przy dodawaniu miasta ${cityName}:`, error);
          alert(`Nie można znaleźć miasta: ${cityName}. Sprawdź pisownię.`);
        });
    } else {
      alert(`Miasto ${cityName} już jest na liście!`);
    }
  }, [cities, dispatch]);

  const filteredCities = useMemo(() => {
    if (!searchTerm.trim()) {
      return cities;
    }
    return cities.filter(city =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cities, searchTerm]);

  return (
    <div className="city-list-container">
      <h2>Lista miast</h2>
      
      <UnitToggle />
      
      <SearchForm 
        onSearch={handleSearch}
        onAddCity={handleAddCity}
      />
      
      {filteredCities.length === 0 ? (
        <div className="no-results">
          {searchTerm ? (
            <p>Nie znaleziono miasta "{searchTerm}".<br/>Możesz je dodać za pomocą przycisku "Dodaj miasto".</p>
          ) : (
            <p>Brak miast na liście. Dodaj pierwsze miasto!</p>
          )}
        </div>
      ) : (
        <>
          <div className="city-count">
            Wyświetlono: {filteredCities.length} z {cities.length} miast
          </div>
          <div className="city-grid">
            {filteredCities.map((city, index) => (
              <CityCard 
                key={`${city.name}-${index}`} 
                city={city}
                convertTemperature={convertTemperature}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CityList;