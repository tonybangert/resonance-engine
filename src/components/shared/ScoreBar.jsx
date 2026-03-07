import { motion } from 'framer-motion'

export default function ScoreBar({
  label,
  value,
  maxValue = 1,
  color = 'var(--rmt-orange)',
  delay = 0,
  showPercent = true,
  size = 'sm',
  className = '',
}) {
  const percent = (value / maxValue) * 100
  const barHeight = size === 'lg' ? 'h-3.5' : 'h-2'

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex justify-between items-center text-xs">
        <span className="text-text-secondary">{label}</span>
        {showPercent && (
          <span className="text-text-primary font-medium tabular-nums">
            {(value * 100).toFixed(1)}%
          </span>
        )}
      </div>
      <div className={`${barHeight} bg-brand-surface-2 rounded-full overflow-hidden`}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percent, 100)}%` }}
          transition={{
            duration: 0.8,
            delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </div>
    </div>
  )
}
