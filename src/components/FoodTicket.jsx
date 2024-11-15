import { useState, useEffect } from 'react';
import '../styles/foodTicket.css';
import heartIcon from '../images/heart.png';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';

function FoodTicket() {
  const [tickets, setTickets] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usedStatus, setUsedStatus] = useState({});

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId = 1;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/meal-vouchers/users/${userId}`);
        
        // used 상태와 관계없이 모든 식권 정보 가져오기
        const allTickets = response.data.map(ticket => ({
          uniqueIdentifier: ticket.uniqueIdentifier,
          restaurant: ticket.restaurantName,
          menuName: ticket.menuName,
          menuPrice: ticket.menuPrice,
          likedCount: ticket.likedCount,
          operatingHours: ticket.operatingHours,
          orderNumber: ticket.orderNumber,
          used: ticket.used  // used 상태도 함께 저장
        }));

        setTickets(allTickets);
        if (allTickets.length > 0) {
          setActiveTab(allTickets[0].uniqueIdentifier);
        }
        setLoading(false);
      } catch (err) {
        setError('식권 정보를 불러오는데 실패했습니다.');
        setLoading(false);
        console.error('Error fetching tickets:', err);
      }
    };

    fetchTickets();
  }, [API_BASE_URL, userId]);

  useEffect(() => {
    const checkUsedStatus = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/meal-vouchers/users/${userId}`);
        const newUsedStatus = {};
        response.data.forEach(ticket => {
          newUsedStatus[ticket.uniqueIdentifier] = ticket.used;
        });
        
        // 상태가 변경된 경우에만 업데이트
        setUsedStatus(prevStatus => {
          const hasChanges = Object.keys(newUsedStatus).some(
            key => newUsedStatus[key] !== prevStatus[key]
          );
          return hasChanges ? newUsedStatus : prevStatus;
        });

        // 티켓 정보도 업데이트
        setTickets(response.data.map(ticket => ({
          uniqueIdentifier: ticket.uniqueIdentifier,
          restaurant: ticket.restaurantName,
          menuName: ticket.menuName,
          menuPrice: ticket.menuPrice,
          likedCount: ticket.likedCount,
          operatingHours: ticket.operatingHours,
          orderNumber: ticket.orderNumber,
          used: ticket.used
        })));
      } catch (err) {
        console.error('Error checking ticket status:', err);
      }
    };

    // 초기 상태 확인
    checkUsedStatus();

    // 2초마다 상태 확인
    const interval = setInterval(checkUsedStatus, 2000);
    return () => clearInterval(interval);
  }, [API_BASE_URL, userId]);

  const renderTabs = () => {
    if (tickets.length === 0) {
      return (
        <div className="no-tickets">
          보유 중인 식권이 없습니다!
        </div>
      );
    }
    return tickets.map((ticket, index) => (
      <button
        key={ticket.uniqueIdentifier}
        className={`menu-tab ${activeTab === ticket.uniqueIdentifier ? 'active' : ''}`}
        onClick={() => setActiveTab(ticket.uniqueIdentifier)}
      >
        식권{index + 1}
      </button>
    ));
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

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
            activeTab === ticket.uniqueIdentifier && (
              <div key={ticket.uniqueIdentifier}>
                <div className="qr-placeholder">
                  {!usedStatus[ticket.uniqueIdentifier] ? (
                    <div className="qr-image">
                      <QRCodeSVG 
                        value={`http://akofood.site:8080/api/meal-vouchers/qr?unique_identifier=${ticket.uniqueIdentifier}`}
                        size={250}
                        level="H"
                      />
                    </div>
                  ) : (
                    <div className="used-message">사용 완료</div>
                  )}
                </div>
                <div className="info-card">
                  <div className="operation-hours">
                    <h2>{ticket.restaurant}</h2>
                    <div className="hours-info">
                      <p>영업시간: {ticket.operatingHours}</p>
                    </div>
                  </div>
                  <div className="menu-item">
                    <span>{ticket.menuName}</span>
                    <span className="price">{ticket.menuPrice}원</span>
                    <span className="heart">
                      <img src={heartIcon} alt="좋아요" className="heart-icon" />
                      {ticket.likedCount}
                    </span>
                  </div>
                </div>
                {usedStatus[ticket.uniqueIdentifier] && (
                  <div className="order-number">
                    주문번호: {ticket.orderNumber}
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default FoodTicket;
