"use client";
import { useState } from 'react';
import PageTransitionUltra from './PageTransitionUltra';
import PageTransitionEnhanced from './PageTransitionEnhanced';
import PageTransitionPremium from './PageTransitionPremium';
import PageTransitionMorph from './PageTransitionMorph';

const TransitionSelector = ({ pageName, defaultStyle = 'enhanced' }) => {
  const [transitionStyle, setTransitionStyle] = useState(defaultStyle);

  const transitionComponents = {
    ultra: PageTransitionUltra,
    enhanced: PageTransitionEnhanced,
    premium: PageTransitionPremium,
    morph: PageTransitionMorph
  };

  const TransitionComponent = transitionComponents[transitionStyle];

  const transitionStyles = [
    {
      id: 'ultra',
      name: 'Ultra Fast',
      description: 'Lightning-fast transitions (300ms)',
      duration: '300ms'
    },
    {
      id: 'enhanced',
      name: 'Enhanced',
      description: 'Smooth curved animations with readability',
      duration: '800ms'
    },
    {
      id: 'premium',
      name: 'Premium',
      description: '3D effects and sophisticated animations',
      duration: '1200ms'
    },
    {
      id: 'morph',
      name: 'Morphing',
      description: 'Unique curved morphing effects',
      duration: '1000ms'
    }
  ];

  return (
    <>
      {/* Transition Style Selector - Only show in development */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 10000,
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '15px',
          borderRadius: '10px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '14px'
        }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Transition Style</h4>
          <select 
            value={transitionStyle} 
            onChange={(e) => setTransitionStyle(e.target.value)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '5px',
              padding: '5px 10px',
              fontSize: '12px',
              width: '100%'
            }}
          >
            {transitionStyles.map(style => (
              <option key={style.id} value={style.id}>
                {style.name} ({style.duration})
              </option>
            ))}
          </select>
          <p style={{ margin: '8px 0 0 0', fontSize: '11px', opacity: 0.7 }}>
            {transitionStyles.find(s => s.id === transitionStyle)?.description}
          </p>
        </div>
      )}

      {/* Selected Transition Component */}
      <TransitionComponent pageName={pageName} />
    </>
  );
};

export default TransitionSelector;
