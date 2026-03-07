import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StepProblem from './StepProblem'
import StepScience from './StepScience'
import StepLaunch from './StepLaunch'
import StepIndicator from './StepIndicator'

const TOTAL_STEPS = 3

export default function OnboardingFlow({ onComplete }) {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = useCallback((newStep) => {
    if (newStep < 0 || newStep >= TOTAL_STEPS) return
    setDirection(newStep > step ? 1 : -1)
    setStep(newStep)
  }, [step])

  const advance = useCallback(() => {
    if (step < TOTAL_STEPS - 1) {
      setDirection(1)
      setStep(s => s + 1)
    }
  }, [step])

  const goBack = useCallback(() => {
    if (step > 0) {
      setDirection(-1)
      setStep(s => s - 1)
    }
  }, [step])

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (step < TOTAL_STEPS - 1) advance()
      } else if (e.key === 'ArrowLeft') {
        goBack()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [step, advance, goBack])

  const handleLaunch = useCallback(() => {
    onComplete()
  }, [onComplete])

  const handleSkip = useCallback(() => {
    onComplete()
  }, [onComplete])

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: '#102d50' }}
    >
      {/* Skip link */}
      <div className="absolute top-5 right-6 z-10">
        <button
          onClick={handleSkip}
          className="text-xs text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
        >
          Skip to Dashboard →
        </button>
      </div>

      {/* Screen content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {step === 0 && <StepProblem />}
            {step === 1 && <StepScience />}
            {step === 2 && <StepLaunch onLaunch={handleLaunch} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="pb-8 pt-4">
        <StepIndicator
          currentStep={step}
          totalSteps={TOTAL_STEPS}
          onStepClick={goTo}
          onContinue={advance}
          showContinue={step < TOTAL_STEPS - 1}
        />
      </div>
    </motion.div>
  )
}
