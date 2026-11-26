import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/hooks/useAuth'
import { Home } from '@/pages/Home'

// The admin panel is only for the site owner — keep it out of the visitor bundle.
const ProtectedRoute = lazy(() => import('@/components/admin/ProtectedRoute').then((m) => ({ default: m.ProtectedRoute })))
const AdminLayout = lazy(() => import('@/components/admin/AdminLayout').then((m) => ({ default: m.AdminLayout })))
const AdminLogin = lazy(() => import('@/pages/admin/Login').then((m) => ({ default: m.AdminLogin })))
const ProjectsAdmin = lazy(() => import('@/pages/admin/ProjectsAdmin').then((m) => ({ default: m.ProjectsAdmin })))
const SkillsAdmin = lazy(() => import('@/pages/admin/SkillsAdmin').then((m) => ({ default: m.SkillsAdmin })))
const ServicesAdmin = lazy(() => import('@/pages/admin/ServicesAdmin').then((m) => ({ default: m.ServicesAdmin })))
const TimelineAdmin = lazy(() => import('@/pages/admin/TimelineAdmin').then((m) => ({ default: m.TimelineAdmin })))
const ProfileAdmin = lazy(() => import('@/pages/admin/ProfileAdmin').then((m) => ({ default: m.ProfileAdmin })))
const AnalyticsAdmin = lazy(() => import('@/pages/admin/AnalyticsAdmin').then((m) => ({ default: m.AnalyticsAdmin })))
const MessagesAdmin = lazy(() => import('@/pages/admin/MessagesAdmin').then((m) => ({ default: m.MessagesAdmin })))

function AdminFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-border-strong border-t-accent" />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<AdminFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<Navigate to="/admin/analytics" replace />} />
                <Route path="/admin/analytics" element={<AnalyticsAdmin />} />
                <Route path="/admin/projects" element={<ProjectsAdmin />} />
                <Route path="/admin/skills" element={<SkillsAdmin />} />
                <Route path="/admin/services" element={<ServicesAdmin />} />
                <Route path="/admin/timeline" element={<TimelineAdmin />} />
                <Route path="/admin/profile" element={<ProfileAdmin />} />
                <Route path="/admin/messages" element={<MessagesAdmin />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
