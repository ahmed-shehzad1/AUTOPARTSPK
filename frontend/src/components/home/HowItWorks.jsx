
import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Reveal from '../common/Reveal'

// --- Custom Mechanical SVGs ---

const SparkPlugSVG = () => (
  <svg
    viewBox="0 0 100 200"
    className="w-10 h-20 text-ink drop-shadow-md"
    fill="none"
    aria-hidden="true"
  >
    <path d="M40 10h20v20H40z" fill="currentColor" />

    <path
      d="M35 30h30v60H35z"
      fill="#EDF0F2"
      stroke="currentColor"
      strokeWidth="6"
    />

    <line
      x1="32"
      y1="45"
      x2="68"
      y2="45"
      stroke="currentColor"
      strokeWidth="6"
    />

    <line
      x1="32"
      y1="60"
      x2="68"
      y2="60"
      stroke="currentColor"
      strokeWidth="6"
    />

    <line
      x1="32"
      y1="75"
      x2="68"
      y2="75"
      stroke="currentColor"
      strokeWidth="6"
    />

    <path d="M25 90h50v25H25z" fill="currentColor" />

    <path
      d="M35 115h30v55H35z"
      fill="#5B6570"
      stroke="currentColor"
      strokeWidth="4"
    />

    <line
      x1="35"
      y1="130"
      x2="65"
      y2="130"
      stroke="currentColor"
      strokeWidth="4"
    />

    <line
      x1="35"
      y1="145"
      x2="65"
      y2="145"
      stroke="currentColor"
      strokeWidth="4"
    />

    <line
      x1="35"
      y1="160"
      x2="65"
      y2="160"
      stroke="currentColor"
      strokeWidth="4"
    />

    <path
      d="M50 170v20h-15"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="square"
    />
  </svg>
)

const DestinationSVG = () => (
  <div className="relative w-32 h-32 flex flex-col items-center justify-end drop-shadow-sm">
    <svg
      viewBox="0 0 100 40"
      className="w-[90%] text-blueprint"
      aria-hidden="true"
    >
      <path d="M0 40L50 0L100 40Z" fill="currentColor" />
    </svg>

    <div className="w-[75%] h-20 bg-white border-x-4 border-t-4 border-ink flex items-end justify-center px-2">
      <div className="w-full h-16 bg-steel border-x-2 border-t-2 border-ink flex flex-col justify-evenly">
        <div className="w-full h-px bg-ink/20" />
        <div className="w-full h-px bg-ink/20" />
        <div className="w-full h-px bg-ink/20" />
      </div>
    </div>
  </div>
)

// --- Animated Box ---

const AnimatedBox = ({
  boxControls,
  lidControls,
  tapeControls,
}) => (
  <motion.div
    animate={boxControls}
    className="absolute w-20 h-20 z-30"
    style={{
      perspective: 800,
      x: '-50%',
      y: '-50%',
    }}
  >
    {/* Box Interior */}
    <div className="absolute inset-0 bg-ink border-4 border-ink z-10 shadow-inner" />

    {/* Box Front Face */}
    <div className="absolute inset-0 bg-white border-4 border-ink z-30 flex flex-col items-center justify-end p-2">
      <div className="w-8 h-4 border-2 border-slate/20 bg-steel/80 rounded-sm mb-1" />

      <motion.div
        animate={tapeControls}
        className="absolute top-0 w-full h-3 bg-blueprint z-50 -translate-y-1/2"
      />
    </div>

    {/* Box Lid */}
    <motion.div
      animate={lidControls}
      initial={{ rotateX: -180 }}
      className="absolute bottom-full left-0 w-full h-10 bg-white border-4 border-ink origin-bottom z-40"
      style={{
        transformStyle: 'preserve-3d',
      }}
    />
  </motion.div>
)

