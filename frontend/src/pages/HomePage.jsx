
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import FilterPanel from '../components/FilterPanel';
import SortDropdown from '../components/SortDropdown';
import { searchRecipes } from '../services/api';
import axios from 'axios';

const PAGE_SIZE = 12;

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleSearch = async (searchText) => {
    setLoading(true);
    setError('');
    setPage(1);
    try {
      const data = await searchRecipes(searchText);
      setRecipes(data);
      setFilteredRecipes(data);
      setTags([...new Set(data.flatMap(r => r.tags || []))]);
      setHasMore(data.length > PAGE_SIZE);
    } catch (err) {
      setError('Backend unavailable');
      setRecipes([]);
      setFilteredRecipes([]);
      setTags([]);
      setHasMore(false);
    }
    setLoading(false);
  };

  // Fetch suggestions after 3+ characters
  const handleInputChange = async (text) => {
    setQuery(text);
    if (text.length >= 3) {
      try {
        const data = await searchRecipes(text);
        setSuggestions(data.map(r => r.name));
      } catch {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (option) => {
    setQuery(option);
    setSuggestions([]);
    handleSearch(option);
  };

  useEffect(() => {
    const loadAndSearch = async () => {
      try {
        await axios.post(process.env.REACT_APP_API_BASE_URL + '/recipes/load');
      } catch (e) {}
      handleSearch('');
    };
    loadAndSearch();
  }, []);

  useEffect(() => {
    let result = [...recipes];
    if (selectedTags.length) {
      result = result.filter(r => r.tags && selectedTags.every(tag => r.tags.includes(tag)));
    }
    result.sort((a, b) => sortOrder === 'asc' ? a.cookTimeMinutes - b.cookTimeMinutes : b.cookTimeMinutes - a.cookTimeMinutes);
    setFilteredRecipes(result);
    setHasMore(result.length > page * PAGE_SIZE);
  }, [recipes, selectedTags, sortOrder, page]);

  const handleTagToggle = (tag) => {
    setSelectedTags(selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]);
    setPage(1);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const displayedRecipes = filteredRecipes.slice(0, page * PAGE_SIZE);


  return (
    <div style={{maxWidth: 1100, margin: '0 auto', padding: 32, background: 'linear-gradient(135deg, #f8f9fa 60%, #fffbe6 100%)', minHeight: '100vh', fontFamily: 'Segoe UI, Arial, sans-serif'}}>
      <header style={{textAlign: 'center', marginBottom: 40}}>
        <h1 style={{fontSize: 48, fontWeight: 700, color: '#2a3eb1', letterSpacing: 2, marginBottom: 8, fontFamily: 'Playfair Display, serif'}}>Famous Restaurant</h1>
        <p style={{fontSize: 20, color: '#555', fontWeight: 400, marginBottom: 0}}>Discover & search delicious recipes from our kitchen</p>
      </header>
      <div style={{marginBottom: 32, boxShadow: '0 2px 12px #e3e3e3', borderRadius: 16, background: '#fff', padding: 24, position: 'relative'}}>
        <SearchBar
          onSearch={handleSearch}
          onInputChange={handleInputChange}
          value={query}
        />
        {suggestions.length > 0 && (
          <ul style={{position: 'absolute', top: 70, left: 0, right: 0, background: '#fff', border: '1px solid #eee', borderRadius: 8, boxShadow: '0 2px 8px #eee', zIndex: 10, listStyle: 'none', margin: 0, padding: 0}}>
            {suggestions.map((option, idx) => (
              <li key={option + '-' + idx} style={{padding: '12px 20px', cursor: 'pointer', borderBottom: '1px solid #f3f3f3'}} onClick={() => handleSuggestionSelect(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      {tags.length > 0 && (
        <div style={{marginBottom: 16, boxShadow: '0 2px 8px #f3f3f3', borderRadius: 12, background: '#fff', padding: 16}}>
          <FilterPanel tags={tags} selectedTags={selectedTags} onTagToggle={handleTagToggle} />
        </div>
      )}
      <div style={{marginBottom: 16, boxShadow: '0 2px 8px #f3f3f3', borderRadius: 12, background: '#fff', padding: 16}}>
        <SortDropdown sortOrder={sortOrder} onSortChange={handleSortChange} />
      </div>
      {error && <div style={{color: 'red', textAlign: 'center', marginBottom: 16, fontWeight: 500}}>{error}</div>}
      {!loading && displayedRecipes.length === 0 && !error && (
        <div style={{textAlign: 'center', color: '#888', fontSize: 18, margin: '32px 0'}}>No results found.</div>
      )}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, marginTop: 16}}>
        {displayedRecipes.map((recipe, idx) => (
          <RecipeCard key={recipe.id + '-' + idx} recipe={recipe} />
        ))}
      </div>
      {hasMore && (
        <div style={{display: 'flex', justifyContent: 'center', margin: '40px 0'}}>
          <button style={{padding: '14px 40px', background: 'linear-gradient(90deg, #2a3eb1 60%, #ffb347 100%)', color: '#fff', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: 18, fontWeight: 600, boxShadow: '0 2px 12px #ddd', letterSpacing: 1}} onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
      {loading && <div style={{textAlign: 'center', padding: 32, fontSize: 20, color: '#2a3eb1'}}>Loading...</div>}
    </div>
  );
};

export default HomePage;
