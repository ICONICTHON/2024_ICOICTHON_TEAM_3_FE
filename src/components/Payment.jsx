import React from 'react';
import '../styles/Payment.css';


function Payment({ isOpen, onClose, menuItem }) {
  if (!isOpen) return null;

  const handlePayment = () => {
    // 여기에 실제 결제 로직을 구현합니다.
    console.log('결제 진행:', menuItem);
    onClose();
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <div className="payment-content">
          <p className="menu-item">{menuItem.item}</p>
          <p className="menu-price">{menuItem.price}</p>
        </div>
        <div className="payment-actions">
          <button className="cancel-button" onClick={onClose}>
            취소
          </button>
          <button className="purchase-button" onClick={handlePayment}>
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;