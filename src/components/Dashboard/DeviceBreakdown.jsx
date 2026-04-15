import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const DEVICE_COLORS = {
  desktop: '#6C63FF',
  mobile: '#00F5A0',
  tablet: '#F59E0B',
}

const SOURCE_COLORS = {
  direct: '#6C63FF',
  email: '#06B6D4',
  social: '#EC4899',
  search: '#10B981',
}

function buildBreakdown(submissions, key, colorMap) {
  const map = {}
  submissions.forEach(s => {
    map[s[key]] = (map[s[key]] || 0) + 1
  })
  return Object.entries(map).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    color: colorMap[name] || '#6B7280',
    pct: ((value / submissions.length) * 100).toFixed(1),
  }))
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div
      className="px-3 py-2 rounded-lg text-xs"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      <span style={{ color: d.color }}>{d.name}</span>
      <span className="ml-2 font-mono" style={{ color: '#E8E8F0' }}>
        {d.value} ({d.pct}%)
      </span>
    </div>
  )
}

function DonutCard({ title, data }) {
  return (
    <div
      className="rounded-xl border p-5"
      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
    >
      <h3 className="text-sm font-display font-semibold mb-4" style={{ color: '#E8E8F0' }}>
        {title}
      </h3>
      <div className="flex items-center gap-4">
        <ResponsiveContainer width={100} height={100}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={28}
              outerRadius={46}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex-1 space-y-2">
          {data.map(d => (
            <div key={d.name} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: d.color }}
              />
              <span className="text-xs flex-1" style={{ color: '#E8E8F0' }}>
                {d.name}
              </span>
              <span className="text-xs font-mono" style={{ color: d.color }}>
                {d.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function DeviceBreakdown({ submissions }) {
  const deviceData = buildBreakdown(submissions, 'device', DEVICE_COLORS)
  const sourceData = buildBreakdown(submissions, 'source', SOURCE_COLORS)

  return (
    <div className="grid grid-cols-2 gap-4">
      <DonutCard title="By Device" data={deviceData} />
      <DonutCard title="Traffic Source" data={sourceData} />
    </div>
  )
}
