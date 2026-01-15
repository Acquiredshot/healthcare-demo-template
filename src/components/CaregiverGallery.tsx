import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Play, X, User, Heart, Star } from 'lucide-react';

const caregivers = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Senior Care Specialist',
    bio: 'With over 10 years of experience in geriatric care, Sarah specializes in dementia support and keeping seniors active.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    tags: ['Dementia Care', 'Mobility Support'],
    rating: 5.0
  },
  {
    id: 2,
    name: 'David Martinez',
    role: 'Disability Support Worker',
    bio: 'David brings energy and patience to his work, focusing on community inclusion and skill-building for young adults.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    tags: ['Autism Support', 'Life Skills'],
    rating: 4.9
  },
  {
    id: 3,
    name: 'Emily Chen',
    role: 'Pediatric Care Nurse',
    bio: 'Emily has a gentle touch and specializes in complex medical needs for children with disabilities.',
    image: 'https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?auto=format&fit=crop&q=80&w=400',
    tags: ['Pediatric Care', 'Medical Support'],
    rating: 5.0
  },
  {
    id: 4,
    name: 'Michael Thompson',
    role: 'Respite Care Provider',
    bio: 'Michael provides reliable and fun respite care, giving families peace of mind while engaging clients in hobbies.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    tags: ['Respite', 'Recreation'],
    rating: 4.8
  }
];

export const CaregiverGallery = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  return (
    <section className="caregiver-section" style={{ padding: '4rem 2rem', background: '#f8fbff' }}>
      <Helmet>
        <title>Meet Our Caregivers | Do It Right By You</title>
        <meta name="description" content="Get to know our compassionate and qualified care team. Watch video intros and read bios." />
      </Helmet>

      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-header text-center" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ color: '#5DA9DD', fontSize: '2.5rem', marginBottom: '1rem' }}>Meet Your Care Team</h2>
          <p style={{ color: '#666', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            We believe that the best care comes from a personal connection. 
            Get to know the dedicated professionals who make our mission possible.
          </p>
        </div>

        <div className="caregiver-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {caregivers.map((caregiver) => (
            <div key={caregiver.id} className="caregiver-card" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', transition: 'transform 0.3s' }}>
              
              {/* Image Header with Video Trigger */}
              <div 
                className="card-image" 
                style={{ 
                  height: '250px', 
                  backgroundImage: `url(${caregiver.image})`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center',
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onClick={() => setActiveVideo(caregiver.id)}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.7))' }}></div>
                
                <div style={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)',
                  width: '50px', 
                  height: '50px', 
                  background: 'rgba(255,255,255,0.9)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}>
                  <Play size={20} fill="#5DA9DD" color="#5DA9DD" style={{ marginLeft: '2px' }} />
                </div>
                
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', color: 'white' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                    <Play size={12} fill="white" /> Watch Intro
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="card-body" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h3 style={{ margin: 0, color: '#333', fontSize: '1.3rem' }}>{caregiver.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#ffb400', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    <Star size={14} fill="#ffb400" /> {caregiver.rating}
                  </div>
                </div>
                
                <div style={{ color: '#5DA9DD', fontWeight: '500', fontSize: '0.95rem', marginBottom: '1rem' }}>{caregiver.role}</div>
                
                <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                  {caregiver.bio}
                </p>

                <div className="tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {caregiver.tags.map(tag => (
                    <span key={tag} style={{ background: '#f0f7ff', color: '#5DA9DD', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '500' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button style={{ background: 'none', border: 'none', color: '#888', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <User size={16} /> View Profile
                  </button>
                  <button style={{ background: 'none', border: 'none', color: '#e91e63', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <Heart size={16} /> Favorite
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Video Video Player Modal (Simulated) */}
        {activeVideo !== null && (
          <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            background: 'rgba(0,0,0,0.9)', 
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}>
            <button 
              onClick={() => setActiveVideo(null)}
              style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <X size={40} />
            </button>
            <div style={{ width: '100%', maxWidth: '800px', aspectRatio: '16/9', background: '#000', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #333' }}>
               <div style={{ textAlign: 'center', color: 'white' }}>
                 <Play size={60} style={{ marginBottom: '1rem', opacity: 0.8 }} />
                 <h3>[Caregiver Video Intro - {caregivers.find(c => c.id === activeVideo)?.name}]</h3>
                 <p>Video playback simulation</p>
               </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
