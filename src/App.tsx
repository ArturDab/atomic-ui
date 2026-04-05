import { Routes, Route } from 'react-router-dom'
import Layout from './showcase/Layout'
import Home from './showcase/pages/Home'
import ComponentPage from './showcase/pages/ComponentPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="components/:slug" element={<ComponentPage />} />
      </Route>
    </Routes>
  )
}
