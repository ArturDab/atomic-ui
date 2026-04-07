import { Link, useParams } from 'react-router-dom'
import AIChatScreen, { AIChatWithArtifactScreen } from './AIChatScreen'
import AITeamsScreen from './AITeamsScreen'
import DocumentsScreen from './DocumentsScreen'
import AIStudioScreen from './AIStudioScreen'
import { AIStudioEditorEmpty, AIStudioEditorFilled } from './AIStudioScreen'

const SCREENS = [
  { path: 'cp2-ai-chat',          label: 'AI Chat',                   Component: AIChatScreen },
  { path: 'cp2-ai-chat-artifact',  label: 'AI Chat – z artefaktem',    Component: AIChatWithArtifactScreen },
  { path: 'cp2-ai-teams',  label: 'AI Teams',  Component: AITeamsScreen },
  { path: 'cp2-documents',  label: 'Dokumenty',  Component: DocumentsScreen },
  { path: 'cp2-ai-studio',         label: 'AI Studio – galeria',    Component: AIStudioScreen },
  { path: 'cp2-ai-studio-empty',    label: 'AI Studio – edytor pusty', Component: AIStudioEditorEmpty },
  { path: 'cp2-ai-studio-filled',   label: 'AI Studio – edytor treść', Component: AIStudioEditorFilled },
]

export default function AllScreens() {
  const { projectSlug } = useParams<{ projectSlug: string }>()
  return (
    <div className="overflow-y-auto h-full bg-[#fafafa] px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-xl font-semibold tracking-tight mb-1">ContentPilot 2.0</h1>
          <p className="text-xs text-muted-foreground">Alternatywne podejście projektowe – kliknij aby otworzyć.</p>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {SCREENS.map(({ path, label, Component }) => (
            <Link key={path} to={`/projects/${projectSlug}/${path}`}
              className="group border rounded-xl bg-white overflow-hidden hover:border-foreground/30 hover:shadow-md transition-all">
              <div className="relative h-48 overflow-hidden bg-muted/10">
                <div className="absolute top-0 left-0 pointer-events-none origin-top-left"
                  style={{ width: '1280px', height: '720px', transform: 'scale(0.234)' }}>
                  <div style={{ width: '1280px', height: '720px' }} className="overflow-hidden">
                    <Component />
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 border-t flex items-center justify-between">
                <span className="text-sm font-medium">{label}</span>
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Otwórz →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
