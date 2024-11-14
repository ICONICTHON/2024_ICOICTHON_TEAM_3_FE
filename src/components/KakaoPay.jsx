import React, { useState } from 'react';
import '../styles/KakaoPay.css';
import { QRCodeSVG } from 'qrcode.react';
import KakaoBackground from '../images/KakaoBackground.png';
import PayComplete from './PayComplete';
import PayCancel from './PayCancel';

function KakaoPay({ menuItem, onClose }) {
    const [activeTab, setActiveTab] = useState('qr');
    const [showPayComplete, setShowPayComplete] = useState(false);
    const [showPayCancel, setShowPayCancel] = useState(false);

    const handleQRClick = () => {
        setShowPayComplete(true);
    };

    const handleClose = () => {
        setShowPayCancel(true);
    };

    const handlePaymentComplete = () => {
        setShowPayComplete(false);
        onClose();
    };

    const handlePaymentCancel = () => {
        setShowPayCancel(false);
        onClose();
    };

    return (
        <>
            {showPayComplete ? (
                <PayComplete onClose={handlePaymentComplete} />
            ) : showPayCancel ? (
                <PayCancel onClose={handlePaymentCancel} />
            ) : (
                <div className="kakaopay-container">
                    <div className="kakaopay-content">
                        <img 
                            src={KakaoBackground} 
                            alt="Kakao Pay Background" 
                            className="background-image" 
                        />
                        <button onClick={handleClose} className="close-button">×</button>
                        
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
                                <p className="qr-sub-description">
                                    스마트폰 카메라 및 모든 QR스캐너로 가능
                                </p>
                                <div className="qr-code" onClick={handleQRClick}>
                                    <QRCodeSVG 
                                        value={`https://payment.kakao.com/${menuItem.item}`}
                                        size={200}
                                        level="H"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default KakaoPay;