import Header from './Header'

export default function AppShell({ sidebar, children, results }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel - selectors */}
        <aside className="w-[320px] border-r border-brand-border bg-brand-surface shrink-0 flex flex-col overflow-hidden">
          {sidebar}
        </aside>

        {/* Center - pipeline stages */}
        <main className="flex-1 overflow-y-auto bg-brand-dark p-6">
          {children}
        </main>

        {/* Right panel - results */}
        <aside className="w-[380px] border-l border-brand-border bg-brand-surface overflow-y-auto shrink-0">
          {results}
        </aside>
      </div>
    </div>
  )
}
