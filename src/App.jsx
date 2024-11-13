import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {
  // 식권 리스트 배열
  const tickets = [
    { id: 'ticket1', qrText: 'QR 코드 1 (150 x 150)', name: '삼겹 김치 철판', price: '6500원', likes: 99 },
    { id: 'ticket2', qrText: 'QR 코드 2 (150 x 150)', name: '돼지 불백', price: '7000원', likes: 88 },
    { id: 'ticket3', qrText: 'QR 코드 2 (150 x 150)', name: '돼지 불백', price: '7000원', likes: 88 },
    { id: 'ticket4', qrText: 'QR 코드 2 (150 x 150)', name: '돼지 불백', price: '7000원', likes: 88 },
    { id: 'ticket5', qrText: 'QR 코드 2 (150 x 150)', name: '돼지 불백', price: '7000원', likes: 88 },
    { id: 'ticket6', qrText: 'QR 코드 2 (150 x 150)', name: '돼지 불백', price: '7000원', likes: 88 },
    // 식권 리스트를 원하는 만큼 추가 가능
  ];

  const [activeTab, setActiveTab] = useState(tickets[0]?.id || ''); // 기본적으로 첫 번째 식권을 활성화

  // for문을 사용하여 탭을 생성하는 방식
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
      <Header activeLang="KOR" setActiveLang={() => { /* 언어 설정 함수 구현 */ }} />

      {/* 메뉴 탭 */}
      <div className="menu-tabs">
        {renderTabs()} {/* for문으로 생성된 탭들 */}
      </div>

      {/* 콘텐츠 영역 */}
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
                  <span className="heart">❤️ {ticket.likes}</span>
                </div>
              </div>
            </div>
          )
        ))}
      </div>

      <Footer activeFooter="식권 확인" setActiveFooter={() => { /* Footer 설정 함수 구현 */ }} />
    </div>
  );
}

export default App;
