import { motion } from 'framer-motion'
import { Tags, Users, Monitor, Zap, Route, Trophy, ChevronRight } from 'lucide-react'
import AnimatedNumber from '../shared/AnimatedNumber'

const PIPELINE_STAGES = [
  { icon: Tags, label: 'Extract', color: '#faa840' },
  { icon: Users, label: 'Match', color: '#faa840' },
  { icon: Monitor, label: 'Amplify', color: '#faa840' },
  { icon: Zap, label: 'Enhance', color: '#ef4537' },
  { icon: Route, label: 'Route', color: '#ef4537' },
  { icon: Trophy, label: 'Attribute', color: '#f59e0b' },
]

const fadeSlideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export default function StepScience() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full text-center px-4 md:px-8 max-w-3xl mx-auto gap-3 md:gap-8 py-4 md:py-6">
      {/* Overline */}
      <motion.div
        {...fadeSlideUp}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-[10px] md:text-xs text-text-muted uppercase tracking-[0.25em] font-medium"
      >
        The 6-Stage Pipeline
      </motion.div>

      {/* Pipeline icon row — compact grid on mobile, inline on desktop */}
      <div className="grid grid-cols-6 gap-0.5 md:flex md:items-center md:justify-center md:gap-1">
        {PIPELINE_STAGES.map((stage, i) => (
          <motion.div
            key={stage.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-0.5 md:gap-1"
          >
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 md:w-11 md:h-11 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${stage.color}15`, border: `1px solid ${stage.color}30` }}
              >
                <stage.icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: stage.color }} />
              </div>
              <span className="text-[9px] md:text-[10px] text-text-muted">{stage.label}</span>
            </div>
            {i < PIPELINE_STAGES.length - 1 && (
              <ChevronRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-brand-border-light mb-4 hidden md:block" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Divider with RMT Science / Agentic AI split */}
      <motion.div
        {...fadeSlideUp}
        transition={{ delay: 1.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg"
      >
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex-1 flex items-center gap-1.5 md:gap-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-rmt-orange/40" />
            <span className="text-[9px] md:text-[10px] text-rmt-orange font-medium uppercase tracking-wider whitespace-nowrap">
              RMT Science
            </span>
          </div>
          <div className="w-px h-4 bg-brand-border" />
          <div className="flex-1 flex items-center gap-1.5 md:gap-2">
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[9px] md:text-[10px] text-accent-green font-bold uppercase tracking-wider whitespace-nowrap"
            >
              Agentic AI
            </motion.span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-accent-green/40" />
          </div>
        </div>
      </motion.div>

      {/* Two metric cards — stacked on mobile, side-by-side on desktop */}
      <motion.div
        {...fadeSlideUp}
        transition={{ delay: 1.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row items-stretch gap-3 md:gap-4 w-full max-w-lg"
      >
        {/* RMT Science card */}
        <div className="flex-1 bg-rmt-orange/5 border border-rmt-orange/20 rounded-xl p-4 md:p-5">
          <div className="text-xs text-text-muted mb-1">35 Years of Research</div>
          <div className="text-2xl md:text-3xl font-mono font-bold text-rmt-orange">
            R²=<AnimatedNumber value={0.677} decimals={3} duration={1200} className="text-rmt-orange" />
          </div>
        </div>

        {/* + improvement pill — horizontal between cards on mobile */}
        <div className="flex items-center justify-center">
          <motion.div
            animate={{
              boxShadow: [
                '0 0 0px rgba(34, 197, 94, 0)',
                '0 0 20px rgba(34, 197, 94, 0.25)',
                '0 0 0px rgba(34, 197, 94, 0)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="px-3 py-1.5 bg-accent-green/10 border border-accent-green/30 rounded-full text-xs font-bold text-accent-green whitespace-nowrap"
          >
            +30%
          </motion.div>
        </div>

        {/* Agentic AI card */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 0px rgba(34, 197, 94, 0)',
              '0 0 25px rgba(34, 197, 94, 0.2)',
              '0 0 0px rgba(34, 197, 94, 0)',
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex-1 bg-accent-green/5 border border-accent-green/20 rounded-xl p-4 md:p-5"
        >
          <div className="text-xs text-text-muted mb-1">+ Agentic AI Enhancement</div>
          <div className="text-2xl md:text-3xl font-mono font-bold text-accent-green">
            R²=<AnimatedNumber value={0.88} decimals={2} duration={1200} className="text-accent-green" />
          </div>
        </motion.div>
      </motion.div>

      {/* Body text */}
      <motion.p
        {...fadeSlideUp}
        transition={{ delay: 1.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-sm text-text-secondary leading-relaxed max-w-md"
      >
        You're about to watch it happen — stage by stage.
      </motion.p>
    </div>
  )
}
