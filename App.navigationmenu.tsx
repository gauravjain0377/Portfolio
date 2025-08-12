import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import './app/globals.css';

const NavigationMenuPreview = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--bg-primary)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Main content */}
      <div style={{ 
        padding: '2rem',
        color: 'var(--text-primary)'
      }}>
        <h1>Navigation Menu Preview</h1>
        <p>Click the button below to toggle the navigation menu and see the improved sizing.</p>
        
        <button 
          onClick={toggleMenu}
          style={{
            padding: '12px 24px',
            backgroundColor: 'var(--accent-color)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            marginTop: '1rem'
          }}
        >
          {isMenuOpen ? 'Close Menu' : 'Open Menu'}
        </button>

        <div style={{ marginTop: '2rem' }}>
          <h2>Navigation Menu Features:</h2>
          <ul>
            <li>✅ Reduced text sizes for better visibility</li>
            <li>✅ All menu items visible without scrolling</li>
            <li>✅ Responsive design for all screen sizes</li>
            <li>✅ Smooth animations and transitions</li>
            <li>✅ Theme toggle functionality</li>
            <li>✅ Improved spacing and layout</li>
          </ul>
        </div>
      </div>

      {/* Navigation Menu */}
      {isMenuOpen && <Navbar toggleMenu={toggleMenu} />}
    </div>
  );
};

export default NavigationMenuPreview;