import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import LiveCountdown from './components/LiveCountdown';
import LiveCanvas from './components/LiveCanvas';
import Hero from './components/Hero';
import LiveHardwareSimulator from './components/LiveHardwareSimulator';
import LiveNetworkTelemetry from './components/LiveNetworkTelemetry';
import LiveInferencePlayground from './components/LiveInferencePlayground';
import SummitSpotlight from './components/SummitSpotlight';
import Solutions from './components/Solutions';
import Technology from './components/Technology';
import LiveBenchmark from './components/LiveBenchmark';
import RoiCalculator from './components/RoiCalculator';
import FounderSection from './components/FounderSection';
import ContactSection from './components/ContactSection';
import VipPassModal from './components/VipPassModal';
import LiveBoothAdminModal from './components/LiveBoothAdminModal';
import LiveChatbot from './components/LiveChatbot';
import Footer from './components/Footer';

export default function App() {
  const [activePass, setActivePass] = useState(null);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleDownloadWhitepaper = () => {
    showToast('📄 Downloading Executive Briefing (PDF)...');
    const content = `SYNAPSE-X AI — EXECUTIVE BRIEFING (INDIA MOBILE CONGRESS 2026)
----------------------------------------------------------------------
Founder: Utkarsh Patwa (CSE AI/ML, Hi-Tech Institute of Engineering & Technology)
Summit: India Mobile Congress 2026 (Oct 7-10, Yashobhoomi, New Delhi)
Booth: Hall 3, Booth #E-342 (Startup & DeepTech Pavilion)
Contact: contact@synapsex.ai | LinkedIn: https://www.linkedin.com/in/utkarsh-patwa-7b6b84381/

MISSION & CORE ARCHITECTURE:
- Sub-millisecond on-device AI inference (0.42ms P99)
- Energy efficiency: 18.4 TOPS / Watt with INT4 Spiking Neural Quantization
- Autonomous 6G Sub-THz Cognitive Mesh Routing (100 Gbps Throughput)
- Post-Quantum Cryptography (NIST Kyber-1024)
- Target: $1.5M - $2.5M Seed Round for TSMC MPW Tapeout & Telecom Pilots`;

    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'SynapseX_IMC2026_Executive_Summary.txt';
    link.click();
  };

  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="app-container">
          {/* Dynamic Interactive Background Particle Canvas */}
          <LiveCanvas />

          {/* Ambient Lighting */}
          <div className="ambient-glow top-glow"></div>
          <div className="ambient-glow mid-glow"></div>

          {/* Top Navigation */}
          <Navbar onOpenConsole={() => setIsConsoleOpen(true)} />

          {/* Live Ticking Countdown to IMC 2026 */}
          <LiveCountdown />
          
          <main>
            {/* Hero Section */}
            <Hero onDownloadWhitepaper={handleDownloadWhitepaper} />
            
            {/* Live Hardware Clock & Thermal Simulator */}
            <div className="container" style={{ marginBottom: '3rem' }}>
              <LiveHardwareSimulator />
            </div>

            {/* Live 6G Network Telemetry & Node Cluster */}
            <LiveNetworkTelemetry showToast={showToast} />

            {/* Live Edge AI Inference Playground Sandbox */}
            <LiveInferencePlayground showToast={showToast} />

            {/* IMC 2026 Summit Spotlight & Meeting Reservation */}
            <SummitSpotlight onOpenPass={(data) => setActivePass(data)} showToast={showToast} />
            
            {/* Core Capabilities & Distributed 6G Architecture */}
            <Solutions />
            <Technology />
            
            {/* Live Benchmark Sandbox */}
            <LiveBenchmark showToast={showToast} />
            
            {/* Enterprise ROI & Cloud Savings Calculator */}
            <RoiCalculator />
            
            {/* Founder Spotlight: Utkarsh Patwa */}
            <FounderSection />
            
            {/* Contact & Data Room */}
            <ContactSection />
          </main>

          <Footer onOpenConsole={() => setIsConsoleOpen(true)} />

          {/* Floating Dynamic AI Assistant (SynapseBot) */}
          <LiveChatbot />

          {/* Digital VIP Summit Pass Modal */}
          <VipPassModal passData={activePass} onClose={() => setActivePass(null)} />

          {/* Live Booth Operations & Telemetry Console Modal */}
          <LiveBoothAdminModal
            isOpen={isConsoleOpen}
            onClose={() => setIsConsoleOpen(false)}
            showToast={showToast}
          />

          {/* Interactive Toast Notifications */}
          <div className="toast-box">
            {toasts.map((toast) => (
              <div key={toast.id} className="toast-item">
                {toast.message}
              </div>
            ))}
          </div>
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}
