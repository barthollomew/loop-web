import React from 'react';
import './TextSection.css';

const TextSection = () => {
    return (
        <div className="promotion-container">
            <img src={process.env.PUBLIC_URL + '/images/shrekek.jpg'} alt="Promotion" className="promotion-image"/>
            <h3 className="promotion-title">Limited Time Deal!</h3>
            <p className="promotion-text">Buy one get one free!</p>
        </div>
    );
}

export default TextSection;
