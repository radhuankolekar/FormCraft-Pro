import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useFormStore } from '../../store/formStore'
import { FIELD_COLORS } from '../../utils/fieldTypes'

function FieldPreview({ field }) {
  const inputClass = "w-full bg-transparent border rounded-md px-3 py-1.5 text-xs outline-none"
  const inputStyle = { borderColor: 'var(--border)', color: 'var(--muted)' }

  if (field.type === 'heading') return (
    <div className="text-base font-display font-semibold" style={{ color: '#E8E8F0' }}>{field.content}</div>
  )
  if (field.type === 'divider') return (
    <hr style={{ borderColor: 'var(--border)' }} />
  )
  if (field.type === 'textarea') return (
    <textarea className={inputClass} style={{ ...inputStyle, resize: 'none', height: 60 }}
      placeholder={field.placeholder} readOnly />
  )
  if (field.type === 'select') return (
    <select className={inputClass} style={inputStyle}>
      <option>{field.placeholder || 'Select...'}</option>
      {field.options?.map(o => <option key={o}>{o}</option>)}
    </select>
  )
  if (field.type === 'radio') return (
    <div className="flex flex-wrap gap-3">
      {field.options?.map(o => (
        <label key={o} className="flex items-center gap-1.5 text-xs cursor-pointer" style={{ color: 'var(--muted)' }}>
          <div className="w-3 h-3 rounded-full border" style={{ borderColor: 'var(--border)' }} />
          {o}
        </label>
      ))}
    </div>
  )
  if (field.type === 'checkbox') return (
    <div className="flex flex-wrap gap-3">
      {field.options?.map(o => (
        <label key={o} className="flex items-center gap-1.5 text-xs cursor-pointer" style={{ color: 'var(--muted)' }}>
          <div className="w-3 h-3 rounded border" style={{ borderColor: 'var(--border)' }} />
          {o}
        </label>
      ))}
    </div>
  )
  if (field.type === 'rating') return (
    <div className="flex gap-1">
      {Array.from({ length: field.maxRating || 5 }).map((_, i) => (
        <span key={i} className="text-base" style={{ color: i < 3 ? '#F59E0B' : 'var(--border)' }}>★</span>
      ))}
    </div>
  )
  if (field.type === 'file') return (
    <div className="border border-dashed rounded-md px-4 py-3 text-center text-xs"
      style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
      ↑ Click to upload or drag & drop
    </div>
  )
  return (
    <input type={field.type} className={inputClass} style={inputStyle} placeholder={field.placeholder} readOnly />
  )
}

export default function FieldCard({ field }) {
  const { selectedField, selectField, removeField, duplicateField } = useFormStore()
  const isSelected = selectedField === field.id

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: field.id,
    data: { field }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
  }

  const accentColor = FIELD_COLORS[field.type] || 'var(--accent)'

  return (
    <div ref={setNodeRef}
      className="field-card rounded-xl overflow-hidden"
      onClick={() => selectField(field.id)}
      style={{
        ...style,
        border: isSelected ? `1px solid ${accentColor}60` : '1px solid var(--border)',
        background: isSelected ? `${accentColor}08` : 'var(--card)',
        boxShadow: isSelected ? `0 0 20px ${accentColor}20` : 'none',
        cursor: 'pointer',
      }}>
      {/* Header bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b"
        style={{ borderColor: 'var(--border)', background: isSelected ? `${accentColor}10` : 'transparent' }}>
        {/* Drag handle */}
        <div {...listeners} {...attributes}
          className="cursor-grab active:cursor-grabbing opacity-30 hover:opacity-70 transition-opacity text-sm"
          onClick={e => e.stopPropagation()}>
          ⠿
        </div>
        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: accentColor }} />
        <span className="text-xs font-medium flex-1" style={{ color: isSelected ? '#E8E8F0' : 'var(--muted)' }}>
          {field.label}
          {field.required && <span className="ml-1 text-red-400">*</span>}
        </span>
        <span className="text-xs px-1.5 py-0.5 rounded font-mono"
          style={{ background: `${accentColor}15`, color: accentColor }}>
          {field.type}
        </span>
        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100" style={{ opacity: isSelected ? 1 : undefined }}>
          <button className="w-6 h-6 rounded flex items-center justify-center text-xs transition-colors"
            style={{ color: 'var(--muted)' }}
            onClick={e => { e.stopPropagation(); duplicateField(field.id) }}
            title="Duplicate">
            ⧉
          </button>
          <button className="w-6 h-6 rounded flex items-center justify-center text-xs transition-colors hover:text-red-400"
            style={{ color: 'var(--muted)' }}
            onClick={e => { e.stopPropagation(); removeField(field.id) }}
            title="Delete">
            ✕
          </button>
        </div>
      </div>
      {/* Preview */}
      <div className="px-3 py-3">
        <FieldPreview field={field} />
      </div>
    </div>
  )
}
