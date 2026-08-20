import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Reveal from '../common/Reveal'

/* -------------------------------------------------------
   PRODUCT
------------------------------------------------------- */

const SparkPlug = ({ className = '' }) => (
  <svg
    viewBox="0 0 80 180"
    className={className}
    fill="none"
    aria-hidden="true"
  >
    {/* Terminal */}
    <rect x="35" y="8" width="10" height="14" rx="1" fill="#111827" />

    {/* Ceramic */}
    <path
      d="M29 22h22v11H29z
         M26 33h28v10H26z
         M29 43h22v10H29z
         M26 53h28v10H26z
         M29 63h22v13H29z"
      fill="#F4F5F6"
      stroke="#111827"
      strokeWidth="2.5"
    />

    {/* Metal hex */}
    <path
      d="M20 76h40v22H20z"
      fill="#111827"
    />

    <path
      d="M23 82h34v9H23z"
      fill="#2563EB"
      opacity=".8"
    />

    {/* Threaded shell */}
    <rect
      x="26"
      y="98"
      width="28"
      height="51"
      rx="1"
      fill="#66707B"
      stroke="#111827"
      strokeWidth="2.5"
    />

    {[108, 118, 128, 138].map((y) => (
      <line
        key={y}
        x1="27"
        y1={y}
        x2="53"
        y2={y}
        stroke="#111827"
        strokeWidth="2"
      />
    ))}

    {/* Gasket */}
    <rect
      x="22"
      y="97"
      width="36"
      height="6"
      rx="2"
      fill="#C89B3C"
    />

    {/* Electrode */}
    <path
      d="M39 149v15h-11"
      stroke="#111827"
      strokeWidth="4"
      strokeLinecap="square"
    />

    <circle
      cx="40"
      cy="154"
      r="2"
      fill="#F97316"
    />
  </svg>
)

/* -------------------------------------------------------
   STATION ICONS
------------------------------------------------------- */

const SearchIcon = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
    <circle
      cx="14"
      cy="14"
      r="8"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="m20 20 7 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

const BoxIcon = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
    <path
      d="m5 10 11-5 11 5-11 5-11-5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M5 10v12l11 5 11-5V10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M16 15v12"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
)

const TruckIcon = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
    <path
      d="M4 8h16v14H4z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M20 13h5l3 4v5h-8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle
      cx="9"
      cy="24"
      r="3"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle
      cx="24"
      cy="24"
      r="3"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
)

/* -------------------------------------------------------
   PACKAGE
------------------------------------------------------- */

