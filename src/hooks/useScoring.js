import { useMemo } from 'react'
import { scoreCombined } from '../engine'

// Memoized scoring for current selection
export function useScoring(consumer, campaign, context) {
  return useMemo(() => {
    if (!consumer || !campaign || !context) return null
    return scoreCombined(consumer, campaign, context)
  }, [consumer, campaign, context])
}
