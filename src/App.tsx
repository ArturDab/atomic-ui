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
import AIChatScreen from './showcase/projects/contentpilot/AIChatScreen'
import AITeamsScreen from './showcase/projects/contentpilot/AITeamsScreen'
import AIStudioScreenC from './showcase/projects/contentpilot/AIStudioScreenC'
import AIStudioEditorScreen from './showcase/projects/contentpilot/AIStudioEditorScreen'
import AIStudioEditorEmptyScreen from './showcase/projects/contentpilot/AIStudioEditorEmptyScreen'

export default function App() {
  return (
    <TooltipProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="components/:slug" element={<ComponentPage />} />
          <Route path="all" element={<AllComponents />} />
          <Route path="blocks" element={<BlocksPage />} />
          <Route path="projects" element={<ProjectsPage />} />
        </Route>

        <Route path="/preview/:slug" element={<PreviewPage />} />
        <Route path="/all-preview" element={<AllPreviewPage />} />

        <Route path="/projects/:projectSlug" element={<ProjectLayout />}>
          <Route index element={<Navigate to="all" replace />} />
          <Route path="all"                    element={<AllScreens />} />
          <Route path="ai-chat"                element={<AIChatScreen />} />
          <Route path="ai-teams"               element={<AITeamsScreen />} />
          <Route path="ai-studio"              element={<AIStudioScreenC />} />
          <Route path="ai-studio-editor-empty" element={<AIStudioEditorEmptyScreen />} />
          <Route path="ai-studio/:genSlug"     element={<AIStudioEditorScreen />} />
        </Route>

        <Route path="/screens/*" element={<Navigate to="/projects/contentpilot/all" replace />} />
      </Routes>
    </TooltipProvider>
  )
}
