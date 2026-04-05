import { Routes, Route, Navigate } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './showcase/Layout'
import Home from './showcase/pages/Home'
import ComponentPage from './showcase/pages/ComponentPage'
import AllComponents from './showcase/pages/AllComponents'
import PreviewPage from './showcase/pages/PreviewPage'
import AllPreviewPage from './showcase/pages/AllPreviewPage'
import ScreensViewer from './showcase/screens/ScreensViewer'
import DashboardScreen from './showcase/screens/DashboardScreen'
import DocumentsScreen from './showcase/screens/DocumentsScreen'
import EditorScreen from './showcase/screens/EditorScreen'
import PromptsScreen from './showcase/screens/PromptsScreen'
import SettingsScreen from './showcase/screens/SettingsScreen'

export default function App() {
  return (
    <TooltipProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="components/:slug" element={<ComponentPage />} />
          <Route path="all" element={<AllComponents />} />
        </Route>
        <Route path="/preview/:slug" element={<PreviewPage />} />
        <Route path="/all-preview" element={<AllPreviewPage />} />
        <Route path="/screens" element={<ScreensViewer />}>
          <Route index element={<Navigate to="/screens/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardScreen />} />
          <Route path="documents" element={<DocumentsScreen />} />
          <Route path="editor" element={<EditorScreen />} />
          <Route path="prompts" element={<PromptsScreen />} />
          <Route path="settings" element={<SettingsScreen />} />
        </Route>
      </Routes>
    </TooltipProvider>
  )
}
