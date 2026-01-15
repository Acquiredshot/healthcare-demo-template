import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

export const VideoTestimonials = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      role: "Family Caregiver",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
      quote: "The compassion shown to my brother has been life-changing.",
      videoUrl: "#" // Placeholder
    },
    {
      id: 2,
      name: "James T.",
      role: "Client",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      quote: "I finally feel like I have independence again.",
      videoUrl: "#" // Placeholder
    },
    {
      id: 3,
      name: "Maria R.",
      role: "Mother",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400",
      quote: "Professional, reliable, and truly caring staff.",
      videoUrl: "#" // Placeholder
    }
  ];

  return (
    <section className="testimonials-section" style={{ padding: '4rem 2rem', background: '#fff' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="section-title text-center" style={{ textAlign: 'center', marginBottom: '1rem', color: '#5DA9DD' }}>
          Stories of Impact
        </h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          Hear directly from the families and individuals we support.
        </p>

        <div className="video-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card" style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              
              {/* Thumbnail Overlay */}
              <div 
                className="video-thumbnail" 
                style={{ 
                  height: '300px', 
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${t.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => setActiveVideo(t.id)}
              >
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: 'rgba(255,255,255,0.25)', 
                  backdropFilter: 'blur(5px)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  border: '2px solid white',
                  transition: 'transform 0.3s'
                }}>
                  <Play size={24} fill="white" color="white" style={{ marginLeft: '4px' }} />
                </div>
              </div>

              {/* Text Content */}
              <div style={{ padding: '1.5rem', background: 'white' }}>
                <p style={{ fontStyle: 'italic', color: '#444', marginBottom: '1rem' }}>"{t.quote}"</p>
                <div style={{ fontWeight: 'bold', color: '#5DA9DD' }}>{t.name}</div>
                <div style={{ fontSize: '0.9rem', color: '#888' }}>{t.role}</div>
              </div>

            </div>
          ))}
        </div>

        {/* Modal Video Player (Simulated) */}
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
            justifyContent: 'center'
          }}>
            <button 
              onClick={() => setActiveVideo(null)}
              style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <X size={40} />
            </button>
            <div style={{ width: '80%', maxWidth: '800px', aspectRatio: '16/9', background: '#000', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <h3 style={{ color: 'white' }}>[Video Player Simulation Video #{activeVideo}]</h3>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
