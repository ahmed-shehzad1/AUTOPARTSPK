import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

// Counts up from 0 to the numeric part of `value` (e.g. "27,000+") once
// it scrolls into view — runs only once, driven by requestAnimationFrame.
function AnimatedCounter({ value, duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState('0')

  const match = value.match(/^([\d,]+(?:\.\d+)?)(.*)$/)
  const target = match ? parseFloat(match[1].replace(/,/g, '')) : 0
  const suffix = match ? match[2] : ''

  useEffect(() => {
    if (!inView) return
    let start = null
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.floor(eased * target).toLocaleString())
      if (progress < 1) requestAnimationFrame(step)
      else setDisplay(target.toLocaleString())
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])

  return <span ref={ref}>{display}{suffix}</span>
}

export default AnimatedCounter