import React, { useState } from 'react';
import '../styles/Payment.css';
import Load from './Load';
import KakaoPay from './KakaoPay';

function Payment({ isOpen, onClose, menuItem }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showKakaoPay, setShowKakaoPay] = useState(false);

  if (!isOpen) return null;

  const handlePayment = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowKakaoPay(true);
    }, 2000);
  };

  const handleKakaoPayClose = () => {
    setShowKakaoPay(false);
    onClose();
  };

  if (isLoading) {
    return <Load />;
  }

  if (showKakaoPay) {
    return <KakaoPay menuItem={menuItem} onClose={handleKakaoPayClose} />;
  }

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <div className="payment-header">
          <span className="favorite-icon">⭐</span>
        </div>
        <div className="payment-content">
          <p className="menu-item-payment">{menuItem.menuName}</p>
          <p className="menu-price">{menuItem.menuPrice}</p>
        </div>
        <div className="payment-actions">
          <button className="purchase-button" onClick={handlePayment}>
            구매하기
          </button>
          <button className="cancel-button" onClick={onClose}>
            취소
          </button>
        </div>
        <hr className="divider-line" />
        <p className="scroll-comment">스크롤해서 댓글보기</p>
      </div>
    </div>
  );
}

export default Payment;
