import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Lightbulb,
  Sparkles,
  FileCode,
  Image as ImageIcon,
  Kanban,
  MessageSquareHeart,
  BriefcaseBusiness,
  UserCheck,
  Zap,
  BotMessageSquare,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ isOpen, onClose, onOpenWizard, onOpenCopilot }) {
  const { user } = useAuth();

  const navItems = [
    { to: '/', label: 'Overview Dashboard', icon: LayoutDashboard },
    { to: '/ideas', label: 'Content Idea Board', icon: Lightbulb },
    { to: '/strategist', label: 'AI Content Strategist', icon: Sparkles, badge: 'Gemini' },
    { to: '/scripts', label: 'AI Script Studio', icon: FileCode },
    { to: '/thumbnails', label: 'Title & Thumbnail Lab', icon: ImageIcon },
    { to: '/workflow', label: 'Calendar & Kanban', icon: Kanban },
    { to: '/audience', label: 'Audience Intelligence', icon: MessageSquareHeart },
    { to: '/brands', label: 'Brand Partnerships', icon: BriefcaseBusiness, badge: '$11.5k' },
    { to: '/profile', label: 'Creator Profile', icon: UserCheck }
  ];

  return (
    <aside className={`agency-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Brand Header */}
      <div className="d-flex align-items-center justify-content-between px-4 py-4 border-bottom" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="d-flex align-items-center gap-2">
          <div
            className="d-flex align-items-center justify-content-center rounded-3"
            style={{
              width: 36,
              height: 36,
              background: 'linear-gradient(135deg, #10b981 0%, #6366f1 100%)',
              boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)'
            }}
          >
            <Zap size={20} className="text-white" />
          </div>
          <div>
            <div className="fw-bold fs-5 text-white lh-1 d-flex align-items-center gap-2">
              CreatorPilot <span className="agency-badge badge-lime" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>AI</span>
            </div>
            <span className="text-muted" style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>
              CREATOR OPERATIONS
            </span>
          </div>
        </div>

        {/* Mobile close button */}
        <button className="btn btn-sm text-secondary d-lg-none" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {/* Quick 1-Click Campaign Action */}
      <div className="px-3 pt-3">
        <button
          onClick={onOpenWizard}
          className="btn-agency-primary w-100 py-2 fs-6 shadow-sm"
          style={{ letterSpacing: '0.01em' }}
        >
          <Sparkles size={16} />
          <span>1-Click Campaign</span>
        </button>
      </div>

      {/* Main Nav Links */}
      <div className="flex-grow-1 overflow-y-auto px-3 py-3">
        <div className="text-muted small fw-semibold text-uppercase px-2 mb-2" style={{ fontSize: '0.7rem', letterSpacing: '0.08em' }}>
          Workspace Modules
        </div>
        <nav className="nav flex-column">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                end={item.to === '/'}
                className={({ isActive }) => `nav-link-agency ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span className="flex-grow-1">{item.label}</span>
                {item.badge && (
                  <span
                    className={`agency-badge ${item.badge === 'Gemini' ? 'badge-indigo' : 'badge-lime'}`}
                    style={{ fontSize: '0.68rem', padding: '2px 6px' }}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* AI Copilot Standout Trigger */}
        <div className="mt-4 pt-3 border-top" style={{ borderColor: 'var(--border-subtle)' }}>
          <div
            onClick={onOpenCopilot}
            className="agency-card p-3 agency-card-interactive cursor-pointer position-relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(16, 185, 129, 0.08) 100%)',
              borderColor: 'rgba(99, 102, 241, 0.35)',
              cursor: 'pointer'
            }}
          >
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="pulse-dot pulse-dot-green"></span>
              <span className="fw-semibold text-white small d-flex align-items-center gap-1">
                <BotMessageSquare size={15} className="text-info" /> Creator Copilot
              </span>
            </div>
            <p className="text-secondary small mb-2" style={{ fontSize: '0.78rem', lineHeight: 1.35 }}>
              Ask for script ideas, sponsorship rates, or retention hooks.
            </p>
            <span className="badge-indigo agency-badge" style={{ fontSize: '0.72rem' }}>
              Open Copilot →
            </span>
          </div>
        </div>
      </div>

      {/* User Channel Badge Footer */}
      <div className="p-3 border-top mt-auto" style={{ borderColor: 'var(--border-subtle)', background: 'rgba(7, 10, 18, 0.6)' }}>
        <div className="d-flex align-items-center gap-3">
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
            alt="Creator Avatar"
            className="rounded-circle border"
            style={{ width: 40, height: 40, objectFit: 'cover', borderColor: 'var(--border-highlight)' }}
          />
          <div className="overflow-hidden">
            <div className="fw-semibold text-white text-truncate small">{user?.channelName || "Creator Channel"}</div>
            <div className="text-muted text-truncate" style={{ fontSize: '0.75rem' }}>
              {user?.subscribers || "148k"} Subscribers • {user?.platform || "YouTube"}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
