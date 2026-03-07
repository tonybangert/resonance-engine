import { AGENT_DOMAINS } from '../../../data'
import ScoreBar from '../../shared/ScoreBar'
import Badge from '../../shared/Badge'

export default function ConductorRouting({ scoring }) {
  if (!scoring) return null

  const { conductor } = scoring.stages

  const bestDomainInfo = AGENT_DOMAINS.find(d => d.id === conductor.bestDomain.domainId)

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-1.5 md:gap-2 text-[11px] md:text-xs">
        <div>
          <span className="text-text-muted">Q×U:</span>
          <span className="ml-0.5 md:ml-1 text-engine-red font-mono">40%</span>
        </div>
        <div>
          <span className="text-text-muted">U×C:</span>
          <span className="ml-0.5 md:ml-1 text-engine-red font-mono">35%</span>
        </div>
        <div>
          <span className="text-text-muted">Domain:</span>
          <span className="ml-0.5 md:ml-1 text-engine-red font-mono">25%</span>
        </div>
      </div>

      <ScoreBar
        label="Conductor Score"
        value={conductor.conductorScore}
        color="var(--engine-red)"
      />
      <ScoreBar
        label="Agent Domain Fit"
        value={conductor.agentDomainFit}
        color="var(--engine-red-light)"
        delay={0.1}
      />

      {bestDomainInfo && (
        <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
          <div className="text-[11px] md:text-xs text-text-muted">Best domain:</div>
          <Badge variant="red" size="sm">
            {bestDomainInfo.label}
          </Badge>
          <span className="text-xs text-text-muted font-mono">
            ({(conductor.bestDomain.affinity * 100).toFixed(0)}%)
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-text-muted">Time mod:</span>
          <span className="ml-1 text-text-primary font-mono">
            {conductor.timeModifier.toFixed(2)}x
          </span>
        </div>
        <div>
          <span className="text-text-muted">Cultural mod:</span>
          <span className="ml-1 text-text-primary font-mono">
            {conductor.culturalMod.toFixed(2)}x
          </span>
        </div>
      </div>
    </div>
  )
}
