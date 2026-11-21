import React, { useState } from 'react';
import {
  Zap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tv,
  CheckCircle2,
  Lock,
  Mail,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginRegister() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('alex@creatorpilot.demo');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Alex Rivera');
  const [channelName, setChannelName] = useState('DevPulse AI');
  const [niche, setNiche] = useState('AI Tools & Tech Tutorials');
  const [platform, setPlatform] = useState('YouTube');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      login({ email, name: email.split('@')[0], channelName });
    } else {
      register({
        name,
        email,
        channelName,
        niche,
        platform
      });
    }
    navigate('/');
  };

  const handleQuickDemo = () => {
    login({
      email: 'alex@creatorpilot.demo',
      name: 'Alex Rivera',
      channelName: 'DevPulse AI'
    });
    navigate('/');
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-3"
      style={{
        background: 'radial-gradient(circle at 50% 20%, rgba(16, 185, 129, 0.12) 0%, #080b12 70%)'
      }}
    >
      <div className="agency-card p-4 p-md-5" style={{ maxWidth: 480, width: '100%', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
        {/* Brand Header */}
        <div className="text-center mb-4">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-3 mb-2 p-2"
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #6366f1 100%)',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
            }}
          >
            <Zap size={24} className="text-white" />
          </div>
          <h3 className="fw-extrabold text-white mb-1">CreatorPilot AI</h3>
          <p className="text-secondary small">An AI-powered creator operations platform</p>
        </div>

        {/* 1-Click Quick Demo Sign In */}
        <div className="mb-4">
          <button
            onClick={handleQuickDemo}
            className="btn-agency-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2"
            style={{ letterSpacing: '0.02em' }}
          >
            <Sparkles size={16} />
            <span>Launch with Demo Creator (Alex Rivera)</span>
          </button>
        </div>

        <div className="d-flex align-items-center gap-3 my-3">
          <hr className="flex-grow-1" style={{ borderColor: 'var(--border-subtle)' }} />
          <span className="text-muted small">or continue with email</span>
          <hr className="flex-grow-1" style={{ borderColor: 'var(--border-subtle)' }} />
        </div>

        {/* Tab Selector */}
        <div className="d-flex p-1 rounded-3 mb-4" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
          <button
            onClick={() => setMode('login')}
            className={`btn btn-sm flex-grow-1 ${mode === 'login' ? 'btn-agency-indigo' : 'btn-agency-ghost'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('register')}
            className={`btn btn-sm flex-grow-1 ${mode === 'register' ? 'btn-agency-indigo' : 'btn-agency-ghost'}`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          {mode === 'register' && (
            <>
              <div>
                <label className="form-label">Full Name</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-end-0 text-muted" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    className="form-control agency-input border-start-0"
                    placeholder="e.g. Alex Rivera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Channel Name</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-end-0 text-muted" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                    <Tv size={16} />
                  </span>
                  <input
                    type="text"
                    className="form-control agency-input border-start-0"
                    placeholder="e.g. DevPulse AI"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row g-2">
                <div className="col-6">
                  <label className="form-label">Platform</label>
                  <select
                    className="form-select agency-select"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                  >
                    <option value="YouTube">YouTube</option>
                    <option value="Instagram">Instagram</option>
                    <option value="TikTok">TikTok</option>
                    <option value="LinkedIn">LinkedIn</option>
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label">Niche</label>
                  <input
                    type="text"
                    className="form-control agency-input"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="form-label">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0 text-muted" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <Mail size={16} />
              </span>
              <input
                type="email"
                className="form-control agency-input border-start-0"
                placeholder="creator@channel.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0 text-muted" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <Lock size={16} />
              </span>
              <input
                type="password"
                className="form-control agency-input border-start-0"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-agency-primary w-100 py-2 mt-2">
            <span>{mode === 'login' ? 'Sign In to Workspace' : 'Create Creator Workspace'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-4 pt-3 border-top text-center text-muted small" style={{ borderColor: 'var(--border-subtle)', fontSize: '0.74rem' }}>
          <ShieldCheck size={14} className="text-success me-1" />
          JWT Authenticated • Scoped Data Ownership
        </div>
      </div>
    </div>
  );
}
