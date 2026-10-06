import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/soundEffects';
import { Radio, Compass, Zap, Shield, Activity, RefreshCw } from 'lucide-react';

export default function Technology() {
  const { t } = useLanguage();
  const [beamAngle, setBeamAngle] = useState(45);
  const [carrierFreq, setCarrierFreq] = useState(240); // 100 to 300 GHz

  const snrGain = (12.4 + (Math.sin(beamAngle * Math.PI / 180) * 3.2)).toFixed(1);
  const beamWidthDeg = (4.2 - (carrierFreq / 300) * 1.8).toFixed(1);

  return (
    <section className="section-block" id="technology">
      <div className="container">
        
        {/* Title */}
        <div className="section-title-wrap">
          <div className="section-pill">
            <Radio size={14} /> {t('tech_pill')}
          </div>
          <h2 className="section-heading">
            {t('tech_heading').replace('6G Terahertz Architecture', '')}
            <span className="gradient-text">6G Terahertz Architecture</span>
          </h2>
          <p className="section-subtext">{t('tech_subtext')}</p>
        </div>

        {/* Dynamic Interactive Card */}
        <div className="tech-overview-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {/* Left Column: Interactive 6G Beamforming Radar Simulator */}
          <div style={{
            background: 'rgba(6, 10, 22, 0.95)',
            border: '1px solid rgba(0, 242, 254, 0.25)',
            borderRadius: '20px',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Header */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Compass size={15} /> 360° SUB-THZ BEAMFORMING RADAR
                </span>
                <span style={{ fontSize: '0.75rem', color: '#00ff87', fontWeight: 600 }}>● PHASED ARRAY ACTIVE</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Drag the angle slider below to steer the 6G Sub-THz transmission beam in real-time towards mobile UEs.
              </p>
            </div>

            {/* Radar Circle Visualizer */}
            <div style={{
              margin: '1.5rem auto',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              border: '2px dashed rgba(0, 242, 254, 0.3)',
              position: 'relative',
              background: 'radial-gradient(circle, rgba(0, 242, 254, 0.08) 0%, transparent 70%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Concentric rings */}
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '1px solid rgba(255, 255, 255, 0.08)', position: 'absolute' }} />
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '1px solid rgba(255, 255, 255, 0.1)', position: 'absolute' }} />
              
              {/* Center Core */}
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 12px var(--primary)', zIndex: 2 }} />

              {/* Dynamic Beam Sector Cone */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: '90px',
                height: '90px',
                background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.5), transparent)',
                clipPath: 'polygon(0% 100%, 30% 0%, 70% 0%)',
                transformOrigin: 'bottom center',
                transform: `translateX(-50%) rotate(${beamAngle}deg)`,
                transition: 'transform 0.1s ease-out',
                pointerEvents: 'none'
              }} />
            </div>

            {/* Interactive Sliders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Phased Steering Angle:</span>
                  <strong style={{ color: 'var(--primary)' }}>{beamAngle}° Azimuth</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={beamAngle}
                  onChange={(e) => {
                    sound.playHover();
                    setBeamAngle(parseInt(e.target.value, 10));
                  }}
                  style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Carrier Frequency:</span>
                  <strong style={{ color: '#00ff87' }}>{carrierFreq} GHz Sub-THz</strong>
                </div>
                <input
                  type="range"
                  min="100"
                  max="300"
                  step="10"
                  value={carrierFreq}
                  onChange={(e) => {
                    sound.playHover();
                    setCarrierFreq(parseInt(e.target.value, 10));
                  }}
                  style={{ width: '100%', accentColor: '#00ff87', cursor: 'pointer' }}
                />
              </div>

              {/* Telemetry Output */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', background: 'rgba(0, 0, 0, 0.4)', padding: '0.75rem', borderRadius: '10px', fontSize: '0.75rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>SNR GAIN:</span>
                  <strong style={{ color: 'var(--primary)', fontSize: '0.95rem' }}>+{snrGain} dB</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>BEAMWIDTH:</span>
                  <strong style={{ color: '#00ff87', fontSize: '0.95rem' }}>{beamWidthDeg}° Ultra-Narrow</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Architectural Pillars */}
          <div className="tech-points-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', justifyContent: 'center' }}>
            <div className="tp-box" onMouseEnter={() => sound.playHover()}>
              <div className="tp-num">01</div>
              <h4>{t('tp1_title')}</h4>
              <p>{t('tp1_desc')}</p>
            </div>

            <div className="tp-box" onMouseEnter={() => sound.playHover()}>
              <div className="tp-num">02</div>
              <h4>{t('tp2_title')}</h4>
              <p>{t('tp2_desc')}</p>
            </div>

            <div className="tp-box" onMouseEnter={() => sound.playHover()}>
              <div className="tp-num">03</div>
              <h4>{t('tp3_title')}</h4>
              <p>{t('tp3_desc')}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
