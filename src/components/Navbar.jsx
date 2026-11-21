import React from 'react';
import { Menu, Sparkles, Bell, BotMessageSquare, LogOut, Settings, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onToggleSidebar, onOpenWizard, onOpenCopilot }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="agency-navbar px-3 px-lg-4 d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-3">
        <button
          className="btn btn-agency-ghost d-lg-none p-2 text-white"
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation"
        >
          <Menu size={22} />
        </button>

        <div className="d-none d-sm-block">
          <div className="d-flex align-items-center gap-2">
            <span className="text-secondary small fw-medium">Operations Center</span>
            <span className="text-muted">/</span>
            <span className="text-white small fw-semibold">Production Ready</span>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center gap-2 gap-sm-3">
        {/* Quick Launch Copilot */}
        <button
          onClick={onOpenCopilot}
          className="btn btn-agency-outline d-flex align-items-center gap-2 py-1 px-3"
          style={{ fontSize: '0.85rem' }}
          title="Open AI Copilot"
        >
          <BotMessageSquare size={16} className="text-info" />
          <span className="d-none d-md-inline">AI Copilot</span>
        </button>

        {/* 1-Click Campaign Generator Modal */}
        <button
          onClick={onOpenWizard}
          className="btn-agency-primary py-1 px-3"
          style={{ fontSize: '0.85rem' }}
        >
          <Sparkles size={16} />
          <span className="d-none d-sm-inline">Prepare Campaign</span>
        </button>

        {/* Notifications */}
        <div className="position-relative">
          <button className="btn btn-agency-ghost p-2 rounded-circle text-secondary" title="Notifications">
            <Bell size={18} />
            <span
              className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-dark rounded-circle"
              style={{ width: 8, height: 8 }}
            ></span>
          </button>
        </div>

        {/* Profile Avatar & Actions */}
        <div className="dropdown">
          <button
            className="btn btn-agency-ghost p-1 d-flex align-items-center gap-2 dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
              alt={user?.name}
              className="rounded-circle border"
              style={{ width: 34, height: 34, objectFit: 'cover', borderColor: 'var(--border-subtle)' }}
            />
            <span className="d-none d-md-inline text-white small fw-semibold">{user?.name?.split(' ')[0]}</span>
          </button>

          <ul className="dropdown-menu dropdown-menu-end agency-modal-content border p-2 mt-2" style={{ minWidth: 220 }}>
            <li className="px-3 py-2 border-bottom" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="fw-semibold text-white small">{user?.name}</div>
              <div className="text-muted" style={{ fontSize: '0.75rem' }}>{user?.email}</div>
              <span className="agency-badge badge-lime mt-1" style={{ fontSize: '0.7rem' }}>
                {user?.tier || "Pro Creator"}
              </span>
            </li>
            <li>
              <button
                className="dropdown-item text-secondary py-2 d-flex align-items-center gap-2 rounded-2 mt-1"
                onClick={() => navigate('/profile')}
              >
                <Settings size={15} /> Channel Profile Settings
              </button>
            </li>
            <li>
              <a
                className="dropdown-item text-secondary py-2 d-flex align-items-center gap-2 rounded-2"
                href="https://aistudio.google.com/"
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink size={15} /> Gemini AI Studio
              </a>
            </li>
            <li className="border-top mt-1 pt-1" style={{ borderColor: 'var(--border-subtle)' }}>
              <button
                className="dropdown-item text-danger py-2 d-flex align-items-center gap-2 rounded-2"
                onClick={logout}
              >
                <LogOut size={15} /> Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
