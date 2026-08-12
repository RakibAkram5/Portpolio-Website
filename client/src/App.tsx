import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/hooks/useAuth'
import { ProtectedRoute } from '@/components/admin/ProtectedRoute'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Home } from '@/pages/Home'
import { AdminLogin } from '@/pages/admin/Login'
import { ProjectsAdmin } from '@/pages/admin/ProjectsAdmin'
import { SkillsAdmin } from '@/pages/admin/SkillsAdmin'
import { ServicesAdmin } from '@/pages/admin/ServicesAdmin'
import { TimelineAdmin } from '@/pages/admin/TimelineAdmin'
import { ProfileAdmin } from '@/pages/admin/ProfileAdmin'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Navigate to="/admin/projects" replace />} />
              <Route path="/admin/projects" element={<ProjectsAdmin />} />
              <Route path="/admin/skills" element={<SkillsAdmin />} />
              <Route path="/admin/services" element={<ServicesAdmin />} />
              <Route path="/admin/timeline" element={<TimelineAdmin />} />
              <Route path="/admin/profile" element={<ProfileAdmin />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
