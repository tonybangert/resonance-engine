// Golden ratio and Fibonacci utilities for resonance scaling

export const PHI = (1 + Math.sqrt(5)) / 2 // 1.6180339887...
export const PHI_BLEND = PHI / (1 + PHI) // 0.6180339887... (weight for RMT foundation)

// First 12 Fibonacci numbers for scaling
export const FIBONACCI = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
export const FIB_MAX = FIBONACCI[FIBONACCI.length - 1] // 144

// Map a 0-1 value to a Fibonacci index (0-11), return normalized Fibonacci value
export function fibonacciScale(value) {
  const clamped = Math.max(0, Math.min(1, value))
  const index = Math.round(clamped * (FIBONACCI.length - 1))
  return FIBONACCI[index] / FIB_MAX
}

// Linear scale for comparison (shows how Fibonacci amplifies strong signals)
export function linearScale(value) {
  return Math.max(0, Math.min(1, value))
}

// Phi-weighted blend of two values
export function phiBlend(rmtValue, engineValue) {
  return PHI_BLEND * rmtValue + (1 - PHI_BLEND) * engineValue
}

// Clamp value to [0, 1]
export function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value))
}
