import { useState } from 'react';
import '../styles/foodTicket.css';
import heartIcon from '../images/heart.png';

function FoodTicket() {
  const tickets = [
    { id: 'ticket1', qrText: 'QR 코드 1 (150 x 150)', name: '삼겹 김치 철판', price: '6500원', likes: 99 },
    { id: 'ticket2', qrText: 'QR 코드 2 (150 x 150)', name: '돼지 불백', price: '7000원', likes: 88 },
    { id: 'ticket3', qrText: 'QR 코드 3 (150 x 150)', name: '돼지 불백', price: '7000원', likes: 88 },
    { id: 'ticket4', qrText: 'QR 코드 4 (150 x 150)', name: '돼지 불백', price: '7000원', likes: 88 },
    { id: 'ticket5', qrText: 'QR 코드 5 (150 x 150)', name: '돼지 불백', price: '7000원', likes: 88 },
    { id: 'ticket6', qrText: 'QR 코드 6 (150 x 150)', name: '돼지 불백', price: '7000원', likes: 88 },
    { id: 'ticket7', qrText: 'QR 코드 7 (150 x 150)', name: '돼지 불백', price: '7000원', likes: 88 },
    { id: 'ticket8', qrText: 'QR 코드 8 (150 x 150)', name: '돼지 불백', price: '7000원', likes: 88 },
    { id: 'ticket9', qrText: 'QR 코드 9 (150 x 150)', name: '돼지 불백', price: '7000원', likes: 88 }
  ];

  const [activeTab, setActiveTab] = useState(tickets[0]?.id || '');

  const renderTabs = () => {
    let tabs = [];
    for (let i = 0; i < tickets.length; i++) {
      const ticket = tickets[i];
      tabs.push(
        <button
          key={ticket.id}
          className={`menu-tab ${activeTab === ticket.id ? 'active' : ''}`}
          onClick={() => setActiveTab(ticket.id)}
        >
          {ticket.id}
        </button>
      );
    }
    return tabs;
  };

  return (
    <div className="app">
      <div className="menu-tabs">
        {renderTabs()}
      </div>
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
                    {ticket.likes}</span>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default FoodTicket;
