import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/soundEffects';
import { Menu, X, Calendar, Volume2, VolumeX, Activity } from 'lucide-react';

export default function Navbar({ onOpenConsole }) {
  const { lang, setLang, t } = useLanguage();
  const { currentTheme, setTheme, allThemes } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(sound.enabled);

  const handleToggleSound = () => {
    const next = sound.toggle();
    setSoundEnabled(next);
  };

  return (
    <>
      {/* Top Summit Announcement Banner */}
      <div className="top-banner">
        <div className="banner-inner">
          <div className="banner-tag">
            <span className="live-dot"></span>
            <span>{t('banner_summit')}</span>
          </div>
          <span className="banner-text">
            {t('banner_text')}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                if (onOpenConsole) onOpenConsole();
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#fff',
                padding: '0.25rem 0.65rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                whiteSpace: 'nowrap'
              }}
            >
              <Activity size={12} style={{ color: '#00ff87' }} /> Live Console
            </button>
            <a href="#summit" className="banner-btn" onClick={() => sound.playClick()}>
              {t('banner_cta')}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar Header */}
      <header className="navbar">
        <div className="nav-wrapper">
          {/* Brand Logo */}
          <a href="#" className="brand" onClick={() => sound.playClick()}>
            <div className="brand-symbol">
              <svg viewBox="0 0 100 100" className="brand-svg">
                <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round"/>
                <circle cx="50" cy="50" r="14" fill="currentColor"/>
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-title">SYNAPSE<span className="accent-text">-X</span></span>
              <span className="brand-subtitle">EDGE AI • 6G</span>
            </div>
          </a>

          {/* Centered Desktop Navigation Links */}
          <nav className="nav-links">
            <a href="#solutions" className="nav-item" onClick={() => sound.playHover()}>{t('nav_solutions')}</a>
            <a href="#technology" className="nav-item" onClick={() => sound.playHover()}>{t('nav_technology')}</a>
            <a href="#summit" className="nav-item highlight-nav" onClick={() => sound.playHover()}>📍 {t('nav_summit')}</a>
            <a href="#playground" className="nav-item" onClick={() => sound.playHover()}>⚡ {t('nav_demo')}</a>
            <a href="#demo" className="nav-item" onClick={() => sound.playHover()}>Benchmarks</a>
            <a href="#roi" className="nav-item" onClick={() => sound.playHover()}>{t('nav_roi')}</a>
            <a href="#founder" className="nav-item" onClick={() => sound.playHover()}>{t('nav_founder')}</a>
          </nav>

          {/* Right Action Tools */}
          <div className="nav-actions">
            {/* Theme Switcher Dots */}
            <div className="theme-switcher-wrap" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '0.2rem 0.4rem',
              borderRadius: '100px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              flexShrink: 0
            }}>
              {Object.keys(allThemes).map((key) => {
                const th = allThemes[key];
                const active = currentTheme === key;
                return (
                  <button
                    key={key}
                    type="button"
                    title={th.name}
                    onClick={() => {
                      sound.playClick();
                      setTheme(key);
                    }}
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: th.primary,
                      border: active ? '2px solid #ffffff' : 'none',
                      boxShadow: active ? `0 0 8px ${th.primary}` : 'none',
                      cursor: 'pointer',
                      transform: active ? 'scale(1.2)' : 'scale(0.85)',
                      transition: 'all 0.15s ease',
                      padding: 0
                    }}
                  />
                );
              })}
            </div>

            {/* Sound FX Toggle */}
            <button
              type="button"
              onClick={handleToggleSound}
              title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                width: '32px',
                height: '32px',
                color: soundEnabled ? 'var(--primary)' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            {/* Language Selector */}
            <div className="lang-selector-wrap" style={{ flexShrink: 0 }}>
              <select
                value={lang}
                onChange={(e) => {
                  sound.playClick();
                  setLang(e.target.value);
                }}
                className="lang-select"
                aria-label="Select Language"
              >
                <option value="en">🇺🇸 EN</option>
                <option value="hi">🇮🇳 हिन्दी</option>
                <option value="ja">🇯🇵 日本語</option>
                <option value="es">🇪🇸 ES</option>
                <option value="de">🇩🇪 DE</option>
              </select>
            </div>

            {/* Schedule Meeting Button */}
            <a href="#summit" className="btn-primary btn-nav" onClick={() => sound.playClick()}>
              <Calendar size={14} />
              <span>{t('btn_book_meeting')}</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-btn"
              onClick={() => {
                sound.playClick();
                setMobileOpen(!mobileOpen);
              }}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={20} color="#ffffff" /> : <Menu size={20} color="#ffffff" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="mobile-nav-drawer open">
            <a href="#solutions" className="mob-item" onClick={() => setMobileOpen(false)}>{t('nav_solutions')}</a>
            <a href="#technology" className="mob-item" onClick={() => setMobileOpen(false)}>{t('nav_technology')}</a>
            <a href="#summit" className="mob-item" onClick={() => setMobileOpen(false)}>📍 {t('nav_summit')}</a>
            <a href="#playground" className="mob-item" onClick={() => setMobileOpen(false)}>⚡ {t('nav_demo')}</a>
            <a href="#demo" className="mob-item" onClick={() => setMobileOpen(false)}>Benchmarks</a>
            <a href="#roi" className="mob-item" onClick={() => setMobileOpen(false)}>{t('nav_roi')}</a>
            <a href="#founder" className="mob-item" onClick={() => setMobileOpen(false)}>{t('nav_founder')}</a>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button
                type="button"
                className="btn-secondary w-full"
                onClick={() => {
                  setMobileOpen(false);
                  if (onOpenConsole) onOpenConsole();
                }}
              >
                <Activity size={14} /> Live Booth Console
              </button>
            </div>

            <a href="#summit" className="btn-primary w-full text-center mt-2" onClick={() => setMobileOpen(false)}>
              {t('btn_book_meeting')}
            </a>
          </div>
        )}
      </header>
    </>
  );
}
