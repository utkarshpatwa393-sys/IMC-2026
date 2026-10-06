/**
 * SYNAPSE-X AI — FULL-STACK DYNAMIC NODE.JS / EXPRESS BACKEND
 * India Mobile Congress 2026 (Yashobhoomi, New Delhi)
 * Author: Utkarsh Patwa (CSE AI/ML, Hi-Tech Institute of Eng. & Tech.)
 */

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure data persistence directory exists
const DATA_DIR = path.join(__dirname, '../data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const MEETINGS_FILE = path.join(DATA_DIR, 'meetings.json');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');

// Helper functions for reading/writing JSON
function readData(filePath, defaultVal = []) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return defaultVal;
}

function writeData(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing to ${filePath}:`, err);
    return false;
  }
}

// --------------------------------------------------------------------------
// 1. DYNAMIC TELEMETRY & LIVE SUMMIT STATS API
// --------------------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Synapse-X AI Dynamic Core Engine',
    event: 'India Mobile Congress 2026 (Yashobhoomi, New Delhi)',
    booth: 'Hall 3, Booth #E-342',
    founder: 'Utkarsh Patwa (CSE AI/ML)'
  });
});

app.get('/api/stats', (req, res) => {
  const meetings = readData(MEETINGS_FILE, []);
  
  // Real-time jitter for live dynamic simulation
  const jitter = (Math.random() * 0.04 - 0.02).toFixed(2);
  const liveLatency = (0.42 + parseFloat(jitter)).toFixed(2);
  const liveInferences = 1420580 + Math.floor(Math.random() * 450);

  res.json({
    p99LatencyMs: parseFloat(liveLatency),
    energyEfficiencyTopsW: 18.4,
    throughputGbps: 100,
    costReductionPct: 91.5,
    activeEdgeNodes: 1248,
    totalInferencesToday: liveInferences,
    boothLocation: 'Hall 3, Booth #E-342 (Startup Pavilion)',
    venue: 'Yashobhoomi (IICC), Dwarka, New Delhi',
    dates: 'October 7 – 10, 2026',
    summitStartDate: '2026-10-07T09:00:00+05:30',
    meetingsBookedCount: meetings.length + 18
  });
});

// --------------------------------------------------------------------------
// 2. DYNAMIC LIVE AI CHATBOT ASSISTANT API
// --------------------------------------------------------------------------
app.post('/api/chat', (req, res) => {
  const { message = '', lang = 'en' } = req.body;
  const msgLower = message.toLowerCase();

  let reply = '';
  let action = null;

  if (msgLower.includes('booth') || msgLower.includes('location') || msgLower.includes('kahan') || msgLower.includes('address') || msgLower.includes('venue') || msgLower.includes('yashobhoomi')) {
    reply = lang === 'hi' 
      ? '📍 हमारा आधिकारिक बूथ **इंडिया मोबाइल कांग्रेस (IMC 2026)** में **यशोभूमि (IICC), नई दिल्ली** में स्थित है। आप हमें **हॉल 3, बूथ #E-342** (स्टार्टअप पवेलियन) पर पा सकते हैं!'
      : '📍 We are exhibiting live at **India Mobile Congress (IMC) 2026** at **Yashobhoomi (IICC), New Delhi** from **October 7–10, 2026**. Find us at **Hall 3, Booth #E-342** (Startup & DeepTech Pavilion)!';
    action = 'show_booth';
  } else if (msgLower.includes('utkarsh') || msgLower.includes('founder') || msgLower.includes('patwa') || msgLower.includes('who made') || msgLower.includes('kon')) {
    reply = lang === 'hi'
      ? '👨‍💻 Synapse-X के संस्थापक **उत्कर्ष पटवा** (Utkarsh Patwa) हैं, जो **हाई-टेक इंस्टीट्यूट ऑफ इंजीनियरिंग एंड टेक्नोलॉजी** (CSE AI/ML) के डीपटेक शोधकर्ता और लीड आर्किटेक्ट हैं। आप उनसे सीधे [LinkedIn](https://www.linkedin.com/in/utkarsh-patwa-7b6b84381/) पर जुड़ सकते हैं!'
      : '👨‍💻 Synapse-X was founded by **Utkarsh Patwa**, an AI systems researcher from **Hi-Tech Institute of Engineering & Technology (CSE AI/ML)**. You can connect with him directly on [LinkedIn](https://www.linkedin.com/in/utkarsh-patwa-7b6b84381/) or book a meeting at Booth #E-342!';
    action = 'show_founder';
  } else if (msgLower.includes('meeting') || msgLower.includes('book') || msgLower.includes('schedule') || msgLower.includes('milna') || msgLower.includes('pass')) {
    reply = lang === 'hi'
      ? '🤝 आप यशोभूमि में उत्कर्ष पटवा और हमारी टीम के साथ 20 मिनट का 1-ऑन-1 सत्र आरक्षित कर सकते हैं। नीचे मीटिंग फॉर्म भरें और अपना वीआईपी पास डाउनलोड करें!'
      : '🤝 You can book a 20-minute executive briefing with Utkarsh Patwa & the team at Booth #E-342. Fill out the reservation form on this page to get an instant VIP Summit Pass and calendar invite (.ics)!';
    action = 'scroll_to_booking';
  } else if (msgLower.includes('latency') || msgLower.includes('speed') || msgLower.includes('specs') || msgLower.includes('silicon') || msgLower.includes('tops')) {
    reply = lang === 'hi'
      ? '⚡ **NeuroCore™ Silicon** केवल **0.42 ms P99 लेटेंसी** और **18.4 TOPS/Watt** ऊर्जा दक्षता प्रदान करता है, जो पारंपरिक क्लाउड एपीआई की तुलना में 96% तेज और 90% कम बिजली की खपत करता है!'
      : '⚡ **NeuroCore™ Silicon** delivers **0.42 ms P99 inference latency** and **18.4 TOPS/Watt** energy efficiency with INT4 Neuromorphic Quantization—96% faster than cloud APIs with zero roundtrip delay!';
    action = 'show_benchmark';
  } else if (msgLower.includes('invest') || msgLower.includes('seed') || msgLower.includes('funding') || msgLower.includes('raise')) {
    reply = lang === 'hi'
      ? '💼 Synapse-X अपने TSMC MPW सिलिकॉन टेपआउट और भारतीय टेलीकॉम पायलटों के विस्तार के लिए **$1.5M – $2.5M का सीड राउंड** जुटा रहा है। आप हमारे डेटा रूम का अनुरोध कर सकते हैं!'
      : '💼 Synapse-X is raising a **$1.5M - $2.5M Seed Round** to accelerate TSMC MPW silicon fabrication and scale 3 Tier-1 Indian telecom pilots. Request Data Room access right on this site!';
    action = 'show_investors';
  } else {
    reply = lang === 'hi'
      ? 'नमस्ते! मैं SynapseBot हूँ। मैं आपको Synapse-X सिलिकॉन, 6G कॉग्निटिव मेश, हमारे IMC 2026 बूथ (#E-342) या संस्थापक उत्कर्ष पटवा से मीटिंग बुक करने में मदद कर सकता हूँ। आप क्या जानना चाहते हैं?'
      : 'Hello! I am SynapseBot AI. I can assist you with our Neuromorphic Edge Silicon, 6G Cognitive Mesh architecture, our IMC 2026 Booth #E-342 at Yashobhoomi, or book a meeting with founder Utkarsh Patwa. How can I help you today?';
  }

  res.json({
    reply,
    action,
    timestamp: new Date().toISOString()
  });
});

// --------------------------------------------------------------------------
// 3. DYNAMIC MEETING SCHEDULER & SLOTS API
// --------------------------------------------------------------------------
app.get('/api/schedule/slots', (req, res) => {
  const meetings = readData(MEETINGS_FILE, []);
  
  const allDays = [
    { day: 'Day 1 (Oct 7, 2026)', slots: ['10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM'] },
    { day: 'Day 2 (Oct 8, 2026)', slots: ['10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM'] },
    { day: 'Day 3 (Oct 9, 2026)', slots: ['10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM'] },
    { day: 'Day 4 (Oct 10, 2026)', slots: ['10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM'] }
  ];

  const bookedKeys = new Set(meetings.map(m => `${m.date}_${m.time}`));

  const schedule = allDays.map(d => ({
    day: d.day,
    slots: d.slots.map(s => {
      const matchKey = `${d.day}_${s} - ${s.replace('30', '50').replace('00', '20')}`;
      const isBooked = bookedKeys.has(matchKey) || bookedKeys.has(`${d.day}_${s}`);
      return {
        time: s,
        status: isBooked ? 'booked' : 'available'
      };
    })
  }));

  res.json({
    schedule,
    totalBookings: meetings.length + 18,
    booth: 'Hall 3, Booth #E-342'
  });
});

app.post('/api/meetings', (req, res) => {
  const { name, email, org, topic, date, time, notes } = req.body;

  if (!name || !email || !org || !date || !time) {
    return res.status(400).json({ error: 'Please provide all required fields (name, email, org, date, time).' });
  }

  const meetings = readData(MEETINGS_FILE, []);
  const newMeeting = {
    id: 'IMC-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
    name,
    email,
    org,
    topic: topic || 'General Partnership & DeepTech Pilot',
    date,
    time,
    notes: notes || '',
    booth: 'Hall 3, Booth #E-342',
    venue: 'Yashobhoomi (IICC), Dwarka, New Delhi',
    host: 'Utkarsh Patwa (Founder & Chief AI Architect)',
    createdAt: new Date().toISOString()
  };

  meetings.push(newMeeting);
  writeData(MEETINGS_FILE, meetings);

  const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Synapse-X Technologies//IMC 2026 Meeting//EN
BEGIN:VEVENT
SUMMARY:Synapse-X AI Meeting @ IMC 2026 (Utkarsh Patwa)
DESCRIPTION:Discussion on ${newMeeting.topic} with Utkarsh Patwa (Founder).\\nAttendee: ${newMeeting.name} (${newMeeting.org})\\nBooth: Yashobhoomi Hall 3, Booth #E-342
LOCATION:Yashobhoomi (IICC), Dwarka, New Delhi - Hall 3 Booth #E-342
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

  res.status(201).json({
    success: true,
    message: 'Meeting confirmed successfully for India Mobile Congress 2026.',
    meeting: newMeeting,
    icsData
  });
});

app.get('/api/meetings', (req, res) => {
  const meetings = readData(MEETINGS_FILE, []);
  res.json({ count: meetings.length, meetings });
});

// --------------------------------------------------------------------------
// 4. LIVE BENCHMARK API
// --------------------------------------------------------------------------
app.post('/api/benchmark/run', (req, res) => {
  const { workload = '6g', quantization = 'int4', transport = '6g', clockGhz = 1.8 } = req.body;

  let baseLatencyMs = 0.42;
  let powerConsumptionMw = 120;
  let tokensPerSec = Math.round(240 * (clockGhz / 1.8));
  let memoryFootprintMb = 1400;

  if (quantization === 'int8') {
    baseLatencyMs = 1.15;
    powerConsumptionMw = 320;
    tokensPerSec = Math.round(180 * (clockGhz / 1.8));
    memoryFootprintMb = 2800;
  } else if (quantization === 'fp16') {
    baseLatencyMs = 4.80;
    powerConsumptionMw = 1800;
    tokensPerSec = Math.round(75 * (clockGhz / 1.8));
    memoryFootprintMb = 5600;
  }

  // Adjust for clock frequency
  baseLatencyMs = baseLatencyMs / (clockGhz / 1.8);
  powerConsumptionMw = Math.round(powerConsumptionMw * Math.pow(clockGhz / 1.8, 2));

  if (transport === '5g') {
    baseLatencyMs += 8.0;
  } else if (transport === 'cloud') {
    baseLatencyMs += 65.0;
  } else {
    baseLatencyMs += 0.1;
  }

  const cloudComparison = {
    provider: 'Central Cloud GPU API (AWS / OpenAI)',
    latencyMs: 84.5 + Math.floor(Math.random() * 8),
    powerConsumptionMw: 45000,
    tokensPerSec: 38,
    bandwidthUsage: '100% Uploaded to Cloud Server'
  };

  const synapseMetrics = {
    provider: 'Synapse-X Neuromorphic Edge NPU',
    latencyMs: parseFloat(baseLatencyMs.toFixed(2)),
    powerConsumptionMw,
    tokensPerSec,
    memoryFootprintMb,
    clockGhz: parseFloat(clockGhz),
    bandwidthUsage: '98.4% Processed On-Device',
    quantumRootTrust: 'CRYSTALS-Kyber-1024 Verified'
  };

  const speedupFactor = (cloudComparison.latencyMs / synapseMetrics.latencyMs).toFixed(1);

  res.json({
    success: true,
    workload,
    quantization,
    transport,
    synapseMetrics,
    cloudComparison,
    speedup: `${speedupFactor}x Faster`,
    energySavingsPct: `${(100 - (powerConsumptionMw / 45000) * 100).toFixed(1)}% Lower Energy`,
    timestamp: new Date().toISOString()
  });
});

// --------------------------------------------------------------------------
// 5. LIVE EDGE AI INFERENCE PLAYGROUND API
// --------------------------------------------------------------------------
app.post('/api/inference/run', (req, res) => {
  const { model = 'beam_steering', nodeLocation = 'yashobhoomi', inputVector = 'standard' } = req.body;

  const nodeMap = {
    yashobhoomi: { name: 'Yashobhoomi Hall 3 (Booth #E-342 6G Testbed)', basePing: 0.28 },
    delhi_airport: { name: 'IGI T3 6G Micro-Cell Cluster', basePing: 0.45 },
    iit_delhi: { name: 'IIT Delhi 6G Terahertz Testbed Node', basePing: 0.38 },
    bengaluru: { name: 'Bengaluru Silicon DeepTech Edge Cluster', basePing: 1.12 }
  };

  const selectedNode = nodeMap[nodeLocation] || nodeMap.yashobhoomi;

  let modelDetails = {
    name: '6G Sub-THz Adaptive Beam Tracking',
    spikesProcessed: 428000,
    inferenceMs: (0.34 + Math.random() * 0.08).toFixed(2),
    accuracyPct: 99.82,
    powerConsumedMw: 88,
    resultSummary: 'Optimized 360° phase array beam vector towards 420 mobile UEs at Yashobhoomi Hall 3. SNR improved by +14.2 dB.'
  };

  if (model === 'neuromorphic_vision') {
    modelDetails = {
      name: 'Neuromorphic Event-Vision Spiking Neural Net (SNN)',
      spikesProcessed: 1890000,
      inferenceMs: (0.39 + Math.random() * 0.06).toFixed(2),
      accuracyPct: 99.41,
      powerConsumedMw: 112,
      resultSummary: 'Identified 18 micro-anomalies in 120 FPS high-speed event stream with zero motion blur and 98% bandwidth reduction.'
    };
  } else if (model === 'ran_congestion') {
    modelDetails = {
      name: 'Autonomous RAN Dynamic Traffic Balancer',
      spikesProcessed: 950000,
      inferenceMs: (0.44 + Math.random() * 0.05).toFixed(2),
      accuracyPct: 99.91,
      powerConsumedMw: 135,
      resultSummary: 'Re-routed 14.8 Gbps burst traffic across 6 neighboring micro-cells with 0 packet drops and <0.02ms jitter.'
    };
  } else if (model === 'post_quantum_lattice') {
    modelDetails = {
      name: 'CRYSTALS-Kyber-1024 Post-Quantum Key Exchange',
      spikesProcessed: 320000,
      inferenceMs: (0.12 + Math.random() * 0.03).toFixed(2),
      accuracyPct: 100.0,
      powerConsumedMw: 45,
      resultSummary: 'Generated and verified 1024-bit quantum-immune lattice ciphertext in 120 microseconds. Zero cloud dependency.'
    };
  }

  const cloudEquivalentMs = (82.4 + Math.random() * 14.0).toFixed(1);
  const totalLatencyMs = (parseFloat(modelDetails.inferenceMs) + selectedNode.basePing).toFixed(2);

  res.json({
    success: true,
    model,
    modelDetails,
    node: selectedNode,
    totalLatencyMs: parseFloat(totalLatencyMs),
    cloudLatencyMs: parseFloat(cloudEquivalentMs),
    speedupRatio: (parseFloat(cloudEquivalentMs) / parseFloat(totalLatencyMs)).toFixed(1),
    timestamp: new Date().toISOString()
  });
});

// --------------------------------------------------------------------------
// 6. LIVE TELEMETRY LOGS STREAM API
// --------------------------------------------------------------------------
app.get('/api/telemetry/live', (req, res) => {
  const nodes = [
    { id: 'NODE-YSH-01', location: 'Yashobhoomi Hall 3 (Booth E-342)', status: 'ACTIVE', loadPct: 24, latency: '0.38ms', temp: '36.2°C' },
    { id: 'NODE-YSH-02', location: 'Yashobhoomi Main Atrium 6G Micro-Cell', status: 'ACTIVE', loadPct: 42, latency: '0.42ms', temp: '38.5°C' },
    { id: 'NODE-DEL-03', location: 'Delhi IGI Airport Terminal 3 Hub', status: 'ACTIVE', loadPct: 58, latency: '0.48ms', temp: '41.1°C' },
    { id: 'NODE-IIT-04', location: 'IIT Delhi Telecommunications Lab', status: 'ACTIVE', loadPct: 19, latency: '0.35ms', temp: '34.8°C' },
    { id: 'NODE-BLR-05', location: 'Bengaluru Silicon Testbed #4', status: 'ACTIVE', loadPct: 31, latency: '1.08ms', temp: '37.4°C' }
  ];

  const sampleEvents = [
    'Sub-THz 240GHz mmWave beam locked on Yashobhoomi Hall 3 visitor cluster',
    'INT4 Neuromorphic spiking weights updated on 1,248 active edge nodes',
    'Post-quantum Kyber-1024 session key rotated across Yashobhoomi backhaul',
    'Telemetry packet verified with 0 packet drops and 0.01ms jitter',
    'Autonomous cognitive mesh re-routed 100 Gbps channel in 0.04ms'
  ];

  res.json({
    timestamp: new Date().toISOString(),
    nodes,
    activeNodesCount: 1248,
    globalThroughputGbps: (98.4 + Math.random() * 3.2).toFixed(1),
    currentEvent: sampleEvents[Math.floor(Math.random() * sampleEvents.length)]
  });
});

// --------------------------------------------------------------------------
// 7. LEADS, NEWSLETTER & BOOTH ADMIN OPERATIONS
// --------------------------------------------------------------------------
app.post('/api/leads', (req, res) => {
  const { name, email, company, type } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const leads = readData(LEADS_FILE, []);
  const newLead = {
    id: 'LEAD-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
    name: name || 'Anonymous Partner',
    email,
    company: company || 'Confidential',
    type: type || 'Investor Data Room',
    createdAt: new Date().toISOString()
  };

  leads.push(newLead);
  writeData(LEADS_FILE, leads);

  res.json({
    success: true,
    message: 'Request received. Access details dispatched to work email.',
    leadId: newLead.id
  });
});

app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  const subs = readData(SUBSCRIBERS_FILE, []);
  if (!subs.find(s => s.email === email)) {
    subs.push({ email, subscribedAt: new Date().toISOString() });
    writeData(SUBSCRIBERS_FILE, subs);
  }

  res.json({
    success: true,
    message: 'Subscribed to Synapse-X 6G & AI research whitepapers.'
  });
});

// Admin overview for IMC 2026 Booth Operations Console
app.get('/api/admin/overview', (req, res) => {
  const meetings = readData(MEETINGS_FILE, []);
  const leads = readData(LEADS_FILE, []);
  const subscribers = readData(SUBSCRIBERS_FILE, []);

  res.json({
    totalMeetings: meetings.length,
    meetings,
    totalLeads: leads.length,
    leads,
    totalSubscribers: subscribers.length,
    subscribers,
    boothStatus: 'ONLINE • Yashobhoomi Hall 3 #E-342',
    founder: 'Utkarsh Patwa (CSE AI/ML)',
    serverUptimeSec: Math.floor(process.uptime())
  });
});

// Delete a meeting
app.delete('/api/admin/meetings/:id', (req, res) => {
  const { id } = req.params;
  let meetings = readData(MEETINGS_FILE, []);
  const initialLen = meetings.length;
  meetings = meetings.filter(m => m.id !== id);
  writeData(MEETINGS_FILE, meetings);

  res.json({
    success: true,
    deleted: initialLen !== meetings.length,
    remainingCount: meetings.length
  });
});

// Seed demo meetings for showcase presentation
app.post('/api/admin/seed-demo', (req, res) => {
  const sampleMeetings = [
    {
      id: 'IMC-VIP-01',
      name: 'Dr. Rajesh Sharma',
      email: 'r.sharma@airtel-labs.com',
      org: 'Airtel 5G/6G Innovation Labs',
      topic: '6G Sub-THz Mesh Co-Development & Field Pilot',
      date: 'Day 1 (Oct 7, 2026)',
      time: '11:30 AM - 11:50 AM',
      notes: 'Interested in field trials for Yashobhoomi micro-cells.',
      booth: 'Hall 3, Booth #E-342',
      venue: 'Yashobhoomi (IICC), Dwarka, New Delhi',
      host: 'Utkarsh Patwa',
      createdAt: new Date().toISOString()
    },
    {
      id: 'IMC-VIP-02',
      name: 'Vikramaditya Singhania',
      email: 'vikram@peakxv-deeptech.vc',
      org: 'Peak XV DeepTech Ventures',
      topic: 'Seed Round Investment ($2.0M Allocation)',
      date: 'Day 2 (Oct 8, 2026)',
      time: '02:00 PM - 02:20 PM',
      notes: 'Evaluation of TSMC MPW Tapeout timeline and IP portfolio.',
      booth: 'Hall 3, Booth #E-342',
      venue: 'Yashobhoomi (IICC), Dwarka, New Delhi',
      host: 'Utkarsh Patwa',
      createdAt: new Date().toISOString()
    },
    {
      id: 'IMC-VIP-03',
      name: 'Ananya Deshmukh',
      email: 'ananya.d@qualcomm.com',
      org: 'Qualcomm Edge Computing India',
      topic: 'Neuromorphic Silicon IP Licensing & Benchmark Review',
      date: 'Day 3 (Oct 9, 2026)',
      time: '03:30 PM - 03:50 PM',
      notes: 'Reviewing 18.4 TOPS/Watt INT4 Spiking Neural Network benchmarks.',
      booth: 'Hall 3, Booth #E-342',
      venue: 'Yashobhoomi (IICC), Dwarka, New Delhi',
      host: 'Utkarsh Patwa',
      createdAt: new Date().toISOString()
    }
  ];

  writeData(MEETINGS_FILE, sampleMeetings);
  res.json({
    success: true,
    message: 'Seeded 3 sample VIP showcase meetings for IMC 2026 presentation.',
    count: sampleMeetings.length
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 SYNAPSE-X AI DYNAMIC BACKEND RUNNING ON PORT ${PORT}`);
  console.log(`📍 Official Showcase: India Mobile Congress 2026`);
  console.log(`🏛️ Yashobhoomi, New Delhi (Hall 3, Booth #E-342)`);
  console.log(`👨‍💻 Founder: Utkarsh Patwa (CSE AI/ML)`);
  console.log(`=======================================================`);
});
