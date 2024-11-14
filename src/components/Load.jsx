import React from 'react';
import '../styles/Load.css';

function Load() {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <p>잠시 후 결제화면으로 이동합니다.</p>
      </div>
    </div>
  );
}

export default Load;