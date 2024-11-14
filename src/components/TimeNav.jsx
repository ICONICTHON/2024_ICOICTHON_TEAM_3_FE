import React, { useEffect, useState } from 'react';
import '../styles/timeNav.css';
import '../styles/searchBar.css';
import breakfastIcon from '../images/Breakfast.png';
import breakfastIconActive from '../images/BreakfastOn.png';
import lunchIcon from '../images/Lunch.png';
import lunchIconActive from '../images/LunchOn.png';
import dinnerIcon from '../images/Dinner.png';
import dinnerIconActive from '../images/DinnerOn.png';
import searchIcon from '../images/Search.png';


function TimeNav({ selectedTime, setSelectedTime, onSearch }) {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    console.log("검색 버튼 클릭됨:", searchTerm); // 추가
    onSearch(searchTerm); // 검색어를 상위 컴포넌트로 전달
  };

  useEffect(() => {
    handleSearchClick();
  }, [selectedTime]);
  
  return (
    <nav className="time-nav">
      <button
        className={`time-btn ${selectedTime === '아침' ? 'active' : ''}`}
        onClick={() => setSelectedTime('아침')}
      >
        <img src={selectedTime === '아침' ? breakfastIconActive : breakfastIcon} alt="아침" />
        아침
      </button>
      
      <button
        className={`time-btn ${selectedTime === '점심' ? 'active' : ''}`}
        onClick={() => setSelectedTime('점심')}
      >
        <img src={selectedTime === '점심' ? lunchIconActive : lunchIcon} alt="점심" />
        점심
      </button>
      
      <button
        className={`time-btn ${selectedTime === '저녁' ? 'active' : ''}`}
        onClick={() => setSelectedTime('저녁')}
      >
        <img src={selectedTime === '저녁' ? dinnerIconActive : dinnerIcon} alt="저녁" />
        저녁
      </button>
      
      <div className="search-container" onClick={handleSearchClick}>
        <img src={searchIcon} alt="검색" />
        <input
          type="text"
          className="search-bar"
          placeholder="검색하시오"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
        />
      </div>
    </nav>
  );
}

export default TimeNav;