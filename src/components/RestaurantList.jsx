import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import '../styles/restaurantList.css';
import heartIcon from '../images/heart.png';
import Payment from './Payment';

function RestaurantList({ searchResults = [] }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  // 특정 인덱스의 레스토랑을 토글하는 함수
  const toggleDetails = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // 메뉴 아이템 클릭 시 결제 모달 열기
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setIsPaymentOpen(true);
  };

  return (
    <section className="restaurant-list">
      {Array.isArray(searchResults) && searchResults.length === 0 ? (
        <div>검색 결과가 없습니다.</div> // 결과가 없으면 메시지 출력
      ) : (
        searchResults.map((restaurant, index) => (
          <div key={restaurant.id} className="restaurant">
            <div className="restaurant-header" onClick={() => toggleDetails(index)}>
              <h2>{restaurant.restaurantName}</h2>
            </div>
            <div className={`menu-list ${openIndex === index ? 'open' : ''}`}>
              {restaurant.menuItems && restaurant.menuItems.length > 0 ? (
                restaurant.menuItems.map((menuItem) => (
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
        menuItem={selectedMenuItem || { item: '', price: '' }}
      />
    </section>
  );
}

// RestaurantList.propTypes = {
//   searchResults: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       restaurantName: PropTypes.string.isRequired,
//       menuItems: PropTypes.arrayOf(
//         PropTypes.shape({
//           id: PropTypes.number.isRequired,
//           menuName: PropTypes.string.isRequired,
//           menuPrice: PropTypes.number.isRequired,
//           likedCount: PropTypes.number,
//         })
//       ),
//     })
//   ).isRequired,
// };

export default RestaurantList;
