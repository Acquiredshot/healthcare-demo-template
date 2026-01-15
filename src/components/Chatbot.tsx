import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot } from 'lucide-react';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! 👋 I'm your 24/7 Family Support Assistant. How can I help you right now?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const commonQuestions = [
    { label: "Do you take Medicaid?", value: "medicaid" },
    { label: "How quickly can you start?", value: "start" },
    { label: "What areas do you cover?", value: "areas" }
  ];

  const getBotResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("medicaid") || lowerQuery.includes("insurance")) {
      return "Yes, we work with Medicaid waiver programs (DDD/Supports Program) and most major insurance plans. We also accept private pay. Would you like to speak to an enrollment specialist?";
    }
    if (lowerQuery.includes("start") || lowerQuery.includes("quickly") || lowerQuery.includes("soon")) {
      return "We understand care is often needed urgently. We can typically begin services within 24-48 hours of an initial assessment, depending on the specific care requirements.";
    }
    if (lowerQuery.includes("area") || lowerQuery.includes("location") || lowerQuery.includes("cover")) {
      return "We proudly serve families throughout the entire region. Please enter your zip code here or call us at 609-947-9520 to confirm specific availability for your neighborhood.";
    }
    return "Thanks for asking. For that specific inquiry, it's best to speak with our care coordinator directly at 609-947-9520. Is there anything else I can help with?";
  };

  const handleSendMessage = (text: string) => {
    const newUserMsg: Message = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");

    // Simulate thinking delay
    setTimeout(() => {
      const botResponseText = getBotResponse(text);
      const newBotMsg: Message = { id: Date.now() + 1, text: botResponseText, sender: 'bot' };
      setMessages(prev => [...prev, newBotMsg]);
    }, 800);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleSendMessage(inputValue);
  };

  return (
    <div className="chatbot-widget" style={{ position: 'fixed', bottom: '100px', right: '2rem', zIndex: 10000 }}>
      {/* Toggle Button (Hidden when open, but we can animate/replace) */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: '#5DA9DD',
            color: 'white',
            border: 'none',
            boxShadow: '0 4px 15px rgba(93, 169, 221, 0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <MessageSquare size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          width: '350px',
          height: '500px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 5px 30px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          bottom: '80px', // Position slightly above the toggle area if we kept it
          position: 'absolute',
          right: '0',
          border: '1px solid #e1eeff'
        }}>
          {/* Header */}
          <div style={{ background: '#5DA9DD', padding: '1rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', background: '#90EE90', borderRadius: '50%' }}></div>
              <span style={{ fontWeight: 'bold' }}>Family Support 24/7</span>
            </div>
            <button onClick={toggleChat} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', background: '#f8fbff', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', gap: '0.5rem', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
                <div style={{
                  width: '30px', 
                  height: '30px', 
                  borderRadius: '50%', 
                  background: msg.sender === 'bot' ? '#5DA9DD' : '#eee', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {msg.sender === 'bot' ? <Bot size={16} color="white" /> : <User size={16} color="#555" />}
                </div>
                <div style={{
                  background: msg.sender === 'bot' ? 'white' : '#5DA9DD',
                  color: msg.sender === 'bot' ? '#333' : 'white',
                  padding: '0.8rem',
                  borderRadius: '12px',
                  borderTopLeftRadius: msg.sender === 'bot' ? '2px' : '12px',
                  borderTopRightRadius: msg.sender === 'user' ? '2px' : '12px',
                  boxShadow: msg.sender === 'bot' ? '0 2px 5px rgba(0,0,0,0.05)' : 'none',
                  border: msg.sender === 'bot' ? '1px solid #eee' : 'none',
                  fontSize: '0.95rem',
                  maxWidth: '80%'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div style={{ padding: '0 1rem 0.5rem', background: '#f8fbff', overflowX: 'auto', display: 'flex', gap: '0.5rem' }}>
            {commonQuestions.map((q) => (
              <button
                key={q.value}
                onClick={() => handleSendMessage(q.label)}
                style={{
                  background: 'white',
                  border: '1px solid #5DA9DD',
                  color: '#5DA9DD',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '15px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  marginBottom: '0.5rem'
                }}
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleInputSubmit} style={{ padding: '1rem', borderTop: '1px solid #eee', display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your question..."
              style={{ flex: 1, padding: '0.6rem', borderRadius: '20px', border: '1px solid #ddd', fontSize: '0.9rem', outline: 'none' }}
            />
            <button 
              type="submit" 
              style={{ background: '#5DA9DD', color: 'white', width: '35px', height: '35px', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
