import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../utils/api';
import './LoginForm.css';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const response = await authApi.post('/signup', formData);
      console.log('Signup response:', response.data);
      
      // Show success message
      setSuccess('Account created successfully! Redirecting to login...');
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      console.error('Signup error:', err.response?.data);
      setError(
        err.response?.data?.message || 
        err.response?.data?.errors?.[0]?.msg || 
        'Error signing up'
      );
    }
  };

  return (
    <main className="home-container">
      <div className="content-wrapper">
        <div className="left-section">
          <div className="image-slider">
            <img src="/images/food1.jpg" alt="Food" />
          </div>
        </div>

        <div className="right-section">
          <div className="form-container">
            <h2>Hello new users, please create a account for yourself</h2>
            {error && <div className="message error-message">{error}</div>}
            {success && <div className="message success-message">{success}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
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
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignupForm;
