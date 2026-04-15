import React from 'react'
import {
  DndContext, closestCenter, PointerSensor,
  useSensor, useSensors, DragOverlay
} from '@dnd-kit/core'
import {
  SortableContext, verticalListSortingStrategy, arrayMove
} from '@dnd-kit/sortable'
import { useFormStore } from '../../store/formStore'
import FieldCard from './FieldCard'

export default function FormCanvas() {
  const { fields, reorderFields, addField, formTitle, formDescription, selectedField, selectField } = useFormStore()
  const [activeId, setActiveId] = React.useState(null)

  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: { distance: 6 }
  }))

  function handleDragStart({ active }) {
    setActiveId(active.id)
  }

  function handleDragEnd({ active, over }) {
    setActiveId(null)
    if (!over) return
    // From palette
    if (active.data.current?.fromPalette) {
      addField(active.data.current.fieldType)
      return
    }
    // Reorder
    if (active.id !== over.id) {
      const oldIdx = fields.findIndex(f => f.id === active.id)
      const newIdx = fields.findIndex(f => f.id === over.id)
      if (oldIdx !== -1 && newIdx !== -1) {
        reorderFields(arrayMove(fields, oldIdx, newIdx))
      }
    }
  }

  const activeField = fields.find(f => f.id === activeId)

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter}
      onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex-1 overflow-y-auto p-6"
        onClick={() => selectField(null)}
        style={{ background: 'var(--ink)' }}>
        <div className="max-w-2xl mx-auto">
          {/* Form header */}
          <div className="mb-6 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="inline-flex items-center gap-2 text-xs font-mono px-2.5 py-1 rounded-full mb-3"
              style={{ background: 'rgba(108,99,255,0.12)', color: 'var(--accent)', border: '1px solid rgba(108,99,255,0.25)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
              Live Preview
            </div>
            <h1 className="text-2xl font-display font-bold mb-1" style={{ color: '#E8E8F0' }}>{formTitle}</h1>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>{formDescription}</p>
          </div>

          {/* Fields */}
          <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3 group">
              {fields.map(field => (
                <div key={field.id} className="group">
                  <FieldCard field={field} />
                </div>
              ))}
            </div>
          </SortableContext>

          {/* Empty state */}
          {fields.length === 0 && (
            <div className="border-2 border-dashed rounded-2xl p-12 text-center transition-all"
              style={{ borderColor: 'var(--border)' }}>
              <div className="text-4xl mb-3 opacity-30">⊞</div>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--muted)' }}>No fields yet</p>
              <p className="text-xs" style={{ color: 'var(--muted)', opacity: 0.6 }}>Drag fields from the left panel or click to add</p>
            </div>
          )}

          {/* Drop zone hint */}
          {fields.length > 0 && (
            <div className="mt-3 border border-dashed rounded-xl p-4 text-center"
              style={{ borderColor: 'rgba(108,99,255,0.2)' }}>
              <p className="text-xs" style={{ color: 'rgba(108,99,255,0.5)' }}>+ Drop fields here or click palette to add</p>
            </div>
          )}

          {/* Submit button preview */}
          {fields.length > 0 && (
            <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
              <button className="px-8 py-2.5 rounded-lg text-sm font-medium transition-all"
                style={{ background: 'var(--accent)', color: '#fff', boxShadow: '0 0 20px rgba(108,99,255,0.35)' }}>
                Submit Form
              </button>
            </div>
          )}
        </div>
      </div>

      <DragOverlay>
        {activeField && (
          <div className="px-4 py-3 rounded-xl text-sm font-medium shadow-2xl"
            style={{ background: 'var(--accent)', color: '#fff', transform: 'rotate(2deg)', opacity: 0.9 }}>
            {activeField.label}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
