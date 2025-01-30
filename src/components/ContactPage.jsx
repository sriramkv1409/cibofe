import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    type: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'info', message: 'Sending message...' });

    try {
      // Here you can add your email service integration
      // For now, we'll just log the data
      console.log('Form submitted:', formData);
      
      // Simulate success
      setStatus({
        type: 'success',
        message: 'Message sent successfully! We will get back to you soon.'
      });
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.'
      });
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Have questions or suggestions? We'd love to hear from you!
        </motion.p>
      </div>

      <motion.div 
        className="contact-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>Fill out the form and we'll get back to you as soon as possible.</p>
            <div className="contact-details">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>Email: sriramkv1409@gmail.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-clock"></i>
                <span>Response Time: Within 24 hours</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            {status.message && (
              <div className={`status-message ${status.type}`}>
                {status.message}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Type your message here..."
                rows="5"
              />
            </div>

            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
