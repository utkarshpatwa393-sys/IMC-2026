import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/soundEffects';
import { Cpu, Radio, ShieldCheck, Eye, ChevronRight, CheckCircle2, Layers, Sparkles } from 'lucide-react';

export default function Solutions() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [selectedSolution, setSelectedSolution] = useState(null);

  const solutionsData = [
    {
      id: 'silicon',
      category: 'silicon',
      icon: <Cpu size={28} className="text-cyan" />,
      titleKey: 'sol1_title',
      descKey: 'sol1_desc',
      features: ['sol1_f1', 'sol1_f2', 'sol1_f3'],
      metrics: {
        tops: '18.4 TOPS/W',
        latency: '0.42ms P99',
        power: '<150mW Active',
        process: 'TSMC 7nm / 12nm Ready'
      }
    },
    {
      id: 'mesh',
      category: 'mesh',
      icon: <Radio size={28} className="text-cyan" />,
      titleKey: 'sol2_title',
      descKey: 'sol2_desc',
      features: ['sol2_f1', 'sol2_f2', 'sol2_f3'],
      metrics: {
        throughput: '100 Gbps Core',
        spectrum: '100–300 GHz Sub-THz',
        healing: '<0.05ms Failover',
        standard: '3GPP Rel 19 / 6G'
      }
    },
    {
      id: 'security',
      category: 'security',
      icon: <ShieldCheck size={28} className="text-cyan" />,
      titleKey: 'sol3_title',
      descKey: 'sol3_desc',
      features: ['sol3_f1', 'sol3_f2', 'sol3_f3'],
      metrics: {
        algorithm: 'CRYSTALS-Kyber-1024',
        puf: 'Hardware PUF Level 5',
        handshake: '120 µs Latency',
        threat: 'Quantum-Immune Zero-Trust'
      }
    },
    {
      id: 'vision',
      category: 'vision',
      icon: <Eye size={28} className="text-cyan" />,
      titleKey: 'sol4_title',
      descKey: 'sol4_desc',
      features: ['sol4_f1', 'sol4_f2', 'sol4_f3'],
      metrics: {
        fps: '120 FPS Real-Time',
        latency: '<5.0ms Detection',
        accuracy: '99.4% Defect Recall',
        runtime: 'ONNX / PyTorch SNN'
      }
    }
  ];

  const filteredSolutions = filter === 'all'
    ? solutionsData
    : solutionsData.filter(s => s.category === filter);

  return (
    <section className="section-block" id="solutions">
      <div className="container">
        
        {/* Title Wrap */}
        <div className="section-title-wrap">
          <div className="section-pill">
            <Layers size={14} /> {t('solutions_pill')}
          </div>
          <h2 className="section-heading">
            {t('solutions_heading').replace('Intelligent Edge', '')}
            <span className="gradient-text">Intelligent Edge</span>
          </h2>
          <p className="section-subtext">{t('solutions_subtext')}</p>
        </div>

        {/* Dynamic Category Filter Pills */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem'
        }}>
          {[
            { id: 'all', label: 'All Architectures' },
            { id: 'silicon', label: '🧠 Neuromorphic Silicon' },
            { id: 'mesh', label: '🗼 6G Cognitive Mesh' },
            { id: 'security', label: '🛡️ QuantumShield™' },
            { id: 'vision', label: '👁️ SynapseVision™' }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                sound.playClick();
                setFilter(cat.id);
              }}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '100px',
                fontSize: '0.85rem',
                fontWeight: 600,
                background: filter === cat.id ? 'var(--primary)' : 'rgba(255, 255, 255, 0.04)',
                color: filter === cat.id ? '#000' : 'var(--text-main)',
                border: filter === cat.id ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Solutions Grid */}
        <div className="solutions-grid">
          {filteredSolutions.map((item) => (
            <div
              key={item.id}
              className="solution-card"
              onMouseEnter={() => sound.playHover()}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease'
              }}
            >
              <div>
                <div className="card-icon">{item.icon}</div>
                <h3 className="card-title">{t(item.titleKey)}</h3>
                <p className="card-desc">{t(item.descKey)}</p>
                <ul className="card-list">
                  {item.features.map((fKey, fIdx) => (
                    <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <CheckCircle2 size={14} style={{ color: '#00ff87', flexShrink: 0 }} />
                      <span>{t(fKey)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dynamic Technical Metric Chips */}
              <div style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
                fontSize: '0.75rem'
              }}>
                {Object.entries(item.metrics).map(([key, val]) => (
                  <div key={key} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.4rem 0.6rem', borderRadius: '8px' }}>
                    <span style={{ color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', fontSize: '0.65rem' }}>{key}</span>
                    <strong style={{ color: '#fff' }}>{val}</strong>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
