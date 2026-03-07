import { motion } from 'framer-motion'
import AnimatedNumber from '../shared/AnimatedNumber'

export default function AttributionLift({
  value,
  label = 'Lift',
  color = 'var(--combined-gold)',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-1 p-3 rounded-lg bg-brand-surface-2"
    >
      <span style={{ color }}>
        <AnimatedNumber
          value={value}
          decimals={1}
          suffix="x"
          duration={1000}
          className="text-2xl font-mono font-bold"
        />
      </span>
      <span className="text-[10px] text-text-muted uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  )
}
