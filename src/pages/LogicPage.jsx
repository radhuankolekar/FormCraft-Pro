import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFormStore } from '../store/formStore'
import { v4 as uuid } from 'uuid'
import { FIELD_COLORS } from '../utils/fieldTypes'

const OPERATORS = {
  text: ['equals', 'not equals', 'contains', 'not contains', 'starts with', 'ends with', 'is empty', 'is not empty'],
  email: ['equals', 'not equals', 'contains', 'is empty', 'is not empty'],
  number: ['equals', 'not equals', 'greater than', 'less than', 'greater than or equal', 'less than or equal'],
  select: ['equals', 'not equals', 'is empty', 'is not empty'],
  radio: ['equals', 'not equals'],
  checkbox: ['contains', 'not contains'],
  date: ['equals', 'before', 'after'],
}

const ACTIONS = ['show', 'hide', 'require', 'skip to']

function RuleBadge({ rule, fields, onRemove, onEdit }) {
  const triggerField = fields.find(f => f.id === rule.triggerFieldId)
  const targetField = fields.find(f => f.id === rule.targetFieldId)
  const color = triggerField ? FIELD_COLORS[triggerField.type] || 'var(--accent)' : 'var(--accent)'

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border overflow-hidden"
      style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Trigger */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
          style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}>
          <span>IF</span>
          <span className="font-bold">{triggerField?.label || '?'}</span>
        </div>

        <div className="text-xs" style={{ color: 'var(--muted)' }}>
          {rule.operator} <span className="font-mono px-1 py-0.5 rounded"
            style={{ background: 'var(--surface)', color: '#E8E8F0' }}>
            {rule.value || '(empty)'}
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
          style={{
            background: rule.action === 'hide' ? 'rgba(239,68,68,0.1)' : 'rgba(0,245,160,0.1)',
            border: `1px solid ${rule.action === 'hide' ? 'rgba(239,68,68,0.3)' : 'rgba(0,245,160,0.3)'}`,
            color: rule.action === 'hide' ? '#EF4444' : 'var(--neon)'
          }}>
          <span className="uppercase font-bold">{rule.action}</span>
          <span>{targetField?.label || '?'}</span>
        </div>

        <div className="ml-auto flex gap-1.5">
          <button onClick={() => onEdit(rule)}
            className="text-xs px-2 py-1 rounded transition-colors"
            style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}>
            Edit
          </button>
          <button onClick={() => onRemove(rule.id)}
            className="text-xs px-2 py-1 rounded transition-colors hover:text-red-400"
            style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}>
            ✕
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function RuleEditor({ rule, fields, onSave, onCancel }) {
  const [form, setForm] = useState(rule || {
    id: uuid(), triggerFieldId: '', operator: 'equals', value: '', action: 'show', targetFieldId: ''
  })

  const triggerField = fields.find(f => f.id === form.triggerFieldId)
  const operators = triggerField ? (OPERATORS[triggerField.type] || OPERATORS.text) : []

  const sel = "w-full text-xs px-3 py-2 rounded-lg outline-none"
  const selStyle = { background: 'var(--ink)', border: '1px solid var(--border)', color: '#E8E8F0' }

  const actionableFields = fields.filter(f => f.type !== 'heading' && f.type !== 'divider')

  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
      className="rounded-xl border p-5 space-y-4"
      style={{ borderColor: 'var(--accent)', background: 'var(--card)', boxShadow: '0 0 24px rgba(108,99,255,0.15)' }}>
      <h3 className="text-sm font-display font-semibold" style={{ color: '#E8E8F0' }}>
        {rule ? 'Edit Rule' : 'New Conditional Rule'}
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--muted)' }}>When field</label>
          <select className={sel} style={selStyle} value={form.triggerFieldId}
            onChange={e => setForm(f => ({ ...f, triggerFieldId: e.target.value, operator: '', value: '' }))}>
            <option value="">Select field...</option>
            {actionableFields.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--muted)' }}>Operator</label>
          <select className={sel} style={selStyle} value={form.operator}
            onChange={e => setForm(f => ({ ...f, operator: e.target.value }))}>
            {operators.map(op => <option key={op} value={op}>{op}</option>)}
          </select>
        </div>
      </div>

      {form.operator && !['is empty', 'is not empty'].includes(form.operator) && (
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--muted)' }}>Value</label>
          {triggerField?.options ? (
            <select className={sel} style={selStyle} value={form.value}
              onChange={e => setForm(f => ({ ...f, value: e.target.value }))}>
              <option value="">Any value...</option>
              {triggerField.options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : (
            <input value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))}
              className="w-full text-xs px-3 py-2 rounded-lg outline-none"
              style={{ ...selStyle }}
              placeholder="Enter comparison value..."
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--muted)' }}>Then action</label>
          <select className={sel} style={selStyle} value={form.action}
            onChange={e => setForm(f => ({ ...f, action: e.target.value }))}>
            {ACTIONS.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--muted)' }}>Target field</label>
          <select className={sel} style={selStyle} value={form.targetFieldId}
            onChange={e => setForm(f => ({ ...f, targetFieldId: e.target.value }))}>
            <option value="">Select field...</option>
            {actionableFields.filter(f => f.id !== form.triggerFieldId)
              .map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
          </select>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button onClick={() => onSave(form)}
          disabled={!form.triggerFieldId || !form.targetFieldId}
          className="flex-1 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-40"
          style={{ background: 'var(--accent)', color: '#fff' }}>
          Save Rule
        </button>
        <button onClick={onCancel}
          className="px-4 py-2 rounded-lg text-sm transition-colors"
          style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}>
          Cancel
        </button>
      </div>
    </motion.div>
  )
}

