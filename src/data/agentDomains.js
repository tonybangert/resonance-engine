// 7 Engine AgentDomains - specialized AI processing domains
// Each domain has affinities to specific motivations and contexts
export const AGENT_DOMAINS = [
  {
    id: 'emotional_resonance',
    label: 'Emotional Resonance',
    icon: 'Heart',
    color: '#f43f5e',
    motivationAffinities: ['romance', 'nurturing', 'belonging', 'altruism'],
    description: 'Processes emotional alignment between content and viewer state',
  },
  {
    id: 'cognitive_engagement',
    label: 'Cognitive Engagement',
    icon: 'Brain',
    color: '#3b82f6',
    motivationAffinities: ['knowledge', 'achievement', 'creativity', 'independence'],
    description: 'Analyzes intellectual stimulation and information processing',
  },
  {
    id: 'social_dynamics',
    label: 'Social Dynamics',
    icon: 'Users',
    color: '#8b5cf6',
    motivationAffinities: ['belonging', 'status', 'power', 'tradition'],
    description: 'Maps social influence patterns and group behavior',
  },
  {
    id: 'sensory_processing',
    label: 'Sensory Processing',
    icon: 'Sparkles',
    color: '#d946ef',
    motivationAffinities: ['sensory', 'adventure', 'romance', 'creativity'],
    description: 'Evaluates aesthetic and sensory impact of creative',
  },
  {
    id: 'temporal_context',
    label: 'Temporal Context',
    icon: 'Clock',
    color: '#06b6d4',
    motivationAffinities: ['security', 'tradition', 'nurturing'],
    description: 'Factors time-of-day, seasonality, and cultural timing',
  },
  {
    id: 'narrative_alignment',
    label: 'Narrative Alignment',
    icon: 'BookOpen',
    color: '#22c55e',
    motivationAffinities: ['creativity', 'adventure', 'humor', 'knowledge'],
    description: 'Matches story arcs between content and ad creative',
  },
  {
    id: 'behavioral_prediction',
    label: 'Behavioral Prediction',
    icon: 'TrendingUp',
    color: '#f59e0b',
    motivationAffinities: ['achievement', 'power', 'independence', 'status'],
    description: 'Predicts conversion probability from behavioral signals',
  },
]

export const AGENT_DOMAIN_IDS = AGENT_DOMAINS.map(d => d.id)
