import { motion } from 'framer-motion'
import AnimatedNumber from '../shared/AnimatedNumber'

export default function ResonanceGauge({
  value,
  label = 'Resonance',
  color = 'var(--combined-gold)',
  size = 120,
}) {
  const radius = (size - 12) / 2
  const circumference = 2 * Math.PI * radius
  const progress = Math.max(0, Math.min(1, value))
  const strokeDashoffset = circumference * (1 - progress * 0.75) // 270-degree arc

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-135">
          {/* Background arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-brand-surface-2)"
            strokeWidth={6}
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            strokeLinecap="round"
          />
          {/* Value arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={6}
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference * 0.75 }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center" style={{ color }}>
          <AnimatedNumber
            value={value * 100}
            decimals={0}
            suffix="%"
            className="text-xl font-mono font-bold"
          />
        </div>
      </div>
      <span className="text-xs text-text-muted mt-1">{label}</span>
    </div>
  )
}
