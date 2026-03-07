// Consumer segment archetypes
// Each defines a motivation "center of gravity" for seeding individual variation
export const SEGMENTS = [
  {
    id: 'urban_professional',
    label: 'Urban Professional',
    motivationWeights: {
      achievement: 85, knowledge: 75, independence: 70,
      status: 55, power: 50, creativity: 40,
      security: 35, humor: 30, adventure: 25,
      belonging: 20, sensory: 20, nurturing: 15,
      tradition: 15, romance: 15, altruism: 10,
    },
    typicalTags: ['aspiration', 'mastery', 'efficiency', 'depth', 'autonomy'],
    thomsonKeywords: [
      'career advancement', 'thought leadership', 'competitive edge',
      'productivity hack', 'executive performance', 'strategic growth',
      'professional development', 'market insight', 'high-impact results', 'peak efficiency',
    ],
  },
  {
    id: 'young_explorer',
    label: 'Young Explorer',
    motivationWeights: {
      adventure: 85, creativity: 75, humor: 70,
      sensory: 55, independence: 50, knowledge: 45,
      belonging: 40, romance: 30, status: 25,
      achievement: 20, altruism: 15, power: 15,
      nurturing: 10, security: 10, tradition: 5,
    },
    typicalTags: ['novelty', 'self_expression', 'spontaneity', 'excitement', 'exploration'],
    thomsonKeywords: [
      'bucket-list adventure', 'hidden gem', 'off the beaten path',
      'authentic experience', 'social discovery', 'trending now',
      'FOMO-worthy', 'once-in-a-lifetime', 'spontaneous getaway', 'vibe check',
    ],
  },
  {
    id: 'family_nurturer',
    label: 'Family Nurturer',
    motivationWeights: {
      nurturing: 90, belonging: 80, security: 75,
      tradition: 60, altruism: 55, romance: 40,
      humor: 35, knowledge: 30, sensory: 25,
      creativity: 20, achievement: 15, independence: 10,
      adventure: 10, status: 5, power: 5,
    },
    typicalTags: ['protection', 'togetherness', 'comfort', 'warmth', 'reliability'],
    thomsonKeywords: [
      'family-first', 'child-safe', 'wholesome living',
      'trusted by parents', 'nurturing environment', 'peace of mind',
      'family bonding', 'home comfort', 'generations of trust', 'kid-approved',
    ],
  },
  {
    id: 'status_seeker',
    label: 'Status Seeker',
    motivationWeights: {
      status: 90, power: 80, achievement: 75,
      sensory: 55, independence: 45, creativity: 35,
      knowledge: 30, romance: 25, belonging: 20,
      adventure: 20, humor: 15, security: 15,
      tradition: 10, nurturing: 5, altruism: 5,
    },
    typicalTags: ['luxury', 'exclusivity', 'prestige', 'authority', 'winning'],
    thomsonKeywords: [
      'ultra-premium', 'invitation only', 'black-label exclusive',
      'commanding presence', 'wealth signal', 'VIP access',
      'elite circle', 'power statement', 'first-class lifestyle', 'trophy experience',
    ],
  },
  {
    id: 'creative_spirit',
    label: 'Creative Spirit',
    motivationWeights: {
      creativity: 90, sensory: 75, independence: 70,
      adventure: 55, knowledge: 50, humor: 40,
      romance: 35, achievement: 30, belonging: 20,
      altruism: 20, status: 15, tradition: 15,
      nurturing: 10, power: 10, security: 5,
    },
    typicalTags: ['imagination', 'aesthetics', 'originality', 'self_expression', 'beauty'],
    thomsonKeywords: [
      'artistic vision', 'creative freedom', 'design-forward',
      'one-of-a-kind craft', 'aesthetic mastery', 'curator-approved',
      'boundary-pushing', 'studio quality', 'handcrafted detail', 'visual storytelling',
    ],
  },
  {
    id: 'community_builder',
    label: 'Community Builder',
    motivationWeights: {
      altruism: 85, belonging: 80, tradition: 70,
      nurturing: 55, humor: 45, knowledge: 35,
      security: 35, romance: 25, achievement: 20,
      creativity: 20, independence: 15, sensory: 10,
      adventure: 10, power: 10, status: 5,
    },
    typicalTags: ['generosity', 'connection', 'heritage', 'community', 'empathy'],
    thomsonKeywords: [
      'community impact', 'giving back', 'grassroots movement',
      'shared purpose', 'neighborhood pride', 'social good',
      'cultural heritage', 'collective strength', 'volunteer-driven', 'paying it forward',
    ],
  },
  {
    id: 'knowledge_seeker',
    label: 'Knowledge Seeker',
    motivationWeights: {
      knowledge: 90, creativity: 70, achievement: 65,
      independence: 50, adventure: 40, humor: 30,
      security: 25, belonging: 25, sensory: 20,
      altruism: 20, power: 15, tradition: 15,
      nurturing: 10, status: 10, romance: 10,
    },
    typicalTags: ['curiosity', 'discovery', 'depth', 'mastery', 'exploration'],
    thomsonKeywords: [
      'evidence-based', 'deep-dive analysis', 'research-backed',
      'intellectual rigor', 'expert perspective', 'data-driven insight',
      'critical thinking', 'peer-reviewed', 'first-principles', 'knowledge frontier',
    ],
  },
  {
    id: 'comfort_loyalist',
    label: 'Comfort Loyalist',
    motivationWeights: {
      security: 85, tradition: 80, nurturing: 70,
      belonging: 55, sensory: 40, humor: 35,
      knowledge: 25, altruism: 25, romance: 20,
      achievement: 15, creativity: 10, independence: 10,
      adventure: 5, power: 5, status: 5,
    },
    typicalTags: ['reliability', 'familiarity', 'warmth', 'comfort', 'stability'],
    thomsonKeywords: [
      'time-tested formula', 'trusted for decades', 'dependable classic',
      'comfort guarantee', 'heritage brand', 'tried-and-true',
      'no-surprises quality', 'everyday reliability', 'customer loyalty', 'consistent results',
    ],
  },
  {
    id: 'thrill_chaser',
    label: 'Thrill Chaser',
    motivationWeights: {
      adventure: 90, sensory: 80, humor: 65,
      independence: 55, creativity: 45, achievement: 35,
      power: 30, romance: 25, belonging: 20,
      status: 20, knowledge: 15, altruism: 10,
      nurturing: 5, security: 5, tradition: 5,
    },
    typicalTags: ['excitement', 'intensity', 'spontaneity', 'playfulness', 'freedom'],
    thomsonKeywords: [
      'adrenaline rush', 'extreme challenge', 'heart-pounding action',
      'no-limits experience', 'wild ride', 'edge-of-your-seat',
      'boundary-breaking', 'raw energy', 'unfiltered intensity', 'dare to try',
    ],
  },
  {
    id: 'romantic_idealist',
    label: 'Romantic Idealist',
    motivationWeights: {
      romance: 90, creativity: 75, altruism: 65,
      sensory: 55, belonging: 50, nurturing: 40,
      adventure: 30, tradition: 25, knowledge: 20,
      humor: 20, independence: 15, achievement: 10,
      security: 10, status: 10, power: 5,
    },
    typicalTags: ['passion', 'beauty', 'meaning', 'intimacy', 'imagination'],
    thomsonKeywords: [
      'timeless romance', 'soulful connection', 'enchanting moment',
      'love language', 'intimate luxury', 'dreamy escape',
      'heartfelt gesture', 'passionate pursuit', 'poetic beauty', 'destined encounter',
    ],
  },
]
