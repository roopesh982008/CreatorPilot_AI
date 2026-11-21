import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CreatorDataProvider } from './context/CreatorDataContext';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AICopilotDrawer from './components/AICopilotDrawer';
import CampaignWizardModal from './components/CampaignWizardModal';

import Dashboard from './pages/Dashboard';
import IdeaBoard from './pages/IdeaBoard';
import ContentStrategist from './pages/ContentStrategist';
import ScriptStudio from './pages/ScriptStudio';
import ThumbnailLab from './pages/ThumbnailLab';
import CalendarKanban from './pages/CalendarKanban';
import AudienceIntelligence from './pages/AudienceIntelligence';
import BrandPartnerships from './pages/BrandPartnerships';
import ProfileSettings from './pages/ProfileSettings';
import LoginRegister from './pages/LoginRegister';

function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="d-flex min-vh-100 position-relative">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenWizard={() => setWizardOpen(true)}
        onOpenCopilot={() => setCopilotOpen(true)}
      />

      {/* Main Content Area */}
      <div className="agency-content-area flex-grow-1 d-flex flex-column">
        <Navbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onOpenWizard={() => setWizardOpen(true)}
          onOpenCopilot={() => setCopilotOpen(true)}
        />

        <main className="flex-grow-1 pb-5">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  onOpenWizard={() => setWizardOpen(true)}
                  onOpenCopilot={() => setCopilotOpen(true)}
                />
              }
            />
            <Route path="/ideas" element={<IdeaBoard />} />
            <Route path="/strategist" element={<ContentStrategist />} />
            <Route path="/scripts" element={<ScriptStudio />} />
            <Route path="/thumbnails" element={<ThumbnailLab />} />
            <Route path="/workflow" element={<CalendarKanban />} />
            <Route path="/audience" element={<AudienceIntelligence />} />
            <Route path="/brands" element={<BrandPartnerships />} />
            <Route path="/profile" element={<ProfileSettings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Slide-out AI Copilot Drawer */}
      <AICopilotDrawer
        isOpen={copilotOpen}
        onClose={() => setCopilotOpen(false)}
        onOpenWizard={() => setWizardOpen(true)}
      />

      {/* 1-Click Campaign Preparation Wizard Modal */}
      <CampaignWizardModal
        isOpen={wizardOpen}
        onClose={() => setWizardOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CreatorDataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/*" element={<ProtectedLayout />} />
          </Routes>
        </BrowserRouter>
      </CreatorDataProvider>
    </AuthProvider>
  );
}
