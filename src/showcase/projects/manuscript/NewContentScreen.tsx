import { useNavigate } from 'react-router-dom'
import NewContentModal from './NewContentModal'

export default function NewContentScreen() {
  const navigate = useNavigate()
  return (
    <div
      className="relative h-full bg-black/30 flex items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) navigate(-1) }}
    >
      <NewContentModal onClose={() => navigate(-1)} />
    </div>
  )
}
