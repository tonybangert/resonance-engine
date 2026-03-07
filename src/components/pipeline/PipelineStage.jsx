import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function PipelineStage({
  index,
  title,
  subtitle,
  icon: Icon,
  color,
  isActive,
  isCompleted,
  isVisible,
  children,
  score,
}) {
  const [expanded, setExpanded] = useState(true)

  if (!isVisible) {
    return (
      <div className="rounded-lg border border-brand-border/30 bg-brand-surface/30 p-5 opacity-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-surface-2 flex items-center justify-center">
            <span className="text-xs text-text-muted font-mono">{index + 1}</span>
          </div>
          <div>
            <div className="text-sm text-text-muted">{title}</div>
            <div className="text-xs text-text-muted/60">{subtitle}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        boxShadow: isActive
          ? `0 0 20px ${color}30, 0 0 40px ${color}10`
          : 'none',
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-lg border p-5 transition-colors cursor-pointer ${
        isActive
          ? 'border-opacity-60 bg-brand-surface'
          : isCompleted
          ? 'border-brand-border bg-brand-surface'
          : 'border-brand-border/50 bg-brand-surface/50'
      }`}
      style={{
        borderColor: isActive || isCompleted ? `${color}60` : undefined,
      }}
      onClick={() => isCompleted && setExpanded(!expanded)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: isActive || isCompleted ? `${color}20` : 'var(--color-brand-surface-2)',
            }}
          >
            {Icon ? (
              <Icon
                className="w-4 h-4"
                style={{ color: isActive || isCompleted ? color : 'var(--color-text-muted)' }}
              />
            ) : (
              <span
                className="text-xs font-mono"
                style={{ color: isActive || isCompleted ? color : 'var(--color-text-muted)' }}
              >
                {index + 1}
              </span>
            )}
          </div>
          <div>
            <div
              className="text-sm font-medium"
              style={{ color: isActive || isCompleted ? color : 'var(--color-text-secondary)' }}
            >
              {title}
            </div>
            <div className="text-xs text-text-muted">{subtitle}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isCompleted && score !== undefined && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-2.5 py-1 rounded-lg text-xl font-mono font-bold tabular-nums"
              style={{ color, backgroundColor: `${color}15` }}
            >
              {(score * 100).toFixed(1)}%
            </motion.div>
          )}
          {isCompleted && children && (
            <ChevronDown
              className={`w-4 h-4 text-text-muted transition-transform ${expanded ? 'rotate-180' : ''}`}
            />
          )}
        </div>
      </div>

      {/* Active animation indicator */}
      {isActive && (
        <motion.div
          className="mt-3 h-0.5 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      )}

      {/* Expanded detail */}
      <AnimatePresence>
        {expanded && children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 pt-3 border-t border-brand-border/50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
