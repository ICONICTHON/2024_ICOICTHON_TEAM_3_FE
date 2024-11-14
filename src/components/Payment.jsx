import React, { useState } from "react";
import axios from "axios";
import "../styles/Payment.css";
import Load from "./Load";
import KakaoPay from "./KakaoPay";

function Payment({ isOpen, onClose, menuItem }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showKakaoPay, setShowKakaoPay] = useState(false);

  if (!isOpen) return null;

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      const price = parseInt(menuItem.price.replace(/[^0-9]/g, ""), 10);
      const data = {
        name: menuItem.item || "상품명", // 상품명
        totalPrice: price || 20000, // 총 결제 금액
      };

      const baseUrl = "https://www.akofood.site"; // 실제 API 경로로 변경 필요

      const response = await axios.post(`${baseUrl}/order/pay/ready`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.next_redirect_pc_url) {
        window.location.href = response.data.next_redirect_pc_url;
      }
    } catch (error) {
      console.error("결제 요청 중 오류 발생:", error);
      alert("결제 요청 중 문제가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
      console.log(menuItem);
    }
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
