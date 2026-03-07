import Badge from '../../shared/Badge'
import ScoreBar from '../../shared/ScoreBar'

export default function MotivationMatching({ scoring }) {
  if (!scoring) return null

  const { rmtNoContext } = scoring.stages

  return (
    <div className="space-y-3">
      <ScoreBar
        label="Cosine Similarity"
        value={rmtNoContext.baseResonance}
        color="var(--rmt-orange)"
      />
      <ScoreBar
        label="Tag Overlap (Jaccard)"
        value={rmtNoContext.tagOverlap}
        color="var(--rmt-orange-light)"
        delay={0.1}
      />
      {rmtNoContext.matchedTags.length > 0 && (
        <div>
          <div className="text-xs text-text-muted mb-1">Matched tags:</div>
          <div className="flex flex-wrap gap-1">
            {rmtNoContext.matchedTags.map(tag => (
              <Badge key={tag} variant="green" size="xs">{tag}</Badge>
            ))}
          </div>
        </div>
      )}
      <div className="text-[10px] text-text-muted">
        R-squared ~ 0.046 (motivation alignment only)
      </div>
    </div>
  )
}
