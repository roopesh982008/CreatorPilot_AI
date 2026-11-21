import React, { useState } from 'react';
import {
  Sparkles,
  RefreshCw,
  Save,
  CheckCircle2,
  FileCode,
  Layers,
  ArrowRight,
  Clock,
  Video,
  ListOrdered,
  Lightbulb,
  SplitSquareVertical,
  Check,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCreatorData } from '../context/CreatorDataContext';
import { useAuth } from '../context/AuthContext';
import { mockAI } from '../utils/mockAI';
import { useNavigate } from 'react-router-dom';

export default function ContentStrategist() {
  const { user } = useAuth();
  const { activeStrategy, saveStrategy, savedStrategies, addIdea } = useCreatorData();
  const navigate = useNavigate();

  // Inputs
  const [topic, setTopic] = useState("5 AI Tools That Save 20+ Hours Every Week for Students & Devs");
  const [targetAudience, setTargetAudience] = useState(user?.targetAudience || "College students, self-taught devs, and remote workers");
  const [platform, setPlatform] = useState("YouTube");
  const [language, setLanguage] = useState(user?.preferredLanguage || "English");
  const [format, setFormat] = useState("long_form");

  // State
  const [currentStrategy, setCurrentStrategy] = useState(activeStrategy);
  const [comparisonStrategy, setComparisonStrategy] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [loading, setLoading] = useState(false);
  const [regeneratingSection, setRegeneratingSection] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Quick preset chips
  const samplePresets = [
    "AI Tools for College Students: Free Workflows That Save Time",
    "Why Next.js Developers Are Moving to FastAPI in 2026",
    "Building an Autonomous Coding Agent in 15 Minutes",
    "5 High-Income Freelance Skills You Can Learn This Weekend"
  ];

  // Full strategy generation
  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setSavedSuccess(false);

    try {
      const result = await mockAI.generateStrategy({
        topic,
        targetAudience,
        platform,
        language,
        format
      });

      // If comparing, place previous in comparison slot
      if (currentStrategy) {
        setComparisonStrategy(currentStrategy);
      }

      setCurrentStrategy(result);
    } finally {
      setLoading(false);
    }
  };

  // Section regeneration
  const handleRegenerateSection = async (sectionKey) => {
    setRegeneratingSection(sectionKey);
    try {
      const refreshed = await mockAI.regenerateStrategySection(sectionKey, topic);
      if (refreshed) {
        setCurrentStrategy((prev) => ({
          ...prev,
          [sectionKey]: refreshed
        }));
      }
    } finally {
      setRegeneratingSection(null);
    }
  };

  // Save approved strategy
  const handleSaveApproval = () => {
    saveStrategy(currentStrategy);
    addIdea({
      title: currentStrategy.topic,
      topic: currentStrategy.topic,
      platform,
      format,
      targetAudience,
      status: "Script"
    });
    setSavedSuccess(true);

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}

    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="container-fluid p-3 p-lg-4 d-flex flex-column gap-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="agency-badge badge-indigo">
              <Sparkles size={13} /> Gemini 2.0 API Powered
            </span>
            <span className="text-secondary small">Validated Structured JSON Schema</span>
          </div>
          <h2 className="fw-extrabold text-white mb-0 display-7">AI Content Strategist</h2>
        </div>

        <div className="d-flex align-items-center gap-2">
          {comparisonStrategy && (
            <button
              onClick={() => setShowComparison(!showComparison)}
              className={`btn btn-sm ${showComparison ? 'btn-agency-indigo' : 'btn-agency-outline'}`}
            >
              <SplitSquareVertical size={16} />
              <span>{showComparison ? 'Exit Compare' : 'Compare Versions'}</span>
            </button>
          )}

          <button
            onClick={handleSaveApproval}
            className="btn btn-sm btn-agency-primary"
            disabled={!currentStrategy}
          >
            {savedSuccess ? (
              <>
                <Check size={16} /> Approved & Saved!
              </>
            ) : (
              <>
                <Save size={16} /> Approve & Save Strategy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Input Form & Output Strategy */}
      <div className="row g-4">
        {/* Input Configuration Column */}
        <div className="col-xl-4">
          <div className="agency-card p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex align-items-center gap-2 mb-3">
                <Lightbulb size={18} className="text-success" />
                <h5 className="fw-bold text-white mb-0">Strategy Parameters</h5>
              </div>

              <div className="mb-3">
                <label className="form-label">Content Topic / Working Title</label>
                <textarea
                  className="form-control agency-textarea"
                  rows="3"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter video concept or question..."
                ></textarea>

                {/* Quick Presets */}
                <div className="d-flex flex-wrap gap-1 mt-2">
                  <span className="text-muted small" style={{ fontSize: '0.72rem' }}>Suggestions:</span>
                  {samplePresets.map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setTopic(preset)}
                      className="prompt-chip text-start text-truncate"
                      style={{ maxWidth: '100%', fontSize: '0.72rem', padding: '3px 8px' }}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Target Audience & Pain Point</label>
                <input
                  type="text"
                  className="form-control agency-input"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                />
              </div>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label">Platform</label>
                  <select
                    className="form-select agency-select"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                  >
                    <option value="YouTube">YouTube</option>
                    <option value="Instagram">Instagram</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="TikTok">TikTok</option>
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label">Language</label>
                  <select
                    className="form-select agency-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="English">English</option>
                    <option value="Hinglish">Hinglish</option>
                    <option value="Kannada">Kannada</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Content Format</label>
                <select
                  className="form-select agency-select"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                >
                  <option value="long_form">Long-Form Video (10-15 min)</option>
                  <option value="short_form">Vertical Short / Reel (60 sec)</option>
                  <option value="deep_dive">Masterclass Deep Dive (25+ min)</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-top mt-3" style={{ borderColor: 'var(--border-subtle)' }}>
              <button
                onClick={handleGenerate}
                className="btn-agency-primary w-100 py-2"
                disabled={loading || !topic.trim()}
              >
                {loading ? (
                  <>
                    <RefreshCw size={16} className="spin-animation" /> Synthesizing with Gemini...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> Generate Strategy Blueprint
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Output Strategy Blueprint Column */}
        <div className="col-xl-8">
          {loading ? (
            <div className="agency-card p-5 text-center d-flex flex-column align-items-center justify-content-center h-100">
              <div className="spinner-border text-success mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <h5 className="text-white fw-bold mb-1">Synthesizing Content Strategy with Gemini</h5>
              <p className="text-secondary small mb-0" style={{ maxWidth: 450 }}>
                Applying psychological retention hooks, structural storytelling arcs, and high-CTR title formulas...
              </p>
            </div>
          ) : currentStrategy ? (
            <div className="d-flex flex-column gap-3">
              {/* Strategy Header Banner */}
              <div
                className="agency-card p-4 position-relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%)',
                  borderColor: 'rgba(16, 185, 129, 0.3)'
                }}
              >
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <span className="agency-badge badge-lime">Approved Schema</span>
                    <span className="agency-badge badge-neutral">{currentStrategy.format}</span>
                    <span className="agency-badge badge-indigo">{language}</span>
                  </div>
                  <span className="text-secondary small d-flex align-items-center gap-1">
                    <Clock size={14} className="text-warning" /> Est. {currentStrategy.estimated_duration}
                  </span>
                </div>

                <h3 className="fw-bold text-white mb-2">{currentStrategy.topic}</h3>
                <div className="text-secondary small">
                  <strong className="text-white">Content Angle: </strong> {currentStrategy.content_angle}
                </div>
              </div>

              {/* High-Retention Hooks Section */}
              <div className="agency-card p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <span className="pulse-dot pulse-dot-green"></span>
                    <h5 className="fw-bold text-white mb-0">High-Converting Hook Formulas</h5>
                  </div>
                  <button
                    onClick={() => handleRegenerateSection('hooks')}
                    className="btn btn-sm btn-agency-ghost text-secondary d-flex align-items-center gap-1"
                    disabled={regeneratingSection === 'hooks'}
                  >
                    <RefreshCw size={13} className={regeneratingSection === 'hooks' ? 'spin-animation' : ''} />
                    <span>Regenerate Hooks</span>
                  </button>
                </div>

                <div className="d-flex flex-column gap-2">
                  {currentStrategy.hooks?.map((hook, idx) => (
                    <div
                      key={hook.id || idx}
                      className="p-3 rounded-3"
                      style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}
                    >
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <span className="agency-badge badge-indigo" style={{ fontSize: '0.72rem' }}>
                          {hook.type}
                        </span>
                        <span className="text-muted" style={{ fontSize: '0.72rem' }}>00:00 - 00:08</span>
                      </div>
                      <div className="text-white small fw-medium" style={{ lineHeight: 1.5 }}>
                        "{hook.text}"
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Title Options & CTR Prediction */}
              <div className="agency-card p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <Video size={18} className="text-info" />
                    <h5 className="fw-bold text-white mb-0">High-CTR Title Options</h5>
                  </div>
                  <button
                    onClick={() => handleRegenerateSection('title_options')}
                    className="btn btn-sm btn-agency-ghost text-secondary d-flex align-items-center gap-1"
                    disabled={regeneratingSection === 'title_options'}
                  >
                    <RefreshCw size={13} className={regeneratingSection === 'title_options' ? 'spin-animation' : ''} />
                    <span>Regenerate Titles</span>
                  </button>
                </div>

                <div className="row g-2">
                  {currentStrategy.title_options?.map((titleText, idx) => (
                    <div key={idx} className="col-md-6">
                      <div
                        className="p-3 rounded-3 h-100 d-flex flex-column justify-content-between"
                        style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}
                      >
                        <div className="fw-semibold text-white small mb-2">"{titleText}"</div>
                        <div className="d-flex align-items-center justify-content-between mt-auto">
                          <span className="agency-badge badge-neutral" style={{ fontSize: '0.68rem' }}>Option {idx + 1}</span>
                          <span className="agency-badge badge-lime" style={{ fontSize: '0.7rem' }}>
                            Est. CTR {(9.5 - idx * 0.4).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Narrative Outline Flow */}
              <div className="agency-card p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <ListOrdered size={18} className="text-warning" />
                    <h5 className="fw-bold text-white mb-0">Storytelling Outline & Pacing</h5>
                  </div>
                </div>

                <div className="d-flex flex-column gap-3">
                  {currentStrategy.outline?.map((sec, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-3"
                      style={{ background: 'rgba(255, 255, 255, 0.02)', borderLeft: '3px solid #10b981' }}
                    >
                      <div className="fw-bold text-white small mb-1">{sec.heading}</div>
                      <div className="text-secondary small mb-2">{sec.purpose}</div>
                      {sec.talking_points && (
                        <div className="d-flex flex-wrap gap-2">
                          {sec.talking_points.map((tp, i) => (
                            <span key={i} className="agency-badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                              • {tp}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Production Effort & Call to Action Footer */}
              <div className="row g-3">
                <div className="col-md-7">
                  <div className="agency-card p-3 h-100">
                    <div className="text-secondary small fw-semibold text-uppercase mb-2">Primary Call to Action (CTA)</div>
                    <p className="text-white small mb-0 fst-italic">"{currentStrategy.call_to_action}"</p>
                  </div>
                </div>

                <div className="col-md-5">
                  <div className="agency-card p-3 h-100">
                    <div className="text-secondary small fw-semibold text-uppercase mb-2">Production Effort</div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span className="agency-badge badge-amber">{currentStrategy.production_effort?.level || "Medium"}</span>
                      <span className="text-white small">{currentStrategy.production_effort?.shooting_time}</span>
                    </div>
                    <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                      {currentStrategy.production_effort?.editing_complexity}
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Workflow Action Trigger */}
              <div className="d-flex align-items-center justify-content-end gap-2 pt-2">
                <button
                  onClick={() => navigate('/scripts')}
                  className="btn btn-agency-indigo d-flex align-items-center gap-2"
                >
                  <FileCode size={16} />
                  <span>Send to Script Studio</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="agency-card p-5 text-center text-secondary">
              <Sparkles size={40} className="text-muted mb-3" />
              <h5 className="text-white fw-bold">No Active Strategy</h5>
              <p className="small mb-0">Enter a topic and click Generate Strategy to create your blueprint.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
