import React from 'react';
import '../styles/timeNav.css';
import '../styles/searchBar.css';
import breakfastIcon from '../images/Breakfast.png';
import breakfastIconActive from '../images/BreakfastOn.png'; // 활성화된 아침 아이콘
import lunchIcon from '../images/Lunch.png';
import lunchIconActive from '../images/LunchOn.png'; // 활성화된 점심 아이콘
import dinnerIcon from '../images/Dinner.png';
import dinnerIconActive from '../images/DinnerOn.png'; // 활성화된 저녁 아이콘
import searchIcon from '../images/Search.png';

function TimeNav({ selectedTime, setSelectedTime }) {
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
      
      <div className="search-container">
        <img src={searchIcon} alt="검색" />
        <input type="text" className="search-bar" placeholder="검색하시오" />
      </div>
    </nav>
  );
}

export default TimeNav;
