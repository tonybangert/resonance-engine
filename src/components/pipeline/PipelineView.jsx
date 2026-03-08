import { Tags, Users, Monitor, Zap, Route, Trophy, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { usePipelineAnimation } from '../../hooks/usePipelineAnimation'
import PipelineStage from './PipelineStage'
import PipelineFlow from './PipelineFlow'
import DriverTagExtraction from './stages/DriverTagExtraction'
import MotivationMatching from './stages/MotivationMatching'
import ContextAmplification from './stages/ContextAmplification'
import ThomsonEnhancement from './stages/ThomsonEnhancement'
import ConductorRouting from './stages/ConductorRouting'
import FinalAttribution from './stages/FinalAttribution'

const STAGE_COLORS = {
  rmt: '#faa840',
  engine: '#ef4537',
  combined: '#f59e0b',
}

const HERO_STAGES = [
  { icon: Tags, label: 'Extract', color: '#faa840' },
  { icon: Users, label: 'Match', color: '#faa840' },
  { icon: Monitor, label: 'Amplify', color: '#faa840' },
  { icon: Zap, label: 'Enhance', color: '#ef4537' },
  { icon: Route, label: 'Route', color: '#ef4537' },
  { icon: Trophy, label: 'Attribute', color: '#f59e0b' },
]

export default function PipelineView({ consumer, campaign, context, scoring }) {
  const animation = usePipelineAnimation(scoring)

  if (!consumer || !campaign || !context) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] md:h-full px-2">
        <div className="text-center max-w-lg space-y-5 md:space-y-8 py-4">
          <div className="space-y-2 md:space-y-3">
            <h2 className="text-xl md:text-3xl font-semibold text-text-primary font-[family-name:var(--font-family-heading)] leading-snug">
              <span className="text-rmt-orange">RMT built 35 years</span> of resonance science.
              <br />
              The <span className="text-engine-red">Resonance Engine</span> multiplies it with agentic AI.
            </h2>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              Select a consumer, campaign, and viewing context to see the dramatic
              difference between RMT science alone and the full Resonance Engine pipeline.
            </p>
          </div>

          {/* Pipeline preview — grid on mobile, inline on desktop */}
          <div className="grid grid-cols-6 gap-0.5 md:flex md:items-center md:justify-center md:gap-1">
            {HERO_STAGES.map((stage, i) => (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-0.5 md:gap-1"
              >
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stage.color}15`, border: `1px solid ${stage.color}30` }}
                  >
                    <stage.icon className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: stage.color }} />
                  </div>
                  <span className="text-[8px] md:text-[10px] text-text-muted">{stage.label}</span>
                </div>
                {i < HERO_STAGES.length - 1 && (
                  <ChevronRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-brand-border-light mb-3 md:mb-4 hidden md:block" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Key metrics preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex justify-center gap-4 md:gap-6 text-center"
          >
            <div>
              <div className="text-base md:text-lg font-mono font-bold text-rmt-orange">14.7x</div>
              <div className="text-[9px] md:text-[10px] text-text-muted">Context Lift</div>
            </div>
            <div className="w-px bg-brand-border" />
            <div>
              <div className="text-base md:text-lg font-mono font-bold text-combined-gold">0.618</div>
              <div className="text-[9px] md:text-[10px] text-text-muted">Phi Blend</div>
            </div>
            <div className="w-px bg-brand-border" />
            <div>
              <div className="text-base md:text-lg font-mono font-bold text-accent-green">R²=.88</div>
              <div className="text-[9px] md:text-[10px] text-text-muted">Combined Accuracy</div>
            </div>
          </motion.div>

          {/* Selection status */}
          <div className="flex justify-center gap-3 text-xs">
            <span className={consumer ? 'text-accent-green' : 'text-text-muted/40'}>
              {consumer ? '● Consumer' : '○ Consumer'}
            </span>
            <span className={campaign ? 'text-accent-green' : 'text-text-muted/40'}>
              {campaign ? '● Campaign' : '○ Campaign'}
            </span>
            <span className={context ? 'text-accent-green' : 'text-text-muted/40'}>
              {context ? '● Context' : '○ Context'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  const rmtContextScore = scoring?.stages.rmtWithContext.score

  const stages = [
    {
      title: 'DriverTag Extraction',
      subtitle: 'Ad creative analyzed for motivation signals',
      icon: Tags,
      color: STAGE_COLORS.rmt,
      score: scoring?.stages.traditional.score,
      detail: <DriverTagExtraction campaign={campaign} />,
    },
    {
      title: 'Motivation Matching',
      subtitle: 'Consumer profile vs ad motivation alignment',
      icon: Users,
      color: STAGE_COLORS.rmt,
      score: scoring?.stages.rmtNoContext.score,
      detail: <MotivationMatching scoring={scoring} />,
    },
    {
      title: 'Context Amplification',
      subtitle: 'Viewing context transforms resonance up to 14.7x',
      icon: Monitor,
      color: STAGE_COLORS.rmt,
      score: scoring?.stages.rmtWithContext.score,
      detail: <ContextAmplification scoring={scoring} context={context} />,
    },
    {
      title: 'Thomson Enhancement',
      subtitle: 'Keyword signals with Fibonacci scaling',
      icon: Zap,
      color: STAGE_COLORS.engine,
      score: scoring?.stages.thomson.fibIntensity,
      detail: <ThomsonEnhancement scoring={scoring} />,
    },
    {
      title: 'Conductor Routing',
      subtitle: 'Three-way match with agent domain optimization',
      icon: Route,
      color: STAGE_COLORS.engine,
      score: scoring?.stages.conductor.conductorScore,
      detail: <ConductorRouting scoring={scoring} />,
    },
    {
      title: 'Combined Attribution',
      subtitle: 'RMT Resonance Engine force multiplier with phi blending',
      icon: Trophy,
      color: STAGE_COLORS.combined,
      score: scoring?.score,
      detail: <FinalAttribution scoring={scoring} />,
    },
  ]

  return (
    <div className="space-y-0 max-w-2xl mx-auto">
      <div className="mb-3 md:mb-4">
        <h2 className="text-base md:text-lg font-semibold text-text-primary font-[family-name:var(--font-family-heading)]">
          Attribution Pipeline
        </h2>
        <p className="text-[11px] md:text-xs text-text-muted truncate">
          {consumer.name} / {campaign.name} / {context.name}
        </p>
      </div>

      {stages.map((stage, index) => (
        <div key={index}>
          {index > 0 && (
            <PipelineFlow
              isActive={animation.isStageVisible(index)}
              color={stage.color}
            />
          )}

          {/* Binary narrative divider: After Stage 3, before Stage 4 */}
          {index === 3 && animation.isStageVisible(3) && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="my-3 relative"
            >
              {/* RMT Science Alone summary */}
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rmt-orange/40 to-rmt-orange/60 hidden md:block" />
                <div className="text-[9px] md:text-[10px] text-rmt-orange font-medium uppercase tracking-wider whitespace-nowrap">
                  RMT Science Alone
                </div>
                <div className="px-1.5 md:px-2 py-0.5 bg-rmt-orange/10 border border-rmt-orange/20 rounded text-[9px] md:text-[10px] font-mono text-rmt-orange-light whitespace-nowrap">
                  {rmtContextScore ? `${(rmtContextScore * 100).toFixed(1)}%` : '—'} · R²~0.677
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-rmt-orange/40 to-rmt-orange/60" />
              </div>

              {/* Agentic AI Enhancement pill */}
              <div className="flex justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    boxShadow: [
                      '0 0 0px rgba(34, 197, 94, 0)',
                      '0 0 20px rgba(34, 197, 94, 0.25)',
                      '0 0 0px rgba(34, 197, 94, 0)',
                    ],
                  }}
                  transition={{
                    scale: { delay: 0.2, duration: 0.4 },
                    opacity: { delay: 0.2, duration: 0.4 },
                    boxShadow: { delay: 0.6, duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="px-3 py-1 bg-accent-green/15 border border-accent-green/30 rounded-full text-xs font-bold text-accent-green flex items-center gap-1.5"
                >
                  <Zap className="w-3 h-3" />
                  + Agentic AI Enhancement
                </motion.div>
              </div>
            </motion.div>
          )}

          <PipelineStage
            index={index}
            title={stage.title}
            subtitle={stage.subtitle}
            icon={stage.icon}
            color={stage.color}
            isActive={animation.isStageActive(index)}
            isCompleted={animation.isStageCompleted(index)}
            isVisible={animation.isStageVisible(index)}
            score={stage.score}
          >
            {stage.detail}
          </PipelineStage>
        </div>
      ))}
    </div>
  )
}
