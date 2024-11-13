import PropTypes from 'prop-types'; // PropTypes 추가

import '../styles/footer.css';
import checkTicketIcon from '../images/CheckTicket.png';
import homeIcon from '../images/Home.png';
import favoriteIcon from '../images/Favorite.png';

function Footer({ activeFooter, setActiveFooter }) {
  return (
    <footer className="footer">
      <button
        className={`footer-btn ${activeFooter === '식권 확인' ? 'active' : ''}`}
        onClick={() => setActiveFooter('식권 확인')}
      >
        <img src={checkTicketIcon} alt="식권확인" />
        <p>식권확인</p>
      </button>
      <button
        className={`footer-btn ${activeFooter === '홈' ? 'active' : ''}`}
        onClick={() => setActiveFooter('홈')}
      >
        <img src={homeIcon} alt="홈" />
        <p>홈</p>
      </button>
      <button
        className={`footer-btn ${activeFooter === '즐겨찾기' ? 'active' : ''}`}
        onClick={() => setActiveFooter('즐겨찾기')}
      >
        <img src={favoriteIcon} alt="즐겨찾기" />
        <p>즐겨찾기</p>
      </button>
    </footer>
  );
}

export default Footer;


Footer.propTypes = {
  activeFooter: PropTypes.string.isRequired,
  setActiveFooter: PropTypes.func.isRequired,
};

