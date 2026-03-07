import { createRng } from './seed'
import { MOTIVATION_IDS } from './motivations'
import { DRIVER_TAGS } from './driverTags'
import { AGENT_DOMAINS } from './agentDomains'
import { SEGMENTS } from './segments'

const FIRST_NAMES = [
  // Western female
  'Emma', 'Olivia', 'Sophia', 'Isabella', 'Charlotte', 'Amelia', 'Mia', 'Evelyn',
  'Abigail', 'Harper', 'Ella', 'Grace', 'Victoria', 'Lily', 'Natalie', 'Hannah',
  'Zoe', 'Stella', 'Penelope', 'Leah', 'Savannah', 'Audrey', 'Claire', 'Lucy',
  'Nora', 'Hazel', 'Violet', 'Aurora', 'Ellie', 'Maya',
  // Western male
  'James', 'William', 'Benjamin', 'Lucas', 'Henry', 'Alexander', 'Daniel', 'Matthew',
  'Sebastian', 'Jack', 'Owen', 'Ethan', 'Ryan', 'Nathan', 'Caleb', 'Isaac',
  'Thomas', 'Andrew', 'Joshua', 'Dylan', 'Leo', 'Levi', 'Adam', 'Aaron',
  'Marcus', 'Julian', 'Miles', 'Eli', 'Grant', 'Cole',
  // East Asian
  'Wei', 'Jing', 'Yuki', 'Hana', 'Min-jun', 'Seo-yeon', 'Haruto', 'Sakura',
  'Mei', 'Kai', 'Ren', 'Aiko', 'Jia', 'Hiro', 'Lin', 'Suki',
  // South Asian
  'Priya', 'Arjun', 'Ananya', 'Rohan', 'Kavya', 'Aditya', 'Neha', 'Vikram',
  'Divya', 'Kiran', 'Ravi', 'Meera', 'Aarav', 'Pooja', 'Nikhil', 'Shreya',
  // Latin / Hispanic
  'Sofia', 'Diego', 'Valentina', 'Mateo', 'Camila', 'Santiago', 'Luna', 'Emilio',
  'Isabella', 'Alejandro', 'Gabriela', 'Carlos', 'Lucia', 'Rafael', 'Elena', 'Marco',
  // African / African diaspora
  'Amara', 'Kofi', 'Zara', 'Kwame', 'Nia', 'Jamal', 'Imani', 'Darius',
  'Aaliyah', 'Malik', 'Aisha', 'Jelani', 'Fatima', 'Tariq', 'Zahara', 'Omari',
  // Middle Eastern
  'Layla', 'Omar', 'Yasmin', 'Hassan', 'Nadia', 'Khalil', 'Sana', 'Rami',
  // Gender-neutral
  'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Quinn', 'Avery',
  'Cameron', 'Dakota', 'Sage', 'Rowan', 'River', 'Reese', 'Finley', 'Blake',
]

const LAST_NAMES = [
  // Anglo
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Davis', 'Miller', 'Wilson',
  'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin',
  'Thompson', 'Clark', 'Lewis', 'Walker', 'Hall', 'Allen', 'Young', 'King',
  'Wright', 'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Nelson', 'Carter',
  'Mitchell', 'Campbell', 'Roberts', 'Turner', 'Phillips', 'Evans', 'Collins', 'Stewart',
  // Hispanic
  'Garcia', 'Rodriguez', 'Martinez', 'Lopez', 'Hernandez', 'Gonzalez', 'Rivera', 'Perez',
  'Torres', 'Ramirez', 'Flores', 'Sanchez', 'Morales', 'Reyes', 'Cruz', 'Mendoza',
  // East Asian
  'Chen', 'Wang', 'Li', 'Zhang', 'Liu', 'Kim', 'Park', 'Tanaka',
  'Yamamoto', 'Nakamura', 'Watanabe', 'Suzuki', 'Nguyen', 'Tran', 'Le', 'Pham',
  // South Asian
  'Patel', 'Singh', 'Kumar', 'Shah', 'Gupta', 'Sharma', 'Reddy', 'Verma',
  'Rao', 'Mehta', 'Chopra', 'Malhotra', 'Das', 'Bhat', 'Iyer', 'Nair',
  // African / African diaspora
  'Okafor', 'Mensah', 'Diallo', 'Abubakar', 'Osei', 'Toure', 'Sow', 'Nkomo',
  'Abdi', 'Ibrahim', 'Washington', 'Freeman', 'Hayes', 'Brooks', 'Powell', 'James',
  // Middle Eastern
  'Al-Rashid', 'Haddad', 'Khoury', 'Mansour', 'Farid', 'Sabbagh', 'Nazari', 'Karimi',
]

