import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">

      {/* Section 1: Introduction */}
      <div className="intro-section flex justify-between items-center py-10">
        <div className="text-section">
          <h1 className="font-bold text-3xl mb-4">Welcome to Loop Web!</h1>
          <p className="text-xl">Experience unforgettable movie magic!</p>
        </div>
        <div className="logo-section flex flex-col items-center">
          <img src="logo.svg" alt="Logo" className="mb-4" />
          <button className="btn-view-movies bg-blue-500 text-white px-4 py-2 rounded-md">
            View Movies
          </button>
        </div>
      </div>

      {/* Section 2: Carousel */}
      <div className="carousel-section flex justify-between items-center py-10">
        <div className="movie-card rounded-lg mr-4">
          <img src="movie1.png" alt="Movie 1" className="rounded-lg" />
          <p className="mt-2">12:30 PM, Central Cinema</p>
        </div>
        <div className="movie-card rounded-lg">
          <img src="movie1.png" alt="Movie 2" className="rounded-lg" />
          <p className="mt-2">3:30 PM, Downtown Theater</p>
        </div>
      </div>

      {/* Section 3: Promotion */}
      <div className="promo-section flex justify-center items-center py-10 bg-yellow-300">
        <h2 className="text-2xl font-bold">Buy one get one free</h2>
      </div>

    </div>
  );
};

export default LandingPage;
