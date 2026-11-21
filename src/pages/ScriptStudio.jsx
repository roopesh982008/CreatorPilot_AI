import React, { useState } from 'react';
import {
  FileCode,
  Sparkles,
  Save,
  History,
  Scissors,
  CheckCircle2,
  Copy,
  Languages,
  Play,
  RotateCcw,
  Gauge,
  HelpCircle,
  Eye,
  Plus
} from 'lucide-react';
import { useCreatorData } from '../context/CreatorDataContext';
import { useAuth } from '../context/AuthContext';
import { mockAI } from '../utils/mockAI';

export default function ScriptStudio() {
  const { user } = useAuth();
  const { scripts, updateScript, setScripts } = useCreatorData();

  // Active script selection
  const [selectedScriptId, setSelectedScriptId] = useState(scripts[0]?.id || 'script-101');
  const activeScript = scripts.find((s) => s.id === selectedScriptId) || scripts[0];

  // Editor states
  const [editorText, setEditorText] = useState(
    activeScript?.versions?.[0]?.content || activeScript?.versions?.[activeScript.versions.length - 1]?.content || ""
  );
  const [activeTab, setActiveTab] = useState('editor'); // 'editor', 'versions', 'repurpose', 'review'
  const [saveNote, setSaveNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // AI states
  const [isReviewing, setIsReviewing] = useState(false);
  const [isRepurposing, setIsRepurposing] = useState(false);
  const [isGeneratingNew, setIsGeneratingNew] = useState(false);

  // New script generation modal inputs
  const [newTitle, setNewTitle] = useState('');
  const [newFormat, setNewFormat] = useState('long_form');
  const [newLanguage, setNewLanguage] = useState(user?.preferredLanguage || 'English');

  // Word count & time stats
  const wordCount = editorText.trim() ? editorText.trim().split(/\s+/).length : 0;
  const readingTimeMin = Math.ceil(wordCount / 140);

  // Handle Switch Script
  const handleSelectScript = (sId) => {
    setSelectedScriptId(sId);
    const found = scripts.find((s) => s.id === sId);
    if (found && found.versions?.length > 0) {
      setEditorText(found.versions[0].content);
    }
  };

  // Save new version
  const handleSaveDraft = () => {
    if (!activeScript) return;
    setIsSaving(true);
    updateScript(activeScript.id, editorText, saveNote || "Manual script edit");
    setTimeout(() => {
      setIsSaving(false);
      setSaveNote('');
    }, 600);
  };

  // AI Hook & Script Review
  const handleRunReview = async () => {
    setIsReviewing(true);
    try {
      const reviewResults = await mockAI.reviewScript(editorText);
      setScripts((prev) =>
        prev.map((s) =>
          s.id === activeScript.id ? { ...s, reviewMetrics: reviewResults } : s
        )
      );
      setActiveTab('review');
    } finally {
      setIsReviewing(false);
    }
  };

  // Repurpose to Shorts
  const handleRepurpose = async () => {
    setIsRepurposing(true);
    try {
      const shortsList = await mockAI.repurposeToShorts(editorText, activeScript.title);
      setScripts((prev) =>
        prev.map((s) =>
          s.id === activeScript.id ? { ...s, shortRepurposed: shortsList } : s
        )
      );
      setActiveTab('repurpose');
    } finally {
      setIsRepurposing(false);
    }
  };

  // Generate Brand New Script Draft
  const handleGenerateNewScript = async () => {
    if (!newTitle.trim()) return;
    setIsGeneratingNew(true);
    try {
      const res = await mockAI.generateScriptDraft({
        title: newTitle,
        topic: newTitle,
        format: newFormat,
        language: newLanguage
      });

      const newScriptObj = {
        id: `script-${Date.now()}`,
        title: newTitle,
        format: newFormat,
        language: newLanguage,
        currentVersion: "v1.0",
        updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        wordCount: res.wordCount,
        estimatedMinutes: `${Math.ceil(res.wordCount / 140)} min`,
        versions: [
          {
            version: "v1.0",
            date: new Date().toISOString().replace('T', ' ').slice(0, 16),
            note: `Initial Gemini Draft (${newLanguage})`,
            content: res.scriptText
          }
        ],
        reviewMetrics: {
          hookScore: 90,
          clarityScore: 89,
          pacingScore: 86,
          storytellingGrade: "A",
          suggestions: ["Initial draft generated with structured scene breakdowns."]
        },
        shortRepurposed: []
      };

      setScripts((prev) => [newScriptObj, ...prev]);
      setSelectedScriptId(newScriptObj.id);
      setEditorText(res.scriptText);
      setNewTitle('');
    } finally {
      setIsGeneratingNew(false);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="container-fluid p-3 p-lg-4 d-flex flex-column gap-4">
      {/* Header Bar */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="agency-badge badge-lime">Module C</span>
            <span className="text-secondary small">Teleprompter & Script Studio</span>
            <span className="agency-badge badge-indigo">
              <Languages size={12} /> Multi-Language (EN / Hinglish / Kannada)
            </span>
          </div>
          <h2 className="fw-extrabold text-white mb-0 display-7">AI Script Studio</h2>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            onClick={handleRunReview}
            className="btn btn-sm btn-agency-outline"
            disabled={isReviewing}
          >
            <Gauge size={15} />
            <span>{isReviewing ? 'Analyzing...' : 'Audit Hook & Retention'}</span>
          </button>

          <button
            onClick={handleRepurpose}
            className="btn btn-sm btn-agency-indigo"
            disabled={isRepurposing}
          >
            <Scissors size={15} />
            <span>{isRepurposing ? 'Repurposing...' : 'Repurpose to Shorts (3x)'}</span>
          </button>

          <button
            onClick={handleSaveDraft}
            className="btn btn-sm btn-agency-primary"
            disabled={isSaving}
          >
            <Save size={15} />
            <span>{isSaving ? 'Saving...' : 'Save Revision'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="row g-4">
        {/* Left Column: Script Switcher & New Generation Form */}
        <div className="col-xl-3">
          <div className="d-flex flex-column gap-3">
            {/* Script Selector List */}
            <div className="agency-card p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-secondary small fw-bold text-uppercase">Project Scripts</span>
                <span className="agency-badge badge-neutral">{scripts.length} Total</span>
              </div>

              <div className="d-flex flex-column gap-2">
                {scripts.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => handleSelectScript(s.id)}
                    className={`p-2 rounded-3 cursor-pointer transition-all ${
                      s.id === selectedScriptId
                        ? 'border border-success text-white'
                        : 'text-secondary hover-bg'
                    }`}
                    style={{
                      background: s.id === selectedScriptId ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                      cursor: 'pointer'
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <span className="agency-badge badge-neutral" style={{ fontSize: '0.65rem' }}>{s.currentVersion}</span>
                      <span className="agency-badge badge-indigo" style={{ fontSize: '0.65rem' }}>{s.language}</span>
                    </div>
                    <div className="fw-semibold text-white small text-truncate">{s.title}</div>
                    <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                      {s.wordCount} words • {s.updatedAt?.split(' ')[0]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Generator For New Script */}
            <div className="agency-card p-3">
              <div className="d-flex align-items-center gap-2 mb-2">
                <Sparkles size={16} className="text-info" />
                <span className="text-white small fw-bold">Generate New Script Draft</span>
              </div>

              <div className="mb-2">
                <input
                  type="text"
                  className="form-control agency-input"
                  style={{ fontSize: '0.82rem', padding: '8px 12px' }}
                  placeholder="Topic or video title..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div className="row g-1 mb-2">
                <div className="col-6">
                  <select
                    className="form-select agency-select"
                    style={{ fontSize: '0.78rem', padding: '6px 8px' }}
                    value={newFormat}
                    onChange={(e) => setNewFormat(e.target.value)}
                  >
                    <option value="long_form">Long Video</option>
                    <option value="short_form">Short 60s</option>
                  </select>
                </div>
                <div className="col-6">
                  <select
                    className="form-select agency-select"
                    style={{ fontSize: '0.78rem', padding: '6px 8px' }}
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                  >
                    <option value="English">English</option>
                    <option value="Hinglish">Hinglish</option>
                    <option value="Kannada">Kannada</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerateNewScript}
                className="btn btn-sm btn-agency-outline w-100"
                style={{ fontSize: '0.8rem' }}
                disabled={isGeneratingNew || !newTitle.trim()}
              >
                {isGeneratingNew ? 'Drafting...' : '+ Generate Draft with Gemini'}
              </button>
            </div>
          </div>
        </div>

        {/* Center/Right Column: Main Editor & Tabs */}
        <div className="col-xl-9">
          <div className="agency-card p-4 d-flex flex-column h-100">
            {/* Active Script Info & Mode Tabs */}
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3 pb-3 border-bottom" style={{ borderColor: 'var(--border-subtle)' }}>
              <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span className="agency-badge badge-lime">{activeScript?.currentVersion}</span>
                  <span className="agency-badge badge-neutral">{activeScript?.language}</span>
                  <span className="text-secondary small">{wordCount} words (~{readingTimeMin} min read)</span>
                </div>
                <h4 className="fw-bold text-white mb-0">{activeScript?.title}</h4>
              </div>

              {/* Navigation Tabs */}
              <ul className="nav nav-pills gap-1">
                <li className="nav-item">
                  <button
                    className={`btn btn-sm ${activeTab === 'editor' ? 'btn-agency-primary' : 'btn-agency-ghost'}`}
                    onClick={() => setActiveTab('editor')}
                  >
                    <FileCode size={14} /> Editor
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`btn btn-sm ${activeTab === 'review' ? 'btn-agency-indigo' : 'btn-agency-ghost'}`}
                    onClick={() => setActiveTab('review')}
                  >
                    <Gauge size={14} /> Hook & Pacing Score
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`btn btn-sm ${activeTab === 'repurpose' ? 'btn-agency-indigo' : 'btn-agency-ghost'}`}
                    onClick={() => setActiveTab('repurpose')}
                  >
                    <Scissors size={14} /> Repurposed Shorts ({activeScript?.shortRepurposed?.length || 0})
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`btn btn-sm ${activeTab === 'versions' ? 'btn-agency-outline' : 'btn-agency-ghost'}`}
                    onClick={() => setActiveTab('versions')}
                  >
                    <History size={14} /> Revisions ({activeScript?.versions?.length || 1})
                  </button>
                </li>
              </ul>
            </div>

            {/* TAB 1: Main Script Editor */}
            {activeTab === 'editor' && (
              <div className="d-flex flex-column flex-grow-1">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="text-muted small" style={{ fontSize: '0.75rem' }}>
                    Type cue markers like <code>[00:00 - HOOK]</code>, <code>(Visual: ...)</code>, or <code>[Audio: ...]</code>
                  </span>
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control agency-input"
                      style={{ width: 220, fontSize: '0.78rem', padding: '4px 10px' }}
                      placeholder="Optional version change note..."
                      value={saveNote}
                      onChange={(e) => setSaveNote(e.target.value)}
                    />
                    <button
                      onClick={handleSaveDraft}
                      className="btn btn-sm btn-agency-outline py-1 px-3"
                      style={{ fontSize: '0.78rem' }}
                    >
                      Save Version
                    </button>
                  </div>
                </div>

                <textarea
                  className="form-control agency-textarea flex-grow-1"
                  style={{
                    minHeight: '440px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.88rem',
                    lineHeight: '1.7',
                    background: '#090d16',
                    borderColor: 'var(--border-subtle)',
                    color: '#f1f5f9',
                    whiteSpace: 'pre-wrap'
                  }}
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="Script draft content will appear here..."
                ></textarea>
              </div>
            )}

            {/* TAB 2: Hook & Quality Review */}
            {activeTab === 'review' && (
              <div className="d-flex flex-column gap-3">
                <div className="row g-3">
                  <div className="col-md-3">
                    <div className="agency-card p-3 text-center">
                      <span className="text-secondary small fw-semibold text-uppercase">Hook Strength</span>
                      <div className="fw-extrabold display-6 text-success mt-1">
                        {activeScript?.reviewMetrics?.hookScore || 92}
                        <span className="text-muted fs-6">/100</span>
                      </div>
                      <span className="agency-badge badge-lime mt-1" style={{ fontSize: '0.7rem' }}>High Retention</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="agency-card p-3 text-center">
                      <span className="text-secondary small fw-semibold text-uppercase">Clarity Score</span>
                      <div className="fw-extrabold display-6 text-info mt-1">
                        {activeScript?.reviewMetrics?.clarityScore || 90}
                        <span className="text-muted fs-6">/100</span>
                      </div>
                      <span className="agency-badge badge-indigo mt-1" style={{ fontSize: '0.7rem' }}>Concise Flow</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="agency-card p-3 text-center">
                      <span className="text-secondary small fw-semibold text-uppercase">Pacing Rating</span>
                      <div className="fw-extrabold display-6 text-warning mt-1">
                        {activeScript?.reviewMetrics?.pacingScore || 88}
                        <span className="text-muted fs-6">/100</span>
                      </div>
                      <span className="agency-badge badge-amber mt-1" style={{ fontSize: '0.7rem' }}>Balanced</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="agency-card p-3 text-center">
                      <span className="text-secondary small fw-semibold text-uppercase">Storytelling</span>
                      <div className="fw-extrabold display-6 text-white mt-1">
                        {activeScript?.reviewMetrics?.storytellingGrade || "A+"}
                      </div>
                      <span className="agency-badge badge-neutral mt-1" style={{ fontSize: '0.7rem' }}>Audience Ready</span>
                    </div>
                  </div>
                </div>

                <div className="agency-card p-4">
                  <h6 className="fw-bold text-white mb-3 d-flex align-items-center gap-2">
                    <Sparkles size={16} className="text-success" /> AI Script Doctor Observations
                  </h6>
                  <div className="d-flex flex-column gap-2">
                    {activeScript?.reviewMetrics?.suggestions?.map((sug, idx) => (
                      <div key={idx} className="p-3 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                        <div className="d-flex align-items-start gap-2">
                          <CheckCircle2 size={16} className="text-success mt-1 flex-shrink-0" />
                          <span className="text-white small" style={{ lineHeight: 1.5 }}>{sug}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Repurposed Shorts */}
            {activeTab === 'repurpose' && (
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="text-secondary small">
                    AI extracted 3 high-impact short-form video hooks from this long-form script.
                  </span>
                  <button
                    onClick={handleRepurpose}
                    className="btn btn-sm btn-agency-outline"
                    disabled={isRepurposing}
                  >
                    <RotateCcw size={13} /> Re-extract Shorts
                  </button>
                </div>

                <div className="row g-3">
                  {activeScript?.shortRepurposed?.map((short, idx) => (
                    <div key={short.id || idx} className="col-md-4">
                      <div className="agency-card p-3 h-100 d-flex flex-column justify-content-between">
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <span className="agency-badge badge-indigo" style={{ fontSize: '0.7rem' }}>
                              {short.targetDuration || '45s'}
                            </span>
                            <button
                              onClick={() => copyToClipboard(`${short.hook}\n\n${short.body}\n\n${short.cta}`, short.id)}
                              className="btn btn-sm btn-agency-ghost p-1"
                              title="Copy Short Script"
                            >
                              {copiedId === short.id ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                            </button>
                          </div>
                          <h6 className="fw-bold text-white mb-2">{short.title}</h6>
                          <div className="p-2 rounded-2 mb-2" style={{ background: 'rgba(255, 255, 255, 0.04)' }}>
                            <div className="text-warning small fw-semibold" style={{ fontSize: '0.72rem' }}>OPENING HOOK:</div>
                            <div className="text-white small">"{short.hook}"</div>
                          </div>
                          <div className="text-secondary small mb-2" style={{ fontSize: '0.8rem', lineHeight: 1.4 }}>
                            {short.body}
                          </div>
                        </div>
                        <div className="pt-2 border-top mt-auto" style={{ borderColor: 'var(--border-subtle)' }}>
                          <span className="text-muted" style={{ fontSize: '0.72rem' }}>CTA: {short.cta}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: Revisions & Diff History */}
            {activeTab === 'versions' && (
              <div className="d-flex flex-column gap-3">
                <h6 className="fw-bold text-white mb-2">Saved Script Revisions</h6>
                <div className="d-flex flex-column gap-3">
                  {activeScript?.versions?.map((v, idx) => (
                    <div key={idx} className="agency-card p-3">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <span className="agency-badge badge-lime">{v.version}</span>
                          <span className="text-white small fw-semibold">{v.note}</span>
                        </div>
                        <span className="text-muted small" style={{ fontSize: '0.75rem' }}>{v.date}</span>
                      </div>
                      <div
                        className="p-3 rounded-3"
                        style={{
                          background: '#090d16',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-mono)',
                          maxHeight: '120px',
                          overflowY: 'auto',
                          whiteSpace: 'pre-wrap',
                          color: '#cbd5e1'
                        }}
                      >
                        {v.content}
                      </div>
                      <div className="mt-2 text-end">
                        <button
                          onClick={() => {
                            setEditorText(v.content);
                            setActiveTab('editor');
                          }}
                          className="btn btn-sm btn-agency-outline py-1 px-3"
                          style={{ fontSize: '0.75rem' }}
                        >
                          Load into Editor
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
