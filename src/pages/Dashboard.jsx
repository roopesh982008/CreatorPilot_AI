import React from 'react';
import {
  Users,
  Eye,
  TrendingUp,
  DollarSign,
  Sparkles,
  ArrowUpRight,
  Clock,
  CheckCircle,
  PlaySquare,
  Flame,
  Calendar,
  Layers,
  FileText
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import StatCard from '../components/StatCard';
import { useCreatorData } from '../context/CreatorDataContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ onOpenWizard, onOpenCopilot }) {
  const { user } = useAuth();
  const { ideas, kanbanTasks, brandCampaigns, analytics } = useCreatorData();
  const navigate = useNavigate();

  // Metrics calculations
  const activeScriptsCount = kanbanTasks.filter((t) => t.stage === 'Script' || t.stage === 'Production').length;
  const inReviewCount = kanbanTasks.filter((t) => t.stage === 'Review').length;
  const publishedCount = kanbanTasks.filter((t) => t.stage === 'Published').length;
  const totalPipelineRevenue = brandCampaigns.reduce((sum, c) => sum + (c.proposedFee || 0), 0);

  const upcomingDeadlines = kanbanTasks
    .filter((t) => t.stage !== 'Published')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 4);

  return (
    <div className="container-fluid p-3 p-lg-4 d-flex flex-column gap-4">
      {/* Hero Welcome Banner - Behance Marketing Agency Style */}
      <div
        className="agency-card p-4 p-xl-5 position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(13, 27, 42, 0.75) 100%)',
          borderColor: 'rgba(99, 102, 241, 0.25)'
        }}
      >
        <div className="row align-items-center position-relative" style={{ zIndex: 2 }}>
          <div className="col-lg-8 mb-3 mb-lg-0">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="pulse-dot pulse-dot-green"></span>
              <span className="text-secondary small fw-bold text-uppercase" style={{ letterSpacing: '0.08em' }}>
                CREATOR OPERATIONS HUB • {user?.platform || "YOUTUBE"} PARTNER
              </span>
            </div>
            <h1 className="fw-extrabold mb-2 display-6 gradient-text-heading">
              Welcome back, <span className="gradient-text-lime">{user?.name?.split(' ')[0] || 'Alex'}</span>
            </h1>
            <p className="text-secondary mb-3 fs-6" style={{ maxWidth: 620 }}>
              Your channel <strong className="text-white">{user?.channelName}</strong> is pacing at{' '}
              <strong className="text-success">520,000 views/month</strong> with an active sponsorship pipeline valued at{' '}
              <strong className="text-white">${totalPipelineRevenue.toLocaleString()} USD</strong>.
            </p>
            <div className="d-flex flex-wrap gap-2 pt-1">
              <button onClick={onOpenWizard} className="btn-agency-primary">
                <Sparkles size={16} /> Prepare 1-Click Campaign
              </button>
              <button onClick={() => navigate('/strategist')} className="btn-agency-outline">
                <Layers size={16} /> AI Content Strategist
              </button>
              <button onClick={onOpenCopilot} className="btn-agency-ghost text-white">
                Open Copilot →
              </button>
            </div>
          </div>

          <div className="col-lg-4 text-lg-end">
            <div
              className="d-inline-flex flex-column align-items-start p-3 rounded-4 border"
              style={{
                background: 'rgba(10, 15, 29, 0.8)',
                borderColor: 'var(--border-subtle)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <span className="text-muted small fw-semibold text-uppercase" style={{ fontSize: '0.72rem' }}>
                Current Operations Status
              </span>
              <div className="d-flex align-items-center gap-2 mt-1">
                <span className="agency-badge badge-lime">3 In Production</span>
                <span className="agency-badge badge-amber">{inReviewCount} In Review</span>
              </div>
              <div className="text-muted mt-2 small" style={{ fontSize: '0.75rem' }}>
                Next upload scheduled for <strong className="text-white">Friday, 6:00 PM EST</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="row g-3 g-xl-4">
        <div className="col-sm-6 col-xl-3">
          <StatCard
            title="Total Subscribers"
            value={user?.subscribers || "148,500"}
            change="+8.4k (30d)"
            isPositive={true}
            icon={Users}
            glowColor="lime"
            subtitle="Tech & AI Niche"
          />
        </div>
        <div className="col-sm-6 col-xl-3">
          <StatCard
            title="Monthly Video Views"
            value={user?.monthlyViews || "520,000"}
            change="+14.2%"
            isPositive={true}
            icon={Eye}
            glowColor="indigo"
            subtitle="Avg 6m 45s watch time"
          />
        </div>
        <div className="col-sm-6 col-xl-3">
          <StatCard
            title="Avg Engagement Rate"
            value={user?.avgEngagementRate || "7.8%"}
            change="+1.2%"
            isPositive={true}
            icon={TrendingUp}
            glowColor="lime"
            subtitle="Top 5% for category"
          />
        </div>
        <div className="col-sm-6 col-xl-3">
          <StatCard
            title="Active Brand Pipeline"
            value={`$${totalPipelineRevenue.toLocaleString()}`}
            change="3 Active Deals"
            isPositive={true}
            icon={DollarSign}
            glowColor="indigo"
            subtitle="NordVPN, Supabase, Linear"
          />
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="row g-4">
        {/* Growth & Views Trend - AreaChart */}
        <div className="col-xl-8">
          <div className="agency-card p-4 h-100 d-flex flex-column justify-content-between">
            <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
              <div>
                <h5 className="fw-bold text-white mb-1">Creator Performance Trajectory</h5>
                <p className="text-secondary small mb-0">Weekly views vs estimated watch hours</p>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="agency-badge badge-lime">
                  <span className="pulse-dot pulse-dot-green"></span> Views Pace
                </span>
                <span className="agency-badge badge-indigo">Watch Hours</span>
              </div>
            </div>

            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.performanceHistory}>
                  <defs>
                    <linearGradient id="viewsGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="hoursGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="week" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: 10,
                      color: '#fff'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#viewsGlow)"
                    name="Views"
                  />
                  <Area
                    type="monotone"
                    dataKey="watchHours"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#hoursGlow)"
                    name="Watch Hours"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Audience Sentiment Distribution - PieChart */}
        <div className="col-xl-4">
          <div className="agency-card p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h5 className="fw-bold text-white mb-0">Audience Sentiment</h5>
                <span className="agency-badge badge-neutral" onClick={() => navigate('/audience')} style={{ cursor: 'pointer' }}>
                  Analyze →
                </span>
              </div>
              <p className="text-secondary small mb-3">Real-time classification of audience feedback</p>

              <div style={{ width: '100%', height: 190 }} className="position-relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analytics.sentimentDistribution}
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {analytics.sentimentDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderRadius: 10,
                        color: '#fff'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div
                  className="position-absolute top-50 start-50 translate-middle text-center"
                  style={{ pointerEvents: 'none' }}
                >
                  <div className="fw-extrabold text-white fs-4">68%</div>
                  <div className="text-muted small" style={{ fontSize: '0.68rem' }}>Positive</div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column gap-2 pt-2 border-top" style={{ borderColor: 'var(--border-subtle)' }}>
              {analytics.sentimentDistribution.map((s, idx) => (
                <div key={idx} className="d-flex align-items-center justify-content-between small">
                  <div className="d-flex align-items-center gap-2">
                    <span className="rounded-circle" style={{ width: 8, height: 8, backgroundColor: s.color }}></span>
                    <span className="text-secondary">{s.name}</span>
                  </div>
                  <span className="fw-bold text-white">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Operations Deadlines & AI Copilot Suggested Actions */}
      <div className="row g-4">
        {/* Upcoming Publishing Deadlines */}
        <div className="col-lg-6">
          <div className="agency-card p-4 h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-2">
                <Calendar size={18} className="text-success" />
                <h5 className="fw-bold text-white mb-0">Production Schedule</h5>
              </div>
              <button
                onClick={() => navigate('/workflow')}
                className="btn btn-sm btn-agency-ghost text-secondary"
              >
                Kanban Board →
              </button>
            </div>

            <div className="d-flex flex-column gap-3">
              {upcomingDeadlines.map((task) => (
                <div
                  key={task.id}
                  className="p-3 rounded-3 d-flex align-items-center justify-content-between"
                  style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}
                >
                  <div className="overflow-hidden me-3">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span className={`agency-badge ${task.stage === 'Script' ? 'badge-indigo' : task.stage === 'Production' ? 'badge-amber' : 'badge-neutral'}`} style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                        {task.stage}
                      </span>
                      <span className="text-muted" style={{ fontSize: '0.72rem' }}>{task.platform}</span>
                    </div>
                    <div className="fw-semibold text-white text-truncate small">{task.title}</div>
                    <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                      Assignee: {task.assignee}
                    </div>
                  </div>

                  <div className="text-end text-nowrap">
                    <div className="agency-badge badge-neutral mb-1" style={{ fontSize: '0.72rem' }}>
                      Due {task.dueDate}
                    </div>
                    <div className="text-success small fw-semibold" style={{ fontSize: '0.72rem' }}>
                      On Schedule
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Suggested Next Actions by AI Copilot */}
        <div className="col-lg-6">
          <div className="agency-card p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center gap-2">
                  <Sparkles size={18} className="text-info" />
                  <h5 className="fw-bold text-white mb-0">Copilot Suggested Actions</h5>
                </div>
                <span className="agency-badge badge-indigo">AI Recommendations</span>
              </div>

              <div className="d-flex flex-column gap-3">
                <div
                  className="p-3 rounded-3"
                  style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.2)' }}
                >
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <strong className="text-success small">High Audience Demand Detected</strong>
                    <span className="badge-lime agency-badge" style={{ fontSize: '0.68rem' }}>34 Comments</span>
                  </div>
                  <p className="text-secondary small mb-2">
                    34 viewers requested a dedicated tutorial on connecting local LLMs with FastAPI. Audience retention potential is high.
                  </p>
                  <button
                    onClick={() => navigate('/strategist')}
                    className="btn btn-sm btn-agency-primary py-1 px-3"
                    style={{ fontSize: '0.78rem' }}
                  >
                    Generate Strategy Plan
                  </button>
                </div>

                <div
                  className="p-3 rounded-3"
                  style={{ background: 'rgba(99, 102, 241, 0.06)', border: '1px solid rgba(99, 102, 241, 0.2)' }}
                >
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <strong className="text-info small">Brand Follow-Up Due</strong>
                    <span className="badge-indigo agency-badge" style={{ fontSize: '0.68rem' }}>$3,200 Deal</span>
                  </div>
                  <p className="text-secondary small mb-2">
                    Supabase proposal sent 4 days ago. Outreach email follow-up is recommended today to confirm integration slot.
                  </p>
                  <button
                    onClick={() => navigate('/brands')}
                    className="btn btn-sm btn-agency-indigo py-1 px-3"
                    style={{ fontSize: '0.78rem' }}
                  >
                    View Brand Deal Tracker
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-3 border-top mt-3" style={{ borderColor: 'var(--border-subtle)' }}>
              <button
                onClick={onOpenCopilot}
                className="btn btn-agency-outline w-100 d-flex align-items-center justify-content-center gap-2"
              >
                <span>Ask Copilot for Custom Analysis</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
