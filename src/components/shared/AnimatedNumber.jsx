import { useEffect, useRef, useState } from 'react'

export default function AnimatedNumber({
  value,
  duration = 800,
  decimals = 2,
  prefix = '',
  suffix = '',
  className = '',
}) {
  const [display, setDisplay] = useState(0)
  const frameRef = useRef(null)
  const startRef = useRef(null)
  const fromRef = useRef(0)

  useEffect(() => {
    fromRef.current = display
    startRef.current = null

    if (frameRef.current) cancelAnimationFrame(frameRef.current)

    function animate(timestamp) {
      if (!startRef.current) startRef.current = timestamp
      const progress = Math.min((timestamp - startRef.current) / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = fromRef.current + (value - fromRef.current) * eased
      setDisplay(current)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [value, duration])

  return (
    <span className={className}>
      {prefix}{display.toFixed(decimals)}{suffix}
    </span>
  )
}
