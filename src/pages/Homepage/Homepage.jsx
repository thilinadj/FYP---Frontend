import Navbar from '../NavBar/Navbar';
import HeroSection from '../HeroSection/Herosection';
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <HeroSection />
      </div>
    </div>
  );
}

export default HomePage;
