import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../utils/api';
import './LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      const response = await authApi.post('/login', formData);
      console.log('Login response:', response.data);
      const { token } = response.data;
      
      // Store the token in localStorage
      localStorage.setItem('token', token);
      
      // Show success message
      setSuccess('Login successful! Redirecting to Recipe Search...');
      
      // Redirect to recipe search page after a short delay
      setTimeout(() => {
        navigate('/recipe-search');
      }, 1500);
    } catch (err) {
      console.error('Login error:', err.response?.data);
      setError(
        err.response?.data?.message || 
        err.response?.data?.errors?.[0]?.msg || 
        'Error logging in'
      );
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-content-wrapper">
        <div className="auth-left-section">
          <div className="auth-image-container">
            <img src="/images/food1.jpg" alt="Food" />
          </div>
        </div>

        <div className="auth-right-section">
          <div className="auth-form-container">
            <h2>Enter your credentials</h2>
            {error && <div className="auth-message auth-error-message">{error}</div>}
            {success && <div className="auth-message auth-success-message">{success}</div>}
            <form onSubmit={handleSubmit}>
              <div className="auth-form-group">
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
              <div className="auth-form-group">
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
              <button type="submit" className="auth-submit-btn">Login</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
