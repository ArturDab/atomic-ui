import { Link, useParams } from 'react-router-dom'
import DashboardScreen from './DashboardScreen'
import ArticleEditorScreen from './ArticleEditorScreen'
import BookOverviewScreen from './BookOverviewScreen'
import BookEditorScreen from './BookEditorScreen'
import StudyEditorScreen from './StudyEditorScreen'
import NewContentScreen from './NewContentScreen'
import WPExportScreen from './WPExportScreen'
import DesignSystemScreen from './DesignSystemScreen'
import ProjectDocsScreen from './ProjectDocsScreen'

const SCREENS = [
  { path: 'ly-dashboard',     label: 'Dashboard',             Component: DashboardScreen },
  { path: 'ly-article',       label: 'Edytor artykułu',       Component: ArticleEditorScreen },
  { path: 'ly-study-editor',  label: 'Edytor opracowania',    Component: StudyEditorScreen },
  { path: 'ly-book-overview', label: 'Przegląd książki',      Component: BookOverviewScreen },
  { path: 'ly-book-editor',   label: 'Edytor książki',        Component: BookEditorScreen },
  { path: 'ly-new-content', label: 'Nowa treść (modal)',    Component: NewContentScreen },
  { path: 'ly-wp-export',    label: 'Eksport do WordPress',  Component: WPExportScreen },
  { path: 'ly-design-system', label: 'Design System',          Component: DesignSystemScreen },
  { path: 'ly-docs',          label: 'Docs & Prompty',         Component: ProjectDocsScreen },
]

export default function AllScreens() {
  const { projectSlug } = useParams<{ projectSlug: string }>()
  return (
    <div className="overflow-y-auto h-full bg-[#fafafa] px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-xl font-semibold tracking-tight mb-1">Lyra</h1>
          <p className="text-xs text-muted-foreground">
            Edytor treści z AI – artykuły, opracowania i książki.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {SCREENS.map(({ path, label, Component }) => (
            <Link
              key={path}
              to={`/projects/${projectSlug}/${path}`}
              className="group border rounded-xl bg-white overflow-hidden hover:border-foreground/30 hover:shadow-md transition-all"
            >
              <div className="relative h-48 overflow-hidden bg-muted/10">
                <div
                  className="absolute top-0 left-0 pointer-events-none origin-top-left"
                  style={{ width: '1280px', height: '720px', transform: 'scale(0.234)' }}
                >
                  <div style={{ width: '1280px', height: '720px' }} className="overflow-hidden">
                    <Component />
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 border-t flex items-center justify-between">
                <span className="text-sm font-medium">{label}</span>
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  Otwórz →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
