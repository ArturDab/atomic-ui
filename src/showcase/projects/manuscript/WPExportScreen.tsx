import { useNavigate } from 'react-router-dom'
import WordPressExportPanel from './WordPressExportPanel'

export default function WPExportScreen() {
  const navigate = useNavigate()
  return (
    <div className="relative h-full bg-muted/30 flex items-center justify-center">
      <WordPressExportPanel onClose={() => navigate(-1)} />
    </div>
  )
}
