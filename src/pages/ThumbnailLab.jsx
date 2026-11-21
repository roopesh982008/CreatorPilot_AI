import React, { useState } from 'react';
import {
  Image,
  Sparkles,
  TrendingUp,
  Sliders,
  Eye,
  CheckCircle,
  Copy,
  Plus,
  BarChart3,
  Check,
  Palette,
  Camera
} from 'lucide-react';
import { useCreatorData } from '../context/CreatorDataContext';
import { useAuth } from '../context/AuthContext';
import { mockAI } from '../utils/mockAI';

export default function ThumbnailLab() {
  const { user } = useAuth();
  const { thumbnails, setThumbnails } = useCreatorData();

  const [inputIdea, setInputIdea] = useState("5 AI Tools That Save 20+ Hours Every Week");
  const [loading, setLoading] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);

  // A/B test metrics tracker
  const [abData, setAbData] = useState({
    varAName: "Option 1: ONLY 5 WORK",
    varAImpressions: 28400,
    varAClicks: 2780,
    varBName: "Option 2: IT'S OVER",
    varBImpressions: 26100,
    varBClicks: 2140
  });

  const varACtr = ((abData.varAClicks / (abData.varAImpressions || 1)) * 100).toFixed(1);
  const varBCtr = ((abData.varBClicks / (abData.varBImpressions || 1)) * 100).toFixed(1);

  // Active laboratory data
  const activeLab = thumbnails[0] || {
    ideaTitle: inputIdea,
    options: []
  };

  const handleGenerateBriefs = async () => {
    if (!inputIdea.trim()) return;
    setLoading(true);
    try {
      const res = await mockAI.generateThumbnailAndTitles(inputIdea, user?.niche);
      const newLabObj = {
        id: `thumb-${Date.now()}`,
        ideaTitle: inputIdea,
        options: res.titleOptions.map((t, idx) => ({
          ...t,
          brief: res.creativeBriefs[idx % res.creativeBriefs.length]
        }))
      };
      setThumbnails((prev) => [newLabObj, ...prev]);
      setSelectedVariant(0);
    } finally {
      setLoading(false);
    }
  };

  const currentOption = activeLab?.options?.[selectedVariant] || activeLab?.options?.[0];

  return (
    <div className="container-fluid p-3 p-lg-4 d-flex flex-column gap-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="agency-badge badge-amber">Module D</span>
            <span className="text-secondary small">Creative Briefs & CTR Optimization</span>
          </div>
          <h2 className="fw-extrabold text-white mb-0 display-7">Thumbnail & Title Laboratory</h2>
        </div>

        <button
          onClick={handleGenerateBriefs}
          className="btn btn-agency-primary"
          disabled={loading || !inputIdea.trim()}
        >
          <Sparkles size={16} />
          <span>{loading ? 'Synthesizing...' : 'Generate Title & Brief Pack'}</span>
        </button>
      </div>

      {/* Input Generator Banner */}
      <div className="agency-card p-3 p-md-4">
        <div className="row g-3 align-items-center">
          <div className="col-lg-8">
            <label className="form-label">Video Title / Concept For Thumbnail Strategy</label>
            <input
              type="text"
              className="form-control agency-input"
              value={inputIdea}
              onChange={(e) => setInputIdea(e.target.value)}
              placeholder="e.g. Building an Autonomous AI Agent in 15 Minutes"
            />
          </div>
          <div className="col-lg-4 text-lg-end pt-lg-4">
            <span className="text-secondary small">
              Gemini creates high-CTR title variations and detailed creative briefs for your graphic designer.
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Live Mockup + Creative Briefs */}
      <div className="row g-4">
        {/* Left: Interactive Live Mockup & Brief */}
        <div className="col-xl-7">
          <div className="agency-card p-4 d-flex flex-column gap-3 h-100">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <Camera size={18} className="text-warning" />
                <h5 className="fw-bold text-white mb-0">Live Feed Mockup Simulator</h5>
              </div>
              <span className="agency-badge badge-neutral">16:9 Aspect Ratio</span>
            </div>

            {/* Visual Thumbnail Preview Box */}
            <div
              className="rounded-4 overflow-hidden position-relative border"
              style={{
                aspectRatio: '16/9',
                background: 'linear-gradient(135deg, #0b1120 0%, #1e1b4b 50%, #064e3b 100%)',
                borderColor: 'var(--border-subtle)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6)'
              }}
            >
              {/* Mock Subject Cutout */}
              <div
                className="position-absolute bottom-0 start-0 p-4"
                style={{ zIndex: 2 }}
              >
                <div
                  className="rounded-circle border border-2 border-white d-inline-block mb-2"
                  style={{ width: 64, height: 64, overflow: 'hidden' }}
                >
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120"}
                    alt="Creator Face"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="badge-lime agency-badge fw-bold" style={{ fontSize: '0.75rem' }}>
                  {currentOption?.brief?.expression || "Intense Warning"}
                </div>
              </div>

              {/* High Contrast Big Text Overlay */}
              <div
                className="position-absolute top-50 end-0 translate-middle-y p-4 text-end"
                style={{ zIndex: 2, maxWidth: '65%' }}
              >
                <div
                  className="fw-extrabold display-5 text-uppercase lh-1"
                  style={{
                    color: '#FFE600',
                    textShadow: '0 4px 15px rgba(0,0,0,0.9), 0 0 20px rgba(255,230,0,0.4)',
                    letterSpacing: '-0.02em',
                    fontFamily: 'Impact, sans-serif'
                  }}
                >
                  {currentOption?.brief?.textOverlay || "ONLY 5 WORK"}
                </div>
                <div className="mt-2">
                  <span className="badge bg-danger text-white fs-6 px-3 py-1 text-uppercase fw-bold shadow">
                    STOP WASTING TIME
                  </span>
                </div>
              </div>

              {/* YouTube Duration Pill */}
              <div
                className="position-absolute bottom-0 end-0 m-3 px-2 py-1 rounded bg-black text-white fw-bold"
                style={{ fontSize: '0.75rem', opacity: 0.9 }}
              >
                11:42
              </div>
            </div>

            {/* YouTube Card Metadata Below Preview */}
            <div className="d-flex align-items-start gap-3 mt-1">
              <img
                src={user?.avatar}
                alt="Avatar"
                className="rounded-circle"
                style={{ width: 40, height: 40, objectFit: 'cover' }}
              />
              <div className="flex-grow-1">
                <h6 className="fw-bold text-white mb-1" style={{ fontSize: '0.95rem' }}>
                  {currentOption?.title || inputIdea}
                </h6>
                <div className="text-secondary small">
                  {user?.channelName} • 48K views • 2 hours ago
                </div>
              </div>
            </div>

            {/* Creative Brief Specifications */}
            {currentOption?.brief && (
              <div className="agency-card p-3 mt-2" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                <div className="text-secondary small fw-semibold text-uppercase mb-2">Designer Creative Brief</div>
                <div className="row g-2 small text-light">
                  <div className="col-md-6">
                    <span className="text-muted">Visual Concept: </span>
                    <span>{currentOption.brief.visualConcept}</span>
                  </div>
                  <div className="col-md-6">
                    <span className="text-muted">Composition: </span>
                    <span>{currentOption.brief.composition}</span>
                  </div>
                  <div className="col-md-6">
                    <span className="text-muted">Contrast Scheme: </span>
                    <span className="text-warning">{currentOption.brief.contrastScheme}</span>
                  </div>
                  <div className="col-md-6">
                    <span className="text-muted">Audience Angle: </span>
                    <span>{currentOption.brief.audienceAngle}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Title Variants List & Manual A/B CTR Tracker */}
        <div className="col-xl-5">
          <div className="d-flex flex-column gap-3">
            {/* Title Variations Selector */}
            <div className="agency-card p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="fw-bold text-white mb-0">Title Formulations</h5>
                <span className="agency-badge badge-lime">Ranked by CTR</span>
              </div>

              <div className="d-flex flex-column gap-2">
                {activeLab?.options?.map((opt, idx) => (
                  <div
                    key={opt.id || idx}
                    onClick={() => setSelectedVariant(idx)}
                    className={`p-3 rounded-3 cursor-pointer transition-all ${
                      selectedVariant === idx ? 'border border-warning' : 'border'
                    }`}
                    style={{
                      background: selectedVariant === idx ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                      borderColor: selectedVariant === idx ? 'var(--accent-amber)' : 'var(--border-subtle)',
                      cursor: 'pointer'
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <span className="agency-badge badge-neutral" style={{ fontSize: '0.68rem' }}>Option {idx + 1}</span>
                      <span className="agency-badge badge-lime" style={{ fontSize: '0.72rem' }}>
                        Predicted CTR: {opt.predictedCtr}%
                      </span>
                    </div>
                    <div className="fw-semibold text-white small">{opt.title}</div>
                    <div className="text-muted mt-1" style={{ fontSize: '0.72rem' }}>
                      Category: {opt.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Manual A/B CTR Tracker Form */}
            <div className="agency-card p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center gap-2">
                  <BarChart3 size={18} className="text-info" />
                  <h5 className="fw-bold text-white mb-0">Manual A/B CTR Tracker</h5>
                </div>
                <span className="agency-badge badge-indigo">Live A/B Testing</span>
              </div>

              <p className="text-secondary small mb-3">
                Enter your live YouTube studio CTR test results to track and declare the winning thumbnail variant.
              </p>

              {/* Variant A */}
              <div className="p-3 rounded-3 mb-2" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <strong className="text-white small">Variant A</strong>
                  <span className="agency-badge badge-lime fw-bold">CTR: {varACtr}%</span>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="text-muted small">Impressions</label>
                    <input
                      type="number"
                      className="form-control agency-input py-1"
                      value={abData.varAImpressions}
                      onChange={(e) => setAbData({ ...abData, varAImpressions: Number(e.target.value) })}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-muted small">Clicks</label>
                    <input
                      type="number"
                      className="form-control agency-input py-1"
                      value={abData.varAClicks}
                      onChange={(e) => setAbData({ ...abData, varAClicks: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>

              {/* Variant B */}
              <div className="p-3 rounded-3 mb-3" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <strong className="text-white small">Variant B</strong>
                  <span className="agency-badge badge-amber fw-bold">CTR: {varBCtr}%</span>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="text-muted small">Impressions</label>
                    <input
                      type="number"
                      className="form-control agency-input py-1"
                      value={abData.varBImpressions}
                      onChange={(e) => setAbData({ ...abData, varBImpressions: Number(e.target.value) })}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-muted small">Clicks</label>
                    <input
                      type="number"
                      className="form-control agency-input py-1"
                      value={abData.varBClicks}
                      onChange={(e) => setAbData({ ...abData, varBClicks: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>

              {/* Winner Declaration */}
              <div className="alert border-0 p-3 rounded-3 d-flex align-items-center justify-content-between mb-0" style={{ background: 'rgba(16, 185, 129, 0.12)' }}>
                <div className="d-flex align-items-center gap-2">
                  <CheckCircle size={18} className="text-success" />
                  <span className="text-white small fw-semibold">
                    {Number(varACtr) >= Number(varBCtr) ? 'Variant A is outperforming by +1.4% CTR' : 'Variant B is outperforming!'}
                  </span>
                </div>
                <span className="agency-badge badge-lime">Active Winner</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
