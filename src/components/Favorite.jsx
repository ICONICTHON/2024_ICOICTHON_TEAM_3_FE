import React, { useState, useEffect } from "react";
import '../styles/restaurantList.css';
import axios from "axios";
import heartIcon from '../images/heart.png';
import heartActiveIcon from '../images/heartActive.png';
import Payment from "./Payment";

function Favorite() {
  const [favoriteList, setFavoriteList] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [disabledLikes, setDisabledLikes] = useState({}); // Track liked items by menu item ID

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Open payment modal on menu item click
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setIsPaymentOpen(true);
  };

  // Like button click handler to call API and update UI
  const handleLike = async (menuItemId, favoriteIndex, menuItemIndex) => {
    // Prevent double-clicks if the item is already liked
    if (disabledLikes[menuItemId]) return;

    try {
      // Call the API to increment the like count
      await axios.put(`${API_BASE_URL}/menu-items/${menuItemId}/like`);

      // Update the liked count in the local state after successful API call
      setFavoriteList((prevList) => {
        const updatedList = prevList.map((favorite, index) => {
          if (index === favoriteIndex) {
            return {
              ...favorite,
              menuItems: favorite.menuItems.map((menuItem, i) => {
                if (i === menuItemIndex) {
                  return {
                    ...menuItem,
                    likedCount: menuItem.likedCount + 1,
                  };
                }
                return menuItem;
              }),
            };
          }
          return favorite;
        });
        return updatedList;
      });

      // Disable the like button for this item
      setDisabledLikes((prev) => ({ ...prev, [menuItemId]: true }));
    } catch (error) {
      console.error("Error liking menu item:", error);
    }
  };

  // Fetch favorite list on component mount
  useEffect(() => {
    const fetchFavoriteList = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/restaurants/users/1/menu-item-favorites/`);
        setFavoriteList(response.data);
      } catch (error) {
        console.error("Error fetching favorite list:", error);
      }
    };
    fetchFavoriteList();
  }, []);

  return (
    <section className="restaurant-list">
      {favoriteList.length === 0 ? (
        <div>즐겨찾기 목록이 없습니다.</div>
      ) : (
        favoriteList.map((favorite, favoriteIndex) => (
          <div key={favorite.id} className="restaurant">
            <div className="restaurant-header">
              <h2>{favorite.restaurantName}</h2>
            </div>
            {/* 메뉴 리스트는 항상 열려 있게 처리 */}
            <div className="menu-list open">
              {favorite.menuItems && favorite.menuItems.length > 0 ? (
                favorite.menuItems.map((menuItem, menuItemIndex) => (
                  <div key={menuItem.id} className="menu-item-res">
                    <span onClick={() => handleMenuItemClick(menuItem)}>{menuItem.menuName}</span>
                    <span>{menuItem.menuPrice}원</span>
                    <div
                      className="like-container"
                      onClick={() => handleLike(menuItem.id, favoriteIndex, menuItemIndex)}
                      style={{
                        cursor: disabledLikes[menuItem.id] ? 'default' : 'pointer',
                        opacity: disabledLikes[menuItem.id] ? 0.5 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <img
                        src={disabledLikes[menuItem.id] ? heartActiveIcon : heartIcon}
                        alt="좋아요"
                        className="heart-icon"
                        style={{ width: '16px', height: '16px' }}
                      />
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
        menuItem={selectedMenuItem || { menuName: '', menuPrice: '' }}
      />
    </section>
  );
}

export default Favorite;
