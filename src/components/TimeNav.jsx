import React from 'react';
import '../styles/timeNav.css';
import '../styles/searchBar.css';
import breakfastIcon from '../images/Breakfast.png';
import lunchIcon from '../images/Lunch.png';
import dinnerIcon from '../images/Dinner.png';
import searchIcon from '../images/Search.png';

function TimeNav({ selectedTime, setSelectedTime }) {
  return (
    <nav className="time-nav">
      <button
        className={`time-btn ${selectedTime === '아침' ? 'active' : ''}`}
        onClick={() => setSelectedTime('아침')}
      >
        <img src={breakfastIcon} alt="아침" />
        아침
      </button>
      <button
        className={`time-btn ${selectedTime === '점심' ? 'active' : ''}`}
        onClick={() => setSelectedTime('점심')}
      >
        <img src={lunchIcon} alt="점심" />
        점심
      </button>
      <button
        className={`time-btn ${selectedTime === '저녁' ? 'active' : ''}`}
        onClick={() => setSelectedTime('저녁')}
      >
        <img src={dinnerIcon} alt="저녁" />
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