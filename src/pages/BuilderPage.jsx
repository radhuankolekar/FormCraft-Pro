import React from 'react'
import FieldPalette from '../components/Builder/FieldPalette'
import FormCanvas from '../components/Builder/FormCanvas'
import PropertiesPanel from '../components/Builder/PropertiesPanel'
import { useFormStore } from '../store/formStore'

export default function BuilderPage() {
  const { fields, formTitle } = useFormStore()

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <header className="flex items-center justify-between px-5 py-3 border-b flex-shrink-0"
        style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <div className="flex items-center gap-3">
          <h1 className="font-display font-bold text-sm">{formTitle}</h1>
          <span className="text-xs px-2 py-0.5 rounded-full font-mono"
            style={{ background: 'rgba(0,245,160,0.1)', color: 'var(--neon)', border: '1px solid rgba(0,245,160,0.2)' }}>
            {fields.length} fields
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs px-3 py-1.5 rounded-lg transition-colors"
            style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
            onMouseEnter={e => e.target.style.borderColor = 'var(--accent)'}
            onMouseLeave={e => e.target.style.borderColor = 'var(--border)'}>
            Preview
          </button>
          <button className="text-xs px-4 py-1.5 rounded-lg font-medium transition-all"
            style={{ background: 'var(--accent)', color: '#fff' }}>
            Publish
          </button>
        </div>
      </header>

      {/* Builder layout */}
      <div className="flex flex-1 overflow-hidden">
        <FieldPalette />
        <FormCanvas />
        <PropertiesPanel />
      </div>
    </div>
  )
}
