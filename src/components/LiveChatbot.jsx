import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';

export default function LiveChatbot() {
  const { lang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: lang === 'hi' 
        ? 'नमस्ते! मैं SynapseBot AI हूँ। मैं आपको Synapse-X सिलिकॉन, IMC 2026 बूथ (#E-342) या संस्थापक उत्कर्ष पटवा से मीटिंग बुक करने में मदद कर सकता हूँ। आप क्या जानना चाहते हैं?'
        : 'Hello! I am SynapseBot AI. I can assist you with our Neuromorphic Edge Silicon, 6G Cognitive Mesh, our IMC 2026 Booth #E-342 at Yashobhoomi, or connect you with founder Utkarsh Patwa. How can I help you today?'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (queryText) => {
    const text = queryText || inputVal.trim();
    if (!text) return;

    const newMsgList = [...messages, { sender: 'user', text }];
    setMessages(newMsgList);
    setInputVal('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, lang })
      });
      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
        if (data.action === 'scroll_to_booking') {
          const summitEl = document.getElementById('summit');
          summitEl?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Synapse-X AI is pioneering Neuromorphic Edge Silicon & 6G Cognitive Networks. Visit us at Booth #E-342, Hall 3 at Yashobhoomi, New Delhi!'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickChips = [
    { label: '📍 Booth Location', query: 'Where is your booth at IMC 2026?' },
    { label: '👨‍💻 Founder Info', query: 'Who is founder Utkarsh Patwa?' },
    { label: '⚡ Silicon Latency', query: 'What are the NeuroCore latency specs?' },
    { label: '🤝 Book Meeting', query: 'How can I book a meeting with Utkarsh?' }
  ];

  return (
    <div className="floating-chat-container">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          className="chat-toggle-btn"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
        >
          <div className="chat-btn-pulse"></div>
          <Bot size={20} />
          <span className="chat-btn-text">Ask SynapseBot</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-window-header">
            <div className="chat-header-title">
              <div className="bot-icon-wrap">
                <Sparkles size={16} />
              </div>
              <div>
                <strong>SynapseBot AI</strong>
                <span className="chat-status-dot">● Online • IMC 2026 Guide</span>
              </div>
            </div>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="chat-body">
            {messages.map((m, idx) => (
              <div key={idx} className={`chat-bubble ${m.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="chat-bubble bot-bubble typing-bubble">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Chips */}
          <div className="chat-chips-row">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                className="chat-chip"
                onClick={() => handleSend(chip.query)}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            className="chat-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              placeholder="Ask anything about Synapse-X..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="chat-input"
            />
            <button type="submit" disabled={loading} className="chat-send-btn">
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
