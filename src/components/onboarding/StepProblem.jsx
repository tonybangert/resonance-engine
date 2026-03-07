import { motion } from 'framer-motion'
import AnimatedNumber from '../shared/AnimatedNumber'

const fadeSlideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export default function StepProblem() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full text-center px-5 md:px-8 max-w-3xl mx-auto gap-6 md:gap-10 py-6">
      {/* Overline */}
      <motion.div
        {...fadeSlideUp}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-[10px] md:text-xs text-text-muted uppercase tracking-[0.25em] font-medium"
      >
        The Attribution Problem
      </motion.div>

      {/* Hero headline */}
      <motion.h1
        {...fadeSlideUp}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-2xl md:text-4xl font-[family-name:var(--font-family-heading)] leading-snug"
      >
        <span className="text-text-primary">The ad industry spends $900B a year</span>
        <br />
        <span className="text-text-muted">and can't explain what works.</span>
      </motion.h1>

      {/* Center metric card */}
      <motion.div
        {...fadeSlideUp}
        transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-brand-surface/50 border border-brand-border/50 rounded-2xl px-8 py-6 md:px-12 md:py-8"
      >
        <AnimatedNumber
          value={15.0}
          decimals={1}
          suffix="%"
          duration={1500}
          className="text-5xl md:text-6xl font-mono font-bold text-text-muted/60"
        />
        <div className="mt-2 text-sm text-text-secondary font-medium">
          Industry Standard Attribution
        </div>
        <div className="mt-1 text-[11px] md:text-xs text-text-muted">
          Last-touch accuracy — widely acknowledged as inadequate
        </div>
      </motion.div>

      {/* Body text */}
      <motion.p
        {...fadeSlideUp}
        transition={{ delay: 1.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-sm text-text-secondary leading-relaxed max-w-md"
      >
        For 35 years, RMT has been building something better...
      </motion.p>
    </div>
  )
}
