import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    '/images/food1.jpg',
    '/images/food2.jpg',
    '/images/food3.jpg',
    '/images/food4.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="home-container">
      <div className="home-content-wrapper">
        <div className="home-left-section">
          <div className="home-image-slider">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              alt="Food"
            />
          </div>
        </div>

        <div className="home-right-section">
          <h1 className="home-main-title">
            "No more recipe
            <br />
            confusion.
            <br />
            Just what you can make
            <br />
            with what you've got!"
          </h1>

          <p className="home-experience-text">For better experience</p>

          <div className="home-auth-buttons">
            <button onClick={() => navigate('/login')} className="home-auth-btn">Login</button>
            <span className="home-or-text">(or)</span>
            <button onClick={() => navigate('/signup')} className="home-auth-btn">Sign up</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
