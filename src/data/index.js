import { generateConsumers } from './generateConsumers'
import { generateCampaigns } from './generateCampaigns'
import { generateContexts } from './generateContexts'

// Generate all data once at app init (deterministic via seeded PRNG)
export const consumers = generateConsumers(500, 42)
export const campaigns = generateCampaigns()
export const contexts = generateContexts()

// Re-export constants
export { MOTIVATIONS, MOTIVATION_IDS, MOTIVATION_COUNT } from './motivations'
export { DRIVER_TAGS, DRIVER_TAG_IDS } from './driverTags'
export { AGENT_DOMAINS, AGENT_DOMAIN_IDS } from './agentDomains'
export { SEGMENTS } from './segments'
