import { Routes, Route, Navigate } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'

import Layout from './showcase/Layout'
import Home from './showcase/pages/Home'
import ComponentPage from './showcase/pages/ComponentPage'
import AllComponents from './showcase/pages/AllComponents'
import BlocksPage from './showcase/pages/BlocksPage'
import ProjectsPage from './showcase/pages/ProjectsPage'
import DocsPage from './showcase/pages/DocsPage'
import ModulesPage from './showcase/pages/ModulesPage'
import DesignSystemsPage from './showcase/pages/DesignSystemsPage'
import PreviewPage from './showcase/pages/PreviewPage'
import AllPreviewPage from './showcase/pages/AllPreviewPage'

import ProjectLayout, { ProjectIndex } from './showcase/projects/ProjectLayout'

// Altair v1
import AllScreens from './showcase/projects/altair/AllScreens'
import AIChatScreen from './showcase/projects/altair/AIChatScreen'
import AITeamsScreen from './showcase/projects/altair/AITeamsScreen'
import AIStudioScreenC from './showcase/projects/altair/AIStudioScreenC'
import AIStudioEditorScreen from './showcase/projects/altair/AIStudioEditorScreen'
import AIStudioEditorEmptyScreen from './showcase/projects/altair/AIStudioEditorEmptyScreen'
import DocumentsScreen from './showcase/projects/altair/DocumentsScreen'

// Altair 2.0
import CP2AllScreens from './showcase/projects/altair2/AllScreens'
import CP2AIChatScreen, { AIChatWithArtifactScreen as CP2AIChatArtifactScreen } from './showcase/projects/altair2/AIChatScreen'
import CP2AITeamsScreen from './showcase/projects/altair2/AITeamsScreen'
import CP2DocumentsScreen from './showcase/projects/altair2/DocumentsScreen'
import CP2AIStudioScreen, { AIStudioEditorEmpty, AIStudioEditorFilled } from './showcase/projects/altair2/AIStudioScreen'

// Lyra
import LyraAllScreens from './showcase/projects/lyra/AllScreens'
import LyraDashboard from './showcase/projects/lyra/DashboardScreen'
import LyraArticleEditor from './showcase/projects/lyra/ArticleEditorScreen'
import LyraBookOverview from './showcase/projects/lyra/BookOverviewScreen'
import LyraBookEditor from './showcase/projects/lyra/BookEditorScreen'
import LyraStudyEditor from './showcase/projects/lyra/StudyEditorScreen'
import LyraNewContentScreen from './showcase/projects/lyra/NewContentScreen'
import LyraWPExportScreen from './showcase/projects/lyra/WPExportScreen'
import LyraDesignSystem from './showcase/projects/lyra/DesignSystemScreen'
import LyraDocs from './showcase/projects/lyra/ProjectDocsScreen'

// Zephyr
import ZephyrAllScreens     from './showcase/projects/zephyr/AllScreens'
import ZephyrClients        from './showcase/projects/zephyr/ClientsScreen'
import ZephyrClientConfig   from './showcase/projects/zephyr/ClientConfigScreen'
import ZephyrSectionLibrary from './showcase/projects/zephyr/SectionLibraryScreen'
import ZephyrCreator        from './showcase/projects/zephyr/CreatorScreen'
import ZephyrArtifact       from './showcase/projects/zephyr/ArtifactScreen'
import ZephyrHistory        from './showcase/projects/zephyr/HistoryScreen'
import ZephyrDesignSystem   from './showcase/projects/zephyr/DesignSystemScreen'

export default function App() {
  return (
    <TooltipProvider>
      <Routes>
        {/* Atomic UI library */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="components/:slug" element={<ComponentPage />} />
          <Route path="all" element={<AllComponents />} />
          <Route path="blocks" element={<BlocksPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="docs" element={<DocsPage />} />
          <Route path="modules" element={<ModulesPage />} />
          <Route path="design-systems" element={<DesignSystemsPage />} />
        </Route>

        <Route path="/preview/:slug" element={<PreviewPage />} />
        <Route path="/all-preview" element={<AllPreviewPage />} />

        {/* Wszystkie projekty – jeden handler :projectSlug */}
        <Route path="/projects/:projectSlug" element={<ProjectLayout />}>
          <Route index element={<ProjectIndex />} />

          {/* Altair v1 */}
          <Route path="all"                    element={<AllScreens />} />
          <Route path="ai-chat"                element={<AIChatScreen />} />
          <Route path="ai-teams"               element={<AITeamsScreen />} />
          <Route path="ai-studio"              element={<AIStudioScreenC />} />
          <Route path="ai-studio-editor-empty" element={<AIStudioEditorEmptyScreen />} />
          <Route path="ai-studio/:genSlug"     element={<AIStudioEditorScreen />} />
          <Route path="documents"              element={<DocumentsScreen />} />

          {/* Altair 2.0 – prefiks al2- */}
          <Route path="al2-all"            element={<CP2AllScreens />} />
          <Route path="al2-ai-chat"        element={<CP2AIChatScreen />} />
          <Route path="al2-ai-chat-artifact" element={<CP2AIChatArtifactScreen />} />
          <Route path="al2-ai-teams"       element={<CP2AITeamsScreen />} />
          <Route path="al2-documents"      element={<CP2DocumentsScreen />} />
          <Route path="al2-ai-studio"        element={<CP2AIStudioScreen />} />
          <Route path="al2-ai-studio-empty"  element={<AIStudioEditorEmpty />} />
          <Route path="al2-ai-studio-filled" element={<AIStudioEditorFilled />} />

          {/* Lyra – prefiks ly- */}
          <Route path="ly-all"           element={<LyraAllScreens />} />
          <Route path="ly-dashboard"     element={<LyraDashboard />} />
          <Route path="ly-article"       element={<LyraArticleEditor />} />
          <Route path="ly-book-overview" element={<LyraBookOverview />} />
          <Route path="ly-book-editor"   element={<LyraBookEditor />} />
          <Route path="ly-study-editor"  element={<LyraStudyEditor />} />
          <Route path="ly-new-content"   element={<LyraNewContentScreen />} />
          <Route path="ly-wp-export"     element={<LyraWPExportScreen />} />
          <Route path="ly-design-system" element={<LyraDesignSystem />} />
          <Route path="ly-docs"          element={<LyraDocs />} />

          {/* Zephyr – prefiks zp- */}
          <Route path="zp-all"            element={<ZephyrAllScreens />} />
          <Route path="zp-clients"        element={<ZephyrClients />} />
          <Route path="zp-client-config"  element={<ZephyrClientConfig />} />
          <Route path="zp-section-library" element={<ZephyrSectionLibrary />} />
          <Route path="zp-creator"        element={<ZephyrCreator />} />
          <Route path="zp-artifact"       element={<ZephyrArtifact />} />
          <Route path="zp-history"        element={<ZephyrHistory />} />
          <Route path="zp-design-system"  element={<ZephyrDesignSystem />} />
        </Route>

        <Route path="/screens/*" element={<Navigate to="/projects/altair/all" replace />} />
      </Routes>
    </TooltipProvider>
  )
}
