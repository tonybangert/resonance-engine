import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, GitBranch, BarChart3 } from 'lucide-react'
import Header from './Header'

const MOBILE_TABS = [
  { id: 'selectors', label: 'Select', icon: SlidersHorizontal },
  { id: 'pipeline', label: 'Pipeline', icon: GitBranch },
  { id: 'results', label: 'Results', icon: BarChart3 },
]

const SWIPE_THRESHOLD = 50

export default function AppShell({ sidebar, children, results }) {
  const [activeTab, setActiveTab] = useState('pipeline')
  const touchStartRef = useRef(null)

  // Swipe between tabs on mobile
  const handleTouchStart = useCallback((e) => {
    touchStartRef.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback((e) => {
    if (touchStartRef.current === null) return
    const diff = touchStartRef.current - e.changedTouches[0].clientX
    touchStartRef.current = null
    if (Math.abs(diff) < SWIPE_THRESHOLD) return

    const tabIds = MOBILE_TABS.map(t => t.id)
    const currentIndex = tabIds.indexOf(activeTab)

    if (diff > 0 && currentIndex < tabIds.length - 1) {
      setActiveTab(tabIds[currentIndex + 1])
    } else if (diff < 0 && currentIndex > 0) {
      setActiveTab(tabIds[currentIndex - 1])
    }
  }, [activeTab])

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden">
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

      {/* Mobile: single panel with tab bar + swipe */}
      <div
        className="flex md:hidden flex-1 flex-col overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <AnimatePresence mode="wait" initial={false}>
            {activeTab === 'selectors' && (
              <motion.div
                key="selectors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="bg-brand-surface min-h-full flex flex-col"
              >
                {sidebar}
              </motion.div>
            )}
            {activeTab === 'pipeline' && (
              <motion.div
                key="pipeline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="bg-brand-dark p-3"
              >
                {children}
              </motion.div>
            )}
            {activeTab === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="bg-brand-surface"
              >
                {results}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom tab bar with safe area */}
        <nav className="shrink-0 bg-brand-surface border-t border-brand-border flex pb-[env(safe-area-inset-bottom)]">
          {MOBILE_TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-0.5 py-3 text-[10px] font-medium transition-colors cursor-pointer active:scale-95 relative ${
                  isActive
                    ? 'text-rmt-orange'
                    : 'text-text-muted'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-rmt-orange rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
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
