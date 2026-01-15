import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you shortly.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="contact-section">
      <Helmet>
        <title>Contact Us | Do It Right By You</title>
        <meta name="description" content="Contact Do It Right By You for compassionate disability care services. Call us at 609-947-9520." />
      </Helmet>
      <h2 className="section-title">Contact Us</h2>
      
      <div className="contact-container">
        <div className="contact-info">
          <div className="info-item phone">
            <span className="label">Call Us</span>
            <a href="tel:6099479520" className="value">609-947-9520</a>
          </div>
          <div className="info-item email">
            <span className="label">Email Us</span>
            <a href="mailto:doitrightbyyou.provider@gmail.com" className="value">doitrightbyyou.provider@gmail.com</a>
          </div>
          <div className="info-item social">
            <span className="label">Follow Us</span>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#5DA9DD' }}>
                <Facebook size={28} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#E1306C' }}>
                <Instagram size={28} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#1DA1F2' }}>
                <Twitter size={28} />
              </a>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Send us a Message</h3>
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
            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              name="message" 
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required 
            ></textarea>
          </div>
          <div className="security-notice">
            <small>🔒 Your information is secure. We respect your privacy and confidentiality.</small>
          </div>
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </div>
    </section>
  );
};
