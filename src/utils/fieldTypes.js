export const FIELD_PALETTE = [
  {
    category: 'Basic',
    fields: [
      { type: 'text', label: 'Short Text', icon: '𝐓', desc: 'Single line input' },
      { type: 'textarea', label: 'Long Text', icon: '¶', desc: 'Multi-line input' },
      { type: 'email', label: 'Email', icon: '@', desc: 'Email validation' },
      { type: 'number', label: 'Number', icon: '#', desc: 'Numeric input' },
      { type: 'date', label: 'Date', icon: '◷', desc: 'Date picker' },
      { type: 'file', label: 'File Upload', icon: '↑', desc: 'Upload files' },
    ]
  },
  {
    category: 'Choice',
    fields: [
      { type: 'select', label: 'Dropdown', icon: '▾', desc: 'Select one option' },
      { type: 'radio', label: 'Radio', icon: '◎', desc: 'Pick one option' },
      { type: 'checkbox', label: 'Checkbox', icon: '☑', desc: 'Multiple choices' },
      { type: 'rating', label: 'Rating', icon: '★', desc: 'Star rating' },
    ]
  },
  {
    category: 'Layout',
    fields: [
      { type: 'heading', label: 'Heading', icon: 'H', desc: 'Section title' },
      { type: 'divider', label: 'Divider', icon: '—', desc: 'Horizontal rule' },
    ]
  }
]

export const FIELD_COLORS = {
  text: '#6C63FF',
  textarea: '#8B5CF6',
  email: '#06B6D4',
  number: '#10B981',
  date: '#F59E0B',
  file: '#EF4444',
  select: '#3B82F6',
  radio: '#EC4899',
  checkbox: '#8B5CF6',
  rating: '#F59E0B',
  heading: '#6B7280',
  divider: '#374151',
}
