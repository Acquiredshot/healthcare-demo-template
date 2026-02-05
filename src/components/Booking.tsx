import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Calendar, Clock, User, FileText, Lock } from 'lucide-react';

export const Booking = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    serviceType: 'consultation',
    date: '',
    time: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a HIPAA-compliant backend
    alert('Appointment request received securely! We will confirm via phone shortly.');
    setFormData({
      patientName: '',
      email: '',
      phone: '',
      serviceType: 'consultation',
      date: '',
      time: '',
      notes: ''
    });
    setStep(1);
  };

  return (
    <section className="booking-section section-padding">
      <Helmet>
        <title>Secure Booking | Healthcare Demo Template</title>
        <meta name="description" content="Schedule a consultation or service securely. HIPAA compliant appointment booking." />
      </Helmet>
      
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Schedule an Appointment</h2>
          <p className="section-subtitle">Secure, Confidential, and Compassionate Care Scheduling</p>
        </div>

        <div className="booking-container card">
          <div className="hipaa-badge">
            <ShieldCheck size={20} color="#2e7d32" />
            <span>HIPAA Compliant & Secure Form</span>
          </div>

          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Personal Info */}
              <div className="form-group">
                <label htmlFor="patientName"><User size={16} /> Patient Name</label>
                <input 
                  type="text" 
                  id="patientName" 
                  name="patientName" 
                  value={formData.patientName}
                  onChange={handleChange}
                  required 
                  placeholder="Full Legal Name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  placeholder="name@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  required 
                  placeholder="(555) 555-5555"
                />
              </div>

              {/* Appointment Details */}
              <div className="form-group">
                <label htmlFor="serviceType"><FileText size={16} /> Service Requested</label>
                <select 
                  id="serviceType" 
                  name="serviceType" 
                  value={formData.serviceType}
                  onChange={handleChange}
                >
                  <option value="consultation">Initial Consultation</option>
                  <option value="home-care">In-Home Care Assessment</option>
                  <option value="community">Community Support</option>
                  <option value="respite">Respite Care</option>
                  <option value="transport">Transportation Services</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="date"><Calendar size={16} /> Preferred Date</label>
                <input 
                  type="date" 
                  id="date" 
                  name="date" 
                  value={formData.date}
                  onChange={handleChange}
                  required 
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="time"><Clock size={16} /> Preferred Time</label>
                <select 
                  id="time" 
                  name="time" 
                  value={formData.time}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a time...</option>
                  <option value="morning">Morning (9AM - 12PM)</option>
                  <option value="afternoon">Afternoon (12PM - 4PM)</option>
                  <option value="evening">Evening (4PM - 7PM)</option>
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="notes"><Lock size={16} /> Secure Notes (Optional)</label>
              <textarea 
                id="notes" 
                name="notes" 
                rows={4} 
                value={formData.notes}
                onChange={handleChange}
                placeholder="Please share any specific needs or concerns. This field is encrypted."
              ></textarea>
            </div>

            <div className="form-footer">
              <div className="encryption-notice">
                <Lock size={14} />
                <small>256-bit SSL Encryption. Your data is protected directly to our secure server.</small>
              </div>
              <button type="submit" className="submit-button primary-btn">
                Request Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
