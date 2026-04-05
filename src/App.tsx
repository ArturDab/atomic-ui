import { Routes, Route } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './showcase/Layout'
import Home from './showcase/pages/Home'
import ComponentPage from './showcase/pages/ComponentPage'
import AllComponents from './showcase/pages/AllComponents'
import PreviewPage from './showcase/pages/PreviewPage'
import AllPreviewPage from './showcase/pages/AllPreviewPage'

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
      </Routes>
    </TooltipProvider>
  )
}
