import { Megaphone } from 'lucide-react'
import Badge from '../shared/Badge'

export default function CampaignPicker({ campaigns, selected, onSelect, onAdvance }) {
  return (
    <div className="border-b border-brand-border flex flex-col flex-1 min-h-0">
      <div className="p-3 border-b border-brand-border shrink-0">
        <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          Campaign
        </h3>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
        {campaigns.map(campaign => (
          <button
            key={campaign.id}
            onClick={() => onSelect(campaign)}
            className={`w-full flex items-start gap-2 px-3 py-3 md:py-2.5 text-left hover:bg-brand-surface-2 active:bg-brand-surface-2 transition-colors touch-manipulation ${
              selected?.id === campaign.id ? 'bg-rmt-orange/10 border-l-2 border-rmt-orange' : ''
            }`}
          >
            <div
              className="w-2 h-2 rounded-full mt-1.5 shrink-0"
              style={{ backgroundColor: campaign.color }}
            />
            <div className="min-w-0 flex-1">
              <div className="text-sm text-text-primary truncate">{campaign.name}</div>
              <div className="text-[10px] text-text-muted">{campaign.vertical} — {campaign.brand}</div>
              <div className="text-[10px] text-text-secondary mt-0.5 line-clamp-2 leading-relaxed">
                {campaign.description}
              </div>
              <div className="flex gap-1 mt-1.5 flex-wrap">
                {campaign.driverTags.map(tag => (
                  <Badge key={tag} size="xs" variant="orange">{tag}</Badge>
                ))}
              </div>
              <div className="flex gap-1 mt-1 flex-wrap">
                {campaign.thomsonSignals.map(sig => (
                  <Badge key={sig} size="xs" variant="red">{sig}</Badge>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Mobile: Next button */}
      {onAdvance && selected && (
        <div className="shrink-0 p-3 border-t border-brand-border md:hidden">
          <button
            onClick={onAdvance}
            className="w-full py-2.5 bg-rmt-orange text-white text-sm font-semibold rounded-lg active:scale-[0.98] transition-transform touch-manipulation"
          >
            Next: Context
          </button>
        </div>
      )}
    </div>
  )
}
