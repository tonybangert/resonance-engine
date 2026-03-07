import { MOTIVATIONS } from '../../../data'
import ScoreBar from '../../shared/ScoreBar'

export default function ContextAmplification({ scoring, context }) {
  if (!scoring || !context) return null

  const { rmtWithContext } = scoring.stages

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-text-muted">Amplification:</span>
          <span className="ml-1 text-rmt-orange font-mono">
            {rmtWithContext.amplification.toFixed(1)}x
          </span>
        </div>
        <div>
          <span className="text-text-muted">Context alignment:</span>
          <span className="ml-1 text-text-primary font-mono">
            {(rmtWithContext.contextAlignment * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      <ScoreBar
        label="Context Resonance"
        value={rmtWithContext.contextResonance}
        color="var(--rmt-orange)"
      />

      {rmtWithContext.amplifiedMotivations.length > 0 && (
        <div>
          <div className="text-xs text-text-muted mb-1">Top amplified motivations:</div>
          <div className="space-y-1">
            {rmtWithContext.amplifiedMotivations.map(am => (
              <div key={am.index} className="flex justify-between text-xs">
                <span className="text-text-secondary">
                  {MOTIVATIONS[am.index].label}
                </span>
                <span className="text-rmt-orange font-mono">
                  {am.modifier.toFixed(1)}x
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-[10px] text-text-muted">
        R-squared ~ 0.677 (context transforms prediction accuracy)
      </div>
    </div>
  )
}
