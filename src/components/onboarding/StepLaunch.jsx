import { motion } from 'framer-motion'
import { User, Megaphone, Monitor, ArrowRight, ChevronRight, Trophy } from 'lucide-react'

const fadeSlideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const PREVIEW_CARDS = [
  {
    icon: User,
    title: 'Consumer',
    stats: '500 Consumers · 10 Segments · 15 Motivations',
    color: '#faa840',
  },
  {
    icon: Megaphone,
    title: 'Campaign',
    stats: '12 Ad Campaigns · Across 12 Verticals',
    color: '#ef4537',
  },
  {
    icon: Monitor,
    title: 'Context',
    stats: '8 Viewing Contexts · Up to 14.7x Amplification',
    color: '#f59e0b',
  },
]

export default function StepLaunch({ onLaunch }) {
  // TODO(human): Implement handleLaunchClick — animate the button
  // (scale up + intensify gold glow for ~200ms) before calling onLaunch().
  // Consider using framer-motion's useAnimate hook or a simple setTimeout.
  const handleLaunchClick = () => {
    onLaunch()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full text-center px-4 md:px-8 max-w-3xl mx-auto gap-3 md:gap-8 py-4 md:py-6">
      {/* Overline */}
      <motion.div
        {...fadeSlideUp}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-[10px] md:text-xs text-text-muted uppercase tracking-[0.25em] font-medium"
      >
        Your Attribution Pipeline
      </motion.div>

      {/* Headline with staggered words */}
      <div className="flex items-center justify-center gap-2 md:gap-3 text-xl md:text-4xl font-[family-name:var(--font-family-heading)] font-semibold">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-rmt-orange"
        >
          Select.
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-engine-red"
        >
          Analyze.
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-combined-gold"
        >
          Attribute.
        </motion.span>
      </div>

      {/* Three preview cards */}
      <motion.div
        {...fadeSlideUp}
        transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-2xl"
      >
        {PREVIEW_CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 + i * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-brand-surface/50 border border-brand-border/50 rounded-xl p-3 md:p-4 text-left"
          >
            <div className="flex items-center gap-2 mb-1 md:mb-2">
              <div
                className="w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${card.color}15`, border: `1px solid ${card.color}30` }}
              >
                <card.icon className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: card.color }} />
              </div>
              <span className="text-sm font-medium text-text-primary">{card.title}</span>
            </div>
            <p className="text-[11px] text-text-muted leading-relaxed">{card.stats}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Flow diagram — stacked on mobile, inline on desktop */}
      <motion.div
        {...fadeSlideUp}
        transition={{ delay: 1.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2 text-xs text-text-muted"
      >
        <span className="px-2 py-1 bg-brand-surface-2/60 rounded text-text-secondary text-[11px] md:text-xs">
          Consumer + Campaign + Context
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-brand-border-light rotate-90 md:rotate-0" />
        <span className="px-2 py-1 bg-brand-surface-2/60 rounded text-text-secondary text-[11px] md:text-xs">
          6-Stage Pipeline
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-brand-border-light rotate-90 md:rotate-0" />
        <span className="px-2 py-1 bg-combined-gold/10 border border-combined-gold/20 rounded text-combined-gold text-[11px] md:text-xs">
          Resonance Score
        </span>
      </motion.div>

      {/* Launch CTA */}
      <motion.div
        {...fadeSlideUp}
        transition={{ delay: 1.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* Pulsing ring beacon */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 0px rgba(250, 168, 64, 0)',
              '0 0 30px rgba(250, 168, 64, 0.3)',
              '0 0 0px rgba(250, 168, 64, 0)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-full"
        >
          <motion.button
            onClick={handleLaunchClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 md:px-8 md:py-3.5 rounded-full text-sm md:text-base font-semibold text-brand-dark cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #faa840, #f59e0b)',
            }}
          >
            <span className="flex items-center gap-2">
              Launch the Pipeline
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Subtext */}
      <motion.p
        {...fadeSlideUp}
        transition={{ delay: 2.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-[11px] text-text-muted/60"
      >
        Default selections applied — you can change everything
      </motion.p>
    </div>
  )
}
