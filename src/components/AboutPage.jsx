import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './AboutPage.css';

const AboutPage = () => {
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
    <main className="about-container">
      <div className="content-wrapper">
        <div className="left-section">
          <div className="image-slider">
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

        <div className="right-section">
          <div className="about-content">
            <motion.h1 
              className="about-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About CiboFind
            </motion.h1>
            
            <motion.div 
              className="about-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p>
                Welcome to CiboFind, your ultimate companion in the kitchen! Our name, derived from the Italian word "Cibo" meaning food, 
                reflects our passion for culinary exploration and discovery.
              </p>
              
              <p>
                Born from the idea that cooking should be accessible and enjoyable for everyone, CiboFind transforms your available 
                ingredients into delicious possibilities. Whether you're a seasoned chef or a cooking novice, our platform helps you 
                discover recipes that match your pantry's contents.
              </p>

              <p>
                Our innovative recipe search engine uses advanced algorithms to analyze your ingredients and suggest perfect matches 
                from our extensive database. Each recipe comes with detailed instructions and helpful video tutorials, making your 
                cooking journey both educational and enjoyable.
              </p>

              <p>
                At CiboFind, we believe that great meals don't always require a trip to the grocery store. Sometimes, the best dishes 
                come from creatively using what you already have. Our platform encourages sustainable cooking by helping you minimize 
                food waste and make the most of your ingredients.
              </p>
            </motion.div>

            <motion.div 
              className="features-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <h2>Key Features</h2>
              <ul>
                <li>Smart ingredient-based recipe search</li>
                <li>Video tutorials for visual learning</li>
                <li>User-friendly interface</li>
                <li>Extensive recipe database</li>
                <li>Waste reduction focus</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
