import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  cyber: {
    id: 'cyber',
    name: 'Cyber Cyan',
    icon: '🌌',
    primary: '#00f2fe',
    glow: 'rgba(0, 242, 254, 0.4)',
    secondary: '#4facfe',
    accent: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
    badgeBg: 'rgba(0, 242, 254, 0.1)',
    badgeBorder: 'rgba(0, 242, 254, 0.3)'
  },
  emerald: {
    id: 'emerald',
    name: 'Neuromorphic Emerald',
    icon: '⚡',
    primary: '#00ff87',
    glow: 'rgba(0, 255, 135, 0.4)',
    secondary: '#60efff',
    accent: 'linear-gradient(135deg, #00ff87 0%, #60efff 100%)',
    badgeBg: 'rgba(0, 255, 135, 0.1)',
    badgeBorder: 'rgba(0, 255, 135, 0.3)'
  },
  solar: {
    id: 'solar',
    name: '6G Solar Flare',
    icon: '🛰️',
    primary: '#ffaa00',
    glow: 'rgba(255, 170, 0, 0.4)',
    secondary: '#ff5500',
    accent: 'linear-gradient(135deg, #ffaa00 0%, #ff5500 100%)',
    badgeBg: 'rgba(255, 170, 0, 0.1)',
    badgeBorder: 'rgba(255, 170, 0, 0.3)'
  },
  quantum: {
    id: 'quantum',
    name: 'Quantum Frost',
    icon: '🧊',
    primary: '#9d4edd',
    glow: 'rgba(157, 78, 221, 0.4)',
    secondary: '#c77dff',
    accent: 'linear-gradient(135deg, #9d4edd 0%, #c77dff 100%)',
    badgeBg: 'rgba(157, 78, 221, 0.1)',
    badgeBorder: 'rgba(157, 78, 221, 0.3)'
  }
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('synapse_theme');
      return themes[saved] ? saved : 'cyber';
    } catch {
      return 'cyber';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('synapse_theme', currentTheme);
    } catch {
      // ignore
    }

    const t = themes[currentTheme] || themes.cyber;
    const root = document.documentElement;
    root.style.setProperty('--primary', t.primary);
    root.style.setProperty('--primary-glow', t.glow);
    root.style.setProperty('--secondary', t.secondary);
    root.style.setProperty('--accent-gradient', t.accent);
  }, [currentTheme]);

  const setTheme = (themeId) => {
    if (themes[themeId]) {
      setCurrentTheme(themeId);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, theme: themes[currentTheme], setTheme, allThemes: themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
