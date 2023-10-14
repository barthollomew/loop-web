import React from 'react';
import WelcomeSection from './WelcomeSection/WelcomeSection';
import CarouselSection from './CarouselSection/CarouselSection';
import TextSection from './TextSection/TextSection';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <WelcomeSection />
      <CarouselSection />
      <TextSection />
    </div>
  );
}

export default LandingPage;
