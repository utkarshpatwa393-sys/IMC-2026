import React from 'react';
import { sound } from '../utils/soundEffects';
import { Activity } from 'lucide-react';

export default function Footer({ onOpenConsole }) {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand-title">SYNAPSE<span className="accent-text">-X</span> AI</div>
            <p className="footer-desc">
              Next-Generation Neuromorphic Edge Silicon & 6G Cognitive Network Architecture. Built in India for the Global Telecom & AI Frontier.
            </p>
            <div className="footer-pill">
              🇮🇳 Exhibiting at India Mobile Congress 2026 • Yashobhoomi New Delhi • Hall 3 #E-342
            </div>
          </div>

          <div className="footer-links">
            <h4>Navigation</h4>
            <a href="#solutions">Solutions</a>
            <a href="#playground">⚡ Live AI Demo</a>
            <a href="#technology">6G Architecture</a>
            <a href="#summit">IMC 2026 Summit</a>
            <a href="#demo">Live Benchmark</a>
            <a href="#founder">About Founder</a>
          </div>

          <div className="footer-links">
            <h4>Connect & Operations</h4>
            <a href="https://www.linkedin.com/in/utkarsh-patwa-7b6b84381/" target="_blank" rel="noopener noreferrer">Founder LinkedIn</a>
            <a href="mailto:contact@synapsex.ai">contact@synapsex.ai</a>
            <a href="#summit">Book Summit Meeting</a>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                if (onOpenConsole) onOpenConsole();
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--primary)',
                cursor: 'pointer',
                textAlign: 'left',
                padding: 0,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                marginTop: '0.25rem'
              }}
            >
              <Activity size={14} /> IMC Booth Console
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <div>&copy; 2026 Synapse-X Technologies Pvt. Ltd. Founded by Utkarsh Patwa (Hi-Tech Institute of Engineering & Technology).</div>
          <div>India Mobile Congress 2026 Official Showcase • Yashobhoomi (IICC) New Delhi.</div>
        </div>
      </div>
    </footer>
  );
}
