import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, FileText, Lock, AlertCircle, CheckSquare, Printer } from 'lucide-react';

export const Intake = () => {
  const [hasConsented, setHasConsented] = useState(false);

  return (
    <section className="intake-section" style={{ padding: '4rem 2rem', background: '#f8fbff', minHeight: '80vh' }}>
      <Helmet>
        <title>Secure Client Intake | Healthcare Demo Template</title>
        <meta name="description" content="Secure, HIPAA-compliant digital onboarding for new clients." />
      </Helmet>

      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header with Security Badges */}
        <div className="intake-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ background: '#e8f5e9', color: '#2e7d32', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={16} /> HIPAA Compliant
            </span>
            <span style={{ background: '#e3f2fd', color: '#1565c0', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lock size={16} /> 256-bit SSL Encrypted
            </span>
          </div>
          <h2 style={{ color: '#333', fontSize: '2.5rem', marginBottom: '1rem' }}>New Client Onboarding</h2>
          <p style={{ color: '#666', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Welcome to Healthcare Demo Template. To begin services, please complete the following secure intake forms. 
            All data is encrypted and protected in accordance with federal healthcare regulations.
          </p>
        </div>

        {/* Step 1: ESIGN Consent (Regulatory Requirement) */}
        <div className="esign-consent-card" style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #e1eeff', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
          <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#333' }}>
            <FileText size={24} color="#5DA9DD" /> 
            Electronic Signature Consent
          </h3>
          <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.95rem' }}>
            By checking the box below, you agree to conduct this transaction electronically. You acknowledge that your digital signature 
            carries the same legal weight as a wet ink signature under the federal ESIGN Act and UETA.
          </p>
          
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #5DA9DD', margin: '1.5rem 0' }}>
            <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#444' }}>Right to Opt-Out:</strong>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>
              If you prefer paper forms, you have the right to decline this digital process. 
              Please contact us at <strong>555-123-4567</strong> to have a physical packet mailed to you.
            </p>
          </div>

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', cursor: 'pointer', padding: '1rem', border: '2px solid #e1e4e8', borderRadius: '8px', transition: 'all 0.2s', backgroundColor: hasConsented ? '#f0f9ff' : 'white', borderColor: hasConsented ? '#5DA9DD' : '#e1e4e8' }}>
            <input 
              type="checkbox" 
              checked={hasConsented} 
              onChange={(e) => setHasConsented(e.target.checked)}
              style={{ width: '24px', height: '24px', marginTop: '2px', cursor: 'pointer' }}
            />
            <div>
              <span style={{ fontWeight: 'bold', display: 'block', color: '#333' }}>I Agree to Electronic Business & Signatures</span>
              <span style={{ fontSize: '0.9rem', color: '#666' }}>I have read the disclosure above and consent to sign documents digitally.</span>
            </div>
          </label>
        </div>

        {/* Step 2: The Form (Simulated Embedding) */}
        {hasConsented ? (
          <div className="secure-form-container" style={{ animation: 'fadeIn 0.5s' }}>
            <div style={{ background: 'white', border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden' }}>
              {/* Fake Provider Header to simulate JotForm/PandaDoc */}
              <div style={{ background: '#f5f5f5', padding: '0.8rem 1.5rem', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#666' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Lock size={12} /> Secure Form Provider (PandaDoc/JotForm)</span>
                <span>Session ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
              
              {/* Interactive Mock Form */}
              <div style={{ padding: '3rem', textAlign: 'center' }}>
                <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png" 
                    alt="Secure Form" 
                    style={{ width: '80px', marginBottom: '1.5rem', opacity: 0.8 }} 
                  />
                  <h3 style={{ marginBottom: '1rem' }}>Secure Intake Packet Ready</h3>
                  <p style={{ color: '#666', marginBottom: '2rem' }}>
                    This form includes <strong>Insurance Card Upload</strong>, Medical History, and Service Agreements. 
                    Please note: <strong>DNRs and POAs</strong> are excluded and require physical signatures.
                  </p>
                  
                  <button className="primary-btn" style={{ fontSize: '1.1rem', padding: '1rem 2rem', borderRadius: '6px', border: 'none', color: 'white', cursor: 'pointer' }}>
                    Launch Secure Form &rarr;
                  </button>
                  
                  <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: '#999' }}>
                    Audit Log Active • IP Address Logged • Tamper-Evident Seal
                  </p>
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: '1rem', textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
              <CheckSquare size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
              A certified copy of signed documents will be emailed to you securely upon completion.
            </div>
          </div>
        ) : (
          /* Locked State */
          <div style={{ textAlign: 'center', padding: '3rem', background: '#f0f0f0', borderRadius: '12px', color: '#888' }}>
            <Lock size={40} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h3>Form Locked</h3>
            <p>Please agree to the Electronic Signature Consent above to unlock the intake packet.</p>
          </div>
        )}

        {/* Paper Option Footer */}
        <div style={{ marginTop: '4rem', borderTop: '1px solid #e1e4e8', paddingTop: '2rem', textAlign: 'center' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#555' }}>
            <Printer size={18} /> Need a Physical Copy?
          </h4>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            We are happy to provide paper forms. You can download and print the packet <a href="#" style={{ color: '#5DA9DD' }}>here</a>, 
            or visit our office to sign in person with a wet-ink signature.
          </p>
        </div>

      </div>
    </section>
  );
};
