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

    return results.map((item) => {
      if (isArtistItem(item)) {
        return (
          <div key={item.Artist} className="result-item result-artist-item">
            <span className="item-type-label">[Artist]</span>
            <strong>{item.Artist}</strong>
            <p>触发词 (Trigger): {item.Trigger}</p>
            <p>计数 (Count): {item.Count.toLocaleString()}</p>
            <a href={item.Url} target="_blank" rel="noopener noreferrer">查看详情 →</a>
          </div>
        );
      } else { // TypeScript knows this must be CharacterItem
        return (
          <div key={item.Character} className="result-item result-character-item">
            <span className="item-type-label">[Character]</span>
            <strong>{item.Character}</strong> ({item.Copyright})
            <p>触发词 (Trigger): {item.Trigger}</p>
            <p>核心标签 (Core Tags): {item.CoreTags}</p>
            <p>计数 (Count): {item.Count.toLocaleString()} (Solo: {item.SoloCount.toLocaleString()})</p>
            <a href={item.Url} target="_blank" rel="noopener noreferrer">查看详情 →</a>
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