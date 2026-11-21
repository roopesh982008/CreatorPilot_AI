import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_IDEAS,
  INITIAL_STRATEGY,
  INITIAL_SCRIPTS,
  INITIAL_THUMBNAIL_LAB,
  INITIAL_KANBAN,
  INITIAL_COMMENTS,
  INITIAL_BRAND_CAMPAIGNS,
  INITIAL_ANALYTICS
} from '../utils/defaultData';

const CreatorDataContext = createContext();

export function CreatorDataProvider({ children }) {
  // 1. Content Ideas
  const [ideas, setIdeas] = useState(() => {
    const saved = localStorage.getItem('cp_ideas');
    return saved ? JSON.parse(saved) : INITIAL_IDEAS;
  });

  // 2. Content Strategy
  const [activeStrategy, setActiveStrategy] = useState(() => {
    const saved = localStorage.getItem('cp_active_strategy');
    return saved ? JSON.parse(saved) : INITIAL_STRATEGY;
  });

  const [savedStrategies, setSavedStrategies] = useState(() => {
    const saved = localStorage.getItem('cp_saved_strategies');
    return saved ? JSON.parse(saved) : [INITIAL_STRATEGY];
  });

  // 3. Scripts
  const [scripts, setScripts] = useState(() => {
    const saved = localStorage.getItem('cp_scripts');
    return saved ? JSON.parse(saved) : INITIAL_SCRIPTS;
  });

  // 4. Thumbnail & Title Lab
  const [thumbnails, setThumbnails] = useState(() => {
    const saved = localStorage.getItem('cp_thumbnails');
    return saved ? JSON.parse(saved) : INITIAL_THUMBNAIL_LAB;
  });

  // 5. Kanban & Calendar Tasks
  const [kanbanTasks, setKanbanTasks] = useState(() => {
    const saved = localStorage.getItem('cp_kanban');
    return saved ? JSON.parse(saved) : INITIAL_KANBAN;
  });

  // 6. Audience Comments
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem('cp_comments');
    return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
  });

  // 7. Brand Deals
  const [brandCampaigns, setBrandCampaigns] = useState(() => {
    const saved = localStorage.getItem('cp_brands');
    return saved ? JSON.parse(saved) : INITIAL_BRAND_CAMPAIGNS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('cp_ideas', JSON.stringify(ideas));
  }, [ideas]);

  useEffect(() => {
    localStorage.setItem('cp_active_strategy', JSON.stringify(activeStrategy));
  }, [activeStrategy]);

  useEffect(() => {
    localStorage.setItem('cp_saved_strategies', JSON.stringify(savedStrategies));
  }, [savedStrategies]);

  useEffect(() => {
    localStorage.setItem('cp_scripts', JSON.stringify(scripts));
  }, [scripts]);

  useEffect(() => {
    localStorage.setItem('cp_thumbnails', JSON.stringify(thumbnails));
  }, [thumbnails]);

  useEffect(() => {
    localStorage.setItem('cp_kanban', JSON.stringify(kanbanTasks));
  }, [kanbanTasks]);

  useEffect(() => {
    localStorage.setItem('cp_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('cp_brands', JSON.stringify(brandCampaigns));
  }, [brandCampaigns]);

  // Operations Helpers
  const addIdea = (newIdea) => {
    const ideaObj = {
      id: `idea-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Idea',
      effort: 'Medium',
      viewsEstimate: '30,000+',
      ...newIdea
    };
    setIdeas((prev) => [ideaObj, ...prev]);

    // Also push to Kanban as Idea stage
    addTask({
      title: ideaObj.title,
      platform: ideaObj.platform || 'YouTube',
      stage: 'Idea',
      assignee: 'Creator',
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      priority: 'Medium',
      tags: [ideaObj.topic || 'New Idea']
    });

    return ideaObj;
  };

  const saveStrategy = (strategyObj) => {
    setActiveStrategy(strategyObj);
    setSavedStrategies((prev) => [strategyObj, ...prev]);
  };

  const addTask = (task) => {
    const newTask = {
      id: `task-${Date.now()}`,
      priority: 'Medium',
      tags: ['New Task'],
      stage: 'Idea',
      ...task
    };
    setKanbanTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  const moveTaskStage = (taskId, newStage) => {
    setKanbanTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, stage: newStage } : t))
    );
  };

  const deleteTask = (taskId) => {
    setKanbanTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const updateScript = (scriptId, updatedContent, note = "Edited by creator") => {
    setScripts((prev) =>
      prev.map((s) => {
        if (s.id === scriptId) {
          const currentVersNum = parseFloat(s.currentVersion.replace('v', '')) || 1.0;
          const nextVersion = `v${(currentVersNum + 0.1).toFixed(1)}`;
          const newVersionObj = {
            version: nextVersion,
            date: new Date().toISOString().replace('T', ' ').slice(0, 16),
            note: note,
            content: updatedContent
          };
          return {
            ...s,
            currentVersion: nextVersion,
            updatedAt: newVersionObj.date,
            wordCount: updatedContent.split(/\s+/).length,
            versions: [newVersionObj, ...s.versions]
          };
        }
        return s;
      })
    );
  };

  const addBrandCampaign = (campaign) => {
    const newCamp = {
      id: `brand-${Date.now()}`,
      pitchDate: new Date().toISOString().split('T')[0],
      status: 'Pitched',
      ...campaign
    };
    setBrandCampaigns((prev) => [newCamp, ...prev]);
    return newCamp;
  };

  const updateBrandStatus = (campaignId, newStatus) => {
    setBrandCampaigns((prev) =>
      prev.map((c) => (c.id === campaignId ? { ...c, status: newStatus } : c))
    );
  };

  const flagCommentItem = (commentId, isFlagged, reason = "Spam / Flagged for review") => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId ? { ...c, flagged: isFlagged, flagReason: reason } : c
      )
    );
  };

  const addBatchComments = (newCommentsList) => {
    setComments((prev) => [...newCommentsList, ...prev]);
  };

  return (
    <CreatorDataContext.Provider
      value={{
        ideas,
        addIdea,
        activeStrategy,
        setActiveStrategy,
        savedStrategies,
        saveStrategy,
        scripts,
        setScripts,
        updateScript,
        thumbnails,
        setThumbnails,
        kanbanTasks,
        addTask,
        moveTaskStage,
        deleteTask,
        comments,
        addBatchComments,
        flagCommentItem,
        brandCampaigns,
        addBrandCampaign,
        updateBrandStatus,
        analytics: INITIAL_ANALYTICS
      }}
    >
      {children}
    </CreatorDataContext.Provider>
  );
}

export function useCreatorData() {
  return useContext(CreatorDataContext);
}
