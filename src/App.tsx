import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Resources } from './components/Resources';
import { Contact } from './components/Contact';
import { Booking } from './components/Booking';
import { Login } from './components/Login';
import { StaffLogin } from './components/StaffLogin';
import { Portal } from './components/Portal';
import { StaffPortal } from './components/StaffPortal';
import { VideoTestimonials } from './components/VideoTestimonials';
import { DiscoveryQuiz } from './components/DiscoveryQuiz';
import { CaregiverGallery } from './components/CaregiverGallery';
import { AccessibilityWidget } from './components/AccessibilityWidget';
import { Intake } from './components/Intake';
import { Chatbot } from './components/Chatbot';
import { LocalSEO } from './components/LocalSEO';
import { SecurityHeaders } from './components/SecurityHeaders';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <SecurityHeaders />
        <LocalSEO />
        <AccessibilityWidget />
        <Chatbot />
        <div className="app-container">
          <Navbar />
          <header className="header-brand">
            <h1>Healthcare Demo Template</h1>
            <p className="tagline">CARE · SUPPORT · INCLUSION.</p>
          </header>
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <VideoTestimonials />
                </>
              } />
              <Route path="/services" element={<Services />} />
              <Route path="/team" element={<CaregiverGallery />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/staff-login" element={<StaffLogin />} />
              <Route path="/portal" element={<Portal />} />
              <Route path="/staff-portal" element={<StaffPortal />} />
              <Route path="/quiz" element={<DiscoveryQuiz />} />
              <Route path="/intake" element={<Intake />} />
            </Routes>
          </main>
          <footer className="footer">
            <div className="social-links" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#aaa', transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color = '#5DA9DD'} onMouseOut={(e) => e.currentTarget.style.color = '#aaa'}>
                <Facebook size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#aaa', transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color = '#E1306C'} onMouseOut={(e) => e.currentTarget.style.color = '#aaa'}>
                <Instagram size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#aaa', transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color = '#1DA1F2'} onMouseOut={(e) => e.currentTarget.style.color = '#aaa'}>
                <Twitter size={24} />
              </a>
            </div>
            
            {/* NAP for Local SEO */}
            <div className="footer-address" style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#666', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <strong>Healthcare Demo Template</strong><br />
              123 Healthcare Way<br />
              Cityville, State 00000<br />
              <a href="tel:+15551234567" style={{ color: '#5DA9DD', textDecoration: 'none' }}>555-123-4567</a> | <a href="mailto:demo@healthcare-template.com" style={{ color: '#5DA9DD', textDecoration: 'none' }}>demo@healthcare-template.com</a>
            </div>

            <p>&copy; {new Date().getFullYear()} Healthcare Demo Template. All rights reserved.</p>
            
            {/* Security Badge */}
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: 0.7 }}>
              <span style={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                🔒 256-bit SSL Secured
              </span>
              <span style={{ fontSize: '0.8rem', border: '1px solid #ccc', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                🛡️ HIPAA Compliant
              </span>
            </div>
          </footer>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;

