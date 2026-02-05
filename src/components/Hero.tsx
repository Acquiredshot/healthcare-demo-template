import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="hero" className="hero">
      <Helmet>
        <title>Home | Healthcare Demo Template - Disability Care Services</title>
        <meta name="description" content="Providing compassionate care, support, and inclusion for individuals with disabilities. In-home care, community activities, and more." />
      </Helmet>
      <div className="hero-content">
        <h2>Providing <span className="highlight">Compassionate Care</span></h2>
        <h3>for Individuals with Disabilities</h3>
        <p className="hero-text">
          We are dedicated to offering support that empowers individuals and enriches lives.
        </p>
        <button className="cta-button" onClick={() => navigate('/contact')}>
          Get in Touch
        </button>
      </div>
      <div className="hero-image">
        <div style={{
          width: '100%',
          height: '400px',
          backgroundColor: '#e6f3ff',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#5DA9DD',
          border: '2px dashed #5DA9DD'
        }}>
          <div style={{fontSize: '5rem', marginBottom: '1rem'}}>💙</div>
          <div style={{fontWeight: 'bold', fontSize: '1.2rem'}}>Compassionate Care</div>
          <div style={{color: '#888', fontSize: '0.9rem', marginTop: '0.5rem'}}>Image Placeholder</div>
        </div>
      </div>
    </section>
  );
};
