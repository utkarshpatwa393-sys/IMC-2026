import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';

export default function LiveScheduleGrid({ onSelectSlot }) {
  const [schedule, setSchedule] = useState([
    {
      day: 'Day 1 (Oct 7, 2026)',
      slots: [
        { time: '10:30 AM', status: 'available' },
        { time: '11:30 AM', status: 'booked' },
        { time: '02:00 PM', status: 'available' },
        { time: '03:30 PM', status: 'available' },
        { time: '04:30 PM', status: 'booked' }
      ]
    },
    {
      day: 'Day 2 (Oct 8, 2026)',
      slots: [
        { time: '10:30 AM', status: 'available' },
        { time: '11:30 AM', status: 'available' },
        { time: '02:00 PM', status: 'booked' },
        { time: '03:30 PM', status: 'available' },
        { time: '04:30 PM', status: 'available' }
      ]
    },
    {
      day: 'Day 3 (Oct 9, 2026)',
      slots: [
        { time: '10:30 AM', status: 'booked' },
        { time: '11:30 AM', status: 'available' },
        { time: '02:00 PM', status: 'available' },
        { time: '03:30 PM', status: 'booked' },
        { time: '04:30 PM', status: 'available' }
      ]
    },
    {
      day: 'Day 4 (Oct 10, 2026)',
      slots: [
        { time: '10:30 AM', status: 'available' },
        { time: '11:30 AM', status: 'available' },
        { time: '02:00 PM', status: 'available' },
        { time: '03:30 PM', status: 'available' },
        { time: '04:30 PM', status: 'booked' }
      ]
    }
  ]);

  const [activeDayIdx, setActiveDayIdx] = useState(0);

  useEffect(() => {
    fetch('/api/schedule/slots')
      .then((res) => res.json())
      .then((data) => {
        if (data.schedule && data.schedule.length > 0) {
          setSchedule(data.schedule);
        }
      })
      .catch((err) => console.log('Using local schedule cache'));
  }, []);

  const activeDay = schedule[activeDayIdx] || schedule[0];

  return (
    <div className="live-schedule-box">
      <div className="sched-header">
        <div className="sched-title-wrap">
          <Calendar size={18} className="text-cyan" />
          <h5>Live Booth Meeting Availability</h5>
        </div>
        <span className="sched-pill">📍 Hall 3 #E-342</span>
      </div>

      <div className="day-tabs">
        {schedule.map((d, idx) => (
          <button
            key={idx}
            className={`day-tab ${activeDayIdx === idx ? 'active' : ''}`}
            onClick={() => setActiveDayIdx(idx)}
          >
            {d.day.split(' ')[0]} {d.day.split(' ')[1]}
          </button>
        ))}
      </div>

      <div className="slots-grid">
        {activeDay.slots.map((slot, sIdx) => (
          <div
            key={sIdx}
            className={`slot-card ${slot.status === 'booked' ? 'slot-booked' : 'slot-avail'}`}
            onClick={() => {
              if (slot.status === 'available' && onSelectSlot) {
                onSelectSlot(activeDay.day, `${slot.time} - ${slot.time.replace('30', '50').replace('00', '20')}`);
              }
            }}
          >
            <Clock size={14} />
            <span>{slot.time}</span>
            <span className="slot-badge">
              {slot.status === 'booked' ? 'Reserved' : 'Available'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
