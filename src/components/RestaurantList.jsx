import React, { useState, useEffect } from 'react';
import '../styles/restaurantList.css';
import heartIcon from '../images/heart.png';
import Payment from './Payment';
import axios from 'axios';

function RestaurantList({ searchResults = [] }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [disabledLikes, setDisabledLikes] = useState({}); // Track disabled buttons by menu item ID

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Toggle details for a specific restaurant
  const toggleDetails = (index) => setOpenIndex(openIndex === index ? null : index);

  // Open payment modal on menu item click
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setIsPaymentOpen(true);
  };

  // Like button click handler to call API and update UI
  const handleLike = async (menuItemId, restaurantIndex, menuItemIndex) => {
    try {
      await axios.put(`${API_BASE_URL}/menu-items/${menuItemId}/like`);
      
      searchResults[restaurantIndex].menuItems[menuItemIndex].likedCount += 1;
      setDisabledLikes((prev) => ({ ...prev, [menuItemId]: true }));
    } catch (error) {
      console.error("Error liking menu item:", error);
    }
  };

  return (
    <section className="restaurant-list">
      {searchResults.length === 0 ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        searchResults.map((restaurant, restaurantIndex) => (
          <div key={restaurant.id} className="restaurant">
            <div className="restaurant-header" onClick={() => toggleDetails(restaurantIndex)}>
              <h2>{restaurant.restaurantName}</h2>
            </div>
            <div className={`menu-list ${openIndex === restaurantIndex ? 'open' : ''}`}>
              {restaurant.menuItems && restaurant.menuItems.length > 0 ? (
                restaurant.menuItems.map((menuItem, menuItemIndex) => (
                  <div key={menuItem.id} className="menu-item-res">
                    <span onClick={() => handleMenuItemClick(menuItem)}>{menuItem.menuName}</span>
                    <span>{menuItem.menuPrice}원</span>
                    <div
                      className="like-container"
                      onClick={() => !disabledLikes[menuItem.id] && handleLike(menuItem.id, restaurantIndex, menuItemIndex)}
                      style={{ cursor: disabledLikes[menuItem.id] ? 'default' : 'pointer', opacity: disabledLikes[menuItem.id] ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                      <img src={heartIcon} alt="좋아요" className="heart-icon" style={{ width: '16px', height: '16px' }} />
                      <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{menuItem.likedCount}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div>메뉴 정보가 없습니다.</div>
              )}
            </div>
          </div>
        ))
      )}
      {/* Payment modal */}
      <Payment
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        menuItem={selectedMenuItem || { item: '', price: '' }}
      />
    </section>
  );
}

export default RestaurantList;
