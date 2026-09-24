import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Mic, Sparkles, Volume2 } from 'lucide-react';

export const VoiceSearchModal: React.FC = () => {
  const { 
    isVoiceSearchModalOpen, 
    setIsVoiceSearchModalOpen, 
    setFilterState, 
    setActiveTab 
  } = useStore();

  const [isListening, setIsListening] = useState(true);
  const [transcript, setTranscript] = useState('Listening... Speak now');

  const voiceSampleQueries = [
    'Sony wireless headphones in 10 minutes',
    'Fresh organic avocados from FreshMart',
    'Nike Air Max sneakers on sale',
    'Apple MacBook Air M3 deals'
  ];

  const handleSimulateVoice = (phrase: string) => {
    setTranscript(`"${phrase}"`);
    setTimeout(() => {
      setFilterState(prev => ({ ...prev, searchQuery: phrase, category: 'all' }));
      setActiveTab('products');
      setIsVoiceSearchModalOpen(false);
    }, 900);
  };

  if (!isVoiceSearchModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsVoiceSearchModalOpen(false)}>
      <div 
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '460px',
          width: '100%',
          padding: '2rem',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <button
          onClick={() => setIsVoiceSearchModalOpen(false)}
          style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-sub)', cursor: 'pointer' }}
        >
          <X size={18} />
        </button>

        {/* Animated Mic Ring */}
        <div style={{
          width: '88px',
          height: '88px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-emerald))',
          boxShadow: '0 0 30px var(--brand-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          margin: '0 auto 1.5rem',
          position: 'relative'
        }}>
          <Mic size={38} />
          
          {/* Animated pulsing wave */}
          <div style={{
            position: 'absolute',
            inset: '-12px',
            borderRadius: '50%',
            border: '2px solid var(--brand-emerald)',
            animation: 'radarWave 2s infinite ease-out'
          }} />
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          FlowVoice Search
        </h3>

        <div style={{
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--brand-primary)',
          background: 'var(--bg-surface-elevated)',
          padding: '0.75rem 1rem',
          borderRadius: '1rem',
          border: '1px solid var(--border-subtle)',
          marginBottom: '1.5rem'
        }}>
          {transcript}
        </div>

        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          OR TAP TO SIMULATE VOICE COMMAND:
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {voiceSampleQueries.map(q => (
            <button
              key={q}
              onClick={() => handleSimulateVoice(q)}
              style={{
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                padding: '0.65rem 1rem',
                borderRadius: '0.75rem',
                fontSize: '0.85rem',
                color: 'var(--text-main)',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand-primary)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
            >
              <Volume2 size={16} color="var(--brand-primary)" />
              <span>"{q}"</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
