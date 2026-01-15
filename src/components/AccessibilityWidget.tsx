import React, { useState, useEffect } from 'react';
import { Accessibility, Type, Sun, Eye, MousePointer } from 'lucide-react';

export const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    textSize: 0, // 0 = normal, 1 = large, 2 = extra large
    highContrast: false,
    readableFont: false,
    highlightLinks: false
  });

  const toggleOpen = () => setIsOpen(!isOpen);

  const updateSetting = (key: keyof typeof settings) => {
    setSettings(prev => {
      const newState = { ...prev };
      if (key === 'textSize') {
        newState.textSize = (prev.textSize + 1) % 3;
      } else {
        // @ts-ignore
        newState[key] = !prev[key];
      }
      return newState;
    });
  };

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Text Size
    if (settings.textSize === 0) root.style.fontSize = '16px';
    if (settings.textSize === 1) root.style.fontSize = '18px';
    if (settings.textSize === 2) root.style.fontSize = '20px';

    // High Contrast
    if (settings.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }

    // Readable Font
    if (settings.readableFont) {
      document.body.classList.add('readable-font');
    } else {
      document.body.classList.remove('readable-font');
    }

    // Highlight Links
    if (settings.highlightLinks) {
        document.body.classList.add('highlight-links');
    } else {
        document.body.classList.remove('highlight-links');
    }

  }, [settings]);

  return (
    <div className="accessibility-widget" style={{position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999}}>
      {isOpen && (
        <div className="accessibility-menu" style={{
          position: 'absolute', 
          bottom: '120%', 
          right: 0, 
          background: 'white', 
          padding: '1rem', 
          borderRadius: '8px', 
          boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
          width: '250px',
          border: '1px solid #ddd'
        }}>
          <h3 style={{margin: '0 0 1rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <Accessibility size={16} /> Accessibility Tools
          </h3>
          
          <div className="a11y-option" onClick={() => updateSetting('textSize')}>
            <Type size={18} />
            <span>Text Size: {settings.textSize === 0 ? 'Normal' : settings.textSize === 1 ? 'Large' : 'Extra Large'}</span>
          </div>

          <div className="a11y-option" onClick={() => updateSetting('highContrast')}>
            <Sun size={18} />
            <span>High Contrast: {settings.highContrast ? 'ON' : 'OFF'}</span>
          </div>

          <div className="a11y-option" onClick={() => updateSetting('readableFont')}>
            <Eye size={18} />
            <span>Readable Font: {settings.readableFont ? 'ON' : 'OFF'}</span>
          </div>
          
           <div className="a11y-option" onClick={() => updateSetting('highlightLinks')}>
            <MousePointer size={18} />
            <span>Highlight Links: {settings.highlightLinks ? 'ON' : 'OFF'}</span>
          </div>
        </div>
      )}

      <button 
        onClick={toggleOpen}
        aria-label="Accessibility Options"
        style={{
          width: '50px', 
          height: '50px', 
          borderRadius: '50%', 
          background: '#0052cc', 
          color: 'white', 
          border: 'none', 
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center'
        }}
      >
        <Accessibility size={24} />
      </button>

      <style>{`
        .a11y-option {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.8rem;
          cursor: pointer;
          border-radius: 4px;
          transition: background 0.2s;
        }
        .a11y-option:hover {
          background-color: #f0f0f0;
        }

        /* High Contrast Mode */
        .high-contrast {
          filter: contrast(120%);
          background-color: #000 !important;
          color: #fff !important;
        }
        .high-contrast * {
          background-color: #000 !important;
          color: #fff !important;
          border-color: #fff !important;
        }
        .high-contrast img {
          filter: grayscale(100%);
        }
        
        /* Readable Font */
        .readable-font * {
          font-family: Arial, Helvetica, sans-serif !important;
          letter-spacing: 0.05em !important;
          line-height: 1.6 !important;
        }
        
        /* Highlight Links */
        .highlight-links a {
            text-decoration: underline !important;
            background-color: yellow !important;
            color: black !important;
        }
      `}</style>
    </div>
  );
};
