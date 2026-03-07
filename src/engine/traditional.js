import { createRng } from '../data/seed'

// Traditional last-touch attribution
// Simulates the noise and low accuracy of conventional attribution
export function scoreTraditional(consumer, campaign) {
  // Use deterministic random based on consumer + campaign IDs
  const seed = hashPair(consumer.id, campaign.id)
  const rng = createRng(seed)

  // Traditional attribution is essentially noise: random 5-20% range
  const score = rng.range(0.05, 0.20)
  const confidence = 0.12 // Very low confidence

  return {
    score,
    confidence,
    method: 'traditional',
    label: 'Last-Touch Attribution',
  }
}

// Simple deterministic hash for pairing two string IDs
function hashPair(a, b) {
  const str = `${a}:${b}`
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash)
}
