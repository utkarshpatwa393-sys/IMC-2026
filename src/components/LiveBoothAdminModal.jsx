import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/soundEffects';
import { X, Calendar, Download, Trash2, UserPlus, Shield, CheckCircle, RefreshCw, Users, Mail } from 'lucide-react';

export default function LiveBoothAdminModal({ isOpen, onClose, showToast }) {
  const { t } = useLanguage();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('meetings'); // 'meetings', 'leads', 'subscribers'

  const fetchOverview = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/overview');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchOverview();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDeleteMeeting = async (id) => {
    sound.playClick();
    if (!window.confirm('Delete this meeting booking?')) return;
    try {
      const res = await fetch(`/api/admin/meetings/${id}`, { method: 'DELETE' });
      if (res.ok) {
        sound.playTone(400, 0.08, 'sine');
        fetchOverview();
        if (showToast) showToast('Meeting removed.');
      }
    } catch {
      // ignore
    }
  };

  const handleSeedDemo = async () => {
    sound.playSweep();
    try {
      const res = await fetch('/api/admin/seed-demo', { method: 'POST' });
      if (res.ok) {
        sound.playSuccess();
        fetchOverview();
        if (showToast) showToast('Loaded VIP Showcase demo bookings for IMC 2026!');
      }
    } catch {
      // ignore
    }
  };

  const handleExportCSV = () => {
    sound.playClick();
    if (!data?.meetings?.length) {
      if (showToast) showToast('No meetings to export.');
      return;
    }

    const headers = ['Meeting ID', 'Attendee Name', 'Email', 'Organization', 'Topic', 'Date', 'Time', 'Booked At'];
    const rows = data.meetings.map(m => [
      m.id,
      `"${m.name || ''}"`,
      m.email,
      `"${m.org || ''}"`,
      `"${m.topic || ''}"`,
      `"${m.date || ''}"`,
      `"${m.time || ''}"`,
      m.createdAt || ''
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `SynapseX_IMC2026_Meetings_${Date.now()}.csv`;
    link.click();

    if (showToast) showToast('Exported meetings to CSV.');
  };

  const handleExportLeadsJSON = () => {
    sound.playClick();
    const exportData = {
      event: 'India Mobile Congress 2026',
      booth: 'Hall 3, Booth #E-342',
      exportedAt: new Date().toISOString(),
      leads: data?.leads || [],
      subscribers: data?.subscribers || []
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `SynapseX_IMC2026_Leads_${Date.now()}.json`;
    link.click();

    if (showToast) showToast('Exported leads & subscribers to JSON.');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(16px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        background: '#0a0f1d',
        border: '1px solid rgba(0, 242, 254, 0.3)',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '900px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 242, 254, 0.15)'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00ff87' }} />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#fff' }}>
                IMC 2026 Booth Operations & Telemetry Console
              </h2>
            </div>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Live real-time attendee management • Yashobhoomi Hall 3 Booth #E-342
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Action Toolbar */}
        <div style={{
          padding: '1rem 2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          background: 'rgba(0, 0, 0, 0.2)'
        }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveTab('meetings');
              }}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: 600,
                background: activeTab === 'meetings' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                color: activeTab === 'meetings' ? '#000' : 'var(--text-main)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Calendar size={14} /> Meetings ({data?.totalMeetings || 0})
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveTab('leads');
              }}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: 600,
                background: activeTab === 'leads' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                color: activeTab === 'leads' ? '#000' : 'var(--text-main)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Users size={14} /> Leads ({data?.totalLeads || 0})
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveTab('subscribers');
              }}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: 600,
                background: activeTab === 'subscribers' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                color: activeTab === 'subscribers' ? '#000' : 'var(--text-main)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Mail size={14} /> Subscribers ({data?.totalSubscribers || 0})
            </button>
          </div>

          {/* Export & Seed Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={handleSeedDemo}
              style={{
                padding: '0.5rem 0.85rem',
                borderRadius: '10px',
                background: 'rgba(255, 170, 0, 0.12)',
                border: '1px solid #ffaa00',
                color: '#ffaa00',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              ⚡ Load Demo VIPs
            </button>

            <button
              type="button"
              onClick={activeTab === 'meetings' ? handleExportCSV : handleExportLeadsJSON}
              style={{
                padding: '0.5rem 0.85rem',
                borderRadius: '10px',
                background: 'rgba(0, 242, 254, 0.12)',
                border: '1px solid var(--primary)',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Download size={14} /> Export {activeTab === 'meetings' ? 'CSV' : 'JSON'}
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              <RefreshCw size={24} className="animate-spin" style={{ margin: '0 auto 1rem' }} />
              <span>Synchronizing with Yashobhoomi database...</span>
            </div>
          ) : activeTab === 'meetings' ? (
            <div>
              {data?.meetings?.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  <Calendar size={36} style={{ opacity: 0.4, margin: '0 auto 1rem' }} />
                  <p>No meetings booked yet. Click "Load Demo VIPs" or book through the reservation form.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {data?.meetings?.map((m) => (
                    <div
                      key={m.id}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '14px',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        flexWrap: 'wrap'
                      }}
                    >
                      <div style={{ flex: 1, minWidth: '240px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{m.name}</span>
                          <span style={{ fontSize: '0.75rem', padding: '0.1rem 0.5rem', borderRadius: '100px', background: 'rgba(0, 242, 254, 0.12)', color: 'var(--primary)' }}>
                            {m.id}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          <strong>{m.org}</strong> • {m.email}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '0.25rem' }}>
                          📅 {m.date} | ⏰ {m.time} | 🎯 {m.topic}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => handleDeleteMeeting(m.id)}
                          style={{
                            background: 'rgba(255, 85, 85, 0.12)',
                            border: '1px solid rgba(255, 85, 85, 0.3)',
                            color: '#ff5555',
                            padding: '0.4rem 0.6rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            fontSize: '0.75rem'
                          }}
                        >
                          <Trash2 size={13} /> Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : activeTab === 'leads' ? (
            <div>
              {data?.leads?.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  <Users size={36} style={{ opacity: 0.4, margin: '0 auto 1rem' }} />
                  <p>No leads registered yet.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {data?.leads?.map((lead) => (
                    <div
                      key={lead.id}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '12px',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <strong style={{ color: '#fff' }}>{lead.name}</strong> • {lead.email}
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          Company: {lead.company} | Type: {lead.type}
                        </div>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#00ff87' }}>Verified Lead</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              {data?.subscribers?.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  <Mail size={36} style={{ opacity: 0.4, margin: '0 auto 1rem' }} />
                  <p>No whitepaper subscribers yet.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {data?.subscribers?.map((sub, i) => (
                    <div
                      key={i}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '12px',
                        padding: '0.85rem 1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span style={{ color: '#fff', fontSize: '0.9rem' }}>{sub.email}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {new Date(sub.subscribedAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '1rem 2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(0, 0, 0, 0.3)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <span>Founder Host: <strong>Utkarsh Patwa</strong> (CSE AI/ML)</span>
          <span>Server Uptime: <strong>{data?.serverUptimeSec || 0}s</strong></span>
        </div>
      </div>
    </div>
  );
}
