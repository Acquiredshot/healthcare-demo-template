import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CheckCircle } from 'lucide-react';

const questions = [
  {
    id: 1,
    text: "Who are you seeking care for?",
    options: [
      { value: "myself", label: "Myself" },
      { value: "child", label: "My Child" },
      { value: "parent", label: "My Parent / Elderly Relative" },
      { value: "sibling", label: "Sibling or Other Family Member" }
    ]
  },
  {
    id: 2,
    text: "What is the primary goal of care?",
    options: [
      { value: "home", label: "Daily living assistance at home" },
      { value: "community", label: "Socialization and community skills" },
      { value: "break", label: "A temporary break for the primary caregiver (Respite)" },
      { value: "transport", label: "Getting to/from appointments or events" }
    ]
  },
  {
    id: 3,
    text: "How soon do you need services to start?",
    options: [
      { value: "urgent", label: "Immediately / Urgent" },
      { value: "soon", label: "Within 2-4 weeks" },
      { value: "planning", label: "Just planning ahead" }
    ]
  }
];

export const DiscoveryQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const getRecommendation = () => {
    // Basic logic for demo purposes
    const goal = answers[1]; // Index 1 is the goal question (id 2)
    
    if (goal === 'home') return { title: "In-Home Support Services", desc: "Our personalized in-home care plans are perfect for assisting with daily living tasks." };
    if (goal === 'community') return { title: "Community Inclusion Program", desc: "Our community engagement specialists can help build social connections and confidence." };
    if (goal === 'break') return { title: "Respite Care", desc: "You deserve a rest. Our trained respite caregivers can step in to provide safe, compassionate support." };
    if (goal === 'transport') return { title: "Assisted Transportation", desc: "Reliable, accessible transport services to ensure safe travel to important appointments." };
    
    return { title: "Comprehensive Care Consultation", desc: "Based on your needs, a custom blend of our services would be best." };
  };

  return (
    <section className="quiz-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f7ff', padding: '2rem' }}>
      <Helmet>
        <title>Care Discovery Quiz | Healthcare Demo Template</title>
      </Helmet>

      <div className="quiz-card" style={{ background: 'white', maxWidth: '600px', width: '100%', padding: '3rem', borderRadius: '16px', boxShadow: '0 10px 40px rgba(93, 169, 221, 0.2)', textAlign: 'center' }}>
        
        {!isComplete ? (
          <>
            <div className="progress-bar" style={{ width: '100%', height: '6px', background: '#eee', borderRadius: '3px', marginBottom: '2rem' }}>
              <div style={{ height: '100%', background: '#5DA9DD', borderRadius: '3px', width: `${((currentQuestion + 1) / questions.length) * 100}%`, transition: 'width 0.3s' }}></div>
            </div>
            
            <h2 style={{ color: '#333', marginBottom: '2rem', fontSize: '1.8rem' }}>{questions[currentQuestion].text}</h2>
            
            <div className="options-grid" style={{ display: 'grid', gap: '1rem' }}>
              {questions[currentQuestion].options.map((opt) => (
                <button 
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  style={{
                    padding: '1.2rem',
                    border: '2px solid #e1eeff',
                    borderRadius: '8px',
                    background: 'white',
                    fontSize: '1.1rem',
                    color: '#555',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#5DA9DD';
                    e.currentTarget.style.background = '#f8fbff';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#e1eeff';
                    e.currentTarget.style.background = 'white';
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="results-view">
            <div style={{ width: '80px', height: '80px', background: '#e8f5e9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
              <CheckCircle size={40} color="#2e7d32" />
            </div>
            <h2 style={{ marginBottom: '0.5rem' }}>We Recommend:</h2>
            <h3 style={{ color: '#5DA9DD', fontSize: '1.8rem', marginBottom: '1rem' }}>{getRecommendation().title}</h3>
            <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.1rem' }}>{getRecommendation().desc}</p>
            
            <button 
              onClick={() => navigate('/booking')}
              className="primary-btn"
              style={{
                width: '100%',
                padding: '1rem',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              Book Your Session <ArrowRight size={20} />
            </button>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>or <span onClick={() => setIsComplete(false)} style={{ textDecoration: 'underline', cursor: 'pointer' }}>retake quiz</span></p>
          </div>
        )}

      </div>
    </section>
  );
};
