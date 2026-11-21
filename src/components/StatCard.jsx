import React from 'react';

export default function StatCard({ title, value, change, isPositive = true, icon: Icon, glowColor = "lime", subtitle }) {
  const glowClass = glowColor === "indigo" ? "agency-card-glow-indigo" : glowColor === "lime" ? "agency-card-glow-lime" : "";
  const badgeClass = isPositive ? "badge-lime" : "badge-rose";

  return (
    <div className={`agency-card p-3 p-xl-4 h-100 ${glowClass}`}>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <span className="text-secondary small text-uppercase fw-semibold" style={{ letterSpacing: '0.04em' }}>
          {title}
        </span>
        {Icon && (
          <div
            className="d-flex align-items-center justify-content-center rounded-3 p-2"
            style={{
              background: glowColor === 'indigo' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(16, 185, 129, 0.15)',
              color: glowColor === 'indigo' ? '#a5b4fc' : '#34d399'
            }}
          >
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="d-flex align-items-baseline gap-2 mb-1">
        <h3 className="mb-0 fw-bold fs-2" style={{ letterSpacing: '-0.03em' }}>{value}</h3>
      </div>

      <div className="d-flex align-items-center justify-content-between pt-1">
        {change && (
          <span className={`agency-badge ${badgeClass}`}>
            {isPositive ? '↑' : '↓'} {change}
          </span>
        )}
        {subtitle && (
          <span className="text-muted small ms-auto text-truncate" style={{ fontSize: '0.78rem' }}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
