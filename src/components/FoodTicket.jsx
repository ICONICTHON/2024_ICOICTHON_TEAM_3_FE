import { useState } from 'react';
import '../styles/foodTicket.css';
import heartIcon from '../images/heart.png';



function FoodTicket() {
  const tickets = [
    
      {
        id: 1,
        uniqueIdentifier: "string",
        orderNumber: 0,
        used: true,
        restaurantId: 1,
        restaurantName: "상록원1층",
        menuItemId: 1,
        menuName: "솥앤누들-삼겹살김치철판",
        menuPrice: 5500,
        operatingHours: "11:30-19:00",
        dailyUsageLimit: 500,
        dailyUsageCount: 0,
        totalUsageCount: 2000,
        dailyVoucherSales: 0,
        totalVoucherSales: 2000,
        likedCount: 0
      },
      {
        id: 2,
        uniqueIdentifier: "string",
        orderNumber: 0,
        used: true,
        restaurantId: 1,
        restaurantName: "상록원1층",
        menuItemId: 2,
        menuName: "솥앤누들-치즈불닭철판",
        menuPrice: 5800,
        operatingHours: "11:30-19:00",
        dailyUsageLimit: 500,
        dailyUsageCount: 0,
        totalUsageCount: 2000,
        dailyVoucherSales: 0,
        totalVoucherSales: 2000,
        likedCount: 0
      },
      {
        id: 3,
        uniqueIdentifier: "string",
        orderNumber: 0,
        used: true,
        restaurantId: 2,
        restaurantName: "상록원2층",
        menuItemId: 23,
        menuName: "백반-리코타치즈샐러드",
        menuPrice: 4500,
        operatingHours: "10:30-14:00",
        dailyUsageLimit: 500,
        dailyUsageCount: 0,
        totalUsageCount: 2000,
        dailyVoucherSales: 0,
        totalVoucherSales: 2000,
        likedCount: 0
      }
    
  ];  // tickets 배열이 비어 있는 상태

  const [activeTab, setActiveTab] = useState(tickets[0]?.id || '');

  const renderTabs = () => {
    if (tickets.length === 0) {
      return (
        <div className="no-tickets">
          보유 중인 식권이 없습니다!
        </div>
      );
    }
    return tickets.map((ticket) => (
      <button
        key={ticket.id}
        className={`menu-tab ${activeTab === ticket.id ? 'active' : ''}`}
        onClick={() => setActiveTab(ticket.id)}
      >
        식권{ticket.id}
      </button>
    ));
  };

  return (
    <div className="app">
      <div className="menu-tabs-container">
        <div className="menu-tabs">
          {renderTabs()}
        </div>
      </div>

      {tickets.length > 0 ? (
        <div className="content">
          {tickets.map(ticket => (
            activeTab === ticket.id && (
              <div key={ticket.id}>
                <div className="qr-placeholder">
                  <div className="qr-image">{ticket.uniqueIdentifier}</div>
                </div>
                <div className="info-card">
                  <h2><span>{ticket.restaurantName}</span></h2>
                  <p>(식사가능시간 : 11:00-16:00)</p>
                  <div className="menu-item">
                    <span>{ticket.menuName}</span>
                    <span className="price">{ticket.menuPrice}</span>
                    <span className="heart">
                      <img src={heartIcon} alt="좋아요" className="heart-icon" />
                      {ticket.likedCount}
                    </span>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default FoodTicket;
