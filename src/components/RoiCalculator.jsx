import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/soundEffects';
import { Calculator, DollarSign, IndianRupee, Sparkles, TrendingDown, Leaf, ShieldCheck } from 'lucide-react';

export default function RoiCalculator() {
  const { t } = useLanguage();
  const [currency, setCurrency] = useState('USD'); // 'USD' or 'INR'
  const [devices, setDevices] = useState(12000);
  const [inferences, setInferences] = useState(6000);
  const [cloudRate, setCloudRate] = useState(0.004); // $ per 1,000 API calls

  const USD_TO_INR = 84.0;

  const annualInferences = devices * inferences * 365;
  const annualCloudCostUSD = (annualInferences / 1000) * cloudRate;
  const annualSynapseCostUSD = annualCloudCostUSD * 0.085; // 91.5% reduction
  const annualSavingsUSD = annualCloudCostUSD - annualSynapseCostUSD;

  const formatCurrency = (valUSD) => {
    if (currency === 'INR') {
      const valINR = valUSD * USD_TO_INR;
      if (valINR >= 10000000) {
        return `₹${(valINR / 10000000).toFixed(2)} Cr`;
      } else if (valINR >= 100000) {
        return `₹${(valINR / 100000).toFixed(2)} Lakh`;
      }
      return `₹${Math.round(valINR).toLocaleString('en-IN')}`;
    } else {
      if (valUSD >= 1000000) {
        return `$${(valUSD / 1000000).toFixed(2)}M`;
      } else if (valUSD >= 1000) {
        return `$${(valUSD / 1000).toFixed(1)}k`;
      }
      return `$${Math.round(valUSD).toLocaleString()}`;
    }
  };

  const co2Tons = ((annualInferences * 0.0000018) / 1000).toFixed(1);

  return (
    <section className="section-block" id="roi">
      <div className="container">
        {/* Section Title */}
        <div className="section-title-wrap">
          <div className="section-pill">
            <Calculator size={14} /> {t('roi_pill')}
          </div>
          <h2 className="section-heading">
            {t('roi_heading').replace('Enterprise Savings', '')}
            <span className="gradient-text">Enterprise Savings</span>
          </h2>
          <p className="section-subtext">{t('roi_subtext')}</p>
        </div>

        {/* Calculator Main Box */}
        <div className="roi-card">
          {/* Controls Header: Currency Switcher */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
            <div style={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '10px',
              padding: '0.25rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setCurrency('USD');
                }}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: '8px',
                  background: currency === 'USD' ? 'var(--primary)' : 'transparent',
                  color: currency === 'USD' ? '#000' : 'var(--text-muted)',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <DollarSign size={13} /> USD ($)
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setCurrency('INR');
                }}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: '8px',
                  background: currency === 'INR' ? 'var(--primary)' : 'transparent',
                  color: currency === 'INR' ? '#000' : 'var(--text-muted)',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <IndianRupee size={13} /> INR (₹)
              </button>
            </div>
          </div>

          <div className="roi-inputs">
            {/* Slider 1: Active Devices */}
            <div className="slider-field">
              <div className="slider-top">
                <label>{t('roi_devices_label')}</label>
                <span className="range-val">{devices.toLocaleString()} units</span>
              </div>
              <input
                type="range"
                min="500"
                max="250000"
                step="500"
                value={devices}
                onChange={(e) => {
                  sound.playHover();
                  setDevices(parseInt(e.target.value, 10));
                }}
                className="roi-slider"
              />
            </div>

            {/* Slider 2: Daily Inferences per Device */}
            <div className="slider-field">
              <div className="slider-top">
                <label>{t('roi_inferences_label')}</label>
                <span className="range-val">{inferences.toLocaleString()} / day</span>
              </div>
              <input
                type="range"
                min="500"
                max="30000"
                step="500"
                value={inferences}
                onChange={(e) => {
                  sound.playHover();
                  setInferences(parseInt(e.target.value, 10));
                }}
                className="roi-slider"
              />
            </div>

            {/* Visual Comparison Breakdown Bar */}
            <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.25rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                <span>Legacy Central Cloud Bill</span>
                <span style={{ color: '#ff5555', fontWeight: 700 }}>{formatCurrency(annualCloudCostUSD)} / yr</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255, 85, 85, 0.2)', borderRadius: '100px', overflow: 'hidden', marginBottom: '1rem' }}>
                <div style={{ width: '100%', height: '100%', background: '#ff5555' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                <span>Synapse-X Neuromorphic Edge Cost</span>
                <span style={{ color: '#00ff87', fontWeight: 700 }}>{formatCurrency(annualSynapseCostUSD)} / yr</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(0, 255, 135, 0.2)', borderRadius: '100px', overflow: 'hidden' }}>
                <div style={{ width: '8.5%', height: '100%', background: '#00ff87' }} />
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="roi-display">
            <div className="roi-metric-main">
              <div className="roi-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                <Sparkles size={16} style={{ color: '#00ff87' }} /> {t('roi_savings_label')}
              </div>
              <div className="roi-number gradient-text">{formatCurrency(annualSavingsUSD)}</div>
              <div className="roi-note">91.5% OPEX Reduction vs AWS / OpenAI Cloud APIs</div>
            </div>

            <div className="roi-sub-stats">
              <div className="roi-sub-item">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <TrendingDown size={14} /> {t('roi_lat_drop')}
                </span>
                <strong className="text-cyan">0.42ms (98.2% Drop)</strong>
              </div>
              <div className="roi-sub-item">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Leaf size={14} /> {t('roi_co2_drop')}
                </span>
                <strong className="text-green">{co2Tons} Metric Tons</strong>
              </div>
              <div className="roi-sub-item">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <ShieldCheck size={14} /> {t('roi_privacy')}
                </span>
                <strong className="text-cyan">100% On-Device PUF</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
