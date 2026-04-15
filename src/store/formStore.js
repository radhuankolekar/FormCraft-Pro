import { create } from 'zustand'
import { v4 as uuid } from 'uuid'

const defaultFields = [
  { id: uuid(), type: 'text', label: 'Full Name', placeholder: 'Enter your full name', required: true, width: 'full' },
  { id: uuid(), type: 'email', label: 'Email Address', placeholder: 'you@example.com', required: true, width: 'full' },
  { id: uuid(), type: 'select', label: 'Role', placeholder: 'Select role', required: false, width: 'half',
    options: ['Developer', 'Designer', 'Manager', 'Other'] },
]

export const useFormStore = create((set, get) => ({
  // Form fields
  fields: defaultFields,
  selectedField: null,
  formTitle: 'Untitled Form',
  formDescription: 'Fill in the details below',

  // Logic rules
  rules: [],

  // Submissions (mock data)
  submissions: generateMockSubmissions(),

  // Actions
  setFormTitle: (title) => set({ formTitle: title }),
  setFormDescription: (desc) => set({ formDescription: desc }),

  addField: (type) => {
    const field = createField(type)
    set((s) => ({ fields: [...s.fields, field], selectedField: field.id }))
  },

  removeField: (id) => set((s) => ({
    fields: s.fields.filter(f => f.id !== id),
    selectedField: s.selectedField === id ? null : s.selectedField
  })),

  updateField: (id, updates) => set((s) => ({
    fields: s.fields.map(f => f.id === id ? { ...f, ...updates } : f)
  })),

  reorderFields: (fields) => set({ fields }),

  selectField: (id) => set({ selectedField: id }),

  duplicateField: (id) => {
    const field = get().fields.find(f => f.id === id)
    if (!field) return
    const copy = { ...field, id: uuid(), label: field.label + ' (Copy)' }
    set((s) => {
      const idx = s.fields.findIndex(f => f.id === id)
      const next = [...s.fields]
      next.splice(idx + 1, 0, copy)
      return { fields: next }
    })
  },

  // Logic rules
  addRule: (rule) => set((s) => ({ rules: [...s.rules, { id: uuid(), ...rule }] })),
  removeRule: (id) => set((s) => ({ rules: s.rules.filter(r => r.id !== id) })),
  updateRule: (id, updates) => set((s) => ({
    rules: s.rules.map(r => r.id === id ? { ...r, ...updates } : r)
  })),
}))

function createField(type) {
  const base = { id: uuid(), type, required: false, width: 'full' }
  const map = {
    text: { label: 'Text Field', placeholder: 'Enter text...' },
    email: { label: 'Email', placeholder: 'you@example.com' },
    number: { label: 'Number', placeholder: '0' },
    textarea: { label: 'Long Text', placeholder: 'Write here...' },
    select: { label: 'Dropdown', placeholder: 'Select option', options: ['Option 1', 'Option 2', 'Option 3'] },
    radio: { label: 'Multiple Choice', options: ['Option A', 'Option B', 'Option C'] },
    checkbox: { label: 'Checkbox', options: ['Choice 1', 'Choice 2'] },
    date: { label: 'Date', placeholder: '' },
    file: { label: 'File Upload', accept: '*', maxSize: 10 },
    rating: { label: 'Rating', maxRating: 5 },
    heading: { label: 'Section Heading', content: 'New Section' },
    divider: { label: 'Divider' },
  }
  return { ...base, ...(map[type] || { label: type }) }
}

function generateMockSubmissions() {
  const days = 30
  const subs = []
  for (let i = 0; i < 248; i++) {
    const daysAgo = Math.floor(Math.random() * days)
    const date = new Date()
    date.setDate(date.getDate() - daysAgo)
    subs.push({
      id: uuid(),
      date: date.toISOString(),
      completed: Math.random() > 0.28,
      dropStep: Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : null,
      device: ['desktop', 'mobile', 'tablet'][Math.floor(Math.random() * 3)],
      timeSpent: Math.floor(Math.random() * 300) + 30,
      source: ['direct', 'email', 'social', 'search'][Math.floor(Math.random() * 4)],
    })
  }
  return subs
}
