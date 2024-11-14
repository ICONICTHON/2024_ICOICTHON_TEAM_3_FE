import { useState } from 'react';
import '../styles/foodTicket.css';
import heartIcon from '../images/heart.png';



function FoodTicket() {
  const tickets = [
    { id: '식권1', qrText: 'https://example.com/qrcode1', name: '삼겹김치철판', price: '6500원', likes: 99 },
    { id: '식권2', qrText: 'https://example.com/qrcode2', name: '돼지불백', price: '7000원', likes: 88 },
    { id: '식권3', qrText: 'https://example.com/qrcode3', name: '돼지불백', price: '7000원', likes: 88 },
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
        {ticket.id}
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
                  <div className="qr-image">{ticket.qrText}</div>
                </div>
                <div className="info-card">
                  <h2>상록원 1층</h2>
                  <p>(식사가능시간 : 11:00-16:00)</p>
                  <div className="menu-item">
                    <span>{ticket.name}</span>
                    <span className="price">{ticket.price}</span>
                    <span className="heart">
                      <img src={heartIcon} alt="좋아요" className="heart-icon" />
                      {ticket.likes}
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
