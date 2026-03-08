import { useState, useMemo } from 'react'
import { Search, User, ChevronRight } from 'lucide-react'
import { MOTIVATIONS, MOTIVATION_IDS } from '../../data'
import Badge from '../shared/Badge'

export default function ConsumerPicker({ consumers, selected, onSelect }) {
  const [search, setSearch] = useState('')
  const [expandedSegment, setExpandedSegment] = useState(null)

  // Group consumers by segment
  const segments = useMemo(() => {
    const groups = {}
    consumers.forEach(c => {
      if (!groups[c.segmentId]) {
        groups[c.segmentId] = { label: c.segmentLabel, consumers: [] }
      }
      groups[c.segmentId].consumers.push(c)
    })
    return groups
  }, [consumers])

  // Filter by search
  const filteredSegments = useMemo(() => {
    if (!search) return segments
    const q = search.toLowerCase()
    const result = {}
    Object.entries(segments).forEach(([id, seg]) => {
      const filtered = seg.consumers.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        seg.label.toLowerCase().includes(q)
      )
      if (filtered.length > 0) {
        result[id] = { ...seg, consumers: filtered }
      }
    })
    return result
  }, [segments, search])

  // Top 5 motivations for preview
  function topMotivations(consumer) {
    return MOTIVATION_IDS
      .map((id, i) => ({ id, label: MOTIVATIONS[i].label, value: consumer.motivations[i], color: MOTIVATIONS[i].color }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
  }

  return (
    <div className="border-b border-brand-border flex flex-col flex-1 min-h-0">
      <div className="p-3 border-b border-brand-border shrink-0">
        <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
          Consumer
        </h3>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
          <input
            type="text"
            placeholder="Search 500 consumers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-brand-surface-2 border border-brand-border rounded-lg pl-8 pr-3 py-2 md:py-1.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-rmt-orange/50 touch-manipulation"
          />
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
        {Object.entries(filteredSegments).map(([segId, seg]) => (
          <div key={segId}>
            <button
              onClick={() => setExpandedSegment(expandedSegment === segId ? null : segId)}
              className="w-full flex items-center justify-between px-3 py-2.5 md:py-2 text-xs font-medium text-text-secondary hover:bg-brand-surface-2 active:bg-brand-surface-2 transition-colors touch-manipulation"
            >
              <span>{seg.label} ({seg.consumers.length})</span>
              <ChevronRight
                className={`w-3 h-3 transition-transform ${expandedSegment === segId ? 'rotate-90' : ''}`}
              />
            </button>

            {expandedSegment === segId && seg.consumers.slice(0, 25).map(consumer => {
              const isSelected = selected?.id === consumer.id

              return (
                <button
                  key={consumer.id}
                  onClick={() => onSelect(consumer)}
                  className={`w-full flex items-start gap-2 px-4 py-2.5 md:py-2 text-left hover:bg-brand-surface-2 active:bg-brand-surface-2 transition-colors touch-manipulation ${
                    isSelected ? 'bg-rmt-orange/10 border-l-2 border-rmt-orange' : ''
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-text-muted mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-text-primary truncate">{consumer.name}</div>
                    <div className="text-[10px] text-text-muted">{consumer.id}</div>
                    <div className="space-y-0.5 mt-1">
                      {topMotivations(consumer).map(m => (
                        <div key={m.id} className="flex items-center gap-1.5">
                          <span className="text-[10px] text-text-muted w-16 truncate">{m.label}</span>
                          <div className="flex-1 h-1.5 bg-brand-surface-2 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${m.value}%`, backgroundColor: m.color }}
                            />
                          </div>
                          <span className="text-[10px] text-text-muted font-mono w-6 text-right">{m.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Expanded info card when selected */}
                    {isSelected && (
                      <div className="mt-2 pt-2 border-t border-brand-border/50 space-y-1.5">
                        <div className="flex flex-wrap gap-1">
                          {consumer.driverTags.map(tag => (
                            <Badge key={tag} size="xs" variant="orange">{tag}</Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {consumer.thomsonKeywords.slice(0, 6).map(kw => (
                            <Badge key={kw} size="xs" variant="red">{kw}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
