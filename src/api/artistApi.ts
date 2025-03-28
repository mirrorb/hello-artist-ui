import { ResultItemType } from '../components/types';

const API_URL = 'http://localhost:8081';

export const searchByName = async (
  name: string, 
  filterType: 'all' | 'artist' | 'character' = 'all'
): Promise<ResultItemType[]> => {
  try {
    const response = await fetch(`${API_URL}/artist?name=${encodeURIComponent(name)}&type=${filterType}`);
    
    if (!response.ok) {
      throw new Error(`查询失败，状态码: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API 调用错误:', error);
    throw error;
  }
};
