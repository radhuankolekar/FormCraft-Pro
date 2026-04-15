import React from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'

function buildDailyData(submissions) {
  const map = {}
  submissions.forEach(s => {
    const date = new Date(s.date)
    const key = `${date.getMonth() + 1}/${date.getDate()}`
    map[key] = map[key] || { date: key, total: 0, completed: 0 }
    map[key].total++
    if (s.completed) map[key].completed++
  })

  // Last 14 days in order
  const days = []
  for (let i = 13; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = `${d.getMonth() + 1}/${d.getDate()}`
    days.push(map[key] || { date: key, total: 0, completed: 0 })
  }
  return days
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div
      className="px-3 py-2.5 rounded-lg text-xs"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      <div className="font-medium mb-1.5" style={{ color: '#E8E8F0' }}>
        {label}
      </div>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span style={{ color: 'var(--muted)' }}>{p.name}:</span>
          <span className="font-mono" style={{ color: p.color }}>
            {p.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function SubmissionsChart({ submissions }) {
  const data = buildDailyData(submissions)

  return (
    <div
      className="rounded-xl border p-5"
      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
    >
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-display font-semibold" style={{ color: '#E8E8F0' }}>
            Daily Submissions
          </h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
            Last 14 days — total vs completed
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 rounded" style={{ background: '#6C63FF' }} />
            <span style={{ color: 'var(--muted)' }}>Total</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 rounded" style={{ background: '#00F5A0' }} />
            <span style={{ color: 'var(--muted)' }}>Completed</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="completedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00F5A0" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#00F5A0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fill: '#6B7280', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            interval={1}
          />
          <YAxis
            tick={{ fill: '#6B7280', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.08)' }} />
          <Area
            type="monotone"
            dataKey="total"
            name="Total"
            stroke="#6C63FF"
            strokeWidth={2}
            fill="url(#totalGrad)"
            dot={false}
            activeDot={{ r: 4, fill: '#6C63FF', stroke: '#0D0D0F', strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="completed"
            name="Completed"
            stroke="#00F5A0"
            strokeWidth={2}
            fill="url(#completedGrad)"
            dot={false}
            activeDot={{ r: 4, fill: '#00F5A0', stroke: '#0D0D0F', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
