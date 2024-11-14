import React, { useState, useEffect } from 'react';
import '../styles/Payment.css';
import Load from './Load';
import KakaoPay from './KakaoPay';
import Favorite from '../images/Favorite.png';
import FavoriteOn from '../images/FavoriteOn.png';
import axios from 'axios';

function Payment({ isOpen, onClose, menuItem }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showKakaoPay, setShowKakaoPay] = useState(false);
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem('menuFavorites') || '{}');
    return favorites[menuItem.menuName] || false;
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId = 1; // 실제 사용자 ID로 변경 필요

  useEffect(() => {
    if (menuItem?.menuName) {
      const favorites = JSON.parse(localStorage.getItem('menuFavorites') || '{}');
      setIsFavorite(favorites[menuItem.menuName] || false);
    }
  }, [menuItem?.menuName]);

  if (!isOpen) return null;

  const toggleFavorite = async () => {
    try {
      const newFavoriteState = !isFavorite;
      
      if (newFavoriteState) {
        // 즐겨찾기 추가 (POST)
        await axios.post(`${API_BASE_URL}/menu-item-favorites`, {
          userId: userId,
          menuItemId: menuItem.id
        });
      } else {
        // 즐겨찾기 삭제 (DELETE)
        await axios.delete(
          `${API_BASE_URL}/menu-item-favorites/users/${userId}/menu-items/${menuItem.id}/`
        );
      }

      // localStorage 업데이트
      const favorites = JSON.parse(localStorage.getItem('menuFavorites') || '{}');
      favorites[menuItem.menuName] = newFavoriteState;
      localStorage.setItem('menuFavorites', JSON.stringify(favorites));
      
      // 상태 업데이트
      setIsFavorite(newFavoriteState);
    } catch (error) {
      console.error("즐겨찾기 처리 중 오류 발생:", error);
      alert("즐겨찾기 처리 중 문제가 발생했습니다.");
    }
  };

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const price = menuItem?.menuPrice
        ? parseInt(menuItem.menuPrice.toString().replace(/[^0-9]/g, ""), 10)
        : 20000;

      const data = {
        name: menuItem.item || "상품명", // 상품명
        totalPrice: price || 20000, // 총 결제 금액
      }; // 실제 API 경로로 변경 필요

      const response = await axios.post(
        `${API_BASE_URL}/order/pay/ready`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.next_redirect_pc_url) {
        window.location.href = response.data.next_redirect_pc_url;
      }
    } catch (error) {
      console.error("결제 요청 중 오류 발생:", error);
      alert("결제 요청 중 문제가 발생했습니다. 다시 시도해 주세요.");
      if (error.response) {
        console.log("Response error:", error.response); // 응답 관련 에러 출력
        console.log("Status code:", error.response.status); // 상태 코드 출력
        console.log("Error message:", error.response.data); // 응답 데이터 출력
      } else if (error.request) {
        console.log("Request error:", error.request); // 요청이 이루어지지 않은 경우
      } else {
        console.log("Error message:", error.message); // 그 외의 에러 메시지 출력
      }
    } finally {
      setIsLoading(false);
      console.log(menuItem);
    }
  };

  const handleKakaoPayClose = () => {
    setShowKakaoPay(false);
    onClose();
  };

  if (isLoading) return <Load />;
  if (showKakaoPay) return <KakaoPay menuItem={menuItem} onClose={handleKakaoPayClose} />;

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <div className="payment-header">
          <img 
            src={isFavorite ? FavoriteOn : Favorite} 
            alt="즐겨찾기" 
            className="favorite-icon"
            onClick={toggleFavorite}
          />
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