export default function LogicPage() {
  const { rules, addRule, removeRule, updateRule, fields } = useFormStore()
  const [editing, setEditing] = useState(null)
  const [showNew, setShowNew] = useState(false)

  const actionableFields = fields.filter(f => f.type !== 'heading' && f.type !== 'divider')

  function handleSave(form) {
    if (editing) { updateRule(form.id, form); setEditing(null) }
    else { addRule(form); setShowNew(false) }
  }

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-5 py-3 border-b flex-shrink-0"
        style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <div className="flex items-center gap-3">
          <h1 className="font-display font-bold text-sm">Conditional Logic</h1>
          <span className="text-xs px-2 py-0.5 rounded-full font-mono"
            style={{ background: 'rgba(108,99,255,0.1)', color: 'var(--accent)', border: '1px solid rgba(108,99,255,0.2)' }}>
            {rules.length} rules
          </span>
        </div>
        <button onClick={() => { setShowNew(true); setEditing(null) }}
          className="text-xs px-4 py-1.5 rounded-lg font-medium"
          style={{ background: 'var(--accent)', color: '#fff' }}>
          + Add Rule
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Rules list */}
        <div className="flex-1 overflow-y-auto p-6">
          {actionableFields.length < 2 ? (
            <div className="rounded-xl border p-10 text-center"
              style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
              <div className="text-3xl mb-3 opacity-30">◈</div>
              <p className="text-sm font-medium mb-1" style={{ color: '#E8E8F0' }}>Add more fields first</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>You need at least 2 fields to create conditional rules</p>
            </div>
          ) : (
            <div className="space-y-3 max-w-3xl">
              <AnimatePresence>
                {(showNew && !editing) && (
                  <RuleEditor fields={fields} onSave={handleSave} onCancel={() => setShowNew(false)} />
                )}
                {editing && (
                  <RuleEditor rule={editing} fields={fields} onSave={handleSave} onCancel={() => setEditing(null)} />
                )}
              </AnimatePresence>

              {rules.length === 0 && !showNew && (
                <div className="rounded-xl border border-dashed p-10 text-center"
                  style={{ borderColor: 'var(--border)' }}>
                  <div className="text-3xl mb-3 opacity-30">◈</div>
                  <p className="text-sm font-medium mb-1" style={{ color: '#E8E8F0' }}>No rules yet</p>
                  <p className="text-xs mb-4" style={{ color: 'var(--muted)' }}>Create rules to show/hide fields based on user input</p>
                  <button onClick={() => setShowNew(true)}
                    className="text-xs px-4 py-2 rounded-lg"
                    style={{ background: 'rgba(108,99,255,0.15)', color: 'var(--accent)', border: '1px solid rgba(108,99,255,0.3)' }}>
                    + Create First Rule
                  </button>
                </div>
              )}

              {rules.map(rule => (
                <RuleBadge key={rule.id} rule={rule} fields={fields}
                  onRemove={removeRule}
                  onEdit={(r) => { setEditing(r); setShowNew(false) }} />
              ))}
            </div>
          )}
        </div>

        {/* Fields sidebar */}
        <aside className="w-56 border-l overflow-y-auto p-4"
          style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>
            Form Fields
          </h2>
          <div className="space-y-1.5">
            {fields.map((f, i) => {
              const color = FIELD_COLORS[f.type] || 'var(--accent)'
              const ruleCount = rules.filter(r => r.triggerFieldId === f.id || r.targetFieldId === f.id).length
              return (
                <div key={f.id} className="flex items-center gap-2 px-2.5 py-2 rounded-lg"
                  style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                  <span className="text-xs font-mono w-4 flex-shrink-0" style={{ color: 'var(--muted)', opacity: 0.5 }}>{i + 1}</span>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                  <span className="text-xs flex-1 truncate" style={{ color: '#E8E8F0' }}>{f.label}</span>
                  {ruleCount > 0 && (
                    <span className="text-xs w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(108,99,255,0.2)', color: 'var(--accent)', fontSize: '10px' }}>
                      {ruleCount}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </aside>
      </div>
    </div>
  )
}
