import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
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
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // 검색 요청을 보내는 함수
  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/restaurants`, {
        params: { search_menu: searchTerm },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("검색 오류:", error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header activeLang={activeLang} setActiveLang={setActiveLang} />
        
        <div className="content-wrapper">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <TimeNav selectedTime={selectedTime} setSelectedTime={setSelectedTime} onSearch={handleSearch} />
                  <RestaurantList searchResults={searchResults} />
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
