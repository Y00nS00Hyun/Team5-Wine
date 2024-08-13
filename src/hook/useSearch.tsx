import { useState, useCallback } from 'react';

function useSearch(onSearch: (query: string) => void) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      onSearch(query); // 검색 로직을 실행합니다.
    }
  }, [query, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(); // Enter 키를 눌렀을 때 검색 실행
    }
  };

  return {
    query,
    setQuery,
    handleInputChange,
    handleSearch,
    handleKeyDown,
  };
}

export default useSearch;
