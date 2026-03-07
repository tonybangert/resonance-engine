// ~40 representative DriverTags grouped by primary motivation
// Each tag maps to 1-3 motivations it activates
export const DRIVER_TAGS = [
  // Achievement
  { id: 'aspiration', label: 'Aspiration', motivations: ['achievement', 'status'] },
  { id: 'mastery', label: 'Mastery', motivations: ['achievement', 'knowledge'] },
  { id: 'efficiency', label: 'Efficiency', motivations: ['achievement', 'independence'] },
  { id: 'winning', label: 'Winning', motivations: ['achievement', 'power'] },

  // Adventure
  { id: 'novelty', label: 'Novelty', motivations: ['adventure', 'creativity'] },
  { id: 'spontaneity', label: 'Spontaneity', motivations: ['adventure', 'humor'] },
  { id: 'excitement', label: 'Excitement', motivations: ['adventure', 'sensory'] },
  { id: 'exploration', label: 'Exploration', motivations: ['adventure', 'knowledge'] },

  // Altruism
  { id: 'generosity', label: 'Generosity', motivations: ['altruism', 'nurturing'] },
  { id: 'empathy', label: 'Empathy', motivations: ['altruism', 'belonging'] },
  { id: 'purpose', label: 'Purpose', motivations: ['altruism', 'achievement'] },

  // Belonging
  { id: 'connection', label: 'Connection', motivations: ['belonging', 'romance'] },
  { id: 'togetherness', label: 'Togetherness', motivations: ['belonging', 'nurturing'] },
  { id: 'community', label: 'Community', motivations: ['belonging', 'tradition'] },

  // Creativity
  { id: 'imagination', label: 'Imagination', motivations: ['creativity', 'adventure'] },
  { id: 'self_expression', label: 'Self Expression', motivations: ['creativity', 'independence'] },
  { id: 'originality', label: 'Originality', motivations: ['creativity', 'status'] },
  { id: 'aesthetics', label: 'Aesthetics', motivations: ['creativity', 'sensory'] },

  // Humor
  { id: 'wit', label: 'Wit', motivations: ['humor', 'knowledge'] },
  { id: 'playfulness', label: 'Playfulness', motivations: ['humor', 'adventure'] },
  { id: 'irreverence', label: 'Irreverence', motivations: ['humor', 'independence'] },

  // Independence
  { id: 'autonomy', label: 'Autonomy', motivations: ['independence', 'power'] },
  { id: 'freedom', label: 'Freedom', motivations: ['independence', 'adventure'] },

  // Knowledge
  { id: 'curiosity', label: 'Curiosity', motivations: ['knowledge', 'adventure'] },
  { id: 'discovery', label: 'Discovery', motivations: ['knowledge', 'creativity'] },
  { id: 'depth', label: 'Depth', motivations: ['knowledge', 'achievement'] },

  // Nurturing
  { id: 'protection', label: 'Protection', motivations: ['nurturing', 'security'] },
  { id: 'comfort', label: 'Comfort', motivations: ['nurturing', 'sensory'] },
  { id: 'warmth', label: 'Warmth', motivations: ['nurturing', 'belonging'] },

  // Power
  { id: 'authority', label: 'Authority', motivations: ['power', 'status'] },
  { id: 'influence', label: 'Influence', motivations: ['power', 'achievement'] },
  { id: 'control', label: 'Control', motivations: ['power', 'security'] },

  // Romance
  { id: 'passion', label: 'Passion', motivations: ['romance', 'sensory'] },
  { id: 'intimacy', label: 'Intimacy', motivations: ['romance', 'belonging'] },
  { id: 'beauty', label: 'Beauty', motivations: ['romance', 'creativity'] },

  // Security
  { id: 'reliability', label: 'Reliability', motivations: ['security', 'tradition'] },
  { id: 'stability', label: 'Stability', motivations: ['security', 'nurturing'] },
  { id: 'trust', label: 'Trust', motivations: ['security', 'belonging'] },

  // Sensory
  { id: 'intensity', label: 'Intensity', motivations: ['sensory', 'adventure'] },
  { id: 'indulgence', label: 'Indulgence', motivations: ['sensory', 'romance'] },

  // Status
  { id: 'luxury', label: 'Luxury', motivations: ['status', 'sensory'] },
  { id: 'exclusivity', label: 'Exclusivity', motivations: ['status', 'power'] },
  { id: 'prestige', label: 'Prestige', motivations: ['status', 'achievement'] },

  // Tradition
  { id: 'heritage', label: 'Heritage', motivations: ['tradition', 'belonging'] },
  { id: 'familiarity', label: 'Familiarity', motivations: ['tradition', 'security'] },
  { id: 'meaning', label: 'Meaning', motivations: ['tradition', 'altruism'] },
]

export const DRIVER_TAG_IDS = DRIVER_TAGS.map(t => t.id)
