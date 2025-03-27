// src/components/ResultsList/ResultsList.tsx
import './ResultsList.css';
import { ResultItemType, isArtistItem } from '../types'; // Import types and guard

interface ResultsListProps {
  results: ResultItemType[];
  isLoading: boolean;
  searchAttempted: boolean;
}

function ResultsList({ results, isLoading, searchAttempted }: ResultsListProps) {

  const renderContent = () => {
    if (isLoading) {
      return <p className="loading-indicator">正在加载中...</p>;
    }
    if (!searchAttempted) {
      return <p className="no-results">请输入关键词开始查询。</p>;
    }
    if (results.length === 0) {
      return <p className="no-results">未找到相关结果。</p>;
    }

    // Map over results and render based on type
    return results.map((item) => {
      // Use the type guard to render differently
      if (isArtistItem(item)) {
        return (
          <div key={item.artist} className="result-item result-artist-item">
            <span className="item-type-label">[Artist]</span>
            <strong>{item.artist}</strong>
            <p>触发词 (Trigger): {item.trigger}</p>
            <p>计数 (Count): {item.count.toLocaleString()}</p>
            <a href={item.url} target="_blank" rel="noopener noreferrer">查看详情 →</a>
          </div>
        );
      } else { // TypeScript knows this must be CharacterItem
        return (
          <div key={item.character} className="result-item result-character-item">
            <span className="item-type-label">[Character]</span>
            <strong>{item.character}</strong> ({item.copyright})
            <p>触发词 (Trigger): {item.trigger}</p>
            <p>核心标签 (Core Tags): {item.coreTags}</p>
            <p>计数 (Count): {item.count.toLocaleString()} (Solo: {item.soloCount.toLocaleString()})</p>
            <a href={item.url} target="_blank" rel="noopener noreferrer">查看详情 →</a>
          </div>
        );
      }
    });
  };

  return (
    <div className="search-results-area">
      <h2>查询结果</h2>
      <div id="resultsList">
        {renderContent()}
      </div>
    </div>
  );
}

export default ResultsList;