const Package = ({
  boxControls,
  lidControls,
  tapeControls,
}) => (
  <motion.div
    animate={boxControls}
    className="absolute z-30 w-28 h-24"
    style={{
      translateX: '-50%',
      translateY: '-50%',
    }}
  >
    {/* Ground shadow */}
    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-3 rounded-full bg-black/15 blur-md" />

    {/* Box */}
    <div className="absolute inset-0 overflow-visible">

      {/* Interior */}
      <div className="absolute inset-x-1 top-2 bottom-0 bg-[#553D2B] border-2 border-[#17202A] rounded-sm" />

      {/* Product sitting inside */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-10"
        style={{ translateX: '-50%', translateY: '-50%' }}
      >
        <SparkPlug className="w-8 h-16 opacity-80" />
      </motion.div>

      {/* Left lid */}
      <motion.div
        animate={lidControls}
        className="absolute left-0 top-0 w-1/2 h-9 origin-top-left bg-[#C99A66] border-2 border-[#17202A] rounded-sm z-30"
      />

      {/* Right lid */}
      <motion.div
        animate={lidControls}
        className="absolute right-0 top-0 w-1/2 h-9 origin-top-right bg-[#B98755] border-2 border-[#17202A] rounded-sm z-30"
      />

      {/* Front panel */}
      <div className="absolute left-0 right-0 bottom-0 h-16 bg-[#D8AA78] border-2 border-[#17202A] rounded-b-sm z-20">

        {/* Box marking */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-6 border border-black/20 rounded flex items-center justify-center">
          <div className="w-5 h-0.5 bg-black/20" />
        </div>

        {/* Tape */}
        <motion.div
          animate={tapeControls}
          className="absolute -top-2 left-0 right-0 h-4 bg-blue-600 border-y border-black/20"
        />
      </div>
    </div>
  </motion.div>
)

/* -------------------------------------------------------
   DESTINATION
------------------------------------------------------- */

const Destination = () => (
  <div className="relative flex flex-col items-center">
    <div className="w-24 h-2 rounded-full bg-black/10 blur-sm mb-1" />

    <div className="relative w-20 h-16 rounded-t-lg border-2 border-[#17202A] bg-white shadow-sm">
      <div className="absolute top-2 left-2 right-2 h-2 rounded-sm bg-slate-200 border border-black/10" />

      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-12 h-9 rounded-t-md border-2 border-[#17202A]/30 bg-slate-100 flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
      </div>
    </div>
  </div>
)

/* -------------------------------------------------------
   STAGE DATA
------------------------------------------------------- */

const stages = [
  {
    number: '01',
    label: 'FIND',
    title: 'Find Your Part',
    description: 'Search by vehicle, category, or OEM number.',
    icon: SearchIcon,
  },
  {
    number: '02',
    label: 'PACK',
    title: 'Packed With Care',
    description: 'Your part is checked, protected, and prepared for dispatch.',
    icon: BoxIcon,
  },
  {
    number: '03',
    label: 'DELIVER',
    title: 'At Your Doorstep',
    description: 'Your order travels safely to the delivery address.',
    icon: TruckIcon,
  },
]

/* -------------------------------------------------------
   MAIN
------------------------------------------------------- */

export default function HowItWorks() {
  const [activeStage, setActiveStage] = useState(0)

  const plug = useAnimation()
  const box = useAnimation()
  const lids = useAnimation()
  const tape = useAnimation()

  useEffect(() => {
    let mounted = true

    const wait = (ms) =>
      new Promise((resolve) => setTimeout(resolve, ms))

    const reset = async () => {
      plug.set({
        left: '16%',
        top: '50%',
        opacity: 1,
        rotate: -12,
        scale: 1,
      })

      box.set({
        left: '50%',
        top: '50%',
        opacity: 1,
      })

      lids.set({
        rotateX: 65,
      })

      tape.set({
        opacity: 0,
        scaleX: 0.8,
      })
    }

    const sequence = async () => {
      await reset()

      while (mounted) {
        /* FIND */
        setActiveStage(0)
        await wait(1800)

        /* PACK */
        setActiveStage(1)

        await plug.start({
          left: '50%',
          top: '22%',
          rotate: 0,
          transition: {
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          },
        })

        if (!mounted) return

        await plug.start({
          top: '53%',
          opacity: 0,
          scale: 0.7,
          transition: {
            duration: 0.45,
            ease: 'easeIn',
          },
        })

        await lids.start({
          rotateX: 0,
          transition: {
            duration: 0.4,
            ease: [0.34, 1.56, 0.64, 1],
          },
        })

        await tape.start({
          opacity: 1,
          scaleX: 1,
          transition: {
            duration: 0.25,
          },
        })

        await wait(1000)

        /* DELIVER */
        setActiveStage(2)

        await box.start({
          left: '84%',
          transition: {
            duration: 1.4,
            ease: [0.65, 0, 0.35, 1],
          },
        })

        await wait(700)

        await box.start({
          opacity: 0,
          transition: {
            duration: 0.35,
          },
        })

        await wait(300)

        await reset()
      }
    }

    sequence()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 md:py-28 border-b border-black/10">

      {/* Decorative blueprint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #111827 1px, transparent 1px),
            linear-gradient(to bottom, #111827 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10">

        {/* HEADER */}
        <Reveal>
          <div className="max-w-2xl mx-auto text-center mb-14 md:mb-16">

            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-blue-600/20 bg-blue-600/5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />

              <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-blue-600 uppercase">
                Simple process
              </span>
            </div>

            <h2 className="font-display font-bold text-3xl md:text-5xl text-slate-900 tracking-tight uppercase">
              How Ordering Works
            </h2>

            <p className="mt-3 font-body text-slate-500 text-base md:text-lg">
              From finding the right part to receiving it at your door.
            </p>
          </div>
        </Reveal>

        {/* DESKTOP */}
        <div className="hidden md:block">

          {/* ANIMATION CANVAS */}
          <div className="relative h-[330px] rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">

            {/* Grid */}
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #111827 1px, transparent 1px),
                  linear-gradient(to bottom, #111827 1px, transparent 1px)
                `,
                backgroundSize: '24px 24px',
              }}
            />

            {/* Travel rail */}
            <div className="absolute left-[9%] right-[9%] top-1/2 -translate-y-1/2">

              <div className="h-px bg-slate-300" />

              <div className="absolute inset-x-0 top-0 border-t border-dashed border-blue-600/20" />
            </div>

            {/* Station markers */}
            {[
              { left: '16%' },
              { left: '50%' },
              { left: '84%' },
            ].map((station, index) => (
              <div
                key={index}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ left: station.left }}
              >
                <motion.div
                  animate={{
                    scale: activeStage === index ? 1.15 : 1,
                    opacity: activeStage === index ? 1 : 0.35,
                  }}
                  className="w-3 h-3 rounded-full bg-blue-600 ring-8 ring-blue-600/5"
                />
              </div>
            ))}

            {/* Destination */}
            <div className="absolute left-[84%] top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Destination />
            </div>

            {/* Package */}
            <Package
              boxControls={box}
              lidControls={lids}
              tapeControls={tape}
            />

            {/* Spark plug */}
            <motion.div
              animate={plug}
              className="absolute z-40"
              style={{
                translateX: '-50%',
                translateY: '-50%',
              }}
            >
              <SparkPlug className="w-16 h-32 drop-shadow-xl" />
            </motion.div>

            {/* Small technical labels */}
            <div className="absolute left-6 top-6 font-mono text-[9px] tracking-widest text-slate-400 uppercase">
              ORDER FLOW / 03
            </div>

            <div className="absolute right-6 top-6 font-mono text-[9px] tracking-widest text-slate-400 uppercase">
              LIVE PROCESS
            </div>

            <div className="absolute left-6 bottom-6 font-mono text-[9px] text-slate-400">
              PART → PACKAGE → DELIVERY
            </div>
          </div>

          {/* CONTENT */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            {stages.map((stage, index) => {
              const Icon = stage.icon
              const active = activeStage === index

              return (
                <div
                  key={stage.number}
                  className={`
                    relative rounded-xl border p-6
                    transition-all duration-500
                    ${
                      active
                        ? 'border-blue-600/30 bg-white shadow-md'
                        : 'border-black/5 bg-white/50'
                    }
                  `}
                >
                  <div className="flex items-start justify-between">

                    <div
                      className={`
                        flex items-center justify-center
                        w-11 h-11 rounded-lg
                        transition-all duration-500
                        ${
                          active
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-500'
                        }
                      `}
                    >
                      <Icon />
                    </div>

                    <span className="font-mono text-[10px] font-bold tracking-widest text-slate-400">
                      {stage.number}
                    </span>
                  </div>

                  <div className="mt-5">
                    <span
                      className={`
                        font-mono text-[10px] font-bold tracking-[0.18em]
                        ${
                          active
                            ? 'text-blue-600'
                            : 'text-slate-400'
                        }
                      `}
                    >
                      {stage.label}
                    </span>

                    <h3 className="mt-1 font-display font-bold text-xl text-slate-900">
                      {stage.title}
                    </h3>

                    <p className="mt-2 font-body text-sm leading-relaxed text-slate-500">
                      {stage.description}
                    </p>
                  </div>

                  {active && (
                    <motion.div
                      layoutId="activeBar"
                      className="absolute left-0 right-0 -bottom-px h-0.5 bg-blue-600 rounded-full"
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* MOBILE */}
        <div className="md:hidden">

          <div className="relative rounded-2xl border border-black/10 bg-white overflow-hidden">

            <div className="absolute left-8 top-10 bottom-10 w-px bg-slate-200" />

            <div className="relative divide-y divide-black/5">

              {stages.map((stage, index) => {
                const Icon = stage.icon
                const active = activeStage === index

                return (
                  <div
                    key={stage.number}
                    className="relative min-h-[150px] pl-20 pr-6 py-7"
                  >
                    {/* timeline dot */}
                    <motion.div
                      animate={{
                        scale: active ? 1.15 : 1,
                      }}
                      className={`
                        absolute left-[23px] top-9
                        w-3 h-3 rounded-full
                        ring-8 ring-white
                        ${
                          active
                            ? 'bg-blue-600'
                            : 'bg-slate-300'
                        }
                      `}
                    />

                    <div className="flex items-center gap-3">

                      <div
                        className={`
                          flex items-center justify-center
                          w-10 h-10 rounded-lg
                          ${
                            active
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-400'
                          }
                        `}
                      >
                        <Icon />
                      </div>

                      <span className="font-mono text-[10px] tracking-widest text-slate-400">
                        {stage.number} / {stage.label}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display font-bold text-lg text-slate-900">
                      {stage.title}
                    </h3>

                    <p className="mt-1 font-body text-xs leading-relaxed text-slate-500">
                      {stage.description}
                    </p>
                  </div>
                )
              })}

            </div>
          </div>

          {/* Small mobile visual */}
          <div className="relative mt-5 h-40 rounded-2xl border border-black/10 bg-white overflow-hidden">

            <div className="absolute inset-x-8 top-1/2 h-px bg-slate-200" />

            <motion.div
              animate={{
                left:
                  activeStage === 0
                    ? '20%'
                    : activeStage === 1
                    ? '50%'
                    : '80%',
              }}
              transition={{
                duration: 0.8,
                ease: [0.65, 0, 0.35, 1],
              }}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <SparkPlug className="w-10 h-20 drop-shadow-lg" />
            </motion.div>

            <div className="absolute left-[80%] top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40">
              <Destination />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}