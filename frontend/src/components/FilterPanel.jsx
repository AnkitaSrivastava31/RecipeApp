import React from 'react';

const FilterPanel = ({ tags, selectedTags, onTagToggle }) => (
  <div style={{display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16}}>
    {tags.map(tag => (
      <button
        key={tag}
        style={{padding: '4px 12px', borderRadius: 4, border: '1px solid #ccc', background: selectedTags.includes(tag) ? '#2a3eb1' : '#f3f3f3', color: selectedTags.includes(tag) ? '#fff' : '#333'}}
        onClick={() => onTagToggle(tag)}
      >
        {tag}
      </button>
    ))}
  </div>
);

export default FilterPanel;
