import React, { useState } from 'react';

const SearchForm = ({ onSearch, onAddCity }) => {
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      onAddCity(search.trim());
      onSearch('');
      setSearch('');
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Wpisz miasto po angielsku (np. Berlin, London)..."
          value={search}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-button">
          Dodaj miasto
        </button>
      </div>
      <div className="search-hint">
        <small>Wyszukaj w istniejących miastach lub dodaj nowe</small>
      </div>
    </form>
  );
};

export default SearchForm;