const FALLBACK_KEYWORDS = [
  'premium quality', 'clinically proven', 'next-generation', 'science-backed',
  'award-winning', 'results-driven', 'customer-first', 'cutting-edge',
  'industry-leading', 'eco-conscious', 'data-informed', 'personalized experience',
  'trusted brand', 'limited edition', 'expert-approved',
]

function deriveDriverTags(motivations, segment, rng) {
  // Get tags that match top motivations
  const sortedMotivations = MOTIVATION_IDS
    .map((id, i) => ({ id, score: motivations[i] }))
    .sort((a, b) => b.score - a.score)

  const topMotivations = sortedMotivations.slice(0, 5).map(m => m.id)

  const relevantTags = DRIVER_TAGS.filter(tag =>
    tag.motivations.some(m => topMotivations.includes(m))
  )

  // Blend segment typical tags with motivation-derived tags
  const tagSet = new Set(segment.typicalTags)
  const shuffled = rng.shuffle(relevantTags)
  for (const tag of shuffled) {
    if (tagSet.size >= 8) break
    tagSet.add(tag.id)
  }

  return [...tagSet]
}

function deriveThomsonKeywords(segment, motivations, rng) {
  // Start with segment keywords (now multi-word phrases), add some variation
  const base = [...segment.thomsonKeywords]
  const extras = rng.sample(FALLBACK_KEYWORDS.filter(k => !base.includes(k)), rng.int(2, 4))
  return [...base, ...extras]
}

function deriveAgentDomainAffinities(motivations, rng) {
  return AGENT_DOMAINS.map(domain => {
    const affinityMotivations = domain.motivationAffinities
    const avgAffinity = affinityMotivations.reduce((sum, motId) => {
      const idx = MOTIVATION_IDS.indexOf(motId)
      return sum + (motivations[idx] || 0)
    }, 0) / affinityMotivations.length

    // Normalize to 0-1 range with some noise
    return {
      domainId: domain.id,
      affinity: Math.min(1, Math.max(0, (avgAffinity / 100) + rng.gaussian(0, 0.05))),
    }
  })
}

export function generateConsumers(count = 500, seed = 42) {
  const rng = createRng(seed)
  const consumers = []
  const usedNames = new Set()

  for (let i = 0; i < count; i++) {
    const segment = SEGMENTS[i % SEGMENTS.length]

    // Generate individual motivation profile with gaussian noise around segment center
    const motivations = MOTIVATION_IDS.map(motId => {
      const base = segment.motivationWeights[motId] || 20
      const noisy = base + rng.gaussian(0, 15)
      return Math.min(100, Math.max(0, Math.round(noisy)))
    })

    // Pick unique name combination
    let firstName, lastName, fullName
    let attempts = 0
    do {
      firstName = rng.pick(FIRST_NAMES)
      lastName = rng.pick(LAST_NAMES)
      fullName = `${firstName} ${lastName}`
      attempts++
    } while (usedNames.has(fullName) && attempts < 20)
    usedNames.add(fullName)

    const driverTags = deriveDriverTags(motivations, segment, rng)
    const thomsonKeywords = deriveThomsonKeywords(segment, motivations, rng)
    const agentDomainAffinities = deriveAgentDomainAffinities(motivations, rng)

    consumers.push({
      id: `c-${String(i + 1).padStart(3, '0')}`,
      name: fullName,
      segmentId: segment.id,
      segmentLabel: segment.label,
      motivations, // Array of 15 values 0-100
      driverTags,
      thomsonKeywords,
      agentDomainAffinities,
    })
  }

  return consumers
}
