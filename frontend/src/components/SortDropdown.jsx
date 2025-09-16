import React from 'react';

const SortDropdown = ({ sortOrder, onSortChange }) => (
  <div style={{marginBottom: 16}}>
    <label style={{marginRight: 8, fontWeight: 500}}>Sort by Cook Time:</label>
    <select
      value={sortOrder}
      onChange={e => onSortChange(e.target.value)}
      style={{border: '1px solid #ccc', borderRadius: 4, padding: '4px 8px'}}
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  </div>
);

export default SortDropdown;
