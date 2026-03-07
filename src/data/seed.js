// Mulberry32 - fast, seedable 32-bit PRNG
function mulberry32(seed) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function createRng(seed = 42) {
  const next = mulberry32(seed)

  return {
    // [0, 1)
    random() {
      return next()
    },
    // [min, max)
    range(min, max) {
      return min + next() * (max - min)
    },
    // Integer [min, max]
    int(min, max) {
      return Math.floor(min + next() * (max - min + 1))
    },
    // Gaussian approximation using Box-Muller
    gaussian(mean = 0, sigma = 1) {
      const u1 = next()
      const u2 = next()
      const z = Math.sqrt(-2 * Math.log(u1 || 0.0001)) * Math.cos(2 * Math.PI * u2)
      return mean + z * sigma
    },
    // Pick random element from array
    pick(arr) {
      return arr[Math.floor(next() * arr.length)]
    },
    // Shuffle array (Fisher-Yates)
    shuffle(arr) {
      const result = [...arr]
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1))
        ;[result[i], result[j]] = [result[j], result[i]]
      }
      return result
    },
    // Pick n random elements from array
    sample(arr, n) {
      return this.shuffle(arr).slice(0, n)
    },
  }
}
