import { motion } from 'framer-motion'

// Connecting visual between pipeline stages
export default function PipelineFlow({ isActive, color }) {
  return (
    <div className="flex items-center justify-center py-1 px-4">
      <div className="w-0.5 h-8 bg-brand-border/30 relative overflow-hidden rounded-full">
        {isActive && (
          <motion.div
            className="w-full rounded-full absolute top-0"
            style={{ backgroundColor: color }}
            initial={{ height: '0%' }}
            animate={{ height: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        )}
      </div>
    </div>
  )
}
