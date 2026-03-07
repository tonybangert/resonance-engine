import { useState } from 'react'
import { SlidersHorizontal, GitBranch, BarChart3 } from 'lucide-react'
import Header from './Header'

const MOBILE_TABS = [
  { id: 'selectors', label: 'Select', icon: SlidersHorizontal },
  { id: 'pipeline', label: 'Pipeline', icon: GitBranch },
  { id: 'results', label: 'Results', icon: BarChart3 },
]

export default function AppShell({ sidebar, children, results }) {
  const [activeTab, setActiveTab] = useState('pipeline')

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />

      {/* Desktop: 3-panel layout */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        <aside className="w-[320px] border-r border-brand-border bg-brand-surface shrink-0 flex flex-col overflow-hidden">
          {sidebar}
        </aside>
        <main className="flex-1 overflow-y-auto bg-brand-dark p-6">
          {children}
        </main>
        <aside className="w-[380px] border-l border-brand-border bg-brand-surface overflow-y-auto shrink-0">
          {results}
        </aside>
      </div>

      {/* Mobile: single panel with tab bar */}
      <div className="flex md:hidden flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'selectors' && (
            <div className="bg-brand-surface h-full flex flex-col">
              {sidebar}
            </div>
          )}
          {activeTab === 'pipeline' && (
            <div className="bg-brand-dark p-4">
              {children}
            </div>
          )}
          {activeTab === 'results' && (
            <div className="bg-brand-surface">
              {results}
            </div>
          )}
        </div>

        {/* Bottom tab bar */}
        <nav className="shrink-0 bg-brand-surface border-t border-brand-border flex">
          {MOBILE_TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'text-rmt-orange'
                    : 'text-text-muted'
                }`}
              >
                <tab.icon className={`w-5 h-5 ${isActive ? 'text-rmt-orange' : 'text-text-muted'}`} />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
