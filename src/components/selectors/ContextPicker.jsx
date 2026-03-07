import { Tv, Newspaper, Trophy, Laugh, Play, Smartphone, Headphones, Sofa } from 'lucide-react'
import Badge from '../shared/Badge'

const ICON_MAP = {
  Tv, Newspaper, Trophy, Laugh, Play, Smartphone, Headphones, Sofa,
}

export default function ContextPicker({ contexts, selected, onSelect }) {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="p-3 border-b border-brand-border shrink-0">
        <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          Viewing Context
        </h3>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
        {contexts.map(ctx => {
          const Icon = ICON_MAP[ctx.icon] || Tv

          return (
            <button
              key={ctx.id}
              onClick={() => onSelect(ctx)}
              className={`w-full flex items-start gap-2 px-3 py-3 md:py-2.5 text-left hover:bg-brand-surface-2 active:bg-brand-surface-2 transition-colors touch-manipulation ${
                selected?.id === ctx.id ? 'bg-rmt-orange/10 border-l-2 border-rmt-orange' : ''
              }`}
            >
              <Icon className="w-4 h-4 text-text-muted mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-sm text-text-primary">{ctx.name}</div>
                <div className="text-[10px] text-text-secondary mt-0.5 leading-relaxed">
                  {ctx.description}
                </div>
                <div className="flex gap-1 mt-1 flex-wrap">
                  <Badge size="xs" variant="blue">
                    {ctx.emotionalProfile.replace(/_/g, ' ')}
                  </Badge>
                  <Badge size="xs" variant="default">
                    {ctx.timeOfDay.replace(/_/g, ' ')}
                  </Badge>
                  <Badge size="xs" variant="green">
                    {Math.round(ctx.attentionLevel * 100)}% attn
                  </Badge>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
