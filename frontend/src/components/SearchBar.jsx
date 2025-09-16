import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.length >= 3) {
      onSearch(query);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 0'}}>
      <input
        type="text"
        style={{border: '1px solid #ccc', borderRadius: '8px 0 0 8px', padding: '8px 16px', width: 320, outline: 'none'}}
        placeholder="Search recipes or cuisine..."
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button
        style={{background: '#2a3eb1', color: '#fff', padding: '8px 16px', borderRadius: '0 8px 8px 0', border: 'none', cursor: 'pointer', opacity: query.length < 3 ? 0.5 : 1}}
        onClick={handleSearch}
        disabled={query.length < 3}
        aria-label="Search"
      >
        <span role="img" aria-label="search">🔍</span>
      </button>
    </div>
  );
};

export default SearchBar;
