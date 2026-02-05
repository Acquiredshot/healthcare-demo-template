import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LogOut, Star, Send, FileText, Upload, Download, User, ClipboardList, Clock, Crown, Lock } from 'lucide-react';
import { secureStorage } from '../utils/secureStorage';

export const Portal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('care-logs');

  // Review Generator State
  const [reviewForm, setReviewForm] = useState({ name: '', email: '' });
  const [reviewStatus, setReviewStatus] = useState('');

  // Encryption Demo State
  const [privateNote, setPrivateNote] = useState('');
  const [savedNotes, setSavedNotes] = useState<string[]>([]);

  useEffect(() => {
    // Load encrypted notes on mount
    const loaded = secureStorage.getItem('private_family_notes');
    if (loaded && Array.isArray(loaded)) {
      setSavedNotes(loaded);
    }
  }, []);

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privateNote.trim()) return;
    
    const newNotes = [privateNote, ...savedNotes];
    setSavedNotes(newNotes);
    // ENCRYPTION HAPPENS HERE
    secureStorage.setItem('private_family_notes', newNotes);
    setPrivateNote('');
  };

  // Care Logs State
  const [logs, setLogs] = useState([
    { 
      id: 1, 
      date: 'Today', 
      time: '2:30 PM', 
      caregiver: 'Sarah J.', 
      message: 'Mom had a great lunch (grilled chicken salad) and took her walk around the park. Mood is very positive today! ☀️',
      type: 'Routine'
    },
    { 
      id: 2, 
      date: 'Yesterday', 
      time: '9:15 AM', 
      caregiver: 'David M.', 
      message: 'Morning medication administered on schedule. Assisted with light housekeeping.',
      type: 'Medical'
    },
    { 
      id: 3, 
      date: 'Oct 24', 
      time: '4:00 PM', 
      caregiver: 'Sarah J.', 
      message: 'Transported to Dr. Smith appointment. Everything went well, next appointment scheduled for Nov 20.',
      type: 'Transport'
    }
  ]);

  useEffect(() => {
    // Poll for new logs from Staff Portal
    const checkLogs = () => {
      const storedLogs = localStorage.getItem('daily_care_logs');
      if (storedLogs) {
        try {
          const parsedLogs = JSON.parse(storedLogs);
          // Merge with initial mock data if needed, or just replace
           setLogs(prev => {
             // Avoid duplicates if we were mixing, but for this demo, let's just use the stored ones if they exist + mock ones as backup
             // But actually, we want to SHOW the mock ones initially, and ADD the new ones.
             // The StaffPortal simple ADDS to the array. 
             // We can just rely on the StaffPortal having initialized with empty array? 
             // Let's make StaffPortal initialize with these mocks if empty? No, easier to just display stored logs.
             // If storedLogs exist, use them. If not, use mock.
             return parsedLogs.length > 0 ? parsedLogs : prev;
           });
        } catch (e) {
          console.error("Failed to parse logs");
        }
      }
    };
    
    checkLogs();
    // In a real app we'd use sockets. For demo, we can just check on mount or interval.
    const interval = setInterval(checkLogs, 2000); 
    return () => clearInterval(interval);
  }, []);

  // File Sharing State
  const [files, setFiles] = useState([
    { id: 1, name: 'CMS-485_Plan_of_Care.pdf', date: '2023-10-15', size: '2.4 MB' },
    { id: 2, name: 'Intake_Forms_Signed.pdf', date: '2023-10-10', size: '1.1 MB' },
    { id: 3, name: 'Service_Agreement.docx', date: '2023-09-28', size: '0.8 MB' }
  ]);

  useEffect(() => {
    // Simple mock auth check
    const auth = localStorage.getItem('isAuthenticated');
    if (!auth) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const handleSendReview = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewStatus('sending');
    setTimeout(() => {
      setReviewStatus('sent');
      setReviewForm({ name: '', email: '' });
      setTimeout(() => setReviewStatus(''), 3000);
    }, 1500);
  };

  return (
    <section className="portal-section" style={{backgroundColor: '#f4f6f8', minHeight: '80vh'}}>
      <Helmet>
        <title>Provider Dashboard | Healthcare Demo Template</title>
      </Helmet>

      {/* Portal Header */}
      <div className="portal-header" style={{background: '#ffffff', padding: '1rem 2rem', borderBottom: '1px solid #e1e4e8', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <div style={{background: '#5DA9DD', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 'bold'}}>FAMILY PORTAL</div>
          <span style={{color: '#666'}}>Welcome, The Johnson Family</span>
        </div>
        <button onClick={handleLogout} style={{background: 'none', border: 'none', color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <LogOut size={18} /> Sign Out
        </button>
      </div>

      <div className="portal-layout" style={{display: 'flex', maxWidth: '1200px', margin: '2rem auto', gap: '2rem', padding: '0 1rem'}}>
        {/* Sidebar */}
        <div className="portal-sidebar" style={{width: '250px', background: 'white', borderRadius: '8px', padding: '1rem', height: 'fit-content'}}>
          <button 
            onClick={() => setActiveTab('care-logs')}
            style={{
              width: '100%', 
              padding: '1rem', 
              textAlign: 'left', 
              background: activeTab === 'care-logs' ? '#e6f3ff' : 'transparent',
              color: activeTab === 'care-logs' ? '#5DA9DD' : '#555',
              border: 'none',
              borderRadius: '6px',
              marginBottom: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              fontWeight: 500
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: '0.8rem', flex: 1}}>
              <ClipboardList size={18} /> Daily Care Logs
            </div>
            <Crown size={14} color="#FFD700" fill="#FFD700" />
          </button>
          
          <button 
            onClick={() => setActiveTab('files')}
            style={{
              width: '100%', 
              padding: '1rem', 
              textAlign: 'left', 
              background: activeTab === 'files' ? '#e6f3ff' : 'transparent',
              color: activeTab === 'files' ? '#5DA9DD' : '#555',
              border: 'none',
              borderRadius: '6px',
              marginBottom: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              fontWeight: 500
            }}
          >
            <FileText size={18} /> My Documents
          </button>

          <button 
            onClick={() => setActiveTab('encrypted-notes')}
            style={{
              width: '100%', 
              padding: '1rem', 
              textAlign: 'left', 
              background: activeTab === 'encrypted-notes' ? '#e6f3ff' : 'transparent',
              color: activeTab === 'encrypted-notes' ? '#5DA9DD' : '#555',
              border: 'none',
              borderRadius: '6px',
              marginBottom: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              fontWeight: 500
            }}
          >
            <Lock size={18} /> Encrypted Family Notes
          </button>

          <button 
            onClick={() => setActiveTab('feedback')}
            style={{
              width: '100%', 
              padding: '1rem', 
              textAlign: 'left', 
              background: activeTab === 'feedback' ? '#e6f3ff' : 'transparent',
              color: activeTab === 'feedback' ? '#5DA9DD' : '#555',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              fontWeight: 500
            }}
          >
            <Star size={18} /> Rate Caregiver
          </button>
        </div>

        {/* Main Content */}
        <div className="portal-content" style={{flex: 1}}>
          
          {/* Care Logs Module */}
          {activeTab === 'care-logs' && (
            <div className="card" style={{background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem'}}>
                <div>
                  <h2 style={{marginTop: 0, color: '#333', display: 'flex', alignItems: 'center', gap: '0.8rem'}}>
                    Real-Time Care Logs 
                  </h2>
                  <p style={{color: '#666', margin: 0}}>Updates on your loved one's care, directly from the caregiver.</p>
                </div>
                <button className="primary-btn" style={{padding: '0.6rem 1.2rem', borderRadius: '6px', border: 'none', color: 'white', fontSize: '0.9rem', cursor: 'pointer'}}>
                  View History
                </button>
              </div>

              <div className="logs-feed" style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
                {logs.map(log => (
                  <div key={log.id} style={{display: 'flex', gap: '1.5rem', borderLeft: '3px solid #e1e4e8', paddingLeft: '1.5rem', position: 'relative'}}>
                    {/* Time Dot */}
                    <div style={{
                      position: 'absolute', 
                      left: '-8.5px', 
                      top: '0', 
                      width: '14px', 
                      height: '14px', 
                      borderRadius: '50%', 
                      background: log.id === 1 ? '#5DA9DD' : '#ccc',
                      border: '2px solid white'
                    }}></div>

                    <div style={{minWidth: '100px'}}>
                      <div style={{fontWeight: 'bold', color: '#333', fontSize: '1.1rem'}}>{log.date}</div>
                      <div style={{color: '#888', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem'}}>
                        <Clock size={14} /> {log.time}
                      </div>
                    </div>

                    <div style={{flex: 1, background: '#f8fbff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #eef2f5'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem'}}>
                        <span style={{fontWeight: '600', color: '#5DA9DD'}}>{log.caregiver}</span>
                        <span style={{
                          fontSize: '0.75rem', 
                          padding: '0.2rem 0.6rem', 
                          borderRadius: '12px', 
                          background: log.type === 'Medical' ? '#ffebee' : log.type === 'Transport' ? '#fff3e0' : '#e8f5e9',
                          color: log.type === 'Medical' ? '#c62828' : log.type === 'Transport' ? '#ef6c00' : '#2e7d32'
                        }}>
                          {log.type}
                        </span>
                      </div>
                      <p style={{margin: 0, color: '#444', lineHeight: '1.5'}}>{log.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Encrypted Notes Module (New) */}
          {activeTab === 'encrypted-notes' && (
            <div className="card" style={{background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
              <h2 style={{marginTop: 0, color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <Lock size={24} color="#5DA9DD" />
                Secure Message to Care Team
              </h2>
              <p style={{color: '#666', marginBottom: '2rem'}}>
                Send an <strong>encrypted message</strong> directly to the administrative staff. 
                Your message is encrypted locally before sending and can only be decrypted by authorized staff.
              </p>
              
              <div style={{background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #e1e4e8'}}>
                <form onSubmit={handleSaveNote}>
                  <div className="form-group">
                    <label>Compose Secure Message:</label>
                    <textarea 
                      value={privateNote}
                      onChange={(e) => setPrivateNote(e.target.value)}
                      style={{width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px', minHeight: '80px', marginTop: '0.5rem'}}
                      placeholder="e.g. Please update Mom's medication schedule..."
                    ></textarea>
                  </div>
                  <button type="submit" className="primary-btn" style={{marginTop: '1rem', padding: '0.8rem 1.5rem', borderRadius: '6px', border: 'none', color: 'white', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem'}}>
                    <Lock size={16} /> Encrypt & Send to Staff
                  </button>
                </form>
              </div>

              <div className="saved-notes">
                <h3 style={{fontSize: '1.1rem', color: '#444'}}>Sent History (Decrypted)</h3>
                {savedNotes.length === 0 ? (
                  <p style={{fontStyle: 'italic', color: '#999'}}>No secure messages sent.</p>
                ) : (
                  <ul style={{listStyle: 'none', padding: 0}}>
                    {savedNotes.map((note, idx) => (
                      <li key={idx} style={{padding: '1rem', background: '#fff', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'flex-start', gap: '1rem'}}>
                        <Lock size={14} color="#ccc" style={{marginTop: '4px'}} />
                        <span style={{color: '#555'}}>{note}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <p style={{fontSize: '0.8rem', color: '#aaa', marginTop: '2rem', textAlign: 'center'}}>
                  Security Note: These messages are stored as cipher text in the database and only decrypted in the Staff Admin Panel.
                </p>
              </div>
            </div>
          )}

          {/* Feedback Module */}
          {activeTab === 'feedback' && (
            <div className="card" style={{background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
              <h2 style={{marginTop: 0, color: '#333'}}>Rate Your Experience</h2>
              <p style={{color: '#666', marginBottom: '2rem'}}>Your feedback helps us recognize our best caregivers and improve our service.</p>
              
              <div style={{background: '#f8fbff', padding: '2rem', borderRadius: '8px', border: '1px solid #e1eeff'}}>
                <h3>How was Sarah J. today?</h3>
                <form onSubmit={handleSendReview} style={{maxWidth: '500px'}}>
                  <div className="form-group">
                    <label>Rating</label>
                    <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1rem'}}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <button key={star} type="button" style={{background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#FFD700'}}>★</button>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Comments</label>
                    <textarea 
                      style={{width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px', minHeight: '100px'}}
                      placeholder="Sarah was wonderful with Mom today..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="primary-btn" 
                    disabled={reviewStatus === 'sending'}
                    style={{
                      width: '100%', 
                      padding: '1rem', 
                      borderRadius: '6px', 
                      border: 'none', 
                      color: 'white', 
                      fontWeight: 'bold', 
                      cursor: 'pointer',
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      gap: '0.5rem'
                    }}
                  >
                    {reviewStatus === 'sending' ? 'Submitting...' : (
                      <>
                        <Send size={18} /> Submit Feedback
                      </>
                    )}
                  </button>
                  
                  {reviewStatus === 'sent' && (
                    <div style={{marginTop: '1rem', color: 'green', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      ✓ Thank you for your feedback!
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* Secure File Sharing Module */}
          {activeTab === 'files' && (
            <div className="card" style={{background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
                <div>
                  <h2 style={{marginTop: 0, color: '#333'}}>Secure File Exchange</h2>
                  <p style={{color: '#666', margin: 0}}>HIPAA-Compliant encrypted storage</p>
                </div>
                <button className="primary-btn" style={{padding: '0.8rem 1.5rem', borderRadius: '6px', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <Upload size={18} /> Upload New
                </button>
              </div>

              <div className="files-list">
                {files.map(file => (
                  <div key={file.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #eee'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                      <div style={{background: '#eee', padding: '0.8rem', borderRadius: '4px'}}>
                        <FileText size={24} color="#666" />
                      </div>
                      <div>
                        <div style={{fontWeight: 600, color: '#333'}}>{file.name}</div>
                        <div style={{fontSize: '0.85rem', color: '#888'}}>Added {file.date} • {file.size}</div>
                      </div>
                    </div>
                    <button style={{color: '#5DA9DD', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <Download size={18} /> Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
