import React, { useEffect } from 'react';
import '../styles/PayC.css';

function PayCancel({ onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="pay-result-container">
            <div className="pay-result-message">
                결제가 취소되었습니다
            </div>
        </div>
    );
}

export default PayCancel;
