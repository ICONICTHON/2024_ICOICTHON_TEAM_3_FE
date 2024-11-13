import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/reset.css';
import './styles/global.css';
import Header from './components/Header';
import TimeNav from './components/TimeNav';
import RestaurantList from './components/RestaurantList';
import Footer from './components/Footer';
import FoodTicket from './components/FoodTicket';

function App() {
  const [selectedTime, setSelectedTime] = useState('점심');
  const [activeLang, setActiveLang] = useState('KOR');
  const [activeFooter, setActiveFooter] = useState('홈');

  return (
    <Router>
      <div className="App">
        {/* Header와 Footer는 모든 페이지에 공통으로 렌더링 */}
        <Header activeLang={activeLang} setActiveLang={setActiveLang} />
        
        <Routes>
          {/* 메인 페이지 경로 */}
          <Route
            path="/"
            element={
              <>
                <TimeNav selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
                <RestaurantList />
              </>
            }
          />
          
          {/* 식권 확인 페이지 경로 */}
          <Route path="/food-ticket" element={<FoodTicket />} />
        </Routes>
        
        <Footer activeFooter={activeFooter} setActiveFooter={setActiveFooter} />
      </div>
    </Router>
  );
}

export default App;
