import React, { useState } from 'react';
import '../styles/KakaoPay.css';
import { QRCodeSVG } from 'qrcode.react';
import KakaoBackground from '../images/KakaoBackground.png';

function KakaoPay({ menuItem, onClose }) {
  const [activeTab, setActiveTab] = useState('qr');

  return (
    <div className="kakaopay-container">
      <div className="kakaopay-content">
        <img 
          src={KakaoBackground} 
          alt="Kakao Pay Background" 
          className="background-image" 
        />
        <button onClick={onClose} className="close-button">×</button>
        
        <div className="white-box">
          <div className="payment-tabs">
            <button 
              className={`payment-tab ${activeTab === 'qr' ? 'active' : ''}`}
              onClick={() => setActiveTab('qr')}
            >
              QR결제
            </button>
            <button 
              className={`payment-tab ${activeTab === 'kakao' ? 'active' : ''}`}
              onClick={() => setActiveTab('kakao')}
            >
              카톡결제
            </button>
          </div>

          <div className="qr-content">
            <p className="qr-description">
              휴대폰으로 스캔하면<br />
              결제 화면으로 이동합니다.
            </p>
            <div className="qr-code">
              <QRCodeSVG 
                value={`https://payment.kakao.com/${menuItem.item}`}
                size={180}
                level="H"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KakaoPay;