import { Activity } from 'lucide-react'

export default function Header() {
  return (
    <header className="h-16 border-b border-brand-border bg-brand-surface flex items-center px-6 shrink-0">
      <div className="flex items-center gap-3">
        <Activity className="w-6 h-6 text-rmt-orange" />
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            <span className="text-rmt-orange">RMT</span>
            <span className="text-combined-gold mx-1.5">Resonance Engine</span>
          </h1>
          <span className="text-[10px] text-text-muted tracking-wide">
            powered by <span className="text-engine-red">Aplora.ai</span>
          </span>
        </div>
      </div>
      <div className="ml-6 pl-6 border-l border-brand-border">
        <span className="text-sm text-text-secondary tracking-wide uppercase">
          Attribution Pipeline
        </span>
      </div>
    </header>
  )
}
