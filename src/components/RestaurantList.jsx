import React, { useState } from 'react';
import '../styles/restaurantList.css';
import heartIcon from '../images/heart.png'; // 즐겨찾기 아이콘 추가
import Payment from './Payment' // 결제 컴포넌트 추가

const restaurants = [
  {
    name: '상록원 1층',
    weekdaysHours: '08:00~19:00',
    weekendHours: '08:00~19:00',
    holydayHours: '08:00~19:00',
    menu: [
      { item: '삼겹 김치 철판', price: '6500원', likes: 99 },
      { item: '된장찌개', price: '5500원', likes: 85 },
      { item: '제육볶음', price: '6000원', likes: 90 },
    ],
  },
  {
    name: '상록원 2층',
    weekdaysHours: '09:00~20:00',
    weekendHours: '10:00~18:00',
    holydayHours: '10:00~18:00',
    menu: [
      { item: '칼국수', price: '5000원', likes: 70 },
      { item: '돈까스', price: '7500원', likes: 120 },
      { item: '김치볶음밥', price: '5500원', likes: 95 },
    ],
  },
  {
    name: '상록원 3층',
    weekdaysHours: '08:00~18:00',
    weekendHours: '08:00~15:00',
    holydayHours: '휴무',
    menu: [
      { item: '비빔밥', price: '6000원', likes: 110 },
      { item: '불고기', price: '7000원', likes: 130 },
      { item: '떡볶이', price: '4500원', likes: 60 },
    ],
  },
  {
    name: '남산학사',
    weekdaysHours: '07:00~21:00',
    weekendHours: '08:00~19:00',
    holydayHours: '08:00~19:00',
    menu: [
      { item: '라면', price: '3000원', likes: 50 },
      { item: '김밥', price: '4000원', likes: 90 },
      { item: '치즈돈까스', price: '8000원', likes: 125 },
    ],
  },
  {
    name: '가든쿡',
    weekdaysHours: '08:00~19:00',
    weekendHours: '09:00~17:00',
    holydayHours: '09:00~17:00',
    menu: [
      { item: '햄버거', price: '5500원', likes: 150 },
      { item: '스파게티', price: '7500원', likes: 200 },
      { item: '샐러드', price: '6000원', likes: 80 },
    ],
  },
];

function RestaurantList() {
  const [openIndex, setOpenIndex] = useState(null);
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
      {restaurants.map((restaurant, index) => (
        <div key={index} className="restaurant">
          <div className="restaurant-header" onClick={() => toggleDetails(index)}>
            <h2>{restaurant.name}</h2>
            <div className="hours">
              <p>주중: {restaurant.weekdaysHours}</p>
              <p>주말: {restaurant.weekendHours}</p>
              <p>공휴일: {restaurant.holydayHours}</p>
            </div> 
          </div>
          <div className={`menu-list ${openIndex === index ? 'open' : ''}`}>
            {restaurant.menu.map((menuItem, menuIndex) => (
              <div 
                key={menuIndex} 
                className="menu-item"
                onClick={() => handleMenuItemClick(menuItem)}
              >
                <span>{menuItem.item}</span>
                <span>{menuItem.price}</span>
                <span className="like">
                  <img src={heartIcon} alt="좋아요" className="heart-icon" />
                  {menuItem.likes}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* 결제 모달 */}
      <Payment
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        menuItem={selectedMenuItem || { item: '', price: '' }}
      /> 
    </section>
  );
}

export default RestaurantList;