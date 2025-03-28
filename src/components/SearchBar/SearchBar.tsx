// src/components/SearchBar/SearchBar.tsx
import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  disabled?: boolean;
}

function SearchBar({ searchTerm, onSearchTermChange, onSearch, disabled }: SearchBarProps) {

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !disabled) { // Prevent submit if disabled
      onSearch();
    }
  };

  return (
    <div className="search-input-area">
      <input
        type="text"
        placeholder="输入画师或角色名..."
        value={searchTerm}
        onChange={onSearchTermChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-label="Search query input" // Accessibility
      />
      <button onClick={onSearch} disabled={disabled}>
        {disabled ? '查询中...' : '查询'}
      </button>
    </div>
  );
}

export default SearchBar;