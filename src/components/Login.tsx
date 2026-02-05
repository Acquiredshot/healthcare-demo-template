import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Lock } from 'lucide-react';

export const Login = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123' || password.length > 0) { // Simple mock auth
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/portal');
    }
  };

  return (
    <section className="login-section section-padding">
      <Helmet>
        <title>Client Portal Login | Healthcare Demo Template</title>
      </Helmet>
      
      <div className="login-container card" style={{maxWidth: '400px', margin: '4rem auto', padding: '2rem', textAlign: 'center'}}>
        <div style={{marginBottom: '2rem'}}>
          <div style={{background: '#e3f2fd', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem'}}>
            <Lock size={30} color="#5DA9DD" />
          </div>
          <h2>Secure Portal</h2>
          <p style={{color: '#666'}}>Please enter your access code</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Access Key"
              required
              style={{textAlign: 'center', letterSpacing: '4px'}}
            />
          </div>
          <button type="submit" className="primary-btn submit-button">
            Access Portal
          </button>
        </form>
      </div>
    </section>
  );
};
