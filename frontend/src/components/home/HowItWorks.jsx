import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Reveal from '../common/Reveal'

/* =========================================================
   SPARK PLUG
========================================================= */

const SparkPlug = ({ className = '' }) => (
  <svg
    viewBox="0 0 80 180"
    className={className}
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="35"
      y="8"
      width="10"
      height="14"
      rx="1"
      fill="#141A21"
    />

    <path
      d="M29 22h22v11H29z"
      fill="#FFFFFF"
      stroke="#141A21"
      strokeWidth="2.5"
    />

    <path
      d="M26 33h28v10H26z"
      fill="#FFFFFF"
      stroke="#141A21"
      strokeWidth="2.5"
    />

    <path
      d="M29 43h22v10H29z"
      fill="#FFFFFF"
      stroke="#141A21"
      strokeWidth="2.5"
    />

    <path
      d="M26 53h28v10H26z"
      fill="#FFFFFF"
      stroke="#141A21"
      strokeWidth="2.5"
    />

    <path
      d="M29 63h22v13H29z"
      fill="#FFFFFF"
      stroke="#141A21"
      strokeWidth="2.5"
    />

    <path
      d="M20 76h40v22H20z"
      fill="#141A21"
    />

    <path
      d="M23 82h34v9H23z"
      fill="#1E5EA8"
    />

    <rect
      x="26"
      y="98"
      width="28"
      height="51"
      rx="1"
      fill="#5B6570"
      stroke="#141A21"
      strokeWidth="2.5"
    />

    {[108, 118, 128, 138].map((y) => (
      <line
        key={y}
        x1="27"
        y1={y}
        x2="53"
        y2={y}
        stroke="#141A21"
        strokeWidth="2"
      />
    ))}

    <rect
      x="22"
      y="97"
      width="36"
      height="6"
      rx="2"
      fill="#C9962B"
    />

    <path
      d="M39 149v15h-11"
      stroke="#141A21"
      strokeWidth="4"
      strokeLinecap="square"
    />

    <circle
      cx="40"
      cy="154"
      r="2"
      fill="#FF5A1F"
    />
  </svg>
)

/* =========================================================
   BOX
========================================================= */

