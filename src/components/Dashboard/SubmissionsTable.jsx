import React, { useState } from 'react'
import { motion } from 'framer-motion'

const DEVICE_ICONS = { desktop: '🖥', mobile: '📱', tablet: '⬜' }
const SOURCE_COLORS = {
  direct: '#6C63FF',
  email: '#06B6D4',
  social: '#EC4899',
  search: '#10B981',
}

function formatTime(secs) {
  if (secs < 60) return `${secs}s`
  return `${Math.floor(secs / 60)}m ${secs % 60}s`
}

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function SubmissionsTable({ submissions }) {
  const [filter, setFilter] = useState('all')

  const filtered = submissions
    .filter(s => filter === 'all' ? true : filter === 'completed' ? s.completed : !s.completed)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 20)

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: 'var(--border)' }}
      >
        <div>
          <h3 className="text-sm font-display font-semibold" style={{ color: '#E8E8F0' }}>
            Recent Submissions
          </h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
            Showing latest {filtered.length} entries
          </p>
        </div>

        {/* Filter tabs */}
        <div
          className="flex items-center gap-1 p-1 rounded-lg"
          style={{ background: 'var(--surface)' }}
        >
          {['all', 'completed', 'dropped'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="text-xs px-3 py-1 rounded-md capitalize transition-all"
              style={{
                background: filter === f ? 'var(--accent)' : 'transparent',
                color: filter === f ? '#fff' : 'var(--muted)',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Status', 'Date', 'Device', 'Source', 'Time Spent', 'Drop Step'].map(h => (
                <th
                  key={h}
                  className="text-left px-4 py-3 font-medium uppercase tracking-wider"
                  style={{ color: 'var(--muted)' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <motion.tr
                key={s.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                className="border-b transition-colors"
                style={{ borderColor: 'rgba(42,42,50,0.5)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <td className="px-4 py-3">
                  <span
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-medium"
                    style={
                      s.completed
                        ? {
                            background: 'rgba(0,245,160,0.1)',
                            color: '#00F5A0',
                            border: '1px solid rgba(0,245,160,0.25)',
                          }
                        : {
                            background: 'rgba(255,107,107,0.1)',
                            color: '#FF6B6B',
                            border: '1px solid rgba(255,107,107,0.25)',
                          }
                    }
                  >
                    <span className="w-1 h-1 rounded-full" style={{ background: 'currentColor' }} />
                    {s.completed ? 'Completed' : 'Dropped'}
                  </span>
                </td>
                <td className="px-4 py-3" style={{ color: 'var(--muted)' }}>
                  {formatDate(s.date)}
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1.5" style={{ color: '#E8E8F0' }}>
                    <span>{DEVICE_ICONS[s.device]}</span>
                    <span className="capitalize">{s.device}</span>
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="px-2 py-0.5 rounded font-mono capitalize"
                    style={{
                      background: `${SOURCE_COLORS[s.source]}15`,
                      color: SOURCE_COLORS[s.source],
                    }}
                  >
                    {s.source}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono" style={{ color: '#E8E8F0' }}>
                  {formatTime(s.timeSpent)}
                </td>
                <td className="px-4 py-3" style={{ color: s.dropStep ? '#FF6B6B' : 'var(--muted)' }}>
                  {s.dropStep ? `Step ${s.dropStep}` : '—'}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
