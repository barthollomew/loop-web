import React from 'react';
import './WelcomeSection.css';

const WelcomeSection = () => {
    return (
        <div className="carousel-container">
            <img src="/images/interstellar.jpg" alt="Movie Background" className="carousel-image"/> 
            <div className="carousel-content">
                <h1 className="movie-title">Interstellar</h1>
                <button className="book-now-button">Book Now</button>
            </div>
        </div>
    );
}

export default WelcomeSection;
