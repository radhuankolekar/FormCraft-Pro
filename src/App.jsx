import React from 'react'
import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import BuilderPage from './pages/BuilderPage'
import DashboardPage from './pages/DashboardPage'
import LogicPage from './pages/LogicPage'

const NAV = [
  { path: '/', label: 'Builder', icon: '⬡' },
  { path: '/logic', label: 'Logic', icon: '◈' },
  { path: '/dashboard', label: 'Analytics', icon: '◉' },
]

export default function App() {
  const location = useLocation()

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--ink)' }}>
      {/* Sidebar */}
      <aside className="w-16 flex flex-col items-center py-6 gap-2 border-r" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        {/* Logo */}
        <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 font-display font-bold text-sm"
          style={{ background: 'linear-gradient(135deg, #6C63FF, #00F5A0)', color: '#fff' }}>
          F
        </div>
        {NAV.map(({ path, label, icon }) => (
          <NavLink key={path} to={path} end={path === '/'}
            className={({ isActive }) =>
              `w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-200 group relative
              ${isActive ? 'text-white' : 'text-muted hover:text-white'}`
            }
            style={({ isActive }) => isActive ? {
              background: 'rgba(108,99,255,0.2)',
              boxShadow: '0 0 12px rgba(108,99,255,0.4)',
              border: '1px solid rgba(108,99,255,0.5)'
            } : {}}
          >
            <span>{icon}</span>
            <span className="absolute left-14 bg-card text-xs font-body px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50"
              style={{ border: '1px solid var(--border)' }}>
              {label}
            </span>
          </NavLink>
        ))}
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} className="h-full"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            <Routes location={location}>
              <Route path="/" element={<BuilderPage />} />
              <Route path="/logic" element={<LogicPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
