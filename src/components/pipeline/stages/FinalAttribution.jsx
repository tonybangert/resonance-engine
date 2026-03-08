import { motion } from 'framer-motion'
import ScoreBar from '../../shared/ScoreBar'
import AnimatedNumber from '../../shared/AnimatedNumber'
import { PHI_BLEND } from '../../../engine'

export default function FinalAttribution({ scoring }) {
  if (!scoring) return null

  const rmtCtxScore = scoring.stages.rmtWithContext.score
  const combinedScore = scoring.score
  const improvementPct = rmtCtxScore > 0
    ? ((combinedScore - rmtCtxScore) / rmtCtxScore * 100)
    : 0

  return (
    <div className="space-y-3">
      {/* Before / After side-by-side */}
      <div className="grid grid-cols-2 gap-1.5 md:gap-2">
        {/* Left: RMT Science Alone */}
        <div className="bg-brand-surface-2 rounded-lg p-2 md:p-3 text-center border border-brand-border/50">
          <div className="text-[9px] md:text-[10px] text-rmt-orange uppercase tracking-wider font-medium mb-1">
            RMT Science
          </div>
          <div className="text-lg md:text-xl font-mono font-bold text-rmt-orange-light">
            {(rmtCtxScore * 100).toFixed(1)}%
          </div>
          <div className="text-[9px] md:text-[10px] text-text-muted mt-0.5">R²~0.677</div>
        </div>

        {/* Right: + Agentic AI */}
        <div className="bg-combined-gold/5 rounded-lg p-2 md:p-3 text-center border border-combined-gold/20">
          <div className="text-[9px] md:text-[10px] text-combined-gold uppercase tracking-wider font-medium mb-1">
            + Agentic AI
          </div>
          <div className="text-lg md:text-xl font-mono font-bold text-combined-gold">
            {(combinedScore * 100).toFixed(1)}%
          </div>
          <div className="text-[9px] md:text-[10px] text-text-muted mt-0.5">R²~0.88</div>
        </div>
      </div>

      {/* Animated delta center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex justify-center"
      >
        <div className="px-3 py-1.5 bg-accent-green/10 border border-accent-green/20 rounded-full">
          <span className="text-sm font-mono font-bold text-accent-green">
            +<AnimatedNumber value={improvementPct} decimals={1} suffix="%" duration={800} className="text-accent-green" /> improvement
          </span>
        </div>
      </motion.div>

      {/* Phi blend + signals */}
      <div className="grid grid-cols-2 gap-1.5 md:gap-3">
        <div className="bg-brand-surface-2 rounded-lg p-2 md:p-2.5 text-center">
          <div className="text-[9px] md:text-[10px] text-text-muted uppercase">Phi Blend</div>
          <div className="text-base md:text-lg font-mono text-combined-gold">
            {PHI_BLEND.toFixed(3)}
          </div>
          <div className="text-[9px] md:text-[10px] text-text-muted">RMT weight</div>
        </div>
        <div className="bg-brand-surface-2 rounded-lg p-2 md:p-2.5 text-center">
          <div className="text-[9px] md:text-[10px] text-text-muted uppercase">Signals</div>
          <div className="text-base md:text-lg font-mono text-combined-gold">
            {scoring.signalCount}/6
          </div>
          <div className="text-[9px] md:text-[10px] text-text-muted">active</div>
        </div>
      </div>

      <ScoreBar
        label="Confidence"
        value={scoring.confidence}
        color="var(--combined-gold)"
      />
    </div>
  )
}
