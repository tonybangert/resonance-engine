import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export default function StepIndicator({ currentStep, totalSteps, onStepClick, onContinue, showContinue = true }) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Continue button (hidden on last screen) */}
      {showContinue && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          onClick={onContinue}
          className="group flex items-center gap-2 px-5 py-2 rounded-full border border-brand-border-light/50 text-text-secondary text-sm hover:border-rmt-orange/50 hover:text-text-primary transition-all duration-300 cursor-pointer"
        >
          Continue
          <motion.span
            className="inline-block"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.span>
        </motion.button>
      )}

      {/* Dot indicators */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <button
            key={i}
            onClick={() => onStepClick(i)}
            className="p-1 cursor-pointer"
            aria-label={`Go to step ${i + 1}`}
          >
            <motion.div
              className="rounded-full"
              animate={{
                width: i === currentStep ? 24 : 8,
                height: 8,
                backgroundColor: i === currentStep ? '#faa840' : '#2a5585',
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
