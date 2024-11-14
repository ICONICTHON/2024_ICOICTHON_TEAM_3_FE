import React, { useState } from "react";
import "../styles/Payment.css";
import Load from "./Load";
import KakaoPay from "./KakaoPay";

function Payment({ isOpen, onClose, menuItem }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showKakaoPay, setShowKakaoPay] = useState(false);

  if (!isOpen) return null;

  const handlePayment = () => {
    setIsLoading(true);

    // 결제 처리 요청
    const data = {
      name: menuItem.item, // 카카오페이에 보낼 상품명
      totalPrice: menuItem.price, // 카카오페이에 보낼 가격
    };

    let baseUrl = window.location.origin; // 현재 도메인 기반으로 URL 생성

    $.ajax({
      type: "POST",
      url: `${baseUrl}/order/pay/ready`,
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function (response) {
        setIsLoading(false);
        // 성공 시 카카오페이 결제 화면으로 이동
        location.href = response.next_redirect_pc_url;
      },
      error: function (error) {
        setIsLoading(false);
        console.error("결제 준비 실패", error);
      },
    });

    //    setTimeout(() => {
    //      setIsLoading(false);
    //      setShowKakaoPay(true);
    //    }, 1000);
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
          <p className="menu-item-payment">{menuItem.item}</p>
          <p className="menu-price">{menuItem.price}</p>
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
