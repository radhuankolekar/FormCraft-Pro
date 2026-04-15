import React, { useState } from 'react'
import { useFormStore } from '../../store/formStore'
import { FIELD_COLORS } from '../../utils/fieldTypes'

function Input({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1" style={{ color: 'var(--muted)' }}>{label}</label>
      <input type={type} value={value || ''} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full text-xs px-3 py-2 rounded-lg outline-none transition-all"
        style={{
          background: 'var(--ink)',
          border: '1px solid var(--border)',
          color: '#E8E8F0',
        }}
        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
        onBlur={e => e.target.style.borderColor = 'var(--border)'}
      />
    </div>
  )
}

function Toggle({ label, checked, onChange, desc }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <div>
        <div className="text-xs font-medium" style={{ color: '#E8E8F0' }}>{label}</div>
        {desc && <div className="text-xs" style={{ color: 'var(--muted)' }}>{desc}</div>}
      </div>
      <div className="relative ml-3 flex-shrink-0">
        <input type="checkbox" className="sr-only" checked={checked} onChange={e => onChange(e.target.checked)} />
        <div className="w-9 h-5 rounded-full transition-colors duration-200"
          style={{ background: checked ? 'var(--accent)' : 'var(--border)' }}>
          <div className="w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform duration-200 shadow"
            style={{ transform: checked ? 'translateX(18px)' : 'translateX(2px)' }} />
        </div>
      </div>
    </label>
  )
}

function OptionsEditor({ options, onChange }) {
  const [newOpt, setNewOpt] = useState('')
  return (
    <div>
      <label className="block text-xs font-medium mb-2" style={{ color: 'var(--muted)' }}>Options</label>
      <div className="space-y-1.5 mb-2">
        {options?.map((opt, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <input value={opt} onChange={e => { const next = [...options]; next[i] = e.target.value; onChange(next) }}
              className="flex-1 text-xs px-2.5 py-1.5 rounded-md outline-none"
              style={{ background: 'var(--ink)', border: '1px solid var(--border)', color: '#E8E8F0' }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <button onClick={() => onChange(options.filter((_, j) => j !== i))}
              className="w-6 h-6 flex items-center justify-center rounded text-xs transition-colors hover:text-red-400"
              style={{ color: 'var(--muted)' }}>✕</button>
          </div>
        ))}
      </div>
      <div className="flex gap-1.5">
        <input value={newOpt} onChange={e => setNewOpt(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && newOpt.trim()) { onChange([...(options || []), newOpt.trim()]); setNewOpt('') } }}
          placeholder="Add option..."
          className="flex-1 text-xs px-2.5 py-1.5 rounded-md outline-none"
          style={{ background: 'var(--ink)', border: '1px solid var(--border)', color: '#E8E8F0' }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
        <button onClick={() => { if (newOpt.trim()) { onChange([...(options || []), newOpt.trim()]); setNewOpt('') } }}
          className="text-xs px-2.5 py-1.5 rounded-md transition-colors"
          style={{ background: 'var(--accent)', color: '#fff' }}>
          +
        </button>
      </div>
    </div>
  )
}

export default function PropertiesPanel() {
  const { fields, selectedField, updateField, formTitle, formDescription, setFormTitle, setFormDescription } = useFormStore()
  const field = fields.find(f => f.id === selectedField)

  if (!field) return (
    <aside className="w-64 border-l flex flex-col" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
      <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Form Settings</h2>
      </div>
      <div className="p-4 space-y-4">
        <Input label="Form Title" value={formTitle} onChange={setFormTitle} placeholder="My Form" />
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--muted)' }}>Description</label>
          <textarea value={formDescription} onChange={e => setFormDescription(e.target.value)}
            className="w-full text-xs px-3 py-2 rounded-lg outline-none transition-all resize-none"
            style={{ background: 'var(--ink)', border: '1px solid var(--border)', color: '#E8E8F0', height: 72 }}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>
        <div className="rounded-lg p-3 text-center" style={{ background: 'rgba(108,99,255,0.06)', border: '1px dashed var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>Click a field to edit its properties</p>
        </div>
      </div>
    </aside>
  )

  const accentColor = FIELD_COLORS[field.type] || 'var(--accent)'
  const update = (key) => (val) => updateField(field.id, { [key]: val })

  return (
    <aside className="w-64 border-l flex flex-col overflow-y-auto"
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
      <div className="p-4 border-b flex items-center gap-2" style={{ borderColor: 'var(--border)' }}>
        <div className="w-2 h-2 rounded-full" style={{ background: accentColor }} />
        <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
          Properties
        </h2>
        <span className="ml-auto text-xs px-1.5 py-0.5 rounded font-mono"
          style={{ background: `${accentColor}15`, color: accentColor }}>
          {field.type}
        </span>
      </div>
      <div className="p-4 space-y-4 flex-1">
        <Input label="Label" value={field.label} onChange={update('label')} placeholder="Field label" />

        {field.type !== 'heading' && field.type !== 'divider' && field.type !== 'rating' && (
          <Input label="Placeholder" value={field.placeholder} onChange={update('placeholder')} placeholder="Placeholder text" />
        )}

        {field.type === 'heading' && (
          <Input label="Content" value={field.content} onChange={update('content')} placeholder="Section heading text" />
        )}

        {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
          <OptionsEditor options={field.options} onChange={update('options')} />
        )}

        {field.type === 'rating' && (
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--muted)' }}>Max Stars</label>
            <select value={field.maxRating || 5} onChange={e => update('maxRating')(parseInt(e.target.value))}
              className="w-full text-xs px-3 py-2 rounded-lg outline-none"
              style={{ background: 'var(--ink)', border: '1px solid var(--border)', color: '#E8E8F0' }}>
              {[3, 4, 5, 7, 10].map(n => <option key={n} value={n}>{n} stars</option>)}
            </select>
          </div>
        )}

        {field.type !== 'heading' && field.type !== 'divider' && (
          <div className="space-y-3 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
            <Toggle label="Required" checked={field.required} onChange={update('required')}
              desc="User must fill this field" />
          </div>
        )}

        <div className="pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
          <label className="block text-xs font-medium mb-2" style={{ color: 'var(--muted)' }}>Width</label>
          <div className="flex gap-1.5">
            {['full', 'half', 'third'].map(w => (
              <button key={w} onClick={() => update('width')(w)}
                className="flex-1 text-xs py-1.5 rounded-md transition-all"
                style={{
                  background: field.width === w ? accentColor : 'var(--ink)',
                  color: field.width === w ? '#fff' : 'var(--muted)',
                  border: `1px solid ${field.width === w ? accentColor : 'var(--border)'}`,
                }}>
                {w === 'full' ? '100%' : w === 'half' ? '50%' : '33%'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
