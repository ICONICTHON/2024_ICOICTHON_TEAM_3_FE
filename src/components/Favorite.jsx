import React, { useState, useEffect } from "react";
import '../styles/restaurantList.css';
import heartIcon from '../images/heart.png';
import axios from 'axios';
import Payment from "./Payment";

function Favorite() {
  const [favoriteList, setFavoriteList] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // 메뉴 아이템 클릭 시 결제 모달 열기
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setIsPaymentOpen(true);
  };

  // 즐겨찾기 목록 가져오기
  useEffect(() => {
    const fetchFavoriteList = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/restaurants/users/1/menu-item-favorites/`);
        setFavoriteList(response.data);
      } catch (error) {
        console.error("즐겨찾기 목록 불러오기 오류:", error);
      }
    };
    fetchFavoriteList();
  }, []);

  return (
    <section className="restaurant-list">
      {favoriteList.length === 0 ? (
        <div>즐겨찾기 목록이 없습니다.</div>
      ) : (
        favoriteList.map((favorite) => (
          <div key={favorite.id} className="restaurant">
            <div className="restaurant-header">
              <h2>{favorite.restaurantName}</h2>
            </div>
            {/* 메뉴 리스트는 항상 열려 있게 처리 */}
            <div className="menu-list open">
              {favorite.menuItems && favorite.menuItems.length > 0 ? (
                favorite.menuItems.map((menuItem) => (
                  <div key={menuItem.id} className="menu-item-res">
                    <span onClick={() => handleMenuItemClick(menuItem)}>{menuItem.menuName}</span>
                    <span>{menuItem.menuPrice}원</span>
                    <button className="like-button" onClick={() => handleLike(menuItem.id)}>
                      <img src={heartIcon} alt="좋아요" className="heart-icon" />
                      {menuItem.likedCount}
                    </button>
                  </div>
                ))
              ) : (
                <div>메뉴 정보가 없습니다.</div>
              )}
            </div>
          </div>
        ))
      )}
      {/* 결제 모달 */}
      <Payment
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        menuItem={selectedMenuItem || { menuName: '', menuPrice: '' }}
      />
    </section>
  );
}

export default Favorite;
