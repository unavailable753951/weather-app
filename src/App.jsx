import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CityList from './components/CityList';
import CityDetails from './components/CityDetails';
import FavoriteCities from './components/FavoriteCities';
import Header from './components/Header';
import { fetchWeatherData } from './redux/weatherSlice';
import './styles/App.css';

function App() {
  const dispatch = useDispatch();
  const cities = useSelector(state => state.weather.cities);
  const unit = useSelector(state => state.weather.temperatureUnit);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialCities = ['Warsaw', 'Krakow', 'Wroclaw', 'Gdansk', 'Poznan'];
    
    const loadWeatherData = async () => {
      try {
        for (const city of initialCities) {
          await dispatch(fetchWeatherData(city));
        }
      } catch (error) {
        console.error('Error loading weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, [dispatch]);

  const displayedCities = useMemo(() => {
    return cities.slice(0, 5);
  }, [cities]);

  const convertTemperature = useCallback((temp) => {
    if (unit === 'C') return `${temp.toFixed(1)}°C`;
    if (unit === 'F') return `${(temp * 9/5 + 32).toFixed(1)}°F`;
    return `${(temp + 273.15).toFixed(1)}K`;
  }, [unit]);

  if (loading) {
    return <div className="loading">Ładowanie danych pogodowych...</div>;
  }

  return (
    <div className="App">
      <Header />
      
      <nav className="navigation">
        <Link to="/" className="nav-link">Lista miast</Link>
        <Link to="/favorites" className="nav-link">Ulubione miasta</Link>
      </nav>

      <Routes>
        <Route path="/" element={<CityList convertTemperature={convertTemperature} />} />
        <Route path="/city/:cityName" element={<CityDetails convertTemperature={convertTemperature} />} />
        <Route path="/favorites" element={<FavoriteCities convertTemperature={convertTemperature} />} />
      </Routes>
    </div>
  );
}

export default App;