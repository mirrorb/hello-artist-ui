import React, { useState, useCallback } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ResultsList from './components/ResultsList/ResultsList';
import { ResultItemType } from './components/types';
import './App.css';

// --- Mock API Data
const fakeApiData: ResultItemType[] = [
  { artist: 'Michelangelo', trigger: 'renaissance painter', count: 1500, url: 'https://en.wikipedia.org/wiki/Michelangelo' },
  { character: 'Hatsune Miku', copyright: 'Vocaloid', trigger: 'miku', coreTags: 'virtual singer, twintails, teal hair', count: 50000, soloCount: 45000, url: 'https://en.wikipedia.org/wiki/Hatsune_Miku' },
  { artist: 'Leonardo da Vinci', trigger: 'renaissance inventor', count: 1200, url: 'https://en.wikipedia.org/wiki/Leonardo_da_Vinci' },
  { character: 'Reimu Hakurei', copyright: 'Touhou Project', trigger: 'reimu', coreTags: 'shrine maiden, red-white, fantasy', count: 30000, soloCount: 28000, url: 'https://en.touhouwiki.net/wiki/Reimu_Hakurei' },
  { artist: 'Vincent van Gogh', trigger: 'post-impressionist painter', count: 900, url: 'https://en.wikipedia.org/wiki/Vincent_van_Gogh' },
  { character: 'Artoria Pendragon (Saber)', copyright: 'Fate/stay night', trigger: 'saber', coreTags: 'king arthur, blonde hair, servant', count: 42000, soloCount: 35000, url: 'https://typemoon.fandom.com/wiki/Saber_(Fate/stay_night)'}
];

// --- Mock API Call
const simulateApiCall = (query: string): Promise<ResultItemType[]> => {
  console.log(`API Call Simulation for: "${query}"`);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      if (!query) {
        resolve([]);
        return;
      }
      const lowerCaseQuery = query.toLowerCase();
      const filteredData = fakeApiData.filter(item => {
        if ('artist' in item) {
          return item.artist.toLowerCase().includes(lowerCaseQuery) ||
                 item.trigger.toLowerCase().includes(lowerCaseQuery);
        } else if ('character' in item) { // isCharacterItem(item) also works
          return item.character.toLowerCase().includes(lowerCaseQuery) ||
                 item.copyright.toLowerCase().includes(lowerCaseQuery) ||
                 item.trigger.toLowerCase().includes(lowerCaseQuery) ||
                 item.coreTags.toLowerCase().includes(lowerCaseQuery);
        }
        return false;
      });
      console.log(`Found ${filteredData.length} results.`);
      resolve(filteredData);
    }, 800); // Simulate 0.8 second delay
  });
};

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<ResultItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchAttempted, setSearchAttempted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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
        const data = await simulateApiCall(searchTerm);
        setResults(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.error("Search failed:", err);
        setResults([]);
        setError(err.message || '查询时发生未知错误');
    } finally {
        setIsLoading(false);
    }
  }, [searchTerm]);

  return (
    <div className="search-card">
      <h1>在线查询</h1>

      <SearchBar
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
        onSearch={handleSearch}
        disabled={isLoading}
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