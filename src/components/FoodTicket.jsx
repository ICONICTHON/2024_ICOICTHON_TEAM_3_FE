import { useState } from 'react';
import '../styles/foodTicket.css';
import heartIcon from '../images/heart.png';

function FoodTicket() {
  const tickets = [
    { id: '식권1', qrText: 'QR 코드 1 (150 x 150)', name: '삼겹 김치 철판', price: '6500원', likes: 99 },
    { id: '식권2', qrText: 'QR 코드 2 (150 x 150)', name: '돼지 불백', price: '7000원', likes: 88 },
    { id: '식권3', qrText: 'QR 코드 3 (150 x 150)', name: '돼지 불백', price: '7000원', likes: 88 },
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
                  <p>주중: 08:00~19:00</p>
                  <p>주말: 08:00~19:00</p>
                  <p>공휴일: 08:00~19:00</p>
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
