import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/footer.css';
import checkTicketIcon from '../images/CheckTicket.png';
import checkTicketIconActive from '../images/CheckTicketOn.png'; // 활성화된 아이콘
import homeIcon from '../images/Home.png';
import homeIconActive from '../images/HomeOn.png'; // 활성화된 아이콘
import favoriteIcon from '../images/Favorite.png';
import favoriteIconActive from '../images/FavoriteOn.png'; // 활성화된 아이콘

function Footer({ activeFooter, setActiveFooter }) {
  const navigate = useNavigate();

  const handleFooterClick = (section) => {
    setActiveFooter(section);
    if (section === '식권 확인') {
      navigate('/food-ticket');
    } else {
      navigate('/');
    }
  };

  return (
    <footer className="footer">
      <button
        className={`footer-btn ${activeFooter === '식권 확인' ? 'active' : ''}`}
        onClick={() => handleFooterClick('식권 확인')}
      >
        <img
          src={activeFooter === '식권 확인' ? checkTicketIconActive : checkTicketIcon} // 조건부로 이미지 변경
          alt="식권확인"
        />
        <p>식권확인</p>
      </button>
      
      <button
        className={`footer-btn ${activeFooter === '홈' ? 'active' : ''}`}
        onClick={() => handleFooterClick('홈')}
      >
        <img
          src={activeFooter === '홈' ? homeIconActive : homeIcon} // 조건부로 이미지 변경
          alt="홈"
        />
        <p>홈</p>
      </button>
      
      <button
        className={`footer-btn ${activeFooter === '즐겨찾기' ? 'active' : ''}`}
        onClick={() => handleFooterClick('즐겨찾기')}
      >
        <img
          src={activeFooter === '즐겨찾기' ? favoriteIconActive : favoriteIcon} // 조건부로 이미지 변경
          alt="즐겨찾기"
        />
        <p>즐겨찾기</p>
      </button>
    </footer>
  );
}

Footer.propTypes = {
  activeFooter: PropTypes.string.isRequired,
  setActiveFooter: PropTypes.func.isRequired,
};

export default Footer;
