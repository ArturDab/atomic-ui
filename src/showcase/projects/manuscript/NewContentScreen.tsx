import { useNavigate } from 'react-router-dom'
import NewContentModal from './NewContentModal'

export default function NewContentScreen() {
  const navigate = useNavigate()
  return (
    <div className="relative h-full bg-muted/30 flex items-center justify-center">
      <NewContentModal onClose={() => navigate(-1)} />
    </div>
  )
}
