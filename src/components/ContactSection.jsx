import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, Send } from 'lucide-react';

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section className="section-block contact-section" id="contact">
      <div className="container">
        
        <div className="contact-card">
          <div className="contact-content">
            <div className="section-pill">{t('contact_pill')}</div>
            <h2 className="contact-title">
              {t('contact_heading').replace('IMC 2026', '')}
              <span className="gradient-text">IMC 2026</span>
            </h2>
            <p className="contact-desc">{t('contact_desc')}</p>

            <div className="contact-highlights">
              <div className="ch-item">
                <strong>Booth Location:</strong> Hall 3, Booth #E-342 (Startup Pavilion)
              </div>
              <div className="ch-item">
                <strong>Summit Dates:</strong> October 7 – 10, 2026 • Yashobhoomi New Delhi
              </div>
              <div className="ch-item">
                <strong>Founder Contact:</strong> Utkarsh Patwa • contact@synapsex.ai
              </div>
            </div>
          </div>

          <div className="contact-action">
            <a href="#summit" className="btn-primary btn-lg w-full text-center">
              <Calendar size={18} />
              <span>{t('contact_btn_schedule')}</span>
            </a>
            <a
              href="https://www.linkedin.com/in/utkarsh-patwa-7b6b84381/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-lg w-full text-center mt-2"
            >
              <span>{t('contact_btn_in')}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
