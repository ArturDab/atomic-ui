import { Routes, Route, Navigate } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'

import Layout from './showcase/Layout'
import Home from './showcase/pages/Home'
import ComponentPage from './showcase/pages/ComponentPage'
import AllComponents from './showcase/pages/AllComponents'
import BlocksPage from './showcase/pages/BlocksPage'
import ProjectsPage from './showcase/pages/ProjectsPage'
import DocsPage from './showcase/pages/DocsPage'
import PreviewPage from './showcase/pages/PreviewPage'
import AllPreviewPage from './showcase/pages/AllPreviewPage'

import ProjectLayout from './showcase/projects/ProjectLayout'
import AllScreens from './showcase/projects/contentpilot/AllScreens'
import AIChatScreen from './showcase/projects/contentpilot/AIChatScreen'
import AITeamsScreen from './showcase/projects/contentpilot/AITeamsScreen'
import AIStudioScreenC from './showcase/projects/contentpilot/AIStudioScreenC'
import AIStudioEditorScreen from './showcase/projects/contentpilot/AIStudioEditorScreen'
import AIStudioEditorEmptyScreen from './showcase/projects/contentpilot/AIStudioEditorEmptyScreen'
import DocumentsScreen from './showcase/projects/contentpilot/DocumentsScreen'
import CP2AllScreens from './showcase/projects/contentpilot2/AllScreens'
import CP2AIChatScreen, { AIChatWithArtifactScreen as CP2AIChatArtifactScreen } from './showcase/projects/contentpilot2/AIChatScreen'
import CP2AITeamsScreen from './showcase/projects/contentpilot2/AITeamsScreen'
import CP2DocumentsScreen from './showcase/projects/contentpilot2/DocumentsScreen'
import CP2AIStudioScreen, { AIStudioEditorEmpty, AIStudioEditorFilled } from './showcase/projects/contentpilot2/AIStudioScreen'

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
          <Route path="docs" element={<DocsPage />} />
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
          <Route path="documents"               element={<DocumentsScreen />} />
          {/* ContentPilot 2.0 routes – shared :projectSlug handler */}
          <Route path="cp2-all"       element={<CP2AllScreens />} />
          <Route path="cp2-ai-chat"          element={<CP2AIChatScreen />} />
          <Route path="cp2-ai-chat-artifact"  element={<CP2AIChatArtifactScreen />} />
          <Route path="cp2-ai-teams"  element={<CP2AITeamsScreen />} />
          <Route path="cp2-documents" element={<CP2DocumentsScreen />} />
          <Route path="cp2-ai-studio"        element={<CP2AIStudioScreen />} />
          <Route path="cp2-ai-studio-empty"  element={<AIStudioEditorEmpty />} />
          <Route path="cp2-ai-studio-filled" element={<AIStudioEditorFilled />} />
        </Route>

        <Route path="/screens/*" element={<Navigate to="/projects/contentpilot/all" replace />} />
      </Routes>
    </TooltipProvider>
  )
}
