import React, { useEffect } from 'react';
import '../styles/PayC.css';

function PayComplete({ onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="pay-result-container">
            <div className="pay-result-message">
                결제가 완료되었습니다
            </div>
        </div>
    );
}

export default PayComplete;
