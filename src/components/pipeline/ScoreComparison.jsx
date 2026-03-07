import { motion } from 'framer-motion'
import ScoreBar from '../shared/ScoreBar'
import AnimatedNumber from '../shared/AnimatedNumber'
import MotivationRadar from '../visualizations/MotivationRadar'

export default function ScoreComparison({ scoring, consumer, campaign }) {
  if (!scoring) {
    return (
      <div className="p-5 space-y-6">
        <div className="text-center space-y-2">
          <div className="text-xs text-text-muted uppercase tracking-wider">Attribution Results</div>
          <div className="text-text-muted/40 text-sm">Awaiting selections...</div>
        </div>

        {/* Placeholder skeleton bars */}
        {['Industry Standard', 'RMT Resonance', 'RMT + Context', 'Resonance Engine'].map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 * i }}
            className="space-y-1.5"
          >
            <div className="text-[10px] text-text-muted/40">{label}</div>
            <div className="h-2.5 bg-brand-surface-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-brand-border/30"
                animate={{ width: ['0%', `${20 + i * 15}%`, `${15 + i * 12}%`] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
              />
            </div>
          </motion.div>
        ))}

        <div className="text-center pt-4">
          <div className="text-[10px] text-text-muted/30">
            Select a consumer, campaign, and viewing context
          </div>
        </div>
      </div>
    )
  }

  const { stages, score, confidence, liftOverTraditional } = scoring

  return (
    <div className="p-4 space-y-5">
      {/* Act 1: Industry Standard */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="space-y-2"
      >
        <h4 className="text-[10px] text-text-muted uppercase tracking-wider">
          Act 1 — Industry Standard
        </h4>
        <div className="bg-brand-surface-2/50 rounded-lg p-3">
          <ScoreBar
            label="Traditional (Last-Touch)"
            value={stages.traditional.score}
            color="var(--color-text-muted)"
            size="sm"
          />
          <div className="text-[10px] text-text-muted mt-1 text-right">
            Accuracy: ~15% · <span className="text-text-muted/60">Widely acknowledged as inadequate</span>
          </div>
        </div>
      </motion.div>

      {/* Act 2: RMT Science */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        className="space-y-2"
      >
        <h4 className="text-[10px] text-rmt-orange uppercase tracking-wider font-medium">
          Act 2 — RMT Science
        </h4>
        <div className="bg-rmt-orange/5 border border-rmt-orange/15 rounded-lg p-3 space-y-2">
          <ScoreBar
            label="RMT Resonance"
            value={stages.rmtNoContext.score}
            color="var(--rmt-orange)"
            size="lg"
          />
          <ScoreBar
            label="RMT + Context"
            value={stages.rmtWithContext.score}
            color="var(--rmt-orange-light)"
            size="lg"
            delay={0.15}
          />
          <div className="flex justify-between text-[10px] text-text-muted mt-1">
            <span>35 years of validation</span>
            <span>R² ~ 0.677</span>
          </div>
        </div>
      </motion.div>

      {/* Animated Force Multiplier Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-center"
      >
        <div className="relative">
          <motion.div
            animate={{
              boxShadow: [
                '0 0 0px rgba(34, 197, 94, 0)',
                '0 0 20px rgba(34, 197, 94, 0.25)',
                '0 0 0px rgba(34, 197, 94, 0)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="px-4 py-2 bg-accent-green/10 border border-accent-green/30 rounded-full flex items-center gap-2"
          >
            <span className="text-xs text-text-muted">Force Multiplier</span>
            <AnimatedNumber
              value={liftOverTraditional}
              decimals={1}
              suffix="x"
              duration={1000}
              className="text-lg font-bold text-accent-green font-mono"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Act 3: RMT Resonance Engine */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.5 }}
        className="space-y-2"
      >
        <h4 className="text-[10px] text-combined-gold uppercase tracking-wider font-medium">
          Act 3 — RMT Resonance Engine
        </h4>
        <motion.div
          animate={{
            boxShadow: [
              '0 0 0px rgba(245, 158, 11, 0)',
              '0 0 15px rgba(245, 158, 11, 0.15)',
              '0 0 0px rgba(245, 158, 11, 0)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="bg-combined-gold/5 border border-combined-gold/20 rounded-lg p-4"
        >
          {/* Hero score */}
          <div className="text-center mb-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatedNumber
                value={score * 100}
                decimals={1}
                suffix="%"
                duration={1200}
                className="text-4xl font-bold text-combined-gold font-[family-name:var(--font-family-heading)]"
              />
            </motion.div>
            <div className="text-xs text-text-muted mt-1">
              Confidence: <AnimatedNumber value={confidence * 100} decimals={0} suffix="%" className="text-text-secondary" />
            </div>
          </div>

          <ScoreBar
            label="RMT Resonance Engine"
            value={score}
            color="var(--combined-gold)"
            size="lg"
            delay={2.2}
          />
          <div className="text-[10px] text-text-muted mt-1 text-right">
            R² ~ 0.88
          </div>
        </motion.div>
      </motion.div>

      {/* Lift breakdown */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="grid grid-cols-2 gap-2"
      >
        <div className="bg-brand-surface-2 rounded-lg p-2 text-center">
          <AnimatedNumber
            value={scoring.liftOverRmtAlone}
            decimals={1}
            suffix="x"
            className="text-lg font-mono text-rmt-orange"
          />
          <div className="text-[10px] text-text-muted">vs RMT alone</div>
        </div>
        <div className="bg-brand-surface-2 rounded-lg p-2 text-center">
          <AnimatedNumber
            value={scoring.liftOverRmtContext}
            decimals={1}
            suffix="x"
            className="text-lg font-mono text-rmt-orange-light"
          />
          <div className="text-[10px] text-text-muted">vs RMT + context</div>
        </div>
      </motion.div>

      {/* Motivation radar */}
      {consumer && (
        <div className="space-y-2">
          <h4 className="text-xs text-text-muted uppercase tracking-wider">
            Motivation Profile
          </h4>
          <MotivationRadar
            consumer={consumer}
            campaign={campaign}
            height={220}
          />
        </div>
      )}
    </div>
  )
}
