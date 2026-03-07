// RMT's 15 Core Motivations
// These represent the fundamental emotional drivers that determine ad resonance
export const MOTIVATIONS = [
  { id: 'achievement', label: 'Achievement', color: '#3b82f6', description: 'Drive to accomplish and excel' },
  { id: 'adventure', label: 'Adventure', color: '#06b6d4', description: 'Desire for new experiences and thrills' },
  { id: 'altruism', label: 'Altruism', color: '#22c55e', description: 'Desire to help others and give back' },
  { id: 'belonging', label: 'Belonging', color: '#8b5cf6', description: 'Need for social connection and acceptance' },
  { id: 'creativity', label: 'Creativity', color: '#ec4899', description: 'Drive to create and express uniquely' },
  { id: 'humor', label: 'Humor', color: '#f97316', description: 'Appreciation for wit and amusement' },
  { id: 'independence', label: 'Independence', color: '#64748b', description: 'Value of self-reliance and autonomy' },
  { id: 'knowledge', label: 'Knowledge', color: '#0ea5e9', description: 'Pursuit of understanding and learning' },
  { id: 'nurturing', label: 'Nurturing', color: '#a3e635', description: 'Care for and protection of others' },
  { id: 'power', label: 'Power', color: '#ef4537', description: 'Desire for influence and authority' },
  { id: 'romance', label: 'Romance', color: '#f43f5e', description: 'Longing for love and intimate connection' },
  { id: 'security', label: 'Security', color: '#14b8a6', description: 'Need for safety and stability' },
  { id: 'sensory', label: 'Sensory', color: '#d946ef', description: 'Appreciation for physical and aesthetic pleasure' },
  { id: 'status', label: 'Status', color: '#f59e0b', description: 'Drive for recognition and prestige' },
  { id: 'tradition', label: 'Tradition', color: '#78716c', description: 'Value of heritage and established customs' },
]

export const MOTIVATION_IDS = MOTIVATIONS.map(m => m.id)
export const MOTIVATION_COUNT = MOTIVATIONS.length
