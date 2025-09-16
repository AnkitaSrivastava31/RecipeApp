import React from 'react';

const RecipeCard = ({ recipe }) => (
  <div style={{background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee', padding: 16, display: 'flex', flexDirection: 'column', gap: 8}}>
    <h2 style={{fontWeight: 'bold', fontSize: 18}}>{recipe.name}</h2>
    <p style={{color: '#666', fontSize: 14}}>Cuisine: {recipe.cuisine}</p>
    <p style={{fontSize: 14}}>Cook Time: {recipe.cookTimeMinutes} min</p>
    <p style={{fontSize: 14}}>Difficulty: {recipe.difficulty}</p>
    {recipe.tags && (
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8}}>
        {recipe.tags.map(tag => (
          <span key={tag} style={{background: '#e3e8ff', color: '#2a3eb1', padding: '2px 8px', borderRadius: 4, fontSize: 12}}>{tag}</span>
        ))}
      </div>
    )}
  </div>
);

export default RecipeCard;
