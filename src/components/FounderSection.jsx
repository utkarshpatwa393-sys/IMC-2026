import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail } from 'lucide-react';

export default function FounderSection() {
  const { t } = useLanguage();

  return (
    <section className="section-block" id="founder">
      <div className="container">
        
        <div className="section-title-wrap">
          <div className="section-pill">{t('founder_pill')}</div>
          <h2 className="section-heading">
            {t('founder_heading').replace('Academic Roots', '')}
            <span className="gradient-text">Academic Roots</span>
          </h2>
          <p className="section-subtext">{t('founder_subtext')}</p>
        </div>

        <div className="founder-card">
          
          <div className="founder-avatar-col">
            <div className="avatar-box">
              <span className="avatar-initials">UP</span>
            </div>
            <div className="founder-badge">
              <span className="live-dot-sm"></span>
              <span>{t('founder_speaker_tag')}</span>
            </div>
          </div>

          <div className="founder-details-col">
            <h3 className="founder-name">Utkarsh Patwa</h3>
            <div className="founder-role">{t('founder_title')}</div>
            
            <div className="founder-meta">
              <span>🏛️ <strong>{t('founder_dept')}</strong></span>
              <span>📍 <strong>{t('founder_inst')}</strong></span>
            </div>

            <p className="founder-desc">{t('founder_bio')}</p>

            <div className="founder-buttons">
              <a
                href="https://www.linkedin.com/in/utkarsh-patwa-7b6b84381/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-linkedin"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>{t('btn_linkedin')}</span>
              </a>

              <a href="mailto:contact@synapsex.ai" className="btn-secondary">
                <Mail size={16} />
                <span>contact@synapsex.ai</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
