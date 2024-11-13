import React from 'react';
import '../styles/header.css';
import logo from '../images/logo.png';

function Header({ activeLang, setActiveLang }) {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="App Logo" />
        <h1>아코푸드</h1>
      </div>
      <div className="lang-switch">
        <button
          onClick={() => setActiveLang('KOR')}
          className={`lang-btn ${activeLang === 'KOR' ? 'active' : ''}`}
        >
          KOR
        </button>
        <button
          onClick={() => setActiveLang('ENG')}
          className={`lang-btn ${activeLang === 'ENG' ? 'active' : ''}`}
        >
          ENG
        </button>
      </div>
    </header>
  );
}

export default Header;
