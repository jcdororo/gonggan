'use client'
// pages/index.js
import { useState } from 'react';

const IndexPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const apiKey = '50d33f74c1fc0778c1b05d3b810f3b34';

  const handleSearch = async (searchQuery) => {
    try {
      const apiUrl = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${searchQuery}`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `KakaoAK ${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('네트워크 응답이 정상이 아닙니다');
      }

      const data = await response.json();
      setResults(data.documents);
    } catch (error) {
      console.error('데이터를 불러오는 중 오류 발생:', error);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);

    // API 호출 전에 작은 지연을 추가
    setTimeout(() => {
      handleSearch(value);
    }, 300); // 필요에 따라 지연 시간 조절
  };

  const handleResultClick = (result) => {
    // 클릭한 결과 정보를 출력
    console.log('선택된 정보:', result);
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleChange} />
      
      {/* 자동완성 드랍박스 */}
      <ul>
        {results.map((result) => (
          <li key={result.id} onClick={() => handleResultClick(result)}>
            {result.place_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;
