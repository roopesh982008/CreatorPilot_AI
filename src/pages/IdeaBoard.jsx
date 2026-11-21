import React, { useState } from 'react';
import {
  Lightbulb,
  Plus,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Trash2,
  Calendar,
  Layers,
  Filter,
  CheckCircle2,
  FileCode
} from 'lucide-react';
import { useCreatorData } from '../context/CreatorDataContext';
import { useNavigate } from 'react-router-dom';

export default function IdeaBoard() {
  const { ideas, addIdea } = useCreatorData();
  const navigate = useNavigate();

  const [platformFilter, setPlatformFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [newPlatform, setNewPlatform] = useState('YouTube');
  const [newFormat, setNewFormat] = useState('long_form');
  const [newAudience, setNewAudience] = useState('Developers and Tech Creators');
  const [newEffort, setNewEffort] = useState('Medium');

  const filteredIdeas = ideas.filter((idea) => {
    if (platformFilter !== 'All' && idea.platform !== platformFilter) return false;
    return true;
  });

  const handleCreateIdea = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addIdea({
      title: newTitle,
      topic: newTopic || newTitle,
      platform: newPlatform,
      format: newFormat,
      targetAudience: newAudience,
      effort: newEffort,
      status: 'Idea'
    });

    setNewTitle('');
    setNewTopic('');
    setShowAddModal(false);
  };

  const handleDevelopStrategy = (idea) => {
    // Navigate to strategist with this idea
    navigate('/strategist', { state: { prefillTopic: idea.title, prefillPlatform: idea.platform } });
  };

  return (
    <div className="container-fluid p-3 p-lg-4 d-flex flex-column gap-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="agency-badge badge-lime">Module B Sub-System</span>
            <span className="text-secondary small">Idea Reservoir & Incubation Board</span>
          </div>
          <h2 className="fw-extrabold text-white mb-0 display-7">Content Idea Board</h2>
        </div>

        <div className="d-flex align-items-center gap-2">
          <select
            className="form-select agency-select py-1 px-3"
            style={{ width: 'auto', fontSize: '0.85rem' }}
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
          >
            <option value="All">All Platforms</option>
            <option value="YouTube">YouTube</option>
            <option value="Instagram">Instagram</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="TikTok">TikTok</option>
          </select>

          <button onClick={() => setShowAddModal(true)} className="btn btn-agency-primary">
            <Plus size={16} /> Add Content Idea
          </button>
        </div>
      </div>

      {/* Ideas Card Grid */}
      <div className="row g-3 g-xl-4">
        {filteredIdeas.map((idea) => (
          <div key={idea.id} className="col-md-6 col-xl-4">
            <div className="agency-card p-4 h-100 d-flex flex-column justify-content-between agency-card-interactive">
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="agency-badge badge-neutral">{idea.platform}</span>
                  <span
                    className={`agency-badge ${
                      idea.status === 'Published'
                        ? 'badge-lime'
                        : idea.status === 'Production'
                        ? 'badge-amber'
                        : idea.status === 'Script'
                        ? 'badge-indigo'
                        : 'badge-neutral'
                    }`}
                  >
                    {idea.status}
                  </span>
                </div>

                <h5 className="fw-bold text-white mb-2" style={{ lineHeight: 1.4 }}>
                  {idea.title}
                </h5>

                <p className="text-secondary small mb-3">
                  <strong className="text-muted">Topic: </strong> {idea.topic}
                </p>

                <div className="p-2 rounded-2 mb-3" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                  <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                    AUDIENCE: {idea.targetAudience}
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-1 pt-1 border-top" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <span className="text-secondary small">Effort: <strong>{idea.effort || 'Medium'}</strong></span>
                    <span className="text-success small fw-semibold">Est. {idea.viewsEstimate || '45k'} views</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-top d-flex align-items-center justify-content-between" style={{ borderColor: 'var(--border-subtle)' }}>
                <span className="text-muted small" style={{ fontSize: '0.72rem' }}>
                  Added {idea.createdAt || 'Recent'}
                </span>

                <button
                  onClick={() => handleDevelopStrategy(idea)}
                  className="btn btn-sm btn-agency-indigo py-1 px-3 d-flex align-items-center gap-1"
                  style={{ fontSize: '0.78rem' }}
                >
                  <Sparkles size={13} />
                  <span>AI Strategy</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Idea Modal */}
      {showAddModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1055 }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content agency-modal-content">
              <div className="agency-modal-header d-flex align-items-center justify-content-between">
                <h5 className="modal-title fw-bold text-white mb-0">Capture New Content Idea</h5>
                <button className="btn btn-agency-ghost text-secondary p-1" onClick={() => setShowAddModal(false)}>✕</button>
              </div>

              <form onSubmit={handleCreateIdea}>
                <div className="modal-body p-4 d-flex flex-column gap-3">
                  <div>
                    <label className="form-label">Working Title / Hook Idea</label>
                    <input
                      type="text"
                      className="form-control agency-input"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. 3 Clean Architecture Mistakes Junior Devs Make"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Core Topic / Theme</label>
                    <input
                      type="text"
                      className="form-control agency-input"
                      value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value)}
                      placeholder="e.g. System Design & Code Quality"
                    />
                  </div>

                  <div className="row g-2">
                    <div className="col-6">
                      <label className="form-label">Platform</label>
                      <select
                        className="form-select agency-select"
                        value={newPlatform}
                        onChange={(e) => setNewPlatform(e.target.value)}
                      >
                        <option value="YouTube">YouTube</option>
                        <option value="Instagram">Instagram</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="TikTok">TikTok</option>
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="form-label">Format</label>
                      <select
                        className="form-select agency-select"
                        value={newFormat}
                        onChange={(e) => setNewFormat(e.target.value)}
                      >
                        <option value="long_form">Long Video (10m+)</option>
                        <option value="short_form">Short / Reel (60s)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Target Audience</label>
                    <input
                      type="text"
                      className="form-control agency-input"
                      value={newAudience}
                      onChange={(e) => setNewAudience(e.target.value)}
                    />
                  </div>
                </div>

                <div className="agency-modal-footer d-flex align-items-center justify-content-end gap-2">
                  <button type="button" className="btn btn-agency-outline" onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-agency-primary">Save Idea to Board</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
