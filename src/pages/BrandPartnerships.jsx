import React, { useState } from 'react';
import {
  BriefcaseBusiness,
  Sparkles,
  DollarSign,
  Copy,
  Check,
  Calendar,
  Mail,
  Plus,
  AlertCircle,
  FileCheck,
  TrendingUp,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { useCreatorData } from '../context/CreatorDataContext';
import { useAuth } from '../context/AuthContext';
import { mockAI } from '../utils/mockAI';

export default function BrandPartnerships() {
  const { user } = useAuth();
  const { brandCampaigns, addBrandCampaign, updateBrandStatus } = useCreatorData();

  // Pitch Drafter Inputs
  const [brandName, setBrandName] = useState('Notion');
  const [productCategory, setProductCategory] = useState('Productivity & Knowledge Workspace');
  const [deliverable, setDeliverable] = useState('60-second Mid-Roll Integration');
  const [customOffer, setCustomOffer] = useState('5 AI Tools That Save 20+ Hours Every Week');
  const [generating, setGenerating] = useState(false);
  const [proposalOutput, setProposalOutput] = useState(null);
  const [copied, setCopied] = useState(false);

  // New Brand Deal modal
  const [showAddDealModal, setShowAddDealModal] = useState(false);
  const [newDealBrand, setNewDealBrand] = useState('');
  const [newDealContact, setNewDealContact] = useState('');
  const [newDealEmail, setNewDealEmail] = useState('');
  const [newDealFee, setNewDealFee] = useState(3000);
  const [newDealType, setNewDealType] = useState('Dedicated Video Integration');
  const [newDealFollowUp, setNewDealFollowUp] = useState(
    new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0]
  );

  const totalPipeline = brandCampaigns.reduce((sum, c) => sum + (c.proposedFee || 0), 0);

  const handleGeneratePitch = async () => {
    if (!brandName.trim()) return;
    setGenerating(true);
    try {
      const res = await mockAI.draftBrandProposal({
        brandName,
        productCategory,
        targetDeliverable: deliverable,
        creatorProfile: user,
        customOffer
      });
      setProposalOutput(res);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyEmail = () => {
    if (!proposalOutput) return;
    navigator.clipboard.writeText(`Subject: ${proposalOutput.emailSubject}\n\n${proposalOutput.emailBody}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateDeal = (e) => {
    e.preventDefault();
    if (!newDealBrand.trim()) return;

    addBrandCampaign({
      brandName: newDealBrand,
      contactPerson: newDealContact || "Brand Manager",
      email: newDealEmail || "sponsor@brand.com",
      dealType: newDealType,
      proposedFee: Number(newDealFee),
      followUpDate: newDealFollowUp,
      status: 'Pitched',
      targetVideo: customOffer
    });

    setNewDealBrand('');
    setShowAddDealModal(false);
  };

  return (
    <div className="container-fluid p-3 p-lg-4 d-flex flex-column gap-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="agency-badge badge-lime">Module G</span>
            <span className="text-secondary small">Media Kit & Sponsorship Proposal Engine</span>
          </div>
          <h2 className="fw-extrabold text-white mb-0 display-7">Brand Partnership Assistant</h2>
        </div>

        <button onClick={() => setShowAddDealModal(true)} className="btn btn-agency-primary">
          <Plus size={16} /> Track New Brand Deal
        </button>
      </div>

      {/* Required Price Disclaimer Banner (Page 4 of PDF) */}
      <div
        className="agency-card p-3 d-flex align-items-center gap-3"
        style={{
          background: 'rgba(99, 102, 241, 0.08)',
          borderLeft: '4px solid #6366f1',
          borderColor: 'rgba(99, 102, 241, 0.3)'
        }}
      >
        <AlertCircle size={22} className="text-info flex-shrink-0" />
        <div className="small text-secondary">
          <strong className="text-white">Pricing Estimation Notice: </strong>
          Any sponsorship pricing suggestion or CPM estimate is automated based strictly on user-entered metrics and general category averages. They are not guaranteed market value.
        </div>
      </div>

      {/* Row: Dynamic Media Kit Summary + Rate Calculator */}
      <div className="row g-4">
        {/* Creator Media Kit Summary */}
        <div className="col-xl-8">
          <div className="agency-card p-4 h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-2">
                <FileCheck size={18} className="text-success" />
                <h5 className="fw-bold text-white mb-0">Dynamic Creator Media Kit Summary</h5>
              </div>
              <span className="agency-badge badge-lime">Ready for Brands</span>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-sm-6 col-md-3">
                <div className="p-3 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                  <span className="text-secondary small fw-semibold text-uppercase">Subscribers</span>
                  <div className="fw-bold fs-4 text-white mt-1">{user?.subscribers || "148,500"}</div>
                  <span className="text-success small">Verified Partner</span>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="p-3 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                  <span className="text-secondary small fw-semibold text-uppercase">Monthly Views</span>
                  <div className="fw-bold fs-4 text-info mt-1">{user?.monthlyViews || "520,000"}</div>
                  <span className="text-muted small">30-day average</span>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="p-3 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                  <span className="text-secondary small fw-semibold text-uppercase">Engagement</span>
                  <div className="fw-bold fs-4 text-warning mt-1">{user?.avgEngagementRate || "7.8%"}</div>
                  <span className="text-muted small">Likes & Comments</span>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="p-3 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                  <span className="text-secondary small fw-semibold text-uppercase">Niche Category</span>
                  <div className="fw-bold fs-5 text-white mt-1 text-truncate">{user?.niche || "Tech & AI"}</div>
                  <span className="text-muted small">High B2B Intent</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)' }}>
              <strong className="text-white small">Target Demographic: </strong>
              <span className="text-secondary small">{user?.targetAudience}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Rate Calculator */}
        <div className="col-xl-4">
          <div className="agency-card p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h5 className="fw-bold text-white mb-0">Rate Calculator</h5>
                <span className="agency-badge badge-neutral">Auto Estimated</span>
              </div>
              <p className="text-secondary small mb-3">
                Recommended sponsorship rates based on 520k monthly views & category CPM.
              </p>

              <div className="d-flex flex-column gap-2 mb-3">
                <div className="p-2 rounded-2 d-flex align-items-center justify-content-between" style={{ background: 'rgba(255, 255, 255, 0.04)' }}>
                  <span className="text-secondary small">60s Dedicated Mid-Roll</span>
                  <strong className="text-success">$2,800 – $3,500</strong>
                </div>
                <div className="p-2 rounded-2 d-flex align-items-center justify-content-between" style={{ background: 'rgba(255, 255, 255, 0.04)' }}>
                  <span className="text-secondary small">Full Video Sponsorship</span>
                  <strong className="text-info">$5,500 – $7,200</strong>
                </div>
                <div className="p-2 rounded-2 d-flex align-items-center justify-content-between" style={{ background: 'rgba(255, 255, 255, 0.04)' }}>
                  <span className="text-secondary small">Vertical Short / Reel</span>
                  <strong className="text-warning">$1,200 – $1,800</strong>
                </div>
              </div>
            </div>

            <div className="pt-2 border-top" style={{ borderColor: 'var(--border-subtle)' }}>
              <span className="text-muted" style={{ fontSize: '0.72rem' }}>
                Est. based on $18 - $25 CPM for software developer audiences.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Sponsorship Outreach Email Generator */}
      <div className="agency-card p-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center gap-2">
            <Sparkles size={18} className="text-info" />
            <h5 className="fw-bold text-white mb-0">Tailored Sponsorship Proposal Generator</h5>
          </div>
          <span className="agency-badge badge-indigo">Gemini Draft</span>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-3">
            <label className="form-label">Brand Name</label>
            <input
              type="text"
              className="form-control agency-input"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="e.g. Notion, Supabase"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Product Category</label>
            <input
              type="text"
              className="form-control agency-input"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              placeholder="e.g. Developer Database & Auth"
            />
          </div>
          <div className="col-md-5">
            <label className="form-label">Deliverable Package</label>
            <select
              className="form-select agency-select"
              value={deliverable}
              onChange={(e) => setDeliverable(e.target.value)}
            >
              <option value="60-second Dedicated In-Video Integration">60-second Dedicated In-Video Integration</option>
              <option value="2-Video Sponsorship Package">2-Video Sponsorship Package</option>
              <option value="Dedicated Short / Reel Spotlight">Dedicated Short / Reel Spotlight</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-end mb-3">
          <button
            onClick={handleGeneratePitch}
            className="btn btn-agency-primary"
            disabled={generating}
          >
            <Mail size={16} />
            <span>{generating ? 'Drafting Proposal with Gemini...' : 'Draft Tailored Outreach Email'}</span>
          </button>
        </div>

        {proposalOutput && (
          <div className="agency-card p-4 mt-3" style={{ background: 'rgba(9, 13, 24, 0.95)' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="agency-badge badge-lime">Subject: {proposalOutput.emailSubject}</span>
              <button onClick={handleCopyEmail} className="btn btn-sm btn-agency-outline">
                {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Outreach Email'}</span>
              </button>
            </div>

            <div
              className="p-3 rounded-3"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.84rem',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
                color: '#e2e8f0',
                maxHeight: '340px',
                overflowY: 'auto',
                background: 'rgba(0,0,0,0.4)'
              }}
            >
              {proposalOutput.emailBody}
            </div>

            <div className="mt-3 pt-3 border-top d-flex flex-wrap gap-2" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
              <span className="text-secondary small fw-semibold">Negotiation Talking Points:</span>
              {proposalOutput.talkingPoints?.map((tp, idx) => (
                <span key={idx} className="agency-badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                  • {tp}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Brand Deal Tracker Table */}
      <div className="agency-card p-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h5 className="fw-bold text-white mb-0">Active Sponsorship Pipeline</h5>
            <span className="text-secondary small">Total Pipeline Value: ${totalPipeline.toLocaleString()} USD</span>
          </div>
          <span className="agency-badge badge-lime">{brandCampaigns.length} Active Deals</span>
        </div>

        <div className="table-responsive">
          <table className="table table-dark table-hover mb-0" style={{ background: 'transparent' }}>
            <thead>
              <tr className="border-bottom" style={{ borderColor: 'var(--border-subtle)' }}>
                <th className="text-secondary small text-uppercase py-3">Brand & Contact</th>
                <th className="text-secondary small text-uppercase py-3">Deliverable</th>
                <th className="text-secondary small text-uppercase py-3">Proposed Fee</th>
                <th className="text-secondary small text-uppercase py-3">Status</th>
                <th className="text-secondary small text-uppercase py-3">Follow-Up</th>
                <th className="text-secondary small text-uppercase py-3 text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {brandCampaigns.map((deal) => (
                <tr key={deal.id} style={{ borderColor: 'var(--border-subtle)' }}>
                  <td className="py-3">
                    <div className="fw-bold text-white">{deal.brandName}</div>
                    <div className="text-muted small" style={{ fontSize: '0.75rem' }}>
                      {deal.contactPerson} ({deal.email})
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="small text-light">{deal.dealType}</div>
                    <div className="text-secondary" style={{ fontSize: '0.72rem' }}>{deal.targetVideo}</div>
                  </td>
                  <td className="py-3">
                    <strong className="text-success">${deal.proposedFee?.toLocaleString()}</strong>
                  </td>
                  <td className="py-3">
                    <select
                      className="form-select bg-dark text-white border-0 py-1 px-2"
                      style={{ fontSize: '0.75rem', width: 'auto', background: 'rgba(255, 255, 255, 0.08)' }}
                      value={deal.status}
                      onChange={(e) => updateBrandStatus(deal.id, e.target.value)}
                    >
                      <option value="Pitched">Pitched</option>
                      <option value="In Negotiation">In Negotiation</option>
                      <option value="Contract Signed">Contract Signed</option>
                      <option value="In Production">In Production</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </td>
                  <td className="py-3">
                    <div className="small text-secondary d-flex align-items-center gap-1">
                      <Clock size={13} className="text-warning" />
                      {deal.followUpDate}
                    </div>
                  </td>
                  <td className="py-3 text-end">
                    <button
                      onClick={() => {
                        setBrandName(deal.brandName);
                        handleGeneratePitch();
                      }}
                      className="btn btn-sm btn-agency-outline py-1 px-2"
                      style={{ fontSize: '0.75rem' }}
                    >
                      Draft Follow-Up
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Track New Brand Deal */}
      {showAddDealModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1055 }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content agency-modal-content">
              <div className="agency-modal-header d-flex align-items-center justify-content-between">
                <h5 className="modal-title fw-bold text-white mb-0">Add Sponsorship Deal</h5>
                <button className="btn btn-agency-ghost text-secondary p-1" onClick={() => setShowAddDealModal(false)}>✕</button>
              </div>

              <form onSubmit={handleCreateDeal}>
                <div className="modal-body p-4 d-flex flex-column gap-3">
                  <div>
                    <label className="form-label">Brand Name</label>
                    <input
                      type="text"
                      className="form-control agency-input"
                      value={newDealBrand}
                      onChange={(e) => setNewDealBrand(e.target.value)}
                      placeholder="e.g. Cursor, Datadog"
                      required
                    />
                  </div>
                  <div className="row g-2">
                    <div className="col-6">
                      <label className="form-label">Contact Person</label>
                      <input
                        type="text"
                        className="form-control agency-input"
                        value={newDealContact}
                        onChange={(e) => setNewDealContact(e.target.value)}
                        placeholder="e.g. Rachel Green"
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label">Contact Email</label>
                      <input
                        type="email"
                        className="form-control agency-input"
                        value={newDealEmail}
                        onChange={(e) => setNewDealEmail(e.target.value)}
                        placeholder="partner@brand.com"
                      />
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col-6">
                      <label className="form-label">Proposed Fee ($ USD)</label>
                      <input
                        type="number"
                        className="form-control agency-input"
                        value={newDealFee}
                        onChange={(e) => setNewDealFee(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label">Follow-Up Date</label>
                      <input
                        type="date"
                        className="form-control agency-input"
                        value={newDealFollowUp}
                        onChange={(e) => setNewDealFollowUp(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="agency-modal-footer d-flex align-items-center justify-content-end gap-2">
                  <button type="button" className="btn btn-agency-outline" onClick={() => setShowAddDealModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-agency-primary">Save Deal</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
