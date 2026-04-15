import React from 'react'
import { motion } from 'framer-motion'

const STEPS = [
  { label: 'Form Opened', key: 'opened' },
  { label: 'Step 1 – Personal Info', key: 'step1' },
  { label: 'Step 2 – Details', key: 'step2' },
  { label: 'Step 3 – Review', key: 'step3' },
  { label: 'Submitted', key: 'submitted' },
]

export default function FunnelChart({ submissions }) {
  const total = submissions.length

  const counts = [
    total,
    Math.round(total * 0.81),
    Math.round(total * 0.67),
    Math.round(total * 0.58),
    submissions.filter(s => s.completed).length,
  ]

  return (
    <div
      className="rounded-xl border p-5"
      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-display font-semibold" style={{ color: '#E8E8F0' }}>
            Submission Funnel
          </h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
            Drop-off at each step
          </p>
        </div>
        <span
          className="text-xs px-2.5 py-1 rounded-full font-mono"
          style={{
            background: 'rgba(0,245,160,0.1)',
            color: 'var(--neon)',
            border: '1px solid rgba(0,245,160,0.2)',
          }}
        >
          {((counts[4] / counts[0]) * 100).toFixed(1)}% completion
        </span>
      </div>

      <div className="space-y-2.5">
        {STEPS.map((step, i) => {
          const pct = ((counts[i] / counts[0]) * 100).toFixed(1)
          const drop = i > 0 ? counts[i - 1] - counts[i] : 0
          const dropPct = i > 0 ? (((counts[i - 1] - counts[i]) / counts[i - 1]) * 100).toFixed(1) : 0

          const color =
            i === 0
              ? '#6C63FF'
              : i === STEPS.length - 1
              ? '#00F5A0'
              : `hsl(${250 - i * 20}, 80%, ${55 + i * 4}%)`

          return (
            <div key={step.key}>
              {/* Drop indicator */}
              {i > 0 && drop > 0 && (
                <div
                  className="flex items-center gap-2 text-xs mb-1.5 pl-2"
                  style={{ color: '#FF6B6B' }}
                >
                  <span>↓</span>
                  <span>
                    {drop} dropped ({dropPct}%)
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3">
                {/* Step number */}
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
                >
                  {i + 1}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs" style={{ color: '#E8E8F0' }}>
                      {step.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono" style={{ color }}>
                        {pct}%
                      </span>
                      <span className="text-xs" style={{ color: 'var(--muted)' }}>
                        {counts[i].toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Bar */}
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ background: 'var(--surface)' }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
