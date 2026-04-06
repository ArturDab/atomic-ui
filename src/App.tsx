import { Routes, Route, Navigate } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'

import Layout from './showcase/Layout'
import Home from './showcase/pages/Home'
import ComponentPage from './showcase/pages/ComponentPage'
import AllComponents from './showcase/pages/AllComponents'
import BlocksPage from './showcase/pages/BlocksPage'
import ProjectsPage from './showcase/pages/ProjectsPage'
import PreviewPage from './showcase/pages/PreviewPage'
import AllPreviewPage from './showcase/pages/AllPreviewPage'

import ProjectLayout from './showcase/projects/ProjectLayout'
import AllScreens from './showcase/projects/contentpilot/AllScreens'
import DashboardScreen from './showcase/projects/contentpilot/DashboardScreen'
import DocumentsScreen from './showcase/projects/contentpilot/DocumentsScreen'
import EditorScreen from './showcase/projects/contentpilot/EditorScreen'
import PromptsScreen from './showcase/projects/contentpilot/PromptsScreen'
import SettingsScreen from './showcase/projects/contentpilot/SettingsScreen'

export default function App() {
  return (
    <TooltipProvider>
      <Routes>
        {/* Library */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="components/:slug" element={<ComponentPage />} />
          <Route path="all" element={<AllComponents />} />
          <Route path="blocks" element={<BlocksPage />} />
          <Route path="projects" element={<ProjectsPage />} />
        </Route>

        {/* Figma preview (no chrome) */}
        <Route path="/preview/:slug" element={<PreviewPage />} />
        <Route path="/all-preview" element={<AllPreviewPage />} />

        {/* Projects */}
        <Route path="/projects/:projectSlug" element={<ProjectLayout />}>
          <Route index element={<Navigate to="all" replace />} />
          <Route path="all"       element={<AllScreens />} />
          <Route path="dashboard" element={<DashboardScreen />} />
          <Route path="documents" element={<DocumentsScreen />} />
          <Route path="editor"    element={<EditorScreen />} />
          <Route path="prompts"   element={<PromptsScreen />} />
          <Route path="settings"  element={<SettingsScreen />} />
        </Route>

        {/* Legacy redirect */}
        <Route path="/screens/*" element={<Navigate to="/projects/contentpilot/all" replace />} />
      </Routes>
    </TooltipProvider>
  )
}
