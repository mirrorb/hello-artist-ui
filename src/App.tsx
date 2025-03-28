import React, { useState, useCallback } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ResultsList from './components/ResultsList/ResultsList';
import { ResultItemType } from './components/types';
import * as artistApi from './api/artistAPi';
import './App.css';

// 添加过滤类型
type FilterType = 'all' | 'artist' | 'character';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<ResultItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchAttempted, setSearchAttempted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // 添加过滤状态，默认为全部
  const [filterType, setFilterType] = useState<FilterType>('all');

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // 添加过滤类型变更处理函数
  const handleFilterChange = (type: FilterType) => {
    setFilterType(type);
  };

  const handleSearch = useCallback(async () => {
    if (!searchTerm.trim()) {
        setResults([]);
        setSearchAttempted(true);
        setError(null);
        return;
    }

    setIsLoading(true);
    setSearchAttempted(true);
    setError(null);

    try {
        // 将过滤类型传递给API
        const data = await artistApi.searchByName(searchTerm, filterType);
        setResults(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.error("Search failed:", err);
        setResults([]);
        setError(err.message || '查询时发生未知错误');
    } finally {
        setIsLoading(false);
    }
  }, [searchTerm, filterType]); // 添加filterType作为依赖项

  return (
    <div className="search-card">
      <h1>在线查询</h1>

      <SearchBar
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
        onSearch={handleSearch}
        disabled={isLoading}
        filterType={filterType}
        onFilterChange={handleFilterChange}
      />

      <hr className="divider" />

      {error && <p className="error-message">错误: {error}</p>}

      <ResultsList
        results={results}
        isLoading={isLoading}
        searchAttempted={searchAttempted}
      />
    </div>
  );
}

export default App;