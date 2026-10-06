import React, { useState } from 'react';
import { sound } from '../utils/soundEffects';
import { X, Printer, Download, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function VipPassModal({ passData, onClose }) {
  if (!passData) return null;

  const [role, setRole] = useState('VIP DELEGATE');

  const roles = [
    'VIP DELEGATE',
    'DEEPTECH INVESTOR',
    'TELECOM ARCHITECT',
    'MEDIA & PRESS'
  ];

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="modal-backdrop open" onClick={onClose} style={{ zIndex: 9999 }}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '460px' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Role Selector */}
        <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1.25rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {roles.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                sound.playClick();
                setRole(r);
              }}
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: '8px',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                background: role === r ? 'var(--primary)' : 'rgba(255, 255, 255, 0.06)',
                color: role === r ? '#000' : 'var(--text-muted)',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Holographic VIP Pass Card */}
        <div className="pass-card" style={{
          background: 'linear-gradient(145deg, rgba(16, 24, 48, 0.95), rgba(6, 10, 22, 0.98))',
          border: '1px solid rgba(0, 242, 254, 0.4)',
          borderRadius: '20px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 242, 254, 0.2)',
          padding: '1.75rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Holographic Sheen Accent */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'linear-gradient(45deg, transparent 40%, rgba(0, 242, 254, 0.08) 50%, transparent 60%)',
            pointerEvents: 'none'
          }} />

          {/* Pass Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.08em', color: '#fff' }}>
                SYNAPSE<span style={{ color: 'var(--primary)' }}>-X AI</span>
              </div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.1em', marginTop: '0.2rem' }}>
                {role} • OFFICIAL BADGE
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>IMC 2026</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>YASHOBHOOMI, NEW DELHI</div>
            </div>
          </div>

          {/* Pass Body */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', margin: '0 0 0.25rem 0' }}>
                {passData.name || 'VIP Delegate'}
              </h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>
                {passData.org || 'DeepTech Partner / Executive'}
              </p>
              
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <div>📍 BOOTH: <strong style={{ color: '#fff' }}>HALL 3, BOOTH #E-342</strong></div>
                <div>📅 DATE: <strong style={{ color: '#fff' }}>{passData.date || 'OCTOBER 7-10, 2026'}</strong></div>
                <div>⏰ TIME: <strong style={{ color: '#00ff87' }}>{passData.time || '11:30 AM (CONFIRMED)'}</strong></div>
              </div>
            </div>

            {/* QR Code */}
            <div style={{
              background: '#fff',
              padding: '0.5rem',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)'
            }}>
              <svg viewBox="0 0 100 100" width="80" height="80">
                <rect width="100" height="100" fill="#ffffff" />
                <rect x="8" y="8" width="28" height="28" fill="#000000" rx="3" />
                <rect x="13" y="13" width="18" height="18" fill="#ffffff" />
                <rect x="17" y="17" width="10" height="10" fill="#000000" />
                
                <rect x="64" y="8" width="28" height="28" fill="#000000" rx="3" />
                <rect x="69" y="13" width="18" height="18" fill="#ffffff" />
                <rect x="73" y="17" width="10" height="10" fill="#000000" />

                <rect x="8" y="64" width="28" height="28" fill="#000000" rx="3" />
                <rect x="13" y="69" width="18" height="18" fill="#ffffff" />
                <rect x="17" y="73" width="10" height="10" fill="#000000" />

                <rect x="42" y="15" width="8" height="8" fill="#000000" />
                <rect x="42" y="42" width="16" height="16" fill="#00f2fe" rx="2" />
                <rect x="65" y="65" width="16" height="16" fill="#000000" />
                <rect x="15" y="45" width="6" height="6" fill="#000000" />
                <rect x="75" y="45" width="6" height="6" fill="#000000" />
              </svg>
              <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#000', marginTop: '0.2rem' }}>
                #E-342 VERIFIED
              </span>
            </div>
          </div>

          {/* Pass Footer */}
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '0.75rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.7rem',
            color: 'var(--text-muted)'
          }}>
            <span>HOST: <strong>UTKARSH PATWA</strong> (CSE AI/ML)</span>
            <span style={{ color: '#00ff87', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <ShieldCheck size={12} /> FAST-TRACK ACCESS
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ marginTop: '1.25rem' }}>
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            onClick={handlePrint}
          >
            <Printer size={16} /> Print / Save VIP Delegate Pass
          </button>
        </div>
      </div>
    </div>
  );
}
