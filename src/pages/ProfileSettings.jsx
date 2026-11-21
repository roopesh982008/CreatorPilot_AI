import React, { useState } from 'react';
import {
  UserCheck,
  Save,
  CheckCircle2,
  Users,
  Tv,
  Globe,
  Languages,
  Shield,
  Key,
  Database
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProfileSettings() {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "Alex Rivera",
    email: user?.email || "alex@creatorpilot.demo",
    channelName: user?.channelName || "DevPulse AI",
    handle: user?.handle || "@devpulse_ai",
    platform: user?.platform || "YouTube",
    niche: user?.niche || "AI Tools & Tech Tutorials",
    targetAudience: user?.targetAudience || "Aspiring developers, tech professionals, and college students",
    preferredLanguage: user?.preferredLanguage || "English",
    subscribers: user?.subscribers || "148,500",
    monthlyViews: user?.monthlyViews || "520,000",
    avgEngagementRate: user?.avgEngagementRate || "7.8%",
    bio: user?.bio || "Teaching 140k+ creators & engineers how to build with modern AI.",
    avatar: user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="container-fluid p-3 p-lg-4 d-flex flex-column gap-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="agency-badge badge-lime">Module A</span>
            <span className="text-secondary small">Creator Identity & Multi-Channel Profile</span>
          </div>
          <h2 className="fw-extrabold text-white mb-0 display-7">Creator Channel Profile</h2>
        </div>

        <button
          onClick={handleSubmit}
          className="btn btn-agency-primary"
        >
          {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
          <span>{saved ? 'Changes Saved!' : 'Save Profile Changes'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          {/* Left Column: Avatar & Basic Details */}
          <div className="col-xl-4">
            <div className="agency-card p-4 d-flex flex-column align-items-center text-center gap-3">
              <div className="position-relative">
                <img
                  src={formData.avatar}
                  alt={formData.name}
                  className="rounded-circle border border-2"
                  style={{ width: 110, height: 110, objectFit: 'cover', borderColor: 'var(--accent-lime)' }}
                />
                <span
                  className="position-absolute bottom-0 end-0 p-2 rounded-circle bg-dark border"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <Tv size={14} className="text-success" />
                </span>
              </div>

              <div>
                <h5 className="fw-bold text-white mb-1">{formData.channelName}</h5>
                <span className="text-muted small">{formData.handle} • {formData.platform}</span>
                <div className="mt-2">
                  <span className="agency-badge badge-lime">
                    {user?.tier || "Pro Creator"}
                  </span>
                </div>
              </div>

              <div className="w-100 text-start pt-3 border-top" style={{ borderColor: 'var(--border-subtle)' }}>
                <label className="form-label">Avatar Image URL</label>
                <input
                  type="text"
                  className="form-control agency-input"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                />
              </div>

              <div className="w-100 text-start">
                <label className="form-label">Channel Bio / Manifesto</label>
                <textarea
                  className="form-control agency-textarea"
                  rows="3"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                ></textarea>
              </div>

              {/* Security Boundary Info Box (PDF page 5) */}
              <div
                className="w-100 text-start p-3 rounded-3 mt-2"
                style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.2)' }}
              >
                <div className="d-flex align-items-center gap-2 text-white small fw-semibold mb-1">
                  <Shield size={14} className="text-info" /> User Scoped Records
                </div>
                <p className="text-secondary small mb-0" style={{ fontSize: '0.74rem' }}>
                  Each user account can only read and write their own ideas, scripts, and brand deals. Records are strictly keyed by your user session ID.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Channel Metrics & Target Audience */}
          <div className="col-xl-8">
            <div className="agency-card p-4 d-flex flex-column gap-4">
              <h5 className="fw-bold text-white mb-0 pb-2 border-bottom" style={{ borderColor: 'var(--border-subtle)' }}>
                Channel Identity & Audience Demographics
              </h5>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Creator Full Name</label>
                  <input
                    type="text"
                    className="form-control agency-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Account Email</label>
                  <input
                    type="email"
                    className="form-control agency-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Channel / Brand Name</label>
                  <input
                    type="text"
                    className="form-control agency-input"
                    value={formData.channelName}
                    onChange={(e) => setFormData({ ...formData, channelName: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Channel Handle</label>
                  <input
                    type="text"
                    className="form-control agency-input"
                    value={formData.handle}
                    onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Primary Platform</label>
                  <select
                    className="form-select agency-select"
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  >
                    <option value="YouTube">YouTube</option>
                    <option value="Instagram">Instagram</option>
                    <option value="TikTok">TikTok</option>
                    <option value="LinkedIn">LinkedIn</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label">Content Niche</label>
                  <input
                    type="text"
                    className="form-control agency-input"
                    value={formData.niche}
                    onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Preferred Content Language</label>
                  <select
                    className="form-select agency-select"
                    value={formData.preferredLanguage}
                    onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                  >
                    <option value="English">English</option>
                    <option value="Hinglish">Hinglish</option>
                    <option value="Kannada">Kannada</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label">Target Audience Description (Fed to Gemini Prompts)</label>
                  <textarea
                    className="form-control agency-textarea"
                    rows="2"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  ></textarea>
                </div>
              </div>

              <h5 className="fw-bold text-white mb-0 pt-3 pb-2 border-bottom" style={{ borderColor: 'var(--border-subtle)' }}>
                Channel Statistics (Used for Brand Media-Kit & Rate Calculator)
              </h5>

              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Subscribers / Followers</label>
                  <input
                    type="text"
                    className="form-control agency-input"
                    value={formData.subscribers}
                    onChange={(e) => setFormData({ ...formData, subscribers: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Monthly Views (Average)</label>
                  <input
                    type="text"
                    className="form-control agency-input"
                    value={formData.monthlyViews}
                    onChange={(e) => setFormData({ ...formData, monthlyViews: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Average Engagement Rate</label>
                  <input
                    type="text"
                    className="form-control agency-input"
                    value={formData.avgEngagementRate}
                    onChange={(e) => setFormData({ ...formData, avgEngagementRate: e.target.value })}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end pt-3">
                <button type="submit" className="btn btn-agency-primary px-4 py-2">
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