const Box = ({
  controls,
  leftFlap,
  rightFlap,
  tape,
}) => (
  <motion.div
    animate={controls}
    className="absolute z-30 w-20 h-16"
    style={{
      x: '-50%',
      y: '-50%',
    }}
  >
    {/* Shadow */}
    <div
      className="
        absolute
        -bottom-2
        left-1/2
        -translate-x-1/2
        w-16
        h-2
        rounded-full
        bg-ink
        opacity-15
        blur-sm
      "
    />

    {/* Main box */}
    <div
      className="
        absolute
        inset-0
        overflow-hidden
        rounded-sm
        border-2
        border-ink
        bg-[#B88A57]
      "
    />

    {/* Inside */}
    <div
      className="
        absolute
        left-1
        right-1
        top-1
        bottom-1
        bg-[#60442F]
      "
    />

    {/* Product inside */}
    <div
      className="
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-[35%]
        z-10
      "
    >
      <SparkPlug className="w-5 h-10" />
    </div>

    {/* Left flap */}
    <motion.div
      animate={leftFlap}
      className="
        absolute
        left-0
        top-0
        z-30
        w-1/2
        h-6
        origin-top-left
        border-2
        border-ink
        bg-[#C89B68]
      "
      style={{
        transformPerspective: 500,
      }}
    />

    {/* Right flap */}
    <motion.div
      animate={rightFlap}
      className="
        absolute
        right-0
        top-0
        z-30
        w-1/2
        h-6
        origin-top-right
        border-2
        border-ink
        bg-[#C89B68]
      "
      style={{
        transformPerspective: 500,
      }}
    />

    {/* Front wall */}
    <div
      className="
        absolute
        left-0
        right-0
        bottom-0
        z-20
        h-9
        border-2
        border-ink
        rounded-b-sm
        bg-[#D8A878]
      "
    />

    {/* Tape */}
    <motion.div
      animate={tape}
      className="
        absolute
        left-0
        right-0
        top-[24px]
        z-40
        h-2
        bg-blueprint
      "
    />
  </motion.div>
)

/* =========================================================
   SIMPLE DELIVERY TRUCK
========================================================= */

const Truck = ({ controls }) => (
  <motion.div
    animate={controls}
    className="absolute z-40"
    style={{
      x: '-50%',
      y: '-50%',
    }}
  >
    <div className="relative w-32 h-16">

      {/* Cargo body */}
      <div
        className="
          absolute
          left-0
          bottom-3
          w-[86px]
          h-11
          border-2
          border-ink
          rounded-sm
          bg-paper
        "
      >
        {/* Simple stripe */}
        <div
          className="
            absolute
            left-0
            right-0
            top-5
            h-1.5
            bg-blueprint
          "
        />
      </div>

      {/* Cab */}
      <div
        className="
          absolute
          right-0
          bottom-3
          w-12
          h-11
          border-2
          border-ink
          rounded-tr-sm
          bg-paper
        "
      >
        {/* Window */}
        <div
          className="
            absolute
            left-2
            top-2
            w-7
            h-4
            border
            border-ink
            bg-steel
          "
        />
      </div>

      {/* Wheels */}
      <div
        className="
          absolute
          left-3
          bottom-0
          w-6
          h-6
          rounded-full
          border-4
          border-steel
          bg-ink
        "
      />

      <div
        className="
          absolute
          right-2
          bottom-0
          w-6
          h-6
          rounded-full
          border-4
          border-steel
          bg-ink
        "
      />

      {/* Headlight */}
      <div
        className="
          absolute
          right-0
          bottom-7
          w-1
          h-2
          bg-ignition
        "
      />
    </div>
  </motion.div>
)

/* =========================================================
   SIMPLE HOUSE
========================================================= */

const House = () => (
  <div className="relative w-20 h-20">

    {/* Ground */}
    <div
      className="
        absolute
        left-0
        right-0
        bottom-1
        h-px
        bg-ink
      "
      style={{
        opacity: 0.15,
      }}
    />

    {/* Body */}
    <div
      className="
        absolute
        left-2
        bottom-2
        w-16
        h-11
        border-2
        border-ink
        bg-paper
      "
    />

    {/* Roof */}
    <div
      className="
        absolute
        left-0
        top-5
        w-0
        h-0
        border-l-[40px]
        border-l-transparent
        border-r-[40px]
        border-r-transparent
        border-bottom-[22px]
        border-b-ink
      "
    />

    {/* Door */}
    <div
      className="
        absolute
        left-7
        bottom-2
        w-5
        h-7
        bg-blueprint
        border
        border-ink
      "
    />

    {/* Window */}
    <div
      className="
        absolute
        right-4
        bottom-7
        w-4
        h-4
        bg-steel
        border
        border-ink
      "
    />
  </div>
)

/* =========================================================
   STAGE LABEL
========================================================= */

const Stage = ({
  number,
  label,
  active,
  className,
}) => (
  <div
    className={`
      absolute
      ${className}
      -translate-x-1/2
      text-center
    `}
  >
    <motion.div
      animate={{
        opacity: active ? 1 : 0.35,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <span
        className={`
          font-mono
          text-[9px]
          font-bold
          tracking-[0.16em]
          ${active ? 'text-blueprint' : 'text-slate'}
        `}
      >
        {number} — {label}
      </span>
    </motion.div>
  </div>
)

/* =========================================================
   MAIN
========================================================= */

export default function HowItWorks() {
  const [activeStage, setActiveStage] = useState(0)

  const plug = useAnimation()
  const box = useAnimation()

  const leftFlap = useAnimation()
  const rightFlap = useAnimation()

  const tape = useAnimation()
  const truck = useAnimation()

  useEffect(() => {
    let mounted = true

    const wait = (ms) =>
      new Promise((resolve) => setTimeout(resolve, ms))

    const reset = () => {
      /*
       * POINT 1
       *
       * Plug is above/left of the box.
       * Box is already present.
       */
      plug.set({
        left: '22%',
        top: '43%',
        opacity: 1,
        scale: 1,
        rotate: -12,
      })

      box.set({
        left: '38%',
        top: '59%',
        opacity: 1,
        scale: 1,
      })

      leftFlap.set({
        rotateX: 65,
      })

      rightFlap.set({
        rotateX: 65,
      })

      tape.set({
        opacity: 0,
      })

      /*
       * Truck is waiting at POINT 2.
       * It is larger than the box.
       */
      truck.set({
        left: '63%',
        top: '58%',
        opacity: 0,
        scale: 1,
      })
    }

    const sequence = async () => {
      reset()

      await wait(500)

      while (mounted) {

        /* =================================================
           POINT 1
           
           PLUG DROPS INTO BOX
        ================================================= */

        setActiveStage(0)

        /*
         * Plug moves directly above box.
         */
        await plug.start({
          left: '38%',
          top: '30%',
          rotate: 0,
          transition: {
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          },
        })

        if (!mounted) return

        /*
         * Plug drops inside.
         */
        await plug.start({
          top: '57%',
          scale: 0.55,
          opacity: 0,
          transition: {
            duration: 0.4,
            ease: 'easeIn',
          },
        })

        if (!mounted) return

        /*
         * Box closes.
         */
        await Promise.all([
          leftFlap.start({
            rotateX: 0,
            transition: {
              duration: 0.35,
              ease: [0.34, 1.56, 0.64, 1],
            },
          }),

          rightFlap.start({
            rotateX: 0,
            transition: {
              duration: 0.35,
              ease: [0.34, 1.56, 0.64, 1],
            },
          }),
        ])

        if (!mounted) return

        /*
         * Tape seals it.
         */
        await tape.start({
          opacity: 1,
          transition: {
            duration: 0.2,
          },
        })

        await wait(700)

        if (!mounted) return

        /* =================================================
           POINT 2
           
           BOX MOVES TO TRUCK
        ================================================= */

        setActiveStage(1)

        /*
         * Truck appears at point 2.
         */
        await truck.start({
          opacity: 1,
          transition: {
            duration: 0.25,
          },
        })

        if (!mounted) return

        /*
         * Box moves toward truck.
         *
         * Notice the box is smaller than truck.
         */
        await box.start({
          left: '61%',
          top: '57%',
          scale: 0.9,
          transition: {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          },
        })

        if (!mounted) return

        /*
         * Box gets loaded into truck.
         */
        await box.start({
          left: '64%',
          top: '52%',
          scale: 0.58,
          opacity: 0,
          transition: {
            duration: 0.45,
            ease: 'easeIn',
          },
        })

        await wait(500)

        if (!mounted) return

        /* =================================================
           POINT 3
           
           TRUCK DRIVES TO HOUSE
        ================================================= */

        setActiveStage(2)

        /*
         * Truck travels from point 2 to point 3.
         */
        await truck.start({
          left: '84%',
          transition: {
            duration: 1.5,
            ease: [0.65, 0, 0.35, 1],
          },
        })

        await wait(900)

        if (!mounted) return

        /*
         * Small pause at house.
         */
        await truck.start({
          scale: 1.04,
          transition: {
            duration: 0.2,
          },
        })

        await wait(300)

        if (!mounted) return

        /*
         * Fade truck out.
         */
        await truck.start({
          opacity: 0,
          transition: {
            duration: 0.3,
          },
        })

        await wait(300)

        if (!mounted) return

        /*
         * LOOP BACK TO POINT 1
         */
        reset()

        await wait(500)
      }
    }

    sequence()

    return () => {
      mounted = false
    }
  }, [
    plug,
    box,
    leftFlap,
    rightFlap,
    tape,
    truck,
  ])

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-steel
        py-14
        md:py-16
        border-b
        border-ink
      "
      style={{
        borderColor: 'rgba(20, 26, 33, 0.08)',
      }}
    >
      {/* Blueprint grid */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          animate-grid-pan
        "
        style={{
          opacity: 0.035,
          backgroundImage: `
            linear-gradient(to right, #141A21 1px, transparent 1px),
            linear-gradient(to bottom, #141A21 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10">

        {/* HEADER */}
        <Reveal>
          <div className="text-center mb-7">

            <div
              className="
                inline-flex
                items-center
                gap-2
                mb-2
                font-mono
                text-[9px]
                font-bold
                tracking-[0.18em]
                uppercase
                text-blueprint
              "
            >
              <span className="w-5 h-px bg-blueprint" />

              Order Process

              <span className="w-5 h-px bg-blueprint" />
            </div>

            <h2
              className="
                font-display
                font-bold
                text-2xl
                md:text-3xl
                text-ink
                tracking-tight
                uppercase
              "
            >
              How Ordering Works
            </h2>

            <p
              className="
                mt-1
                font-body
                text-sm
                text-slate
              "
            >
              Find it. Pack it. Deliver it.
            </p>
          </div>
        </Reveal>

        {/* ANIMATION */}
        <div
          className="
            relative
            h-[255px]
            md:h-[270px]
            rounded-xl
            border
            bg-paper
            overflow-hidden
          "
          style={{
            borderColor: 'rgba(20, 26, 33, 0.10)',
          }}
        >
          {/* Technical labels */}
          <div
            className="
              absolute
              left-4
              top-4
              font-mono
              text-[8px]
              tracking-[0.15em]
              text-slate
            "
          >
            ORDER_FLOW / 03
          </div>

          <div
            className="
              absolute
              right-4
              top-4
              font-mono
              text-[8px]
              tracking-[0.15em]
              text-slate
            "
          >
            LIVE
          </div>

          {/* Main travel line */}
          <div
            className="
              absolute
              left-[8%]
              right-[8%]
              top-[67%]
              border-t
              border-dashed
              border-ink
            "
            style={{
              opacity: 0.18,
            }}
          />

          {/* Ground */}
          <div
            className="
              absolute
              left-[8%]
              right-[8%]
              top-[71%]
              h-px
              bg-ink
            "
            style={{
              opacity: 0.05,
            }}
          />

          {/* POINT 1 */}
          <motion.div
            className="
              absolute
              left-[18%]
              top-[67%]
              w-2
              h-2
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-blueprint
            "
            animate={{
              scale: activeStage === 0 ? 1.3 : 1,
              opacity: activeStage === 0 ? 1 : 0.3,
            }}
          />

          {/* POINT 2 */}
          <motion.div
            className="
              absolute
              left-[61%]
              top-[67%]
              w-2
              h-2
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-blueprint
            "
            animate={{
              scale: activeStage === 1 ? 1.3 : 1,
              opacity: activeStage === 1 ? 1 : 0.3,
            }}
          />

          {/* POINT 3 */}
          <motion.div
            className="
              absolute
              left-[84%]
              top-[67%]
              w-2
              h-2
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-blueprint
            "
            animate={{
              scale: activeStage === 2 ? 1.3 : 1,
              opacity: activeStage === 2 ? 1 : 0.3,
            }}
          />

          {/* House at point 3 */}
          <div
            className="
              absolute
              left-[84%]
              top-[43%]
              -translate-x-1/2
              -translate-y-1/2
            "
          >
            <House />
          </div>

          {/* BOX */}
          <Box
            controls={box}
            leftFlap={leftFlap}
            rightFlap={rightFlap}
            tape={tape}
          />

          {/* SPARK PLUG */}
          <motion.div
            animate={plug}
            className="absolute z-50"
            style={{
              x: '-50%',
              y: '-50%',
            }}
          >
            <SparkPlug className="w-11 h-[99px] md:w-13 md:h-[108px]" />
          </motion.div>

          {/* TRUCK */}
          <Truck controls={truck} />

          {/* STAGE LABELS */}
          <Stage
            number="01"
            label="PACK"
            active={activeStage === 0}
            className="left-[18%] bottom-3"
          />

          <Stage
            number="02"
            label="SHIP"
            active={activeStage === 1}
            className="left-[61%] bottom-3"
          />

          <Stage
            number="03"
            label="ARRIVE"
            active={activeStage === 2}
            className="left-[84%] bottom-3"
          />
        </div>

        {/* Bottom process line */}
        <div
          className="
            flex
            items-center
            justify-center
            gap-2
            mt-4
            font-mono
            text-[8px]
            tracking-[0.12em]
            uppercase
            text-slate
          "
        >
          <span>PART</span>
          <span className="text-blueprint">→</span>
          <span>BOX</span>
          <span className="text-blueprint">→</span>
          <span>TRUCK</span>
          <span className="text-blueprint">→</span>
          <span>HOME</span>
        </div>
      </div>
    </section>
  )
}