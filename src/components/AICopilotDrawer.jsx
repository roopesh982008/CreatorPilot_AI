import React, { useState } from 'react';
import { X, Send, BotMessageSquare, Sparkles, ArrowRight, CornerDownLeft, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockAI } from '../utils/mockAI';
import { useNavigate } from 'react-router-dom';

export default function AICopilotDrawer({ isOpen, onClose, onOpenWizard }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello ${user?.name?.split(' ')[0] || 'Creator'}! I'm your CreatorPilot AI Operations Copilot. I have context on your channel (${user?.channelName}), your 148k audience, upcoming calendar deadlines, and active brand deals. How can I assist your workflow today?`
    }
  ]);

  const quickPrompts = [
    "What should I film this weekend based on audience comments?",
    "Review my video opening hook for high retention",
    "What should I charge for a 60s sponsorship with 520k monthly views?",
    "Prepare a 1-click end-to-end content campaign"
  ];

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg = { id: `usr_${Date.now()}`, sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await mockAI.askCopilot(query, user);
      const aiMsg = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: response.reply,
        actionSuggestion: response.actionSuggestion
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: 'ai',
          text: "I ran into a temporary issue parsing that request. Please try again or rephrase."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (action) => {
    if (action.modal === 'campaign-wizard') {
      onClose();
      onOpenWizard();
    } else if (action.route) {
      onClose();
      navigate(action.route);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="position-fixed top-0 end-0 bottom-0 bg-dark shadow-lg border-start d-flex flex-column"
      style={{
        width: '100%',
        maxWidth: 440,
        zIndex: 1060,
        borderColor: 'var(--border-subtle)',
        background: 'rgba(11, 16, 28, 0.96)',
        backdropFilter: 'blur(25px)'
      }}
    >
      {/* Header */}
      <div className="p-3 border-bottom d-flex align-items-center justify-content-between" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="d-flex align-items-center gap-2">
          <div
            className="rounded-3 p-2 d-flex align-items-center justify-content-center"
            style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}
          >
            <BotMessageSquare size={18} />
          </div>
          <div>
            <div className="fw-bold text-white small d-flex align-items-center gap-2">
              CreatorPilot Copilot
              <span className="agency-badge badge-lime" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>Gemini Pro</span>
            </div>
            <div className="text-muted" style={{ fontSize: '0.72rem' }}>
              Channel Context: {user?.channelName}
            </div>
          </div>
        </div>

        <button className="btn btn-agency-ghost p-1 text-secondary" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-grow-1 overflow-y-auto p-3 d-flex flex-column gap-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`d-flex flex-column ${m.sender === 'user' ? 'align-items-end' : 'align-items-start'}`}
          >
            <div
              className={`p-3 rounded-4 small ${
                m.sender === 'user'
                  ? 'bg-primary text-white'
                  : 'agency-card text-light border'
              }`}
              style={{
                maxWidth: '90%',
                background:
                  m.sender === 'user'
                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    : 'rgba(21, 29, 48, 0.85)',
                lineHeight: 1.5,
                borderColor: m.sender === 'user' ? 'transparent' : 'rgba(255, 255, 255, 0.08)'
              }}
            >
              <div style={{ whiteSpace: 'pre-wrap' }}>{m.text}</div>

              {m.actionSuggestion && (
                <div className="mt-3 pt-2 border-top" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <button
                    onClick={() => handleActionClick(m.actionSuggestion)}
                    className="btn btn-sm btn-agency-indigo py-1 px-3 d-flex align-items-center gap-1 w-100 justify-content-center"
                    style={{ fontSize: '0.78rem' }}
                  >
                    <span>{m.actionSuggestion.label}</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              )}
            </div>
            <span className="text-muted px-1 mt-1" style={{ fontSize: '0.68rem' }}>
              {m.sender === 'user' ? 'You' : 'Copilot'}
            </span>
          </div>
        ))}

        {loading && (
          <div className="d-flex align-items-center gap-2 p-3 agency-card text-secondary small">
            <Loader2 size={16} className="text-success spin-animation" />
            <span>Analyzing channel operations & drafting suggestion...</span>
          </div>
        )}
      </div>

      {/* Prompt Suggestions */}
      <div className="p-2 border-top" style={{ borderColor: 'var(--border-subtle)', background: 'rgba(9, 13, 24, 0.8)' }}>
        <div className="text-muted small px-2 mb-1" style={{ fontSize: '0.7rem' }}>
          Suggested Inquiries:
        </div>
        <div className="d-flex flex-wrap gap-1 px-1">
          {quickPrompts.slice(0, 3).map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="prompt-chip text-start text-truncate"
              style={{ maxWidth: '100%', fontSize: '0.74rem', padding: '4px 10px' }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-3 border-top" style={{ borderColor: 'var(--border-subtle)', background: 'rgba(7, 10, 19, 0.95)' }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="d-flex align-items-center gap-2"
        >
          <input
            type="text"
            className="form-control agency-input py-2"
            placeholder="Ask Copilot anything about your channel..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="btn btn-agency-primary p-2"
            disabled={loading || !input.trim()}
          >
            {loading ? <Loader2 size={18} className="spin-animation" /> : <Send size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
}
