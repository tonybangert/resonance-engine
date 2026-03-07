import Badge from '../../shared/Badge'
import ScoreBar from '../../shared/ScoreBar'

export default function ThomsonEnhancement({ scoring }) {
  if (!scoring) return null

  const { thomson } = scoring.stages

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-text-muted">Keyword alignment:</span>
          <span className="ml-1 text-engine-red font-mono">
            {(thomson.thomsonAlignment * 100).toFixed(1)}%
          </span>
        </div>
        <div>
          <span className="text-text-muted">Fibonacci intensity:</span>
          <span className="ml-1 text-engine-red font-mono">
            {(thomson.fibIntensity * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      <ScoreBar
        label="Thomson Signal Match"
        value={thomson.thomsonAlignment}
        color="var(--engine-red)"
      />
      <ScoreBar
        label="Fibonacci-Scaled Output"
        value={thomson.fibIntensity}
        color="var(--engine-red-light)"
        delay={0.1}
      />

      {thomson.matchedKeywords.length > 0 && (
        <div>
          <div className="text-xs text-text-muted mb-1">Matched keywords:</div>
          <div className="flex flex-wrap gap-1">
            {thomson.matchedKeywords.map(kw => (
              <Badge key={kw} variant="red" size="xs">{kw}</Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
