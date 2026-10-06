import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Clock, MapPin } from 'lucide-react';

export default function LiveCountdown() {
  const { t } = useLanguage();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-10-07T09:00:00+05:30').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-banner">
      <div className="countdown-container">
        <div className="countdown-info">
          <span className="live-badge-pulse">
            <span className="pulsing-circle"></span>
            LIVE SUMMIT COUNTDOWN
          </span>
          <span className="countdown-title">
            India Mobile Congress 2026 &bull; Yashobhoomi, New Delhi
          </span>
        </div>

        <div className="countdown-timer-grid">
          <div className="timer-unit">
            <span className="timer-digit">{timeLeft.days}</span>
            <span className="timer-label">DAYS</span>
          </div>
          <span className="timer-colon">:</span>
          <div className="timer-unit">
            <span className="timer-digit">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="timer-label">HOURS</span>
          </div>
          <span className="timer-colon">:</span>
          <div className="timer-unit">
            <span className="timer-digit">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="timer-label">MINS</span>
          </div>
          <span className="timer-colon">:</span>
          <div className="timer-unit">
            <span className="timer-digit text-cyan">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="timer-label">SECS</span>
          </div>
        </div>

        <a href="#summit" className="countdown-cta">
          <MapPin size={14} />
          <span>Hall 3 #E-342</span>
        </a>
      </div>
    </div>
  );
}
