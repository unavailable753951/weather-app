import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWeatherData } from '../services/weatherService';
import { saveToStorage, loadFromStorage } from '../utils/storage';

const loadInitialState = () => {
  const savedState = loadFromStorage('weatherState');
  return {
    cities: [],
    favoriteCities: savedState?.favoriteCities || [],
    temperatureUnit: savedState?.temperatureUnit || 'C',
    loading: false,
    error: null,
    ...savedState
  };
};

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (cityName, { rejectWithValue }) => {
    try {
      const data = await getWeatherData(cityName);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: loadInitialState(),
  reducers: {
    addCity: (state, action) => {
      const cityExists = state.cities.some(city => city.name === action.payload.name);
      if (!cityExists) {
        state.cities.push(action.payload);
      }
    },
    removeCity: (state, action) => {
      state.cities = state.cities.filter(city => city.name !== action.payload);
    },
    toggleFavorite: (state, action) => {
      const cityName = action.payload;
      const index = state.favoriteCities.indexOf(cityName);
      
      if (index === -1) {
        state.favoriteCities.push(cityName);
      } else {
        state.favoriteCities.splice(index, 1);
      }
      
      saveToStorage('weatherState', {
        favoriteCities: state.favoriteCities,
        temperatureUnit: state.temperatureUnit
      });
    },
    setTemperatureUnit: (state, action) => {
      state.temperatureUnit = action.payload;
      saveToStorage('weatherState', {
        favoriteCities: state.favoriteCities,
        temperatureUnit: state.temperatureUnit
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        const cityExists = state.cities.some(city => city.name === action.payload.name);
        if (!cityExists) {
          state.cities.push(action.payload);
        } else {
          state.cities = state.cities.map(city =>
            city.name === action.payload.name ? action.payload : city
          );
        }
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addCity, removeCity, toggleFavorite, setTemperatureUnit } = weatherSlice.actions;
export default weatherSlice.reducer;