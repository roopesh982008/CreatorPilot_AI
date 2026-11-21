import React, { useState } from 'react';
import {
  Sparkles,
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  FileCode,
  Image,
  Calendar,
  Layers,
  Loader2,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCreatorData } from '../context/CreatorDataContext';
import { useAuth } from '../context/AuthContext';
import { mockAI } from '../utils/mockAI';

export default function CampaignWizardModal({ isOpen, onClose }) {
  const { user } = useAuth();
  const { addIdea, saveStrategy, setScripts, setThumbnails, addTask } = useCreatorData();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form & generated state
  const [topicInput, setTopicInput] = useState("5 High-Income Developer Skills in 2026 That AI Can't Replace");
  const [platform, setPlatform] = useState("YouTube");
  const [format, setFormat] = useState("long_form");
  const [targetAudience, setTargetAudience] = useState("Junior to Mid-level Software Engineers");

  const [generatedStrategy, setGeneratedStrategy] = useState(null);
  const [generatedTitles, setGeneratedTitles] = useState(null);
  const [generatedScript, setGeneratedScript] = useState(null);
  const [scheduledDate, setScheduledDate] = useState(
    new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0]
  );
  const [assignee, setAssignee] = useState("Alex Rivera (Creator)");

  if (!isOpen) return null;

  // Step 2: Generate Strategy
  const handleGenerateStrategy = async () => {
    setLoading(true);
    try {
      const res = await mockAI.generateStrategy({
        topic: topicInput,
        targetAudience,
        platform,
        language: user?.preferredLanguage || 'English',
        format
      });
      setGeneratedStrategy(res);
      setCurrentStep(2);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Generate Titles & Thumbnails
  const handleGenerateTitles = async () => {
    setLoading(true);
    try {
      const res = await mockAI.generateThumbnailAndTitles(topicInput, user?.niche);
      setGeneratedTitles(res);
      setCurrentStep(3);
    } finally {
      setLoading(false);
    }
  };

  // Step 4: Generate Script
  const handleGenerateScript = async () => {
    setLoading(true);
    try {
      const res = await mockAI.generateScriptDraft({
        title: topicInput,
        topic: topicInput,
        strategy: generatedStrategy,
        format,
        language: user?.preferredLanguage || 'English'
      });
      setGeneratedScript(res);
      setCurrentStep(4);
    } finally {
      setLoading(false);
    }
  };

  // Step 5: Final Review & Persist Campaign
  const handleFinishCampaign = () => {
    // 1. Add Idea
    const savedIdea = addIdea({
      title: topicInput,
      topic: "Tech & Software Development",
      platform,
      format,
      targetAudience,
      status: "Production"
    });

    // 2. Save Strategy
    if (generatedStrategy) {
      saveStrategy(generatedStrategy);
    }

    // 3. Save Script
    if (generatedScript) {
      const newScriptObj = {
        id: `script-${Date.now()}`,
        ideaId: savedIdea.id,
        title: topicInput,
        format,
        language: user?.preferredLanguage || "English",
        currentVersion: "v1.0",
        updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        wordCount: generatedScript.wordCount || 1200,
        estimatedMinutes: "10m 30s",
        versions: [
          {
            version: "v1.0",
            date: new Date().toISOString().replace('T', ' ').slice(0, 16),
            note: "1-Click Campaign Draft",
            content: generatedScript.scriptText
          }
        ],
        reviewMetrics: {
          hookScore: 92,
          clarityScore: 90,
          pacingScore: 89,
          storytellingGrade: "A",
          suggestions: ["Generated from 1-Click Campaign. Ready for scene recording."]
        },
        shortRepurposed: []
      };
      setScripts((prev) => [newScriptObj, ...prev]);
    }

    // 4. Save Thumbnails
    if (generatedTitles) {
      const newThumbObj = {
        id: `thumb-${Date.now()}`,
        ideaTitle: topicInput,
        options: generatedTitles.titleOptions.map((t, idx) => ({
          ...t,
          brief: generatedTitles.creativeBriefs[idx % generatedTitles.creativeBriefs.length]
        }))
      };
      setThumbnails((prev) => [newThumbObj, ...prev]);
    }

    // 5. Save Calendar & Kanban Task
    addTask({
      title: topicInput,
      platform,
      stage: 'Production',
      assignee,
      dueDate: scheduledDate,
      priority: 'High',
      tags: ['1-Click Campaign', 'Ready to Film']
    });

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }

    onClose();
  };

  const stepsList = [
    { num: 1, title: 'Idea & Angle', icon: Layers },
    { num: 2, title: 'Strategy Plan', icon: Sparkles },
    { num: 3, title: 'Titles & Briefs', icon: Image },
    { num: 4, title: 'Script Draft', icon: FileCode },
    { num: 5, title: 'Schedule & Publish', icon: Calendar }
  ];

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)', zIndex: 1055 }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content agency-modal-content">
          {/* Header */}
          <div className="agency-modal-header d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <div
                className="rounded-3 p-2 d-flex align-items-center justify-content-center"
                style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}
              >
                <Sparkles size={20} />
              </div>
              <div>
                <h5 className="modal-title fw-bold text-white mb-0">One-Click Campaign Preparation</h5>
                <p className="text-secondary small mb-0">
                  Sequential workflow: Idea → Strategy → Titles → Script Draft → Calendar Schedule
                </p>
              </div>
            </div>
            <button type="button" className="btn btn-agency-ghost text-secondary" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="px-4 py-3 border-bottom" style={{ borderColor: 'var(--border-subtle)', background: 'rgba(9, 13, 24, 0.7)' }}>
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
              {stepsList.map((step) => {
                const StepIcon = step.icon;
                const isDone = currentStep > step.num;
                const isCurrent = currentStep === step.num;

                return (
                  <div
                    key={step.num}
                    className={`d-flex align-items-center gap-2 px-3 py-2 rounded-3 ${
                      isCurrent
                        ? 'border border-success text-white'
                        : isDone
                        ? 'text-success'
                        : 'text-muted'
                    }`}
                    style={{
                      background: isCurrent
                        ? 'rgba(16, 185, 129, 0.12)'
                        : isDone
                        ? 'rgba(16, 185, 129, 0.05)'
                        : 'transparent',
                      fontSize: '0.85rem'
                    }}
                  >
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: 24,
                        height: 24,
                        background: isCurrent
                          ? '#10b981'
                          : isDone
                          ? 'rgba(16, 185, 129, 0.3)'
                          : 'rgba(255, 255, 255, 0.08)',
                        color: isCurrent ? '#000' : isDone ? '#10b981' : '#94a3b8',
                        fontWeight: 700,
                        fontSize: '0.75rem'
                      }}
                    >
                      {isDone ? <Check size={14} /> : step.num}
                    </div>
                    <span className="fw-semibold">{step.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Modal Body */}
          <div className="modal-body p-4">
            {/* Step 1: Idea Input */}
            {currentStep === 1 && (
              <div className="row g-4">
                <div className="col-12">
                  <div className="alert border-0 p-3 rounded-3" style={{ background: 'rgba(99, 102, 241, 0.1)', borderLeft: '4px solid #6366f1' }}>
                    <div className="d-flex align-items-center gap-2 text-white fw-semibold small mb-1">
                      <Sparkles size={16} className="text-info" /> Gemini Automated Sequence
                    </div>
                    <span className="text-secondary small">
                      Select or type your core topic. CreatorPilot AI will generate a structured strategy, title options, thumbnail creative briefs, script draft, and schedule tasks into your Kanban board.
                    </span>
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label">Core Content Topic / Working Title</label>
                  <input
                    type="text"
                    className="form-control agency-input"
                    value={topicInput}
                    onChange={(e) => setTopicInput(e.target.value)}
                    placeholder="e.g. 5 AI Automations Every Student Needs in 2026"
                  />
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    <span className="text-muted small">Quick Presets:</span>
                    {[
                      "FastAPI vs Next.js: The 2026 Backend Migration",
                      "How I Scaled My YouTube Channel to $10k/mo with AI",
                      "Top 3 Micro-SaaS Ideas You Can Build in a Weekend"
                    ].map((p, i) => (
                      <span
                        key={i}
                        className="prompt-chip"
                        onClick={() => setTopicInput(p)}
                        style={{ fontSize: '0.74rem' }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Target Audience</label>
                  <input
                    type="text"
                    className="form-control agency-input"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Primary Platform</label>
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

                <div className="col-md-3">
                  <label className="form-label">Content Format</label>
                  <select
                    className="form-select agency-select"
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                  >
                    <option value="long_form">Long-Form Video (10-15m)</option>
                    <option value="short_form">Short / Reel (60s)</option>
                    <option value="deep_dive">Masterclass Deep Dive (25m+)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Strategy Review */}
            {currentStep === 2 && generatedStrategy && (
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <span className="agency-badge badge-lime mb-1">Generated with Gemini</span>
                    <h5 className="fw-bold text-white mb-0">{generatedStrategy.topic}</h5>
                  </div>
                  <span className="agency-badge badge-neutral">{generatedStrategy.estimated_duration}</span>
                </div>

                <div className="agency-card p-3">
                  <div className="text-secondary small fw-semibold text-uppercase mb-1">Content Angle</div>
                  <p className="text-white small mb-0">{generatedStrategy.content_angle}</p>
                </div>

                <div className="agency-card p-3">
                  <div className="text-secondary small fw-semibold text-uppercase mb-2">High-Retention Hooks</div>
                  <div className="d-flex flex-column gap-2">
                    {generatedStrategy.hooks.map((h, idx) => (
                      <div key={idx} className="p-2 rounded-2" style={{ background: 'rgba(255, 255, 255, 0.04)' }}>
                        <span className="badge-indigo agency-badge mb-1" style={{ fontSize: '0.7rem' }}>{h.type}</span>
                        <div className="text-white small">"{h.text}"</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="agency-card p-3">
                  <div className="text-secondary small fw-semibold text-uppercase mb-2">Outline & Flow</div>
                  <div className="d-flex flex-column gap-2">
                    {generatedStrategy.outline.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="d-flex gap-2">
                        <span className="text-success fw-bold small">•</span>
                        <div>
                          <strong className="text-white small">{item.heading}</strong>:
                          <span className="text-secondary small ms-1">{item.purpose}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Titles & Thumbnails Review */}
            {currentStep === 3 && generatedTitles && (
              <div className="d-flex flex-column gap-3">
                <span className="agency-badge badge-indigo">Step 3 of 5 • Creative Pack</span>
                <h5 className="fw-bold text-white mb-2">Selected High-CTR Titles & Thumbnail Briefs</h5>

                <div className="row g-3">
                  {generatedTitles.titleOptions.slice(0, 3).map((t, idx) => (
                    <div key={idx} className="col-md-4">
                      <div className="agency-card p-3 h-100 d-flex flex-column justify-content-between">
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <span className="agency-badge badge-neutral" style={{ fontSize: '0.68rem' }}>Option {idx + 1}</span>
                            <span className="agency-badge badge-lime" style={{ fontSize: '0.72rem' }}>
                              CTR {t.predictedCtr}%
                            </span>
                          </div>
                          <div className="fw-semibold text-white small mb-2">"{t.title}"</div>
                        </div>
                        <span className="text-muted" style={{ fontSize: '0.75rem' }}>{t.category}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {generatedTitles.creativeBriefs?.[0] && (
                  <div className="agency-card p-3 mt-2">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-secondary small fw-semibold text-uppercase">Recommended Thumbnail Concept</span>
                      <span className="agency-badge badge-amber">Contrast Ratio: 8.5:1</span>
                    </div>
                    <div className="text-white small mb-2">
                      <strong>Visual Concept:</strong> {generatedTitles.creativeBriefs[0].visualConcept}
                    </div>
                    <div className="d-flex flex-wrap gap-2 pt-2 border-top" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                      <span className="agency-badge badge-neutral">Overlay: "{generatedTitles.creativeBriefs[0].textOverlay}"</span>
                      <span className="agency-badge badge-neutral">Expression: {generatedTitles.creativeBriefs[0].expression}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Script Draft Review */}
            {currentStep === 4 && generatedScript && (
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <span className="agency-badge badge-lime mb-1">Generated Script (Draft v1.0)</span>
                    <h5 className="fw-bold text-white mb-0">{topicInput}</h5>
                  </div>
                  <div className="text-muted small">
                    Words: {generatedScript.wordCount} • Language: {generatedScript.language}
                  </div>
                </div>

                <div
                  className="p-3 rounded-3 border"
                  style={{
                    background: '#090d16',
                    borderColor: 'var(--border-subtle)',
                    maxHeight: '280px',
                    overflowY: 'auto',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap',
                    color: '#e2e8f0'
                  }}
                >
                  {generatedScript.scriptText}
                </div>
              </div>
            )}

            {/* Step 5: Calendar & Kanban Publishing Schedule */}
            {currentStep === 5 && (
              <div className="row g-3">
                <div className="col-12">
                  <div className="alert border-0 p-3 rounded-3" style={{ background: 'rgba(16, 185, 129, 0.12)', borderLeft: '4px solid #10b981' }}>
                    <div className="fw-semibold text-white small mb-1 d-flex align-items-center gap-2">
                      <CheckCircle2 size={16} className="text-success" /> Campaign Ready for Final Approval
                    </div>
                    <span className="text-secondary small">
                      All assets have been generated. Set your target publishing deadline and team assignee to push this campaign directly to your Kanban workflow and content calendar.
                    </span>
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Target Publishing Deadline</label>
                  <input
                    type="date"
                    className="form-control agency-input"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Team Assignee</label>
                  <select
                    className="form-select agency-select"
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                  >
                    <option value="Alex Rivera (Creator)">Alex Rivera (Creator)</option>
                    <option value="Marcus Vance (Editor)">Marcus Vance (Editor)</option>
                    <option value="Sarah Chen (Researcher)">Sarah Chen (Researcher)</option>
                    <option value="Elena Rostova (Shorts Manager)">Elena Rostova (Shorts Manager)</option>
                  </select>
                </div>

                <div className="col-12">
                  <div className="agency-card p-3 mt-2">
                    <div className="text-secondary small fw-semibold text-uppercase mb-2">Campaign Summary To Persist</div>
                    <div className="d-flex flex-column gap-2 text-white small">
                      <div>✓ <strong>Title:</strong> {topicInput}</div>
                      <div>✓ <strong>Platform:</strong> {platform} ({format})</div>
                      <div>✓ <strong>Strategy:</strong> 3 Hooks, 5-point Outline, CTA</div>
                      <div>✓ <strong>Thumbnails:</strong> 5 title variations with CTR predictions</div>
                      <div>✓ <strong>Script:</strong> Scene breakdown with speaker cues</div>
                      <div>✓ <strong>Workflow:</strong> Added to Kanban at "Production" stage</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="agency-modal-footer d-flex align-items-center justify-content-between">
            {currentStep > 1 ? (
              <button
                type="button"
                className="btn btn-agency-outline"
                onClick={() => setCurrentStep((s) => s - 1)}
                disabled={loading}
              >
                <ArrowLeft size={16} /> Back
              </button>
            ) : (
              <div></div>
            )}

            <div className="d-flex align-items-center gap-2">
              {currentStep === 1 && (
                <button
                  type="button"
                  className="btn btn-agency-primary"
                  onClick={handleGenerateStrategy}
                  disabled={loading || !topicInput.trim()}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="spin-animation" /> Generating Strategy with Gemini...
                    </>
                  ) : (
                    <>
                      Generate Strategy <ArrowRight size={16} />
                    </>
                  )}
                </button>
              )}

              {currentStep === 2 && (
                <button
                  type="button"
                  className="btn btn-agency-primary"
                  onClick={handleGenerateTitles}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="spin-animation" /> Generating Titles & Thumbnails...
                    </>
                  ) : (
                    <>
                      Approve & Generate Titles <ArrowRight size={16} />
                    </>
                  )}
                </button>
              )}

              {currentStep === 3 && (
                <button
                  type="button"
                  className="btn btn-agency-primary"
                  onClick={handleGenerateScript}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="spin-animation" /> Generating Script Draft...
                    </>
                  ) : (
                    <>
                      Approve & Generate Script <ArrowRight size={16} />
                    </>
                  )}
                </button>
              )}

              {currentStep === 4 && (
                <button
                  type="button"
                  className="btn btn-agency-primary"
                  onClick={() => setCurrentStep(5)}
                >
                  Proceed to Schedule <ArrowRight size={16} />
                </button>
              )}

              {currentStep === 5 && (
                <button
                  type="button"
                  className="btn btn-agency-primary"
                  onClick={handleFinishCampaign}
                >
                  <Sparkles size={16} /> Approve & Deploy Campaign
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
