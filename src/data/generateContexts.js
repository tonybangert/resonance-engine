import { MOTIVATION_IDS } from './motivations'

// 8 viewing contexts with emotional profiles and modifiers
export function generateContexts() {
  return [
    {
      id: 'ctx-01',
      name: 'Prime Time Drama',
      icon: 'Tv',
      description: 'Evening drama series on major networks',
      timeOfDay: 'evening',
      emotionalProfile: 'engaged_emotional',
      // Which motivations this context amplifies (multiplier > 1) or suppresses (< 1)
      motivationModifiers: buildContextModifiers({
        romance: 1.6, belonging: 1.4, nurturing: 1.3, creativity: 1.2,
        sensory: 1.2, humor: 0.8, adventure: 0.9, power: 0.9,
      }),
      culturalSensitivity: 0.7,
      attentionLevel: 0.85,
    },
    {
      id: 'ctx-02',
      name: 'Morning News',
      icon: 'Newspaper',
      description: 'Morning news broadcasts and shows',
      timeOfDay: 'morning',
      emotionalProfile: 'alert_rational',
      motivationModifiers: buildContextModifiers({
        knowledge: 1.5, security: 1.4, achievement: 1.3, tradition: 1.2,
        independence: 1.1, romance: 0.6, humor: 0.7, sensory: 0.8,
      }),
      culturalSensitivity: 0.5,
      attentionLevel: 0.65,
    },
    {
      id: 'ctx-03',
      name: 'Live Sports',
      icon: 'Trophy',
      description: 'Live sporting events with high energy',
      timeOfDay: 'varies',
      emotionalProfile: 'high_arousal',
      motivationModifiers: buildContextModifiers({
        adventure: 1.7, achievement: 1.6, power: 1.5, belonging: 1.4,
        sensory: 1.3, humor: 1.2, romance: 0.5, nurturing: 0.6,
      }),
      culturalSensitivity: 0.3,
      attentionLevel: 0.90,
    },
    {
      id: 'ctx-04',
      name: 'Late Night Comedy',
      icon: 'Laugh',
      description: 'Late night comedy and talk shows',
      timeOfDay: 'late_night',
      emotionalProfile: 'relaxed_playful',
      motivationModifiers: buildContextModifiers({
        humor: 1.8, creativity: 1.4, independence: 1.3, adventure: 1.2,
        belonging: 1.1, security: 0.6, tradition: 0.7, power: 0.8,
      }),
      culturalSensitivity: 0.4,
      attentionLevel: 0.55,
    },
    {
      id: 'ctx-05',
      name: 'Streaming Binge',
      icon: 'Play',
      description: 'Extended streaming session, multiple episodes',
      timeOfDay: 'evening',
      emotionalProfile: 'immersed_passive',
      motivationModifiers: buildContextModifiers({
        creativity: 1.5, sensory: 1.4, romance: 1.3, adventure: 1.2,
        belonging: 1.1, achievement: 0.7, power: 0.7, knowledge: 0.8,
      }),
      culturalSensitivity: 0.6,
      attentionLevel: 0.45,
    },
    {
      id: 'ctx-06',
      name: 'Social Media Scroll',
      icon: 'Smartphone',
      description: 'Mobile social media browsing',
      timeOfDay: 'varies',
      emotionalProfile: 'distracted_social',
      motivationModifiers: buildContextModifiers({
        status: 1.6, belonging: 1.5, humor: 1.4, creativity: 1.3,
        independence: 1.1, security: 0.5, tradition: 0.6, nurturing: 0.7,
      }),
      culturalSensitivity: 0.8,
      attentionLevel: 0.30,
    },
    {
      id: 'ctx-07',
      name: 'Podcast / Audio',
      icon: 'Headphones',
      description: 'Podcast listening during commute or exercise',
      timeOfDay: 'morning',
      emotionalProfile: 'focused_receptive',
      motivationModifiers: buildContextModifiers({
        knowledge: 1.7, independence: 1.5, creativity: 1.3, achievement: 1.2,
        humor: 1.1, sensory: 0.6, romance: 0.7, status: 0.8,
      }),
      culturalSensitivity: 0.4,
      attentionLevel: 0.70,
    },
    {
      id: 'ctx-08',
      name: 'Weekend Family',
      icon: 'Sofa',
      description: 'Weekend family viewing together',
      timeOfDay: 'afternoon',
      emotionalProfile: 'warm_shared',
      motivationModifiers: buildContextModifiers({
        nurturing: 1.7, belonging: 1.6, humor: 1.4, tradition: 1.3,
        security: 1.3, sensory: 1.1, power: 0.5, status: 0.6,
      }),
      culturalSensitivity: 0.9,
      attentionLevel: 0.60,
    },
  ]
}

// Helper: builds a 15-element modifier array from sparse weights (default 1.0)
function buildContextModifiers(weights) {
  return MOTIVATION_IDS.map(id => weights[id] || 1.0)
}
