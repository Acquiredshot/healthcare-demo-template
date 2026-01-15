import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="hero" className="hero">
      <Helmet>
        <title>Home | Do It Right By You - Disability Care Services</title>
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
        <img 
          src="/flyer.jpg" 
          alt="Compassionate Care - Do It Right By You" 
          className="hero-flyer-image" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.innerHTML = '<div class="image-placeholder"><span>Please add flyer.jpg to public folder</span></div>';
          }}
        />
      </div>
    </section>
  );
};
