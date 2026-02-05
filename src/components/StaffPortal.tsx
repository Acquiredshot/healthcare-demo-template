import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LogOut, ClipboardList, Lock, User, CheckCircle, AlertCircle, Mail } from 'lucide-react';
import { secureStorage } from '../utils/secureStorage';

export const StaffPortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('care-logs');
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Inbox State
  const [inboxMessages, setInboxMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Care Log Form State
  const [logForm, setLogForm] = useState({
    caregiver: '',
    time: '',
    type: 'Routine',
    message: ''
  });

  // Check Auth & Load Settings
  useEffect(() => {
    const auth = localStorage.getItem('isStaffAuthenticated');
    if (!auth) {
      navigate('/staff-login');
      return;
    }

    setLogForm(prev => ({ ...prev, caregiver: 'Sarah J.' }));

    // Load Inbox Messages (Simulated)
    loadInbox();
  }, [navigate]);

  const loadInbox = () => {
    setIsLoading(true);
    // In a real app, this would be fetching from a secure backend
    // Here we read the shared secure notes key
    const notes = secureStorage.getItem('private_family_notes');
    if (notes && Array.isArray(notes)) {
      setInboxMessages(notes);
    }
    setIsLoading(false);
  };

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
  };

  // --- Handlers ---

  const handleLogout = () => {
    localStorage.removeItem('isStaffAuthenticated');
    navigate('/staff-login');
  };

  const handleSubmitLog = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newLog = {
      id: Date.now(),
      date: 'Today', 
      time: logForm.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      caregiver: logForm.caregiver,
      message: logForm.message,
      type: logForm.type
    };

    const existingLogsJson = localStorage.getItem('daily_care_logs');
    const existingLogs = existingLogsJson ? JSON.parse(existingLogsJson) : [];
    const updatedLogs = [newLog, ...existingLogs];
    localStorage.setItem('daily_care_logs', JSON.stringify(updatedLogs));
    
    showStatus('success', 'Care log posted to Family Portal successfully.');
    setLogForm(prev => ({ ...prev, message: '', time: '' }));
  };

  const clearInbox = () => {
    if (window.confirm('Are you sure you want to archive all messages?')) {
      secureStorage.setItem('private_family_notes', []);
      setInboxMessages([]);
      showStatus('success', 'Inbox cleared.');
    }
  };

  return (
    <section className="portal-section" style={{backgroundColor: '#1a202c', minHeight: '100vh', color: 'white'}}>
      <Helmet>
        <title>Staff Admin Panel | Healthcare Demo Template</title>
      </Helmet>

      {/* Header */}
      <div style={{background: '#2d3748', padding: '1rem 2rem', borderBottom: '1px solid #4a5568', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <div style={{background: '#ed8936', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 'bold'}}>STAFF ADMIN</div>
          <span style={{color: '#cbd5e0'}}>Logged in as: Sarah J. (Caregiver)</span>
        </div>
        <button onClick={handleLogout} style={{background: 'none', border: '1px solid #718096', padding: '0.5rem 1rem', borderRadius: '4px', color: '#cbd5e0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      <div style={{display: 'flex', maxWidth: '1200px', margin: '2rem auto', gap: '2rem', padding: '0 1rem'}}>
        
        {/* Sidebar */}
        <div style={{width: '250px'}}>
          <button 
            onClick={() => setActiveTab('care-logs')}
            style={{
              width: '100%', 
              padding: '1rem', 
              textAlign: 'left', 
              background: activeTab === 'care-logs' ? '#2b6cb0' : '#2d3748',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              marginBottom: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem'
            }}
          >
            <ClipboardList size={18} /> Update Care Logs
          </button>

          <button 
            onClick={() => setActiveTab('inbox')}
            style={{
              width: '100%', 
              padding: '1rem', 
              textAlign: 'left', 
              background: activeTab === 'inbox' ? '#2b6cb0' : '#2d3748',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              marginBottom: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              position: 'relative'
            }}
          >
            <Mail size={18} /> 
            Secure Inbox
            {inboxMessages.length > 0 && (
              <span style={{background: '#e53e3e', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '0.7rem', position: 'absolute', right: '10px'}}>
                {inboxMessages.length}
              </span>
            )}
          </button>
        </div>

        {/* Content Area */}
        <div style={{flex: 1, background: '#2d3748', padding: '2rem', borderRadius: '8px'}}>
          
          {statusMessage.text && (
            <div style={{
              padding: '1rem', 
              marginBottom: '2rem', 
              borderRadius: '6px', 
              background: statusMessage.type === 'success' ? '#c6f6d5' : '#fed7d7',
              color: statusMessage.type === 'success' ? '#2f855a' : '#c53030',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {statusMessage.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              {statusMessage.text}
            </div>
          )}

          {activeTab === 'care-logs' && (
            <div>
              <h2 style={{marginTop: 0, marginBottom: '0.5rem'}}>Daily Care Log Input</h2>
              <p style={{color: '#a0aec0', marginBottom: '2rem'}}>Entries here will be instantly visible in the Client Portal.</p>
              
              <form onSubmit={handleSubmitLog} style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px'}}>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  <div>
                    <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#cbd5e0'}}>Caregiver Name</label>
                    <input 
                      type="text" 
                      value={logForm.caregiver}
                      onChange={e => setLogForm({...logForm, caregiver: e.target.value})}
                      style={{width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #4a5568', background: '#1a202c', color: 'white'}}
                    />
                  </div>
                  <div>
                    <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#cbd5e0'}}>Time</label>
                    <input 
                      type="time" 
                      value={logForm.time}
                      onChange={e => setLogForm({...logForm, time: e.target.value})}
                      style={{width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #4a5568', background: '#1a202c', color: 'white'}} 
                    />
                  </div>
                </div>

                <div>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#cbd5e0'}}>Log Type</label>
                  <select 
                    value={logForm.type}
                    onChange={e => setLogForm({...logForm, type: e.target.value})}
                    style={{width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #4a5568', background: '#1a202c', color: 'white'}}
                  >
                    <option value="Routine">Routine Care</option>
                    <option value="Medical">Medical / Medication</option>
                    <option value="Transport">Transportation</option>
                    <option value="Dietary">Dietary / Meal</option>
                    <option value="Activity">Activity / Social</option>
                  </select>
                </div>

                <div>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#cbd5e0'}}>Care Details</label>
                  <textarea 
                    value={logForm.message}
                    onChange={e => setLogForm({...logForm, message: e.target.value})}
                    required
                    placeholder="Describe the care provided..."
                    style={{width: '100%', minHeight: '120px', padding: '0.8rem', borderRadius: '4px', border: '1px solid #4a5568', background: '#1a202c', color: 'white'}}
                  ></textarea>
                </div>

                <button type="submit" className="primary-btn" style={{padding: '1rem', cursor: 'pointer', background: '#5DA9DD', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '1rem'}}>
                  Post to Client Portal
                </button>
              </form>
            </div>
          )}

          {activeTab === 'inbox' && (
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
                <div>
                  <h2 style={{marginTop: 0, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <Lock size={24} color="#ed8936" />
                    Encrypted Family Messages
                  </h2>
                  <p style={{color: '#a0aec0', margin: 0}}>
                    Read secure messages sent by clients. Decryption happens locally.
                  </p>
                </div>
                {inboxMessages.length > 0 && (
                  <button onClick={clearInbox} style={{background: '#e53e3e', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer'}}>
                    Archive All
                  </button>
                )}
              </div>

              {isLoading ? (
                <p>Loading encrypted messages...</p>
              ) : inboxMessages.length === 0 ? (
                <div style={{textAlign: 'center', padding: '3rem', background: '#1a202c', borderRadius: '8px', border: '2px dashed #4a5568'}}>
                  <Mail size={48} color="#4a5568" />
                  <p style={{color: '#a0aec0', marginTop: '1rem'}}>No new secure messages.</p>
                </div>
              ) : (
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                  {inboxMessages.map((msg, idx) => (
                    <div key={idx} style={{background: '#1a202c', padding: '1.5rem', borderRadius: '6px', border: '1px solid #4a5568'}}>
                       <div style={{display: 'flex', gap: '1rem', alignItems: 'flex-start'}}>
                         <div style={{background: '#4a5568', padding: '0.5rem', borderRadius: '50%'}}>
                           <Lock size={16} color="#cbd5e0" />
                         </div>
                         <div>
                           <div style={{fontSize: '0.8rem', color: '#718096', marginBottom: '0.5rem'}}>MESSAGE #{inboxMessages.length - idx}</div>
                           <p style={{margin: 0, lineHeight: 1.5}}>{msg}</p>
                         </div>
                       </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
