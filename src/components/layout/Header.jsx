import { Activity } from 'lucide-react'

export default function Header() {
  return (
    <header className="h-11 md:h-16 border-b border-brand-border bg-brand-surface flex items-center px-3 md:px-6 shrink-0 pt-[env(safe-area-inset-top)]">
      <div className="flex items-center gap-2 md:gap-3">
        <Activity className="w-4 h-4 md:w-6 md:h-6 text-rmt-orange shrink-0" />
        <div className="min-w-0">
          <h1 className="text-sm md:text-xl font-semibold tracking-tight truncate">
            <span className="text-rmt-orange">RMT</span>
            <span className="text-combined-gold mx-1 md:mx-1.5">Resonance Engine</span>
          </h1>
          <span className="text-[8px] md:text-[10px] text-text-muted tracking-wide hidden sm:inline">
            powered by <span className="text-engine-red">Aplora.ai</span>
          </span>
        </div>
      </div>
      <div className="ml-6 pl-6 border-l border-brand-border hidden md:block">
        <span className="text-sm text-text-secondary tracking-wide uppercase">
          Attribution Pipeline
        </span>
      </div>
    </header>
  )
}
