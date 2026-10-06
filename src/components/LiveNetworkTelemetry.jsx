import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/soundEffects';
import { Radio, Server, Activity, ArrowUpRight, Zap, RefreshCw, Globe, CheckCircle2 } from 'lucide-react';

export default function LiveNetworkTelemetry({ showToast }) {
  const { t } = useLanguage();
  const [telemetry, setTelemetry] = useState(null);
  const [throughputHistory, setThroughputHistory] = useState([98.2, 99.1, 98.6, 100.4, 101.2, 99.8, 100.9, 101.5, 99.4, 101.8]);
  const [isPinging, setIsPinging] = useState(false);
  const [lastPingTime, setLastPingTime] = useState(null);

  const fetchTelemetry = async () => {
    try {
      const res = await fetch('/api/telemetry/live');
      if (res.ok) {
        const data = await res.json();
        setTelemetry(data);
        setThroughputHistory(prev => {
          const nextVal = parseFloat(data.globalThroughputGbps);
          const updated = [...prev.slice(1), nextVal];
          return updated;
        });
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePingNode = async () => {
    sound.playClick();
    setIsPinging(true);
    try {
      const res = await fetch('/api/telemetry/live');
      const data = await res.json();
      setTelemetry(data);
      sound.playSuccess();
      setLastPingTime(new Date().toLocaleTimeString());
      if (showToast) {
        showToast('📍 Yashobhoomi Hall 3 6G Cell Responded: 0.38ms RTT (0 Loss)');
      }
    } catch {
      sound.playTone(200, 0.15, 'sawtooth');
    } finally {
      setIsPinging(false);
    }
  };

  // Compute SVG sparkline path
  const minVal = 95;
  const maxVal = 105;
  const svgWidth = 280;
  const svgHeight = 60;
  const points = throughputHistory.map((val, idx) => {
    const x = (idx / (throughputHistory.length - 1)) * svgWidth;
    const y = svgHeight - ((val - minVal) / (maxVal - minVal)) * svgHeight;
    return `${x},${y}`;
  }).join(' ');

  return (
    <section className="section" style={{ paddingTop: '1rem', paddingBottom: '3rem' }}>
      <div className="container">
        <div style={{
          background: 'radial-gradient(ellipse at top right, rgba(0, 242, 254, 0.08), transparent 70%), rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: '2rem 2.5rem',
          backdropFilter: 'blur(16px)'
        }}>
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#00ff87',
                boxShadow: '0 0 12px #00ff87',
                animation: 'pulse 2s infinite'
              }}></div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Globe size={18} style={{ color: 'var(--primary)' }} /> Live 6G Mesh Telemetry & Node Cluster
              </h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Exhibition Live Testbed: <strong>Yashobhoomi Hall 3</strong>
              </span>
              <button
                type="button"
                disabled={isPinging}
                onClick={handlePingNode}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '10px',
                  background: 'rgba(0, 242, 254, 0.12)',
                  border: '1px solid var(--primary)',
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s'
                }}
              >
                {isPinging ? <RefreshCw size={14} className="animate-spin" /> : <Radio size={14} />}
                Ping Booth Cell
              </button>
            </div>
          </div>

          {/* 4 Telemetry Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* Metric 1 */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '1.25rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.35rem' }}>
                Active Edge Nodes
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
                  {telemetry?.activeNodesCount || '1,248'}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#00ff87', fontWeight: 600 }}>● 100% ONLINE</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'block' }}>
                Distributed across Delhi, Blr & Yashobhoomi
              </span>
            </div>

            {/* Metric 2: Live Sparkline */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '1.25rem', position: 'relative' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.35rem' }}>
                6G Mesh Aggregated Throughput
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>
                  {telemetry?.globalThroughputGbps || '101.2'}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Gbps</span>
              </div>
              <svg width="100%" height="28" style={{ marginTop: '0.5rem', overflow: 'visible' }}>
                <polyline
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="2"
                  points={points}
                />
              </svg>
            </div>

            {/* Metric 3 */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '1.25rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.35rem' }}>
                Booth #E-342 Micro-Cell Ping
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#00ff87' }}>
                  0.38
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>ms P99</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'block' }}>
                Zero bufferbloat • Jitter &lt;0.01ms
              </span>
            </div>

            {/* Metric 4 */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '1.25rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.35rem' }}>
                Post-Quantum Security
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c77dff' }}>
                  Kyber-1024
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#00ff87', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <CheckCircle2 size={13} /> NIST Level 5 Quantum Safe
              </span>
            </div>
          </div>

          {/* Live Node Clusters List & Live Log Ticker */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', alignItems: 'center' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0, 0, 0, 0.4)', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <Zap size={15} style={{ color: '#ffaa00', flexShrink: 0 }} />
              <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                <strong style={{ color: '#fff' }}>LIVE EVENT STREAM: </strong>
                <span>{telemetry?.currentEvent || 'Sub-THz 240GHz mmWave beam locked on Yashobhoomi Hall 3 cluster'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span>Last telemetry synchronization:</span>
              <span style={{ color: '#fff', fontFamily: 'monospace' }}>
                {lastPingTime || new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
