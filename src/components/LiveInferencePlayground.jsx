import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/soundEffects';
import { Play, Cpu, Zap, Shield, Radio, Activity, CheckCircle, RefreshCw, Layers } from 'lucide-react';

export default function LiveInferencePlayground({ showToast }) {
  const { t } = useLanguage();
  const [model, setModel] = useState('beam_steering');
  const [nodeLocation, setNodeLocation] = useState('yashobhoomi');
  const [spikingDensity, setSpikingDensity] = useState(85);
  const [quantization, setQuantization] = useState('int4');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [liveStopwatch, setLiveStopwatch] = useState(0);
  const [spikePoints, setSpikePoints] = useState([]);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const models = [
    {
      id: 'beam_steering',
      icon: Radio,
      title: '6G Sub-THz Beam Tracking',
      tag: '100 GHz – 300 GHz',
      desc: 'Predictive 360° phase array beam vector steering counteracting millisecond signal fading.'
    },
    {
      id: 'neuromorphic_vision',
      icon: EyeIcon,
      title: 'SNN Event-Vision Defect Detection',
      tag: '120 FPS Real-Time',
      desc: 'Neuromorphic spiking neural net processing asynchronous event camera streams with zero blur.'
    },
    {
      id: 'ran_congestion',
      icon: Zap,
      title: 'Autonomous RAN Traffic Balancer',
      tag: '100 Gbps Core Mesh',
      desc: 'Dynamic reinforcement learning orchestrating micro-cell packet routes during traffic surges.'
    },
    {
      id: 'post_quantum_lattice',
      icon: Shield,
      title: 'Kyber-1024 PQC Lattice Handshake',
      tag: 'NIST Quantum-Resistant',
      desc: 'Hardware Physical Unclonable Function (PUF) coupled with post-quantum lattice cryptography.'
    }
  ];

  function EyeIcon(props) {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    );
  }

  const nodes = [
    { id: 'yashobhoomi', label: '📍 Yashobhoomi Hall 3 (Booth #E-342 6G Testbed)' },
    { id: 'delhi_airport', label: '✈️ IGI Airport T3 Micro-Cell' },
    { id: 'iit_delhi', label: '🎓 IIT Delhi Terahertz Research Lab' },
    { id: 'bengaluru', label: '⚡ Bengaluru DeepTech Edge Node' }
  ];

  // Neural spike wave animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth * 2);
    let height = (canvas.height = canvas.offsetHeight * 2);

    let phase = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw neural spikes
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#00f2fe';
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(0, 242, 254, 0.6)';

      ctx.beginPath();
      const midY = height / 2;
      for (let x = 0; x < width; x += 4) {
        const normalizedX = x / width;
        let spike = Math.sin(normalizedX * 12 + phase) * Math.cos(normalizedX * 6 - phase);
        
        if (isRunning) {
          // Add chaotic spike bursts when running
          if (Math.sin(normalizedX * 35 + phase * 3) > 0.7) {
            spike += (Math.random() - 0.5) * 2.8;
          }
        }
        
        const y = midY + spike * (height * 0.35);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += isRunning ? 0.15 : 0.03;
      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isRunning]);

  const handleRunInference = async () => {
    sound.playSweep();
    setIsRunning(true);
    setResult(null);
    setLiveStopwatch(0);

    const startTime = performance.now();
    const interval = setInterval(() => {
      setLiveStopwatch(parseFloat(((performance.now() - startTime) / 1000).toFixed(3)));
    }, 20);

    try {
      const response = await fetch('/api/inference/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          nodeLocation,
          spikingDensity,
          quantization
        })
      });

      const data = await response.json();
      
      // Simulate realistic ultra-fast inference execution delay
      setTimeout(() => {
        clearInterval(interval);
        setIsRunning(false);
        setResult(data);
        sound.playSuccess();
        if (showToast) {
          showToast(`⚡ Inference complete: ${data.totalLatencyMs}ms (vs Cloud ${data.cloudLatencyMs}ms)`);
        }
      }, 750);

    } catch (err) {
      clearInterval(interval);
      setIsRunning(false);
      sound.playTone(220, 0.2, 'sawtooth', 0.1);
      if (showToast) showToast('Error communicating with Synapse-X Edge Engine.');
    }
  };

  return (
    <section className="section" id="playground">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge badge-primary" style={{ marginBottom: '1rem' }}>
            <Activity size={14} /> LIVE EDGE AI PLAYGROUND
          </div>
          <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
            Execute Live Edge AI Workloads
          </h2>
          <p className="text-muted" style={{ maxWidth: '750px', margin: '0 auto' }}>
            Trigger real-time neuromorphic inference across our distributed 6G testbed nodes. Compare edge microsecond execution against legacy central cloud GPUs.
          </p>
        </div>

        {/* Interactive Workspace */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: '2.5rem',
          backdropFilter: 'blur(20px)'
        }}>
          {/* Left Column: Workload Selector & Configuration */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem', display: 'block' }}>
                1. Select Neural Workload
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {models.map((m) => {
                  const Icon = m.icon;
                  const isSelected = model === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setModel(m.id);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem 1.25rem',
                        borderRadius: '14px',
                        textAlign: 'left',
                        background: isSelected ? 'rgba(0, 242, 254, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                        border: isSelected ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                        cursor: 'pointer',
                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    >
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: isSelected ? 'var(--primary)' : 'rgba(255, 255, 255, 0.06)',
                        color: isSelected ? '#000' : '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Icon size={20} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontWeight: 600, fontSize: '0.95rem', color: isSelected ? '#fff' : 'var(--text-main)' }}>
                            {m.title}
                          </span>
                          <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '100px', background: 'rgba(255, 255, 255, 0.06)', color: 'var(--primary)' }}>
                            {m.tag}
                          </span>
                        </div>
                        <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {m.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Testbed Node Selector */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem', display: 'block' }}>
                2. Target 6G Testbed Node
              </label>
              <select
                value={nodeLocation}
                onChange={(e) => {
                  sound.playClick();
                  setNodeLocation(e.target.value);
                }}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#fff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {nodes.map((n) => (
                  <option key={n.id} value={n.id} style={{ background: '#0a0f1d', color: '#fff' }}>
                    {n.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantization & Spiking Density */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>
                  Precision Quantization
                </label>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {['int4', 'int8', 'fp16'].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setQuantization(q);
                      }}
                      style={{
                        flex: 1,
                        padding: '0.5rem 0',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        borderRadius: '8px',
                        background: quantization === q ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                        color: quantization === q ? '#000' : 'var(--text-muted)',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>
                  Spike Rate: {spikingDensity}%
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={spikingDensity}
                  onChange={(e) => {
                    sound.playHover();
                    setSpikingDensity(parseInt(e.target.value, 10));
                  }}
                  style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
              </div>
            </div>

            {/* Execute Button */}
            <button
              type="button"
              disabled={isRunning}
              onClick={handleRunInference}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '1.1rem',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                boxShadow: isRunning ? '0 0 30px rgba(0, 242, 254, 0.5)' : 'none'
              }}
            >
              {isRunning ? (
                <>
                  <RefreshCw size={18} className="animate-spin" /> EXECUTING ON NEUROCORE...
                </>
              ) : (
                <>
                  <Play size={18} /> ⚡ RUN LIVE EDGE INFERENCE
                </>
              )}
            </button>
          </div>

          {/* Right Column: Dynamic Live Telemetry & Waveform Output */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Waveform Canvas */}
            <div style={{
              background: '#040814',
              borderRadius: '16px',
              border: '1px solid rgba(0, 242, 254, 0.2)',
              padding: '1.25rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Activity size={14} /> LIVE SNN NEURON SPIKE WAVEFORM
                </span>
                <span style={{ fontSize: '0.75rem', color: isRunning ? '#00ff87' : 'var(--text-muted)', fontFamily: 'monospace' }}>
                  {isRunning ? `PROFILING: ${liveStopwatch}s` : 'IDLE / READY'}
                </span>
              </div>
              <canvas
                ref={canvasRef}
                style={{
                  width: '100%',
                  height: '110px',
                  borderRadius: '8px',
                  display: 'block'
                }}
              />
            </div>

            {/* Inference Result Card */}
            {result ? (
              <div style={{
                background: 'rgba(0, 242, 254, 0.05)',
                border: '1px solid rgba(0, 242, 254, 0.3)',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                animation: 'fadeIn 0.3s ease-out'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#00ff87', fontWeight: 600, fontSize: '0.9rem' }}>
                    <CheckCircle size={18} /> INFERENCE EXECUTED SUCCESSFULLY
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {result.node?.name?.split(' ')[0]} Testbed
                  </span>
                </div>

                {/* Metrics Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: '10px', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>EDGE LATENCY</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#00f2fe' }}>{result.totalLatencyMs} ms</span>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: '10px', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>CLOUD EQUIVALENT</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ff5555' }}>{result.cloudLatencyMs} ms</span>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: '10px', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>SPEEDUP</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#00ff87' }}>{result.speedupRatio}x</span>
                  </div>
                </div>

                {/* Technical Output Summary */}
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '10px', borderLeft: '3px solid var(--primary)' }}>
                  <strong style={{ color: '#fff', display: 'block', marginBottom: '0.3rem' }}>{result.modelDetails?.name}:</strong>
                  {result.modelDetails?.resultSummary}
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--primary)' }}>
                    <span>⚡ Power: {result.modelDetails?.powerConsumedMw} mW</span>
                    <span>🎯 Accuracy: {result.modelDetails?.accuracyPct}%</span>
                    <span>🧠 Spikes: {(result.modelDetails?.spikesProcessed / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px dashed rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                padding: '2.5rem 1.5rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem'
              }}>
                <Cpu size={36} style={{ color: 'var(--primary)', opacity: 0.6 }} />
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Telemetry Ready for Real-Time Execution</span>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '360px', margin: 0 }}>
                  Click <strong>Run Live Edge Inference</strong> to profile hardware execution metrics, spiking spikes, and speedup ratios.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
