import React from 'react'
import { motion } from 'framer-motion'

export default function StatCard({ label, value, sub, color = '#6C63FF', icon, trend }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl p-5 border flex flex-col gap-3"
      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
          {label}
        </span>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
          style={{ background: `${color}18`, color }}
        >
          {icon}
        </div>
      </div>

      <div>
        <div className="text-3xl font-display font-bold" style={{ color: '#E8E8F0' }}>
          {value}
        </div>
        {sub && (
          <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
            {sub}
          </div>
        )}
      </div>

      {trend !== undefined && (
        <div
          className="flex items-center gap-1.5 text-xs font-medium"
          style={{ color: trend >= 0 ? '#00F5A0' : '#FF6B6B' }}
        >
          <span>{trend >= 0 ? '↑' : '↓'}</span>
          <span>{Math.abs(trend)}% vs last 7 days</span>
        </div>
      )}

      {/* Bottom accent bar */}
      <div className="h-0.5 rounded-full mt-auto" style={{ background: `${color}30` }}>
        <div
          className="h-full rounded-full"
          style={{ background: color, width: `${Math.min(100, Math.random() * 40 + 50)}%` }}
        />
      </div>
    </motion.div>
  )
}
