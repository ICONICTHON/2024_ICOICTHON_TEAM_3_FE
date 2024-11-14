import React, { useState } from 'react';
import '../styles/restaurantList.css';
import heartIcon from '../images/heart.png'; // 즐겨찾기 아이콘 추가
import Payment from './Payment' // 결제 컴포넌트 추가

function RestaurantList({ searchResults }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  // 특정 인덱스의 레스토랑을 토글하는 함수
  const toggleDetails = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  /* 메뉴 아이템 클릭 시 결제 모달 열기 */
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setIsPaymentOpen(true);
  };

  return (
    <section className="restaurant-list">
      {searchResults.map((restaurant, index) => (
        <div key={restaurant.id} className="restaurant">
          <div className="restaurant-header" onClick={() => toggleDetails(index)}>
            <h2>{restaurant.restaurantName}</h2>
          </div>
          <div className={`menu-list ${openIndex === index ? 'open' : ''}`}>
            {restaurant.menuItems.map((menuItem) => (
              <div key={menuItem.id} className="menu-item-res">
                <span>{menuItem.menuName}</span>
                <span>{menuItem.menuPrice}원</span>
                <button className="like-button" onClick={() => handleLike(menuItem.id)}>
                  <img src={heartIcon} alt="좋아요" className="heart-icon" />
                  {menuItem.likedCount}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Payment 컴포넌트는 여기에 한 번만 렌더링 */}
      <Payment
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        menuItem={selectedMenuItem || { item: '', price: '' }}
      /> 
    </section>
  );
}

export default RestaurantList;