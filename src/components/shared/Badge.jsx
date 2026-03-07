export default function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
}) {
  const variants = {
    default: 'bg-brand-surface-2 text-text-secondary border-brand-border',
    orange: 'bg-rmt-orange/15 text-rmt-orange-light border-rmt-orange/30',
    red: 'bg-engine-red/15 text-engine-red-light border-engine-red/30',
    gold: 'bg-combined-gold/15 text-combined-gold-light border-combined-gold/30',
    green: 'bg-accent-green/15 text-accent-green border-accent-green/30',
    blue: 'bg-accent-blue/15 text-accent-blue border-accent-blue/30',
    purple: 'bg-accent-purple/15 text-accent-purple border-accent-purple/30',
  }

  const sizes = {
    xs: 'text-[10px] px-1.5 py-0.5',
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  )
}
