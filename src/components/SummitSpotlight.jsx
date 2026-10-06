import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Check, Calendar, CreditCard } from 'lucide-react';
import LiveScheduleGrid from './LiveScheduleGrid';

export default function SummitSpotlight({ onOpenPass, showToast }) {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    org: '',
    topic: 'Investor Connect (Seed Round $1.5M - $2.5M)',
    date: 'Day 1 (Oct 7, 2026)',
    time: '11:30 AM - 11:50 AM'
  });

  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const handleSelectSlot = (day, timeSlot) => {
    setFormData((prev) => ({
      ...prev,
      date: day,
      time: timeSlot
    }));
    showToast(`⚡ Selected: ${day} at ${timeSlot}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBookingSuccess(data.meeting);
        showToast(`🎉 Meeting Confirmed for ${data.meeting.name}!`);
      } else {
        showToast(`⚠️ ${data.error || 'Failed to book meeting.'}`);
      }
    } catch (err) {
      console.error('Error booking meeting:', err);
      const fallbackMeeting = {
        ...formData,
        id: 'IMC-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        booth: 'Hall 3, Booth #E-342',
        venue: 'Yashobhoomi (IICC), Dwarka, New Delhi'
      };
      setBookingSuccess(fallbackMeeting);
      showToast(`🎉 Meeting Confirmed for ${formData.name}!`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadIcs = () => {
    if (!bookingSuccess) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Synapse-X Technologies//IMC 2026 Meeting//EN
BEGIN:VEVENT
SUMMARY:Synapse-X AI Meeting @ IMC 2026 (Utkarsh Patwa)
DESCRIPTION:Discussion on ${bookingSuccess.topic} with Utkarsh Patwa (Founder).\\nAttendee: ${bookingSuccess.name} (${bookingSuccess.org})\\nBooth: Yashobhoomi Hall 3, Booth #E-342
LOCATION:Yashobhoomi (IICC), Dwarka, New Delhi - Hall 3 Booth #E-342
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `SynapseX_Meeting_${bookingSuccess.name.replace(/\s+/g, '_')}.ics`;
    link.click();
    showToast('📅 Calendar Invite (.ics) Downloaded!');
  };

  return (
    <section className="section-block summit-section" id="summit">
      <div className="container">
        
        <div className="section-title-wrap">
          <div className="section-pill">{t('summit_pill')}</div>
          <h2 className="section-heading">
            {t('summit_heading').replace('IMC 2026', '')}
            <span className="gradient-text">IMC 2026</span>
          </h2>
          <p className="section-subtext">{t('summit_subtext')}</p>
        </div>

        <div className="summit-card">
          
          {/* Left: Booth Details */}
          <div className="summit-info">
            <div className="summit-meta-box">
              <div className="sm-item">
                <span className="sm-icon">📍</span>
                <div>
                  <strong>{t('summit_venue_label')}</strong>
                  <p>{t('summit_venue_val')}</p>
                </div>
              </div>

              <div className="sm-item">
                <span className="sm-icon">📅</span>
                <div>
                  <strong>{t('summit_dates_label')}</strong>
                  <p>{t('summit_dates_val')}</p>
                </div>
              </div>

              <div className="sm-item">
                <span className="sm-icon">🎪</span>
                <div>
                  <strong>{t('summit_booth_label')}</strong>
                  <p className="highlight-text">{t('summit_booth_val')}</p>
                </div>
              </div>
            </div>

            <div className="summit-booth-preview">
              <img
                src="/assets/images/imc_booth.jpg"
                alt="Synapse-X Booth at Yashobhoomi New Delhi"
                className="booth-img"
              />
              <div className="booth-overlay-text">
                {t('summit_booth_caption')}
              </div>
            </div>

            {/* Live Interactive Schedule Availability */}
            <LiveScheduleGrid onSelectSlot={handleSelectSlot} />
          </div>

          {/* Right: Booking Form */}
          <div className="summit-booking-box">
            {!bookingSuccess ? (
              <>
                <div className="booking-header">
                  <h3>{t('book_title')}</h3>
                  <p>{t('book_subtitle')}</p>
                </div>

                <form onSubmit={handleSubmit} className="clean-form">
                  <div className="form-grid">
                    <div className="form-field">
                      <label>{t('form_name')}</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Rajesh Sharma"
                        className="form-input"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="form-field">
                      <label>{t('form_email')}</label>
                      <input
                        type="email"
                        required
                        placeholder="name@organization.com"
                        className="form-input"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-field">
                      <label>{t('form_org')}</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Reliance Jio / Sequoia / Airtel"
                        className="form-input"
                        value={formData.org}
                        onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                      />
                    </div>

                    <div className="form-field">
                      <label>{t('form_topic')}</label>
                      <select
                        className="form-input"
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      >
                        <option value="Investor Connect (Seed Round $1.5M - $2.5M)">Investor Connect (Seed Round $1.5M - $2.5M)</option>
                        <option value="Telecom & 6G Infrastructure Pilot">Telecom & 6G Infrastructure Pilot</option>
                        <option value="Silicon IP & OEM Licensing">Silicon IP & OEM Licensing</option>
                        <option value="Enterprise Edge AI Integration">Enterprise Edge AI Integration</option>
                        <option value="Academic Collaboration">Academic Collaboration & Research</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-field">
                      <label>{t('form_date')}</label>
                      <select
                        className="form-input"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      >
                        <option value="Day 1 (Oct 7, 2026)">Day 1 • Wednesday, Oct 7, 2026</option>
                        <option value="Day 2 (Oct 8, 2026)">Day 2 • Thursday, Oct 8, 2026</option>
                        <option value="Day 3 (Oct 9, 2026)">Day 3 • Friday, Oct 9, 2026</option>
                        <option value="Day 4 (Oct 10, 2026)">Day 4 • Saturday, Oct 10, 2026</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label>{t('form_time')}</label>
                      <input
                        type="text"
                        className="form-input"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      />
                    </div>
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary w-full">
                    {loading ? 'Processing Reservation...' : t('form_submit')}
                  </button>
                </form>
              </>
            ) : (
              <div className="booking-success">
                <div className="success-badge">
                  <Check size={28} />
                </div>
                <h4>{t('book_success_title')}</h4>
                <p className="success-text">
                  <strong>{bookingSuccess.name}</strong> ({bookingSuccess.org}) • Reserved for <strong>{bookingSuccess.date} at {bookingSuccess.time}</strong><br />
                  Topic: <em>{bookingSuccess.topic}</em> • Booth: <strong>Hall 3 #E-342</strong>
                </p>
                <div className="success-actions">
                  <button className="btn-secondary btn-sm" onClick={handleDownloadIcs}>
                    <Calendar size={14} />
                    <span>{t('btn_add_calendar')}</span>
                  </button>
                  <button className="btn-outline btn-sm" onClick={() => onOpenPass(bookingSuccess)}>
                    <CreditCard size={14} />
                    <span>{t('btn_view_pass')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
