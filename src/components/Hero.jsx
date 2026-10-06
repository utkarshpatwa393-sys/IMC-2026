import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/soundEffects';
import { Calendar, Play, Download, Cpu, Radio, Shield, Zap, Sparkles, Activity } from 'lucide-react';

export default function Hero({ onDownloadWhitepaper }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('chip'); // 'chip', 'cores', 'rf', 'security'
  const [liveJitter, setLiveJitter] = useState(0.42);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveJitter(parseFloat((0.41 + Math.random() * 0.03).toFixed(2)));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section className="hero-section">
      <div className="container hero-container">
        
        {/* Summit Top Pill */}
        <div className="hero-pill">
          <span className="pill-badge">{t('hero_pill_badge')}</span>
          <span className="pill-text">{t('hero_pill_text')}</span>
        </div>

        {/* Dynamic Main Heading */}
        <h1 className="hero-heading">
          <span>{t('hero_title_1')}</span><br />
          <span className="gradient-text">{t('hero_title_2')}</span>
        </h1>

        {/* Hero Description */}
        <p className="hero-description">{t('hero_desc')}</p>

        {/* CTA Button Row with Sound FX */}
        <div className="hero-cta-row">
          <a
            href="#summit"
            className="btn-primary btn-lg"
            onClick={() => sound.playClick()}
          >
            <Calendar size={18} />
            <span>{t('hero_cta_meeting')}</span>
          </a>
          <a
            href="#playground"
            className="btn-secondary btn-lg"
            onClick={() => sound.playSweep()}
          >
            <Play size={18} />
            <span>⚡ Live Edge AI Sandbox</span>
          </a>
          <button
            type="button"
            className="btn-outline btn-lg"
            onClick={() => {
              sound.playSuccess();
              if (onDownloadWhitepaper) onDownloadWhitepaper();
            }}
          >
            <Download size={18} />
            <span>{t('hero_cta_summary')}</span>
          </button>
        </div>

        {/* Dynamic Key Metrics Grid with Live Jitter */}
        <div className="metrics-grid">
          <div className="metric-card" onMouseEnter={() => sound.playHover()}>
            <div className="metric-value">
              {liveJitter} <span className="metric-unit">ms</span>
            </div>
            <div className="metric-label">{t('stat_latency')}</div>
            <div className="metric-sub">{t('stat_latency_sub')}</div>
          </div>

          <div className="metric-card" onMouseEnter={() => sound.playHover()}>
            <div className="metric-value">
              18.4 <span className="metric-unit">TOPS/W</span>
            </div>
            <div className="metric-label">{t('stat_efficiency')}</div>
            <div className="metric-sub">{t('stat_efficiency_sub')}</div>
          </div>

          <div className="metric-card" onMouseEnter={() => sound.playHover()}>
            <div className="metric-value">
              100 <span className="metric-unit">Gbps</span>
            </div>
            <div className="metric-label">{t('stat_throughput')}</div>
            <div className="metric-sub">{t('stat_throughput_sub')}</div>
          </div>

          <div className="metric-card" onMouseEnter={() => sound.playHover()}>
            <div className="metric-value">91.5%</div>
            <div className="metric-label">{t('stat_savings')}</div>
            <div className="metric-sub">{t('stat_savings_sub')}</div>
          </div>
        </div>

        {/* Interactive 3D Holographic Hardware Showcase Card */}
        <div
          className="hero-showcase-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${mousePos.y * 0.4}deg) rotateY(${mousePos.x * 0.4}deg)`,
            transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
            position: 'relative'
          }}
        >
          {/* Header & Subsystem Switcher Tabs */}
          <div className="showcase-header" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
            <div className="showcase-tag">
              <span className="status-indicator"></span>
              <span>{t('hero_chip_tag')}</span>
            </div>
            
            {/* Interactive Hardware Tabs */}
            <div style={{ display: 'flex', gap: '0.4rem', background: 'rgba(255, 255, 255, 0.05)', padding: '0.2rem', borderRadius: '10px' }}>
              <button
                type="button"
                onClick={() => { sound.playClick(); setActiveTab('chip'); }}
                style={{
                  padding: '0.3rem 0.65rem',
                  borderRadius: '7px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  background: activeTab === 'chip' ? 'var(--primary)' : 'transparent',
                  color: activeTab === 'chip' ? '#000' : 'var(--text-muted)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Cpu size={12} /> Silicon Die
              </button>

              <button
                type="button"
                onClick={() => { sound.playClick(); setActiveTab('cores'); }}
                style={{
                  padding: '0.3rem 0.65rem',
                  borderRadius: '7px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  background: activeTab === 'cores' ? 'var(--primary)' : 'transparent',
                  color: activeTab === 'cores' ? '#000' : 'var(--text-muted)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Zap size={12} /> SNN Cores
              </button>

              <button
                type="button"
                onClick={() => { sound.playClick(); setActiveTab('rf'); }}
                style={{
                  padding: '0.3rem 0.65rem',
                  borderRadius: '7px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  background: activeTab === 'rf' ? 'var(--primary)' : 'transparent',
                  color: activeTab === 'rf' ? '#000' : 'var(--text-muted)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Radio size={12} /> 6G Sub-THz
              </button>

              <button
                type="button"
                onClick={() => { sound.playClick(); setActiveTab('security'); }}
                style={{
                  padding: '0.3rem 0.65rem',
                  borderRadius: '7px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  background: activeTab === 'security' ? 'var(--primary)' : 'transparent',
                  color: activeTab === 'security' ? '#000' : 'var(--text-muted)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Shield size={12} /> PQC Vault
              </button>
            </div>

            <div className="showcase-status">TSMC 7nm / 12nm Ready</div>
          </div>

          {/* Media Content with Subsystem Overlays */}
          <div className="showcase-media" style={{ position: 'relative' }}>
            <img
              src={
                activeTab === 'rf'
                  ? '/assets/images/network_mesh.jpg'
                  : activeTab === 'cores' || activeTab === 'security'
                  ? '/assets/images/imc_booth.jpg'
                  : '/assets/images/hero_chip.jpg'
              }
              alt="Synapse-X Neuromorphic Edge AI Processor"
              className="showcase-img"
              style={{ transition: 'all 0.4s ease' }}
            />

            {/* Interactive Dynamic Telemetry Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '1rem',
              left: '1rem',
              right: '1rem',
              background: 'rgba(6, 10, 22, 0.88)',
              border: '1px solid rgba(0, 242, 254, 0.3)',
              borderRadius: '12px',
              padding: '0.75rem 1rem',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={14} style={{ color: '#00ff87' }} />
                <span style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 600 }}>
                  {activeTab === 'chip' && 'NeuroCore™ INT4/INT8 Neuromorphic Tensor Pipeline'}
                  {activeTab === 'cores' && '1,024 Spiking Neural Processing Elements (SNN PE Array)'}
                  {activeTab === 'rf' && '300GHz Sub-THz mmWave Phased Array Beam Steerer'}
                  {activeTab === 'security' && 'NIST CRYSTALS-Kyber-1024 Hardware PUF Root-of-Trust'}
                </span>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 700 }}>
                ● 100% OPERATIONAL
              </span>
            </div>
          </div>

          {/* Detailed Spec Badges */}
          <div className="showcase-caption">
            <div className="cap-item">
              <strong>Architecture:</strong> Spiking Neural Transformer Runtime (18.4 TOPS/W)
            </div>
            <div className="cap-item">
              <strong>Quantization:</strong> Lossless INT4 / INT8 Neuromorphic Weights
            </div>
            <div className="cap-item">
              <strong>Target Applications:</strong> Telecom 6G RAN, Autonomous Drones, Defense, Smart Grids
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
