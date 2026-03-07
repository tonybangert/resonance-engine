import { useState, useEffect, useCallback, useRef } from 'react'

const STAGE_COUNT = 6
const STAGE_DELAY = 300 // ms between each stage activation

// Sequenced stage-by-stage animation state
export function usePipelineAnimation(scoring) {
  const [activeStage, setActiveStage] = useState(-1)
  const [completedStages, setCompletedStages] = useState(new Set())
  const [isRunning, setIsRunning] = useState(false)
  const timeoutRefs = useRef([])

  const clearTimeouts = useCallback(() => {
    timeoutRefs.current.forEach(clearTimeout)
    timeoutRefs.current = []
  }, [])

  const runPipeline = useCallback(() => {
    clearTimeouts()
    setActiveStage(-1)
    setCompletedStages(new Set())
    setIsRunning(true)

    for (let i = 0; i < STAGE_COUNT; i++) {
      const timeout = setTimeout(() => {
        setActiveStage(i)
        setCompletedStages(prev => {
          const next = new Set(prev)
          if (i > 0) next.add(i - 1)
          return next
        })

        // Mark last stage as completed
        if (i === STAGE_COUNT - 1) {
          const finalTimeout = setTimeout(() => {
            setCompletedStages(prev => {
              const next = new Set(prev)
              next.add(i)
              return next
            })
            setIsRunning(false)
          }, STAGE_DELAY)
          timeoutRefs.current.push(finalTimeout)
        }
      }, (i + 1) * STAGE_DELAY)
      timeoutRefs.current.push(timeout)
    }
  }, [clearTimeouts])

  // Re-run pipeline when scoring changes
  useEffect(() => {
    if (scoring) {
      runPipeline()
    } else {
      clearTimeouts()
      setActiveStage(-1)
      setCompletedStages(new Set())
      setIsRunning(false)
    }

    return clearTimeouts
  }, [scoring, runPipeline, clearTimeouts])

  return {
    activeStage,
    completedStages,
    isRunning,
    isStageActive: (index) => activeStage === index,
    isStageCompleted: (index) => completedStages.has(index),
    isStageVisible: (index) => activeStage >= index,
  }
}
