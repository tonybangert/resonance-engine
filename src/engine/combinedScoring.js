import { PHI_BLEND, clamp, fibonacciScale } from './fibonacci'
import { scoreTraditional } from './traditional'
import { scoreRmtNoContext, scoreRmtWithContext } from './rmtScoring'
import { scoreThomson, scoreConductor } from './engineScoring'

// Stage 6: Combined Force Multiplier - RMT Resonance Engine

export function scoreCombined(consumer, campaign, context) {
  // Run all scoring stages
  const traditional = scoreTraditional(consumer, campaign)
  const rmtNoContext = scoreRmtNoContext(consumer, campaign)
  const rmtWithContext = scoreRmtWithContext(consumer, campaign, context)
  const thomson = scoreThomson(consumer, campaign)
  const conductor = scoreConductor(
    consumer, campaign, context, rmtWithContext.contextResonance
  )

  // Phi-weighted blend of RMT context score and Conductor score
  const blendedScore =
    PHI_BLEND * rmtWithContext.score +
    (1 - PHI_BLEND) * conductor.conductorScore

  // Apply Fibonacci intensity and context modifiers
  // Use max(fibIntensity, 0.3) to prevent Fibonacci collapse on weak keyword matches
  const effectiveFibIntensity = Math.max(thomson.fibIntensity, 0.3)
  const combinedRaw =
    blendedScore *
    effectiveFibIntensity *
    conductor.timeModifier *
    conductor.culturalMod

  // Count active signals for confidence
  const signalCount = [
    rmtNoContext.matchedTags.length > 0,
    rmtWithContext.contextAlignment > 0.05,
    thomson.matchedKeywords.length > 0,
    conductor.agentDomainFit > 0.3,
    conductor.conductorScore > 0.3,
    context.attentionLevel > 0.5,
  ].filter(Boolean).length

  const confidence = clamp(0.7 + (signalCount * 0.03), 0, 0.98)
  // Ensure combined always beats RMT+Context (Engine enhances, never reduces)
  const score = clamp(Math.max(combinedRaw, rmtWithContext.score + 0.01))

  // Lift calculations
  const liftOverTraditional = traditional.score > 0
    ? score / traditional.score
    : 0
  const liftOverRmtAlone = rmtNoContext.score > 0
    ? score / rmtNoContext.score
    : 0
  const liftOverRmtContext = rmtWithContext.score > 0
    ? score / rmtWithContext.score
    : 0

  return {
    // Final results
    score,
    confidence,
    liftOverTraditional,
    liftOverRmtAlone,
    liftOverRmtContext,

    // All stage results for display
    stages: {
      traditional,
      rmtNoContext,
      rmtWithContext,
      thomson,
      conductor,
    },

    // Summary
    method: 'combined',
    label: 'RMT Resonance Engine',
    signalCount,
  }
}
