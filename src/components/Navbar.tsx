import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">Do It Right By You</div>
      <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')} onClick={() => setIsOpen(false)}>Home</NavLink>
        <NavLink to="/services" className={({ isActive }) => (isActive ? 'active-link' : '')} onClick={() => setIsOpen(false)}>Services</NavLink>
        <NavLink to="/team" className={({ isActive }) => (isActive ? 'active-link' : '')} onClick={() => setIsOpen(false)}>Our Team</NavLink>
        <NavLink to="/booking" className={({ isActive }) => (isActive ? 'active-link' : '')} onClick={() => setIsOpen(false)}>Book Online</NavLink>
        <NavLink to="/resources" className={({ isActive }) => (isActive ? 'active-link' : '')} onClick={() => setIsOpen(false)}>Resources</NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active-link' : '')} onClick={() => setIsOpen(false)}>Contact</NavLink>
        <NavLink to="/intake" className={({ isActive }) => (isActive ? 'active-link' : '')} onClick={() => setIsOpen(false)} style={{ color: '#5DA9DD', fontWeight: 'bold' }}>New Clients</NavLink>
        <NavLink to="/quiz" className="quiz-btn" style={{ background: '#FFD700', color: '#333', padding: '0.5rem 1rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }} onClick={() => setIsOpen(false)}>Start Discovery Quiz</NavLink>
        <div style={{borderLeft: '1px solid #ddd', paddingLeft: '1rem', display: 'flex', gap: '1rem'}}>
          <NavLink to="/login" className={({ isActive }) => (isActive ? 'active-link' : '')} onClick={() => setIsOpen(false)}>Family Portal</NavLink>
          <NavLink to="/staff-login" className={({ isActive }) => (isActive ? 'active-link' : '')} onClick={() => setIsOpen(false)} style={{color: '#ed8936'}}>Staff Admin</NavLink>
        </div>
      </div>
    </nav>
  );
};
