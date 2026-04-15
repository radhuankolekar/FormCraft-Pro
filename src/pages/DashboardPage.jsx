import React, { useMemo } from 'react'
import { useFormStore } from '../store/formStore'
import StatCard from '../components/Dashboard/StatCard'
import FunnelChart from '../components/Dashboard/FunnelChart'
import SubmissionsChart from '../components/Dashboard/SubmissionsChart'
import DeviceBreakdown from '../components/Dashboard/DeviceBreakdown'
import SubmissionsTable from '../components/Dashboard/SubmissionsTable'

function avgTime(submissions) {
  const avg = submissions.reduce((a, s) => a + s.timeSpent, 0) / (submissions.length || 1)
  const m = Math.floor(avg / 60)
  const s = Math.round(avg % 60)
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

export default function DashboardPage() {
  const { submissions, formTitle } = useFormStore()

  const stats = useMemo(() => {
    const completed = submissions.filter(s => s.completed)
    const rate = ((completed.length / submissions.length) * 100).toFixed(1)
    const dropped = submissions.filter(s => !s.completed)
    return { completed, rate, dropped }
  }, [submissions])

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header
        className="flex items-center justify-between px-5 py-3 border-b flex-shrink-0"
        style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
      >
        <div className="flex items-center gap-3">
          <h1 className="font-display font-bold text-sm">Analytics Dashboard</h1>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(108,99,255,0.1)', color: 'var(--accent)', border: '1px solid rgba(108,99,255,0.2)' }}
          >
            {formTitle}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: 'var(--muted)' }}>
            Last updated: just now
          </span>
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: 'var(--neon)' }}
          />
        </div>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5" style={{ background: 'var(--ink)' }}>

        {/* KPI Row */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard
            label="Total Submissions"
            value={submissions.length.toLocaleString()}
            sub="All time responses"
            color="#6C63FF"
            icon="⬡"
            trend={12.4}
          />
          <StatCard
            label="Completion Rate"
            value={`${stats.rate}%`}
            sub={`${stats.completed.length} completed`}
            color="#00F5A0"
            icon="◉"
            trend={3.8}
          />
          <StatCard
            label="Avg. Time Spent"
            value={avgTime(submissions)}
            sub="Per submission"
            color="#F59E0B"
            icon="◷"
            trend={-2.1}
          />
          <StatCard
            label="Drop-off Count"
            value={stats.dropped.length.toLocaleString()}
            sub="Incomplete submissions"
            color="#FF6B6B"
            icon="↓"
            trend={-8.5}
          />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <SubmissionsChart submissions={submissions} />
          </div>
          <div>
            <FunnelChart submissions={submissions} />
          </div>
        </div>

        {/* Device & source */}
        <DeviceBreakdown submissions={submissions} />

        {/* Submissions table */}
        <SubmissionsTable submissions={submissions} />

      </div>
    </div>
  )
}
