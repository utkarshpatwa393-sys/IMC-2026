import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/soundEffects';
import { Sliders, Activity, Thermometer, Cpu, Zap, Sparkles } from 'lucide-react';

export default function LiveHardwareSimulator() {
  const { t } = useLanguage();

  const [clockGhz, setClockGhz] = useState(1.8);
  const [activeCores, setActiveCores] = useState(2048);

  // Dynamic calculations based on neuromorphic hardware modeling
  const baseLatency = (0.42 / (clockGhz / 1.8)).toFixed(2);
  const powerMw = Math.round(120 * Math.pow(clockGhz / 1.8, 2) * (activeCores / 2048));
  const topsPerWatt = (18.4 * (1.8 / clockGhz)).toFixed(1);
  const tempCelsius = (32 + (clockGhz - 0.8) * 6.5).toFixed(1);
  const tokenRate = Math.round(240 * (clockGhz / 1.8));

  const handleClockChange = (val) => {
    setClockGhz(val);
    sound.playFrequencyHum(val / 1.8);
  };

  const handleCoresChange = (val) => {
    setActiveCores(val);
    sound.playHover();
  };

  // Thermal color gradient
  const thermalColor = clockGhz > 2.6 ? '#ff5555' : clockGhz > 1.8 ? '#ffaa00' : '#00ff87';

  return (
    <div className="simulator-card">
      {/* Header */}
      <div className="sim-header">
        <div className="sim-title-wrap">
          <Sliders size={20} className="text-cyan" />
          <div>
            <h4>Dynamic Silicon Architecture Simulator</h4>
            <p>Tune core clock frequency and synapse density to observe real-time hardware telemetry and thermal profiles.</p>
          </div>
        </div>
        <span className="sim-badge" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Activity size={12} style={{ color: '#00ff87' }} /> REAL-TIME DIE MODEL
        </span>
      </div>

      {/* Controls Grid */}
      <div className="sim-controls-grid">
        {/* Clock Frequency Slider */}
        <div className="sim-field">
          <div className="sim-label-row">
            <span>Clock Frequency:</span>
            <strong className="text-cyan">{clockGhz.toFixed(1)} GHz</strong>
          </div>
          <input
            type="range"
            min="0.8"
            max="3.2"
            step="0.1"
            value={clockGhz}
            onChange={(e) => handleClockChange(parseFloat(e.target.value))}
            className="sim-slider"
          />
          <div className="sim-limits">
            <span>0.8 GHz (Ultra Low Power)</span>
            <span>3.2 GHz (Turbo Mode)</span>
          </div>
        </div>

        {/* Active Synaptic Neurons Slider */}
        <div className="sim-field">
          <div className="sim-label-row">
            <span>Active Spiking Neurons:</span>
            <strong className="text-purple">{activeCores.toLocaleString()} Synapses</strong>
          </div>
          <input
            type="range"
            min="512"
            max="4096"
            step="256"
            value={activeCores}
            onChange={(e) => handleCoresChange(parseInt(e.target.value, 10))}
            className="sim-slider"
          />
          <div className="sim-limits">
            <span>512 Synapses</span>
            <span>4,096 Synapses</span>
          </div>
        </div>
      </div>

      {/* Dynamic Thermal Dissipation Bar */}
      <div style={{
        marginTop: '1.25rem',
        marginBottom: '1.5rem',
        background: 'rgba(0, 0, 0, 0.3)',
        padding: '0.85rem 1.25rem',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
          <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Thermometer size={13} style={{ color: thermalColor }} /> Die Thermal Load:
          </span>
          <strong style={{ color: thermalColor }}>{tempCelsius}°C ({clockGhz > 2.6 ? 'Active Fan Boost' : 'Passive Fanless'})</strong>
        </div>
        <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '100px', overflow: 'hidden' }}>
          <div style={{
            width: `${((clockGhz - 0.8) / (3.2 - 0.8)) * 100}%`,
            height: '100%',
            background: `linear-gradient(90deg, #00ff87 0%, #ffaa00 60%, #ff5555 100%)`,
            transition: 'width 0.15s ease-out'
          }} />
        </div>
      </div>

      {/* Dynamic Telemetry Display Grid */}
      <div className="sim-metrics-row">
        <div className="sim-m-box">
          <span className="sm-label">P99 INFERENCE LATENCY</span>
          <div className="sm-val text-cyan">{baseLatency} <span className="sm-unit">ms</span></div>
          <span className="sm-sub">Zero Cloud Lag</span>
        </div>

        <div className="sim-m-box">
          <span className="sm-label">POWER DISSIPATION</span>
          <div className="sm-val text-green">{powerMw} <span className="sm-unit">mW</span></div>
          <span className="sm-sub">Fanless Thermal</span>
        </div>

        <div className="sim-m-box">
          <span className="sm-label">ENERGY EFFICIENCY</span>
          <div className="sm-val text-purple">{topsPerWatt} <span className="sm-unit">TOPS/W</span></div>
          <span className="sm-sub">TSMC 7nm Target</span>
        </div>

        <div className="sim-m-box">
          <span className="sm-label">LOCAL THROUGHPUT</span>
          <div className="sm-val text-gold">{tokenRate} <span className="sm-unit">tok/s</span></div>
          <span className="sm-sub">Spiking SNN Stream</span>
        </div>
      </div>
    </div>
  );
}
