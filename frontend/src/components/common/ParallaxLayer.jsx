import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Wraps a background element and makes it drift slower than normal scroll speed —
// creates the depth effect where foreground content scrolls at full speed
// while this layer lags behind it.
function ParallaxLayer({ children, strength = 60, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength])

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0">
        {children}
      </motion.div>
    </div>
  )
}

export default ParallaxLayer