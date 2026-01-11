import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTemperatureUnit } from '../redux/weatherSlice';

const UnitToggle = () => {
  const dispatch = useDispatch();
  const currentUnit = useSelector(state => state.weather.temperatureUnit);

  const units = [
    { value: 'C', label: '°C' },
    { value: 'F', label: '°F' },
    { value: 'K', label: 'K' }
  ];

  return (
    <div className="unit-toggle">
      <span>Jednostki temperatury:</span>
      {units.map(unit => (
        <button
          key={unit.value}
          className={`unit-btn ${currentUnit === unit.value ? 'active' : ''}`}
          onClick={() => dispatch(setTemperatureUnit(unit.value))}
        >
          {unit.label}
        </button>
      ))}
    </div>
  );
};

export default UnitToggle;