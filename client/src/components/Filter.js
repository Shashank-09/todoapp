// components/Filter.js
import React from 'react';

const Filter = ({ onFilterChange }) => {
  return (
    <div>
      <button onClick={() => onFilterChange('completed')}>Completed</button>
      <button onClick={() => onFilterChange('pending')}>Pending</button>
    </div>
  );
};

export default Filter;
