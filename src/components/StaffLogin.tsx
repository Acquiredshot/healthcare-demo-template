import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Lock, UserCheck } from 'lucide-react';

export const StaffLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock validation
    // Allow any email for demo purposes or a specific demo domain
    const isValidEmail = formData.email.includes('@'); 
    
    if ((isValidEmail) || formData.password === 'admin123') {
      localStorage.setItem('isStaffAuthenticated', 'true');
      navigate('/staff-portal');
    } else {
      setError('Invalid staff credentials. access denied.');
    }
  };

  return (
    <section style={{minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a202c'}}>
      <Helmet>
        <title>Staff Login | Healthcare Demo Template</title>
      </Helmet>
      
      <div style={{background: '#2d3748', padding: '3rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', border: '1px solid #4a5568'}}>
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <div style={{background: '#ed8936', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem'}}>
            <UserCheck size={32} color="white" />
          </div>
          <h2 style={{color: 'white', marginTop: 0}}>Staff Access</h2>
          <p style={{color: '#a0aec0'}}>Secure Admin Panel</p>
        </div>

        {error && (
          <div style={{background: '#fed7d7', color: '#c53030', padding: '0.8rem', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center'}}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: '1.5rem'}}>
            <label style={{display: 'block', marginBottom: '0.5rem', color: '#cbd5e0'}}>Staff Email</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={{width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #4a5568', background: '#1a202c', color: 'white'}}
              placeholder="admin@healthcare-demo.com"
            />
          </div>

          <div style={{marginBottom: '2rem'}}>
            <label style={{display: 'block', marginBottom: '0.5rem', color: '#cbd5e0'}}>Password</label>
            <input 
              type="password" 
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              style={{width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #4a5568', background: '#1a202c', color: 'white'}}
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            style={{
              width: '100%', 
              padding: '1rem', 
              background: '#ed8936', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <Lock size={18} /> Authenticate
          </button>
        </form>
        
        <div style={{marginTop: '1.5rem', textAlign: 'center'}}>
           <a href="/login" style={{color: '#63b3ed', fontSize: '0.9rem'}}>Switch to Family Portal Login</a>
        </div>
      </div>
    </section>
  );
};
