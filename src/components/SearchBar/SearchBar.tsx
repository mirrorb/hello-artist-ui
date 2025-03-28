// src/components/SearchBar/SearchBar.tsx
import React from 'react';
import './SearchBar.css';

type FilterType = 'all' | 'artist' | 'character';

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  disabled: boolean;
  filterType: FilterType;
  onFilterChange: (type: FilterType) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
  disabled,
  filterType,
  onFilterChange
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-area">
        <input
          type="text"
          className="search-input"
          placeholder="输入关键词..."
          value={searchTerm}
          onChange={onSearchTermChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <button 
          onClick={onSearch}
          disabled={disabled}
        >
          {disabled ? '搜索中...' : '搜索'}
        </button>
      </div>
      
      <div className="filter-options">
        <div className="filter-buttons">
          <button 
            className={`filter-button ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => onFilterChange('all')}
            disabled={disabled}
          >
            全部
          </button>
          <button 
            className={`filter-button ${filterType === 'artist' ? 'active' : ''}`}
            onClick={() => onFilterChange('artist')}
            disabled={disabled}
          >
            画师
          </button>
          <button 
            className={`filter-button ${filterType === 'character' ? 'active' : ''}`}
            onClick={() => onFilterChange('character')}
            disabled={disabled}
          >
            角色
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;