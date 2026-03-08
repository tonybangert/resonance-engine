import { useState, useCallback, useRef, cloneElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, GitBranch, BarChart3, User, Megaphone, Monitor, Check } from 'lucide-react'
import Header from './Header'

const MOBILE_TABS = [
  { id: 'selectors', label: 'Select', icon: SlidersHorizontal },
  { id: 'pipeline', label: 'Pipeline', icon: GitBranch },
  { id: 'results', label: 'Results', icon: BarChart3 },
]

const SELECTOR_TABS = [
  { id: 'consumer', label: 'Consumer', icon: User },
  { id: 'campaign', label: 'Campaign', icon: Megaphone },
  { id: 'context', label: 'Context', icon: Monitor },
]

const SWIPE_THRESHOLD = 50

export default function AppShell({ sidebar, selectors, children, results }) {
  const [activeTab, setActiveTab] = useState('pipeline')
  const [activeSelectorTab, setActiveSelectorTab] = useState('consumer')
  const touchStartRef = useRef(null)

  // Auto-advance to next selector tab on mobile
  const advanceSelectorTab = useCallback(() => {
    const tabIds = SELECTOR_TABS.map(t => t.id)
    const currentIndex = tabIds.indexOf(activeSelectorTab)
    if (currentIndex < tabIds.length - 1) {
      setActiveSelectorTab(tabIds[currentIndex + 1])
    }
  }, [activeSelectorTab])

  // Navigate to Pipeline tab after final selection
  const goToPipeline = useCallback(() => {
    setActiveTab('pipeline')
  }, [])

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

  // Build selector lookup from array, injecting onAdvance into content elements
  const selectorMap = {}
  if (selectors) {
    selectors.forEach(s => { selectorMap[s.id] = s })
  }

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
        <div className="flex-1 overflow-hidden flex flex-col">
          <AnimatePresence mode="wait" initial={false}>
            {activeTab === 'selectors' && (
              <motion.div
                key="selectors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="bg-brand-surface flex-1 flex flex-col min-h-0"
              >
                {/* Selector sub-tabs */}
                {selectors ? (
                  <>
                    <div className="shrink-0 flex border-b border-brand-border">
                      {SELECTOR_TABS.map((tab) => {
                        const isActive = activeSelectorTab === tab.id
                        const selector = selectorMap[tab.id]
                        const hasSelection = selector?.selected
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveSelectorTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-medium transition-colors cursor-pointer relative touch-manipulation ${
                              isActive
                                ? 'text-rmt-orange'
                                : hasSelection
                                ? 'text-accent-green'
                                : 'text-text-muted'
                            }`}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="selector-tab-indicator"
                                className="absolute bottom-0 left-2 right-2 h-0.5 bg-rmt-orange rounded-full"
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                              />
                            )}
                            {hasSelection && !isActive ? (
                              <Check className="w-3 h-3 text-accent-green" />
                            ) : (
                              <tab.icon className={`w-3.5 h-3.5 ${isActive ? 'text-rmt-orange' : 'text-text-muted'}`} />
                            )}
                            <span className="truncate max-w-[80px]">
                              {hasSelection && !isActive ? selector.selected : tab.label}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                    <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
                      <AnimatePresence mode="wait" initial={false}>
                        {SELECTOR_TABS.map((tab) =>
                          activeSelectorTab === tab.id && selectorMap[tab.id] ? (
                            <motion.div
                              key={tab.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              className="flex flex-col min-h-full"
                            >
                              {cloneElement(selectorMap[tab.id].content, {
                                onAdvance: advanceSelectorTab,
                                ...(tab.id === SELECTOR_TABS[SELECTOR_TABS.length - 1].id && { onComplete: goToPipeline }),
                              })}
                            </motion.div>
                          ) : null
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
                    {sidebar}
                  </div>
                )}
              </motion.div>
            )}
            {activeTab === 'pipeline' && (
              <motion.div
                key="pipeline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="bg-brand-dark p-3 flex-1 overflow-y-auto overscroll-contain"
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
                className="bg-brand-surface flex-1 overflow-y-auto overscroll-contain"
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