// --- Main Component ---

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  // Desktop animation controls
  const plugD = useAnimation()
  const boxD = useAnimation()
  const lidD = useAnimation()
  const tapeD = useAnimation()

  // Mobile animation controls
  const plugM = useAnimation()
  const boxM = useAnimation()
  const lidM = useAnimation()
  const tapeM = useAnimation()

  useEffect(() => {
    let isMounted = true

    const delay = (ms) =>
      new Promise((resolve) => {
        setTimeout(resolve, ms)
      })

    const runSequence = async () => {
      // Give Framer Motion time to attach controls.
      await delay(100)

      while (isMounted) {
        // ==========================================
        // PHASE 0 — FIND
        // ==========================================

        setActiveStep(0)

        // Desktop initial state
        plugD.set({
          left: '16.6%',
          top: '50%',
          opacity: 1,
          scale: 1,
        })

        boxD.set({
          left: '50%',
          top: '50%',
          opacity: 1,
        })

        lidD.set({
          rotateX: -180,
        })

        tapeD.set({
          opacity: 0,
        })

        // Mobile initial state
        plugM.set({
          left: '48px',
          top: '16.6%',
          opacity: 1,
          scale: 1,
        })

        boxM.set({
          left: '48px',
          top: '50%',
          opacity: 1,
        })

        lidM.set({
          rotateX: -180,
        })

        tapeM.set({
          opacity: 0,
        })

        await delay(2200)

        if (!isMounted) break

        // ==========================================
        // PHASE 1 — PACK
        // ==========================================

        setActiveStep(1)

        // Move plug above box
        plugD.start({
          left: '50%',
          top: '15%',
          transition: {
            duration: 0.8,
            ease: 'circOut',
          },
        })

        plugM.start({
          top: '35%',
          transition: {
            duration: 0.8,
            ease: 'circOut',
          },
        })

        await delay(900)

        if (!isMounted) break

        // Drop plug into box
        plugD.start({
          top: '60%',
          opacity: 0,
          scale: 0.8,
          transition: {
            duration: 0.4,
            ease: 'easeIn',
          },
        })

        plugM.start({
          top: '60%',
          opacity: 0,
          scale: 0.8,
          transition: {
            duration: 0.4,
            ease: 'easeIn',
          },
        })

        await delay(400)

        if (!isMounted) break

        // Close lid
        lidD.start({
          rotateX: 0,
          transition: {
            duration: 0.4,
            ease: 'backOut',
          },
        })

        lidM.start({
          rotateX: 0,
          transition: {
            duration: 0.4,
            ease: 'backOut',
          },
        })

        await delay(300)

        if (!isMounted) break

        // Apply tape
        tapeD.start({
          opacity: 1,
          transition: {
            duration: 0.2,
          },
        })

        tapeM.start({
          opacity: 1,
          transition: {
            duration: 0.2,
          },
        })

        await delay(1800)

        if (!isMounted) break

        // ==========================================
        // PHASE 2 — DELIVER
        // ==========================================

        setActiveStep(2)

        // Desktop: move box horizontally
        boxD.start({
          left: '83.3%',
          transition: {
            duration: 1.2,
            ease: 'easeInOut',
          },
        })

        // Mobile: move box vertically
        boxM.start({
          top: '83.3%',
          transition: {
            duration: 1.2,
            ease: 'easeInOut',
          },
        })

        await delay(2200)

        if (!isMounted) break

        // ==========================================
        // RESET
        // ==========================================

        boxD.start({
          opacity: 0,
          transition: {
            duration: 0.4,
          },
        })

        boxM.start({
          opacity: 0,
          transition: {
            duration: 0.4,
          },
        })

        await delay(500)
      }
    }

    runSequence()

    return () => {
      isMounted = false

      // Stop all running animations on unmount.
      plugD.stop()
      boxD.stop()
      lidD.stop()
      tapeD.stop()

      plugM.stop()
      boxM.stop()
      lidM.stop()
      tapeM.stop()
    }
  }, [
    plugD,
    boxD,
    lidD,
    tapeD,
    plugM,
    boxM,
    lidM,
    tapeM,
  ])

  return (
    <section className="bg-steel/30 py-24 border-b border-ink/10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* Header */}
        <Reveal>
          <div className="text-center mb-16 md:mb-24">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink tracking-tight mb-3 uppercase">
              How Ordering Works
            </h2>

            <p className="font-body text-slate text-base md:text-lg">
              Find it. Pack it. Deliver it.
            </p>
          </div>
        </Reveal>

        {/* ==========================================
            DESKTOP
        ========================================== */}

        <div className="hidden md:block">

          <div className="relative w-full h-56">

            {/* Logistics route */}
            <div className="absolute top-1/2 left-[10%] right-[10%] h-1 bg-ink/10 -translate-y-1/2 z-0" />

            {/* Track nodes */}
            <div className="absolute left-[16.6%] top-1/2 w-3 h-3 rounded-full bg-ink/20 -translate-x-1/2 -translate-y-1/2 z-0" />

            <div className="absolute left-[50%] top-1/2 w-3 h-3 rounded-full bg-ink/20 -translate-x-1/2 -translate-y-1/2 z-0" />

            {/* Destination */}
            <div className="absolute left-[83.3%] top-1/2 -translate-x-1/2 -translate-y-[45%] z-0">
              <DestinationSVG />
            </div>

            {/* Box */}
            <AnimatedBox
              boxControls={boxD}
              lidControls={lidD}
              tapeControls={tapeD}
            />

            {/* Spark plug */}
            <motion.div
              animate={plugD}
              className="absolute z-20 flex justify-center items-center"
              style={{
                x: '-50%',
                y: '-50%',
              }}
            >
              <SparkPlugSVG />
            </motion.div>
          </div>

          {/* Step descriptions */}
          <div className="grid grid-cols-3 text-center mt-6 max-w-5xl mx-auto px-4">

            <div
              className={`transition-opacity duration-500 ${
                activeStep === 0 ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <h3 className="font-display text-xl font-bold text-ink uppercase tracking-wider mb-2">
                Find Your Part
              </h3>

              <p className="font-body text-slate text-sm max-w-xs mx-auto">
                Search by vehicle, category, or OEM number.
              </p>
            </div>

            <div
              className={`transition-opacity duration-500 ${
                activeStep === 1 ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <h3 className="font-display text-xl font-bold text-ink uppercase tracking-wider mb-2">
                Packed With Care
              </h3>

              <p className="font-body text-slate text-sm max-w-xs mx-auto">
                Your part is prepared securely for dispatch.
              </p>
            </div>

            <div
              className={`transition-opacity duration-500 ${
                activeStep === 2 ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <h3 className="font-display text-xl font-bold text-ink uppercase tracking-wider mb-2">
                At Your Doorstep
              </h3>

              <p className="font-body text-slate text-sm max-w-xs mx-auto">
                Delivered nationwide with your chosen payment method.
              </p>
            </div>

          </div>
        </div>

        {/* ==========================================
            MOBILE
        ========================================== */}

        <div className="block md:hidden relative h-[650px] w-full">

          {/* Vertical route */}
          <div className="absolute left-[48px] top-[10%] bottom-[10%] w-1 bg-ink/10 -translate-x-1/2 z-0" />

          {/* Track nodes */}
          <div className="absolute left-[48px] top-[16.6%] w-3 h-3 rounded-full bg-ink/20 -translate-x-1/2 -translate-y-1/2 z-0" />

          <div className="absolute left-[48px] top-[50%] w-3 h-3 rounded-full bg-ink/20 -translate-x-1/2 -translate-y-1/2 z-0" />

          {/* Destination */}
          <div className="absolute left-[48px] top-[83.3%] -translate-x-1/2 -translate-y-[45%] z-0 scale-75 origin-bottom">
            <DestinationSVG />
          </div>

          {/* Box */}
          <AnimatedBox
            boxControls={boxM}
            lidControls={lidM}
            tapeControls={tapeM}
          />

          {/* Spark plug */}
          <motion.div
            animate={plugM}
            className="absolute z-20 flex justify-center items-center"
            style={{
              x: '-50%',
              y: '-50%',
            }}
          >
            <SparkPlugSVG />
          </motion.div>

          {/* Find */}
          <div className="absolute left-[100px] right-2 top-[16.6%] -translate-y-1/2">
            <div
              className={`transition-opacity duration-500 ${
                activeStep === 0 ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <h3 className="font-display text-lg font-bold text-ink uppercase tracking-wider mb-1">
                Find Your Part
              </h3>

              <p className="font-body text-slate text-xs pr-4">
                Search by vehicle, category, or OEM number.
              </p>
            </div>
          </div>

          {/* Pack */}
          <div className="absolute left-[100px] right-2 top-[50%] -translate-y-1/2">
            <div
              className={`transition-opacity duration-500 ${
                activeStep === 1 ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <h3 className="font-display text-lg font-bold text-ink uppercase tracking-wider mb-1">
                Packed With Care
              </h3>

              <p className="font-body text-slate text-xs pr-4">
                Your part is prepared securely for dispatch.
              </p>
            </div>
          </div>

          {/* Deliver */}
          <div className="absolute left-[100px] right-2 top-[83.3%] -translate-y-1/2">
            <div
              className={`transition-opacity duration-500 ${
                activeStep === 2 ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <h3 className="font-display text-lg font-bold text-ink uppercase tracking-wider mb-1">
                At Your Doorstep
              </h3>

              <p className="font-body text-slate text-xs pr-4">
                Delivered nationwide with your chosen payment method.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
