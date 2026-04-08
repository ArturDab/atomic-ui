import { useNavigate } from 'react-router-dom'
import WordPressExportPanel from './WordPressExportPanel'

export default function WPExportScreen() {
  const navigate = useNavigate()
  return (
    <div
      className="relative h-full bg-black/30 flex items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) navigate(-1) }}
    >
      <WordPressExportPanel onClose={() => navigate(-1)} />
    </div>
  )
}
