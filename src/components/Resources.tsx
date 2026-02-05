import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Download, FileText, Check } from 'lucide-react';

const externalResources = [
  {
    title: "New Jersey Department of Human Services",
    description: "Information on programs, services, and support for individuals with disabilities in NJ.",
    link: "https://www.nj.gov/humanservices/"
  },
  {
    title: "Disability Rights New Jersey",
    description: "Protection and advocacy system for people with disabilities in New Jersey.",
    link: "https://www.drnj.org/"
  },
  {
    title: "The Arc of New Jersey",
    description: "The largest non-profit advocacy organization for people with intellectual and developmental disabilities and their families.",
    link: "https://www.arcnj.org/"
  },
  {
    title: "PerformCare",
    description: "The single point of access for a wide array of behavioral health, intellectual and developmental disability services.",
    link: "https://www.performcarenj.org/"
  }
];

const leadMagnets = [
  {
    id: 1,
    title: "5 Things You Need to Know Before Starting Home Care",
    description: "A comprehensive checklist for families beginning their journey.",
    fileName: "Home_Care_Checklist_2024.pdf"
  },
  {
    id: 2,
    title: "Maximizing Your State Benefits Guide",
    description: "Learn how to navigate NJ state programs effectively.",
    fileName: "NJ_Benefits_Guide_v2.pdf"
  }
];

export const Resources = () => {
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Record<number, string>>({});

  const handleDownload = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    // Simulate API call
    setStatus({ ...status, [id]: 'processing' });
    
    setTimeout(() => {
      setStatus({ ...status, [id]: 'complete' });
      setEmail('');
      // In real app, trigger actual download here
      alert(`Guide sent to ${email}!`);
      setDownloadingId(null);
    }, 1500);
  };

  return (
    <section id="resources" className="resources-section">
      <Helmet>
        <title>Resources & Guides | Healthcare Demo Template</title>
        <meta name="description" content="Helpful resources for individuals with disabilities and free guides for families in New Jersey." />
      </Helmet>
      
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="section-title">Helpful Resources</h2>
        
        {/* Lead Magnets Section */}
        <div className="lead-magnets" style={{ marginBottom: '4rem' }}>
          <h3 style={{ color: '#444', marginBottom: '1.5rem', textAlign: 'left', borderLeft: '5px solid #5DA9DD', paddingLeft: '1rem' }}>
            Free Guides for Families
          </h3>
          <div className="magnets-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {leadMagnets.map((magnet) => (
              <div key={magnet.id} className="magnet-card" style={{ background: '#fff', border: '1px solid #e1eeff', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ background: '#ffebee', padding: '1rem', borderRadius: '8px', color: '#c62828' }}>
                    <FileText size={32} />
                    <div style={{ fontSize: '0.7rem', fontWeight: 'bold', marginTop: '4px' }}>PDF</div>
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', color: '#333' }}>{magnet.title}</h4>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{magnet.description}</p>
                  </div>
                </div>

                {downloadingId === magnet.id ? (
                  <form onSubmit={(e) => handleDownload(e, magnet.id)} style={{ marginTop: '1.5rem' }}>
                    <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Enter email to unlock download:</p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input 
                        type="email" 
                        required 
                        placeholder="your@email.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ flex: 1, padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
                      />
                      <button 
                        type="submit" 
                        className="primary-btn" 
                        style={{ padding: '0.6rem 1rem', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer' }}
                      >
                        Send
                      </button>
                    </div>
                  </form>
                ) : status[magnet.id] === 'complete' ? (
                   <button 
                    disabled 
                    style={{ width: '100%', padding: '0.8rem', background: '#e8f5e9', color: '#2e7d32', border: 'none', borderRadius: '6px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}
                  >
                    <Check size={18} /> Sent to Email
                  </button>
                ) : (
                  <button 
                    onClick={() => setDownloadingId(magnet.id)}
                    className="primary-btn"
                    style={{ width: '100%', padding: '0.8rem', marginTop: '1rem', border: 'none', borderRadius: '6px', color: 'white', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <Download size={18} /> Download Free Guide
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* External Links Section */}
        <h3 style={{ color: '#444', marginBottom: '1.5rem', textAlign: 'left', borderLeft: '5px solid #5DA9DD', paddingLeft: '1rem' }}>
          External Resources
        </h3>
        <div className="resources-grid">
          {externalResources.map((resource, index) => (
            <div key={index} className="resource-card">
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <a href={resource.link} target="_blank" rel="noopener noreferrer" className="resource-link">
                Visit Website &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
