import React, { useState } from 'react';
import {
  Kanban as KanbanIcon,
  Calendar as CalendarIcon,
  Plus,
  Filter,
  User,
  Clock,
  CheckCircle2,
  MoreVertical,
  Trash2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useCreatorData } from '../context/CreatorDataContext';
import { useAuth } from '../context/AuthContext';

export default function CalendarKanban() {
  const { user } = useAuth();
  const { kanbanTasks, moveTaskStage, addTask, deleteTask } = useCreatorData();

  const [activeView, setActiveView] = useState('kanban'); // 'kanban' or 'calendar'
  const [platformFilter, setPlatformFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPlatform, setNewTaskPlatform] = useState('YouTube');
  const [newTaskStage, setNewTaskStage] = useState('Idea');
  const [newTaskDueDate, setNewTaskDueDate] = useState(
    new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
  );
  const [newTaskAssignee, setNewTaskAssignee] = useState('Alex Rivera (Creator)');
  const [newTaskPriority, setNewTaskPriority] = useState('High');

  const stages = [
    { key: 'Idea', label: 'Idea', badge: 'badge-neutral', color: '#94a3b8' },
    { key: 'Research', label: 'Research', badge: 'badge-cyan', color: '#06b6d4' },
    { key: 'Script', label: 'Script', badge: 'badge-indigo', color: '#6366f1' },
    { key: 'Production', label: 'Production', badge: 'badge-amber', color: '#f59e0b' },
    { key: 'Review', label: 'Review', badge: 'badge-rose', color: '#f43f5e' },
    { key: 'Published', label: 'Published', badge: 'badge-lime', color: '#10b981' }
  ];

  const filteredTasks = kanbanTasks.filter((t) => {
    if (platformFilter !== 'All' && t.platform !== platformFilter) return false;
    return true;
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addTask({
      title: newTaskTitle,
      platform: newTaskPlatform,
      stage: newTaskStage,
      dueDate: newTaskDueDate,
      assignee: newTaskAssignee,
      priority: newTaskPriority,
      tags: ['Manual Sprint']
    });

    setNewTaskTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="container-fluid p-3 p-lg-4 d-flex flex-column gap-4">
      {/* Header & Controls */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="agency-badge badge-lime">Module E</span>
            <span className="text-secondary small">End-to-End Content Operations Pipeline</span>
          </div>
          <h2 className="fw-extrabold text-white mb-0 display-7">Calendar & Kanban Workflow</h2>
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          {/* View Switcher Tabs */}
          <div className="btn-group p-1 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
            <button
              onClick={() => setActiveView('kanban')}
              className={`btn btn-sm ${activeView === 'kanban' ? 'btn-agency-primary' : 'btn-agency-ghost'}`}
            >
              <KanbanIcon size={15} /> Kanban Board
            </button>
            <button
              onClick={() => setActiveView('calendar')}
              className={`btn btn-sm ${activeView === 'calendar' ? 'btn-agency-primary' : 'btn-agency-ghost'}`}
            >
              <CalendarIcon size={15} /> Calendar Schedule
            </button>
          </div>

          {/* Platform Filter */}
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

          {/* Add Task Button */}
          <button onClick={() => setShowAddModal(true)} className="btn btn-sm btn-agency-indigo">
            <Plus size={16} /> New Task
          </button>
        </div>
      </div>

      {/* KANBAN BOARD VIEW */}
      {activeView === 'kanban' && (
        <div className="row g-3 g-xl-3 flex-nowrap overflow-x-auto pb-4" style={{ minHeight: '620px' }}>
          {stages.map((stage) => {
            const columnTasks = filteredTasks.filter((t) => t.stage === stage.key);

            return (
              <div key={stage.key} className="col" style={{ minWidth: '280px', maxWidth: '320px' }}>
                <div className="kanban-column p-3 h-100">
                  {/* Column Header */}
                  <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom" style={{ borderColor: 'var(--border-subtle)' }}>
                    <div className="d-flex align-items-center gap-2">
                      <span className="rounded-circle" style={{ width: 8, height: 8, backgroundColor: stage.color }}></span>
                      <span className="fw-bold text-white small text-uppercase" style={{ letterSpacing: '0.04em' }}>
                        {stage.label}
                      </span>
                    </div>
                    <span className="agency-badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                      {columnTasks.length}
                    </span>
                  </div>

                  {/* Task Cards in Column */}
                  <div className="d-flex flex-column gap-2 flex-grow-1 overflow-y-auto">
                    {columnTasks.map((task) => (
                      <div key={task.id} className="kanban-card">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="agency-badge badge-neutral" style={{ fontSize: '0.65rem' }}>
                            {task.platform}
                          </span>
                          <span
                            className={`agency-badge ${
                              task.priority === 'Urgent'
                                ? 'badge-rose'
                                : task.priority === 'High'
                                ? 'badge-amber'
                                : 'badge-neutral'
                            }`}
                            style={{ fontSize: '0.65rem' }}
                          >
                            {task.priority}
                          </span>
                        </div>

                        <div className="fw-semibold text-white small mb-2" style={{ lineHeight: 1.4 }}>
                          {task.title}
                        </div>

                        <div className="d-flex align-items-center gap-2 text-muted small mb-2" style={{ fontSize: '0.72rem' }}>
                          <User size={13} />
                          <span className="text-truncate">{task.assignee}</span>
                        </div>

                        <div className="d-flex align-items-center justify-content-between pt-2 border-top" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                          <span className="text-secondary small d-flex align-items-center gap-1" style={{ fontSize: '0.72rem' }}>
                            <Clock size={12} /> {task.dueDate}
                          </span>

                          <div className="dropdown">
                            <select
                              className="form-select bg-dark text-white border-0 py-0 px-1"
                              style={{ fontSize: '0.68rem', cursor: 'pointer', background: 'rgba(255,255,255,0.08)' }}
                              value={task.stage}
                              onChange={(e) => moveTaskStage(task.id, e.target.value)}
                            >
                              {stages.map((st) => (
                                <option key={st.key} value={st.key}>
                                  → {st.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}

                    {columnTasks.length === 0 && (
                      <div className="text-center py-5 text-muted small">
                        No tasks in {stage.label}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CALENDAR SCHEDULE VIEW */}
      {activeView === 'calendar' && (
        <div className="agency-card p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h5 className="fw-bold text-white mb-0">Publishing Calendar (November 2026)</h5>
            <div className="d-flex align-items-center gap-2">
              <span className="agency-badge badge-lime">3 Videos Scheduled</span>
              <span className="agency-badge badge-amber">1 Short / Reel</span>
            </div>
          </div>

          {/* Calendar Month Grid */}
          <div className="row g-2 text-center text-secondary small fw-bold mb-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="col p-2 text-uppercase" style={{ letterSpacing: '0.05em' }}>
                {day}
              </div>
            ))}
          </div>

          <div className="row g-2">
            {Array.from({ length: 30 }).map((_, index) => {
              const dayNum = index + 1;
              const dateStr = `2026-11-${dayNum < 10 ? '0' + dayNum : dayNum}`;
              const dayTasks = filteredTasks.filter((t) => t.dueDate === dateStr);

              return (
                <div key={index} className="col-12 col-md" style={{ minWidth: '13.5%', minHeight: '110px' }}>
                  <div
                    className="p-2 rounded-3 h-100 d-flex flex-column border"
                    style={{
                      background: dayTasks.length > 0 ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                      borderColor: dayTasks.length > 0 ? 'rgba(16, 185, 129, 0.25)' : 'var(--border-subtle)'
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <span className={`fw-bold small ${dayNum === 17 ? 'text-success' : 'text-muted'}`}>
                        {dayNum} {dayNum === 17 && '(Today)'}
                      </span>
                    </div>

                    <div className="d-flex flex-column gap-1 flex-grow-1">
                      {dayTasks.map((t) => (
                        <div
                          key={t.id}
                          className="p-1 rounded text-start"
                          style={{
                            background: 'rgba(22, 30, 50, 0.9)',
                            borderLeft: '2px solid #10b981',
                            fontSize: '0.68rem'
                          }}
                        >
                          <div className="fw-semibold text-white text-truncate">{t.title}</div>
                          <span className="text-secondary" style={{ fontSize: '0.62rem' }}>
                            {t.platform} • {t.stage}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* New Task Modal */}
      {showAddModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1055 }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content agency-modal-content">
              <div className="agency-modal-header d-flex align-items-center justify-content-between">
                <h5 className="modal-title fw-bold text-white mb-0">Create Operations Task</h5>
                <button className="btn btn-agency-ghost text-secondary p-1" onClick={() => setShowAddModal(false)}>
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateTask}>
                <div className="modal-body p-4 d-flex flex-column gap-3">
                  <div>
                    <label className="form-label">Task / Content Title</label>
                    <input
                      type="text"
                      className="form-control agency-input"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="e.g. Scripting Video on Local LLMs"
                      required
                    />
                  </div>

                  <div className="row g-2">
                    <div className="col-6">
                      <label className="form-label">Platform</label>
                      <select
                        className="form-select agency-select"
                        value={newTaskPlatform}
                        onChange={(e) => setNewTaskPlatform(e.target.value)}
                      >
                        <option value="YouTube">YouTube</option>
                        <option value="Instagram">Instagram</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="TikTok">TikTok</option>
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="form-label">Workflow Stage</label>
                      <select
                        className="form-select agency-select"
                        value={newTaskStage}
                        onChange={(e) => setNewTaskStage(e.target.value)}
                      >
                        {stages.map((st) => (
                          <option key={st.key} value={st.key}>
                            {st.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="row g-2">
                    <div className="col-6">
                      <label className="form-label">Due Date</label>
                      <input
                        type="date"
                        className="form-control agency-input"
                        value={newTaskDueDate}
                        onChange={(e) => setNewTaskDueDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label">Priority</label>
                      <select
                        className="form-select agency-select"
                        value={newTaskPriority}
                        onChange={(e) => setNewTaskPriority(e.target.value)}
                      >
                        <option value="Urgent">Urgent</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Assignee</label>
                    <select
                      className="form-select agency-select"
                      value={newTaskAssignee}
                      onChange={(e) => setNewTaskAssignee(e.target.value)}
                    >
                      <option value="Alex Rivera (Creator)">Alex Rivera (Creator)</option>
                      <option value="Marcus Vance (Editor)">Marcus Vance (Editor)</option>
                      <option value="Sarah Chen (Researcher)">Sarah Chen (Researcher)</option>
                      <option value="Elena Rostova (Shorts Manager)">Elena Rostova (Shorts Manager)</option>
                    </select>
                  </div>
                </div>

                <div className="agency-modal-footer d-flex align-items-center justify-content-end gap-2">
                  <button type="button" className="btn btn-agency-outline" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-agency-primary">
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
