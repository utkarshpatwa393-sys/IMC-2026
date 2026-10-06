import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/soundEffects';
import { Sparkles, Sliders, Zap } from 'lucide-react';

export default function LiveCanvas() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);
  const [density, setDensity] = useState(55);
  const [showControls, setShowControls] = useState(false);

  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];
    const maxDistance = 140;

    const mouse = {
      x: null,
      y: null,
      radius: 170
    };

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7 * speedMultiplier;
        this.vy = (Math.random() - 0.5) * 0.7 * speedMultiplier;
        this.radius = Math.random() * 2.2 + 0.8;
        this.alpha = Math.random() * 0.5 + 0.25;
      }

      update() {
        this.x += this.vx * speedMultiplier;
        this.y += this.vy * speedMultiplier;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 2.2;
            this.y -= (dy / dist) * force * 2.2;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = theme?.primary ? `${theme.primary}${Math.floor(this.alpha * 255).toString(16).padStart(2, '0')}` : `rgba(0, 242, 254, ${this.alpha})`;
        ctx.fill();
      }
    }

    particles = [];
    for (let i = 0; i < density; i++) {
      particles.push(new Particle());
    }
    particlesRef.current = particles;

    let animationId;
    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const opacity = (1 - dist / maxDistance) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.strokeStyle = theme?.primary ? `${theme.primary}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}` : `rgba(0, 242, 254, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      if (mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < particles.length; i++) {
          const dx = mouse.x - particles[i].x;
          const dy = mouse.y - particles[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const opacity = (1 - dist / 130) * 0.45;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationId);
    };
  }, [theme, speedMultiplier, density]);

  const triggerQuantumBurst = () => {
    sound.playSweep();
    if (particlesRef.current) {
      particlesRef.current.forEach((p) => {
        p.vx = (Math.random() - 0.5) * 6.0;
        p.vy = (Math.random() - 0.5) * 6.0;
      });
      setTimeout(() => {
        if (particlesRef.current) {
          particlesRef.current.forEach((p) => {
            p.vx = (Math.random() - 0.5) * 0.7 * speedMultiplier;
            p.vy = (Math.random() - 0.5) * 0.7 * speedMultiplier;
          });
        }
      }, 800);
    }
  };

  return (
    <>
      <canvas ref={canvasRef} className="live-neural-canvas" />

      {/* Floating Canvas Controls in Bottom Left */}
      <div style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '1.5rem',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '0.5rem'
      }}>
        {showControls && (
          <div style={{
            background: 'rgba(6, 10, 22, 0.92)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            padding: '1rem 1.25rem',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
            width: '220px',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>PARTICLE CONTROL</span>
              <button
                type="button"
                onClick={triggerQuantumBurst}
                style={{
                  background: 'rgba(0, 242, 254, 0.15)',
                  border: '1px solid var(--primary)',
                  color: 'var(--primary)',
                  borderRadius: '6px',
                  padding: '0.2rem 0.4rem',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                💥 Quantum Pulse
              </button>
            </div>

            <div style={{ marginBottom: '0.6rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                <span>Speed:</span>
                <span>{speedMultiplier}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.2"
                value={speedMultiplier}
                onChange={(e) => {
                  sound.playHover();
                  setSpeedMultiplier(parseFloat(e.target.value));
                }}
                style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                <span>Density:</span>
                <span>{density} nodes</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={density}
                onChange={(e) => {
                  sound.playHover();
                  setDensity(parseInt(e.target.value, 10));
                }}
                style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setShowControls(!showControls);
          }}
          title="Toggle Neural Particle Settings"
          style={{
            background: 'rgba(13, 19, 35, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '100px',
            padding: '0.45rem 0.85rem',
            color: 'var(--text-main)',
            fontSize: '0.75rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}
        >
          <Sparkles size={13} style={{ color: 'var(--primary)' }} />
          <span>Canvas FX</span>
        </button>
      </div>
    </>
  );
}
