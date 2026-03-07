import { fibonacciScale, clamp } from './fibonacci'
import { jaccardSimilarity } from './rmtScoring'
import { AGENT_DOMAIN_IDS } from '../data/agentDomains'

// Engine Enhancement: Thomson + Fibonacci + Conductor scoring

// Time-of-day weighting for context
function contextTimeWeight(timeOfDay) {
  const weights = {
    morning: 1.05,
    afternoon: 1.0,
    evening: 1.15,
    late_night: 0.90,
    varies: 1.0,
  }
  return weights[timeOfDay] || 1.0
}

// Stage 4: Thomson keyword signal matching with Fibonacci scaling
export function scoreThomson(consumer, campaign) {
  // Thomson keyword alignment (Jaccard similarity)
  const thomsonAlignment = jaccardSimilarity(
    campaign.thomsonSignals,
    consumer.thomsonKeywords
  )

  // Fibonacci-scaled intensity (non-linear amplification of strong signals)
  const fibIntensity = fibonacciScale(thomsonAlignment)

  // Matched keywords for display
  const matchedKeywords = campaign.thomsonSignals.filter(
    s => consumer.thomsonKeywords.includes(s)
  )

  return {
    thomsonAlignment,
    fibIntensity,
    matchedKeywords,
    totalAdSignals: campaign.thomsonSignals.length,
    totalConsumerKeywords: consumer.thomsonKeywords.length,
  }
}

// Stage 5: Conductor three-way matching + domain routing
export function scoreConductor(consumer, campaign, context, contextResonance) {
  const thomson = scoreThomson(consumer, campaign)

  // Agent domain fit: average affinity across all domains, weighted by relevance
  const agentDomainFit = consumer.agentDomainAffinities.reduce((sum, aff) => {
    return sum + aff.affinity
  }, 0) / consumer.agentDomainAffinities.length

  // Three-way conductor score
  const conductorScore =
    0.40 * thomson.thomsonAlignment +
    0.35 * (contextResonance || 0.5) +
    0.25 * agentDomainFit

  // Find best-matching agent domain for this combination
  const bestDomain = consumer.agentDomainAffinities
    .slice()
    .sort((a, b) => b.affinity - a.affinity)[0]

  // Context-specific modifiers
  const timeModifier = contextTimeWeight(context.timeOfDay)
  const culturalMod = 1 + (context.culturalSensitivity * 0.15)

  return {
    conductorScore,
    thomson,
    agentDomainFit,
    bestDomain,
    timeModifier,
    culturalMod,
    confidence: 0.85,
    method: 'engine_conductor',
    label: 'Engine Conductor',
  }
}
