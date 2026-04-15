import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { FIELD_PALETTE, FIELD_COLORS } from '../../utils/fieldTypes'
import { useFormStore } from '../../store/formStore'

function DraggablePaletteItem({ field }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${field.type}`,
    data: { fromPalette: true, fieldType: field.type }
  })

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}
      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-grab active:cursor-grabbing transition-all duration-150 select-none group"
      style={{
        background: isDragging ? 'rgba(108,99,255,0.15)' : 'transparent',
        border: isDragging ? '1px solid rgba(108,99,255,0.4)' : '1px solid transparent',
        opacity: isDragging ? 0.5 : 1,
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
      onMouseLeave={e => e.currentTarget.style.background = isDragging ? 'rgba(108,99,255,0.15)' : 'transparent'}
    >
      <div className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0"
        style={{ background: `${FIELD_COLORS[field.type]}22`, color: FIELD_COLORS[field.type] }}>
        {field.icon}
      </div>
      <div>
        <div className="text-xs font-medium text-white leading-none mb-0.5">{field.label}</div>
        <div className="text-xs" style={{ color: 'var(--muted)' }}>{field.desc}</div>
      </div>
      <div className="ml-auto opacity-0 group-hover:opacity-40 text-xs" style={{ color: 'var(--accent)' }}>⠿</div>
    </div>
  )
}

export default function FieldPalette() {
  const addField = useFormStore(s => s.addField)

  return (
    <aside className="w-56 flex-shrink-0 h-full overflow-y-auto border-r"
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
      <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
          Field Types
        </h2>
        <p className="text-xs mt-1" style={{ color: 'var(--muted)', opacity: 0.6 }}>Drag to canvas or click to add</p>
      </div>
      <div className="p-3 space-y-4">
        {FIELD_PALETTE.map(({ category, fields }) => (
          <div key={category}>
            <div className="text-xs font-semibold uppercase tracking-widest mb-2 px-1"
              style={{ color: 'var(--muted)', opacity: 0.5 }}>
              {category}
            </div>
            <div className="space-y-0.5">
              {fields.map(f => (
                <div key={f.type} onClick={() => addField(f.type)}>
                  <DraggablePaletteItem field={f} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
