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
        <Header activeLang={activeLang} setActiveLang={setActiveLang} />
        
        <div className="content-wrapper"> {/* Footer와 겹치지 않도록 padding-bottom 추가 */}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <TimeNav selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
                  <RestaurantList />
                </>
              }
            />
            <Route path="/food-ticket" element={<FoodTicket />} />
          </Routes>
        </div>
        
        <Footer activeFooter={activeFooter} setActiveFooter={setActiveFooter} />
      </div>
    </Router>
  );
}

export default App;
