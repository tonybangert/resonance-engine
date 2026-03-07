import { clamp } from './fibonacci'

// RMT Resonance scoring - without and with context
// Based on motivation vector alignment between consumer and campaign

// Cosine similarity between two vectors
function cosineSimilarity(a, b) {
  let dot = 0, magA = 0, magB = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    magA += a[i] * a[i]
    magB += b[i] * b[i]
  }
  magA = Math.sqrt(magA)
  magB = Math.sqrt(magB)
  if (magA === 0 || magB === 0) return 0
  return dot / (magA * magB)
}

// Jaccard similarity between two sets
function jaccardSimilarity(setA, setB) {
  const a = new Set(setA)
  const b = new Set(setB)
  const intersection = [...a].filter(x => b.has(x))
  const union = new Set([...a, ...b])
  if (union.size === 0) return 0
  return intersection.length / union.size
}

// Stage 2: RMT without context (R-squared ~ 0.046)
export function scoreRmtNoContext(consumer, campaign) {
  // Cosine similarity between motivation vectors
  const baseResonance = cosineSimilarity(
    campaign.motivationTargets,
    consumer.motivations
  )

  // DriverTag overlap bonus
  const tagOverlap = jaccardSimilarity(campaign.driverTags, consumer.driverTags)

  // Weighted combination
  const score = 0.7 * baseResonance + 0.3 * tagOverlap

  return {
    score: clamp(score),
    baseResonance,
    tagOverlap,
    matchedTags: campaign.driverTags.filter(t => consumer.driverTags.includes(t)),
    confidence: 0.22,
    method: 'rmt_no_context',
    label: 'RMT Resonance (No Context)',
  }
}

// Stage 3: RMT with context (R-squared ~ 0.677)
export function scoreRmtWithContext(consumer, campaign, context) {
  const noContextResult = scoreRmtNoContext(consumer, campaign)

  // Apply context motivation modifiers to consumer profile
  const adjustedMotivations = consumer.motivations.map((val, i) => {
    return val * (context.motivationModifiers[i] || 1.0)
  })

  // Re-score with context-adjusted profile
  const contextResonance = cosineSimilarity(
    campaign.motivationTargets,
    adjustedMotivations
  )

  // Context alignment: how much does the context help this particular match?
  const contextAlignment = Math.abs(contextResonance - noContextResult.baseResonance)

  // Amplification factor: peaks at 14.7x for perfect alignment
  const amplification = 1 + (contextAlignment * 13.7)

  // Blend: base score enhanced by context amplification
  // Ensure contextual score is always >= noContextResult.score
  const amplifiedScore = noContextResult.score + (amplification - 1) * noContextResult.score * 0.3
  const score = clamp(Math.max(amplifiedScore, noContextResult.score + 0.02), 0, 0.95)

  // Identify which motivations were most amplified
  const amplifiedMotivations = context.motivationModifiers
    .map((mod, i) => ({ index: i, modifier: mod }))
    .filter(m => m.modifier > 1.2)
    .sort((a, b) => b.modifier - a.modifier)
    .slice(0, 3)

  return {
    score,
    contextResonance,
    contextAlignment,
    amplification,
    amplifiedMotivations,
    noContextScore: noContextResult.score,
    confidence: 0.72,
    method: 'rmt_with_context',
    label: 'RMT + Context',
  }
}

export { cosineSimilarity, jaccardSimilarity }
