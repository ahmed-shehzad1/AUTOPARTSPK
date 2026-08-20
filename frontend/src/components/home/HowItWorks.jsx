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
    {/* Terminal */}
    <rect
      x="35"
      y="8"
      width="10"
      height="14"
      rx="1"
      fill="#141A21"
    />

    {/* Ceramic */}
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

    {/* Metal collar */}
    <path
      d="M20 76h40v22H20z"
      fill="#141A21"
    />

    <path
      d="M23 82h34v9H23z"
      fill="#1E5EA8"
    />

    {/* Threaded body */}
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

    {/* Gasket */}
    <rect
      x="22"
      y="97"
      width="36"
      height="6"
      rx="2"
      fill="#C9962B"
    />

    {/* Electrode */}
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

const ShippingBox = ({
  controls,
  leftFlapControls,
  rightFlapControls,
  tapeControls,
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
        rounded-sm
        border-2
        border-ink
        bg-[#D8A878]
        overflow-hidden
      "
    />

    {/* Dark interior */}
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

    {/* Spark plug inside box */}
    <div
      className="
        absolute
        z-10
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-[35%]
      "
    >
      <SparkPlug className="w-5 h-10" />
    </div>

    {/* Left flap */}
    <motion.div
      animate={leftFlapControls}
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
      animate={rightFlapControls}
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
        rounded-b-sm
        border-2
        border-ink
        bg-[#D8A878]
      "
    />

    {/* Tape */}
    <motion.div
      animate={tapeControls}
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

const DeliveryTruck = ({ controls }) => (
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
          rounded-sm
          border-2
          border-ink
          bg-paper
        "
      >
        {/* Blueprint stripe */}
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
          rounded-tr-sm
          border-2
          border-ink
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

      {/* Rear wheel */}
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

      {/* Front wheel */}
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
const DestinationHouse = () => (
  <div className="relative w-24 h-24 select-none">
    {/* Ground shadow */}
    <div className="absolute left-1/2 bottom-1 -translate-x-1/2 w-20 h-2 rounded-full bg-ink/15 blur-[2px]" />

    {/* Chimney Smoke */}
    <div className="absolute right-[22px] top-[3px] w-2 h-2 rounded-full bg-ink/20 blur-[1px] animate-pulse" />
    <div className="absolute right-[19px] top-[9px] w-1.5 h-1.5 rounded-full bg-ink/15 blur-[0.5px]" />

    {/* Chimney */}
    <div className="absolute right-[20px] top-[14px] w-3 h-6 border-2 border-b-0 border-ink bg-paper z-0" />

    {/* House Body */}
    <div className="absolute left-3 bottom-3 w-[72px] h-[46px] border-2 border-ink bg-paper rounded-xs z-10">
      {/* Garage */}
      <div className="absolute left-2 bottom-0 w-[24px] h-[32px] border-2 border-b-0 border-ink bg-steel flex flex-col justify-evenly py-1 px-0.5">
        <div className="w-full h-px bg-ink/25" />
        <div className="w-full h-px bg-ink/25" />
        <div className="w-full h-px bg-ink/25" />
        <div className="w-full h-px bg-ink/25" />
      </div>

      {/* Window */}
      <div className="absolute left-[32px] top-2.5 w-[16px] h-[14px] border-2 border-ink bg-steel overflow-hidden">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-ink/30 -translate-x-1/2" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-ink/30 -translate-y-1/2" />
      </div>

      {/* Front Door */}
      <div className="absolute right-2 bottom-0 w-[16px] h-[26px] border-2 border-b-0 border-ink bg-blueprint">
        <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-paper border border-ink/40" />
      </div>
    </div>

    {/* Pitched Roof */}
    <div className="absolute left-[7px] top-[10px] w-[82px] h-[34px] z-20 pointer-events-none">
      <svg viewBox="0 0 82 34" className="w-full h-full overflow-visible">
        {/* Main Roof Pitch */}
        <polygon
          points="41,2 2,32 80,32"
          className="fill-steel stroke-ink stroke-[2.5] stroke-linejoin-round"
        />
        {/* Architectural Blueprint Line Accent */}
        <polyline
          points="41,8 8,32"
          className="stroke-blueprint stroke-[1.5] fill-none opacity-80"
        />
      </svg>
    </div>

    {/* Doorstep */}
    <div className="absolute right-[6px] bottom-[2px] w-[20px] h-[3px] border border-ink bg-steel rounded-xs z-20" />
  </div>
);

/* =========================================================
   STAGE LABEL
========================================================= */

const StageLabel = ({
  number,
  title,
  description,
  active,
  position,
}) => (
  <div
    className={`
      absolute
      ${position}
      -translate-x-1/2
      text-center
      w-28
      md:w-36
    `}
  >
    <motion.div
      animate={{
        opacity: active ? 1 : 0.38,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <div
        className={`
          font-mono
          text-[9px]
          font-bold
          tracking-[0.15em]
          uppercase
          mb-0.5
          ${active ? 'text-blueprint' : 'text-slate'}
        `}
      >
        {number} — {title}
      </div>

      <div
        className="
          font-display
          font-bold
          text-xs
          md:text-sm
          text-ink
        "
      >
        {description}
      </div>
    </motion.div>
  </div>
)

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function HowItWorks() {
  const [activeStage, setActiveStage] = useState(0)

  const plugControls = useAnimation()
  const boxControls = useAnimation()

  const leftFlapControls = useAnimation()
  const rightFlapControls = useAnimation()

  const tapeControls = useAnimation()
  const truckControls = useAnimation()

  useEffect(() => {
    let mounted = true

    const wait = (ms) =>
      new Promise((resolve) => setTimeout(resolve, ms))

    /* =====================================================
       RESET
    ===================================================== */

    const resetAnimation = () => {
      /*
       * POINT 1
       *
       * Plug and box share EXACTLY the same left position.
       *
       * Plug is directly above box.
       */
      plugControls.set({
        left: '20%',
        top: '28%',
        opacity: 1,
        scale: 1,
        rotate: -12,
      })

      boxControls.set({
        left: '20%',
        top: '64%',
        opacity: 1,
        scale: 1,
      })

      /*
       * Box starts open.
       */
      leftFlapControls.set({
        rotateX: 65,
      })

      rightFlapControls.set({
        rotateX: 65,
      })

      tapeControls.set({
        opacity: 0,
      })

      /*
       * Truck starts hidden at Point 2.
       */
      truckControls.set({
        left: '50%',
        top: '62%',
        opacity: 0,
        scale: 1,
      })
    }

    /* =====================================================
       ANIMATION LOOP
    ===================================================== */

    const runAnimation = async () => {
      resetAnimation()

      await wait(600)

      while (mounted) {

        /* ================================================
           STEP 01
           PACK
           
           PLUG ONLY MOVES VERTICALLY
        ================================================= */

        setActiveStage(0)

        /*
         * Drop spark plug straight into box.
         *
         * IMPORTANT:
         * left stays at 20%.
         */
        await plugControls.start({
          left: '20%',
          top: '55%',
          opacity: 0,
          scale: 0.55,
          rotate: 0,
          transition: {
            duration: 0.55,
            ease: 'easeIn',
          },
        })

        if (!mounted) return

        /*
         * Close both box flaps.
         */
        await Promise.all([
          leftFlapControls.start({
            rotateX: 0,
            transition: {
              duration: 0.3,
              ease: [0.34, 1.56, 0.64, 1],
            },
          }),

          rightFlapControls.start({
            rotateX: 0,
            transition: {
              duration: 0.3,
              ease: [0.34, 1.56, 0.64, 1],
            },
          }),
        ])

        if (!mounted) return

        /*
         * Seal the box.
         */
        await tapeControls.start({
          opacity: 1,
          transition: {
            duration: 0.2,
          },
        })

        await wait(700)

        if (!mounted) return

        /* ================================================
           STEP 02
           SHIP
           
           BOX MOVES HORIZONTALLY
           POINT 1 → POINT 2
        ================================================= */

        setActiveStage(1)

        /*
         * Truck appears at Point 2.
         */
        await truckControls.start({
          opacity: 1,
          transition: {
            duration: 0.25,
          },
        })

        if (!mounted) return

        /*
         * Box travels horizontally.
         *
         * X:
         * 20% → 50%
         *
         * Y stays exactly the same.
         */
        await boxControls.start({
          left: '50%',
          top: '64%',
          scale: 1,
          transition: {
            duration: 1,
            ease: [0.65, 0, 0.35, 1],
          },
        })

        if (!mounted) return

        /*
         * Load box into truck.
         *
         * Box becomes smaller as it visually
         * enters the cargo area.
         */
        await boxControls.start({
          left: '50%',
          top: '58%',
          scale: 0.52,
          opacity: 0,
          transition: {
            duration: 0.45,
            ease: 'easeIn',
          },
        })

        await wait(500)

        if (!mounted) return

        /* ================================================
           STEP 03
           ARRIVE
           
           TRUCK MOVES HORIZONTALLY
           POINT 2 → POINT 3
        ================================================= */

        setActiveStage(2)

        /*
         * Truck:
         *
         * 50% → 80%
         *
         * Y stays exactly the same.
         */
        await truckControls.start({
          left: '80%',
          top: '62%',
          transition: {
            duration: 1.5,
            ease: [0.65, 0, 0.35, 1],
          },
        })

        if (!mounted) return

        /*
         * Arrive and pause.
         */
        await wait(900)

        if (!mounted) return

        /*
         * Fade truck.
         */
        await truckControls.start({
          opacity: 0,
          transition: {
            duration: 0.3,
          },
        })

        await wait(500)

        if (!mounted) return

        /*
         * Reset to Point 1.
         */
        resetAnimation()

        await wait(500)
      }
    }

    runAnimation()

    return () => {
      mounted = false
    }
  }, [
    plugControls,
    boxControls,
    leftFlapControls,
    rightFlapControls,
    tapeControls,
    truckControls,
  ])

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-steel
        py-12
        md:py-14
        border-b
        border-ink
      "
      style={{
        borderColor: 'rgba(20, 26, 33, 0.08)',
      }}
    >
      {/* =================================================
          SUBTLE BLUEPRINT GRID
      ================================================= */}

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

        {/* =================================================
            HEADER
        ================================================= */}

        <Reveal>
          <div className="text-center mb-7">

            <div
              className="
                flex
                items-center
                justify-center
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

              ORDER PROCESS

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
              From our shelves to your doorstep.
            </p>
          </div>
        </Reveal>

        {/* =================================================
            ANIMATION CANVAS
        ================================================= */}

        <div
          className="
            relative
            h-[270px]
            md:h-[285px]
            rounded-xl
            border
            bg-paper
            overflow-hidden
          "
          style={{
            borderColor: 'rgba(20, 26, 33, 0.10)',
          }}
        >

          {/* Technical top-left label */}
          <div
            className="
              absolute
              left-4
              top-3
              font-mono
              text-[8px]
              tracking-[0.16em]
              text-slate
            "
          >
            ORDER_FLOW / 03
          </div>

          {/* Technical top-right label */}
          <div
            className="
              absolute
              right-4
              top-3
              flex
              items-center
              gap-1.5
              font-mono
              text-[8px]
              tracking-[0.16em]
              text-slate
            "
          >
            <span
              className="
                w-1.5
                h-1.5
                rounded-full
                bg-volt
                headlight-pulse
              "
            />

            LIVE
          </div>

          {/* =================================================
              MAIN HORIZONTAL TIMELINE
          ================================================= */}

          <div
            className="
              absolute
              left-[20%]
              right-[20%]
              top-[67%]
              border-t
              border-dashed
              border-ink
            "
            style={{
              opacity: 0.16,
            }}
          />

          {/* Small ground line */}
          <div
            className="
              absolute
              left-[20%]
              right-[20%]
              top-[71%]
              h-px
              bg-ink
            "
            style={{
              opacity: 0.05,
            }}
          />

          {/* =================================================
              POINT 1
          ================================================= */}

          <motion.div
            className="
              absolute
              left-[20%]
              top-[67%]
              z-10
              w-2
              h-2
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-blueprint
            "
            animate={{
              scale: activeStage === 0 ? 1.4 : 1,
              opacity: activeStage === 0 ? 1 : 0.3,
            }}
            transition={{
              duration: 0.25,
            }}
          />

          {/* =================================================
              POINT 2
          ================================================= */}

          <motion.div
            className="
              absolute
              left-[50%]
              top-[67%]
              z-10
              w-2
              h-2
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-blueprint
            "
            animate={{
              scale: activeStage === 1 ? 1.4 : 1,
              opacity: activeStage === 1 ? 1 : 0.3,
            }}
            transition={{
              duration: 0.25,
            }}
          />

          {/* =================================================
              POINT 3
          ================================================= */}

          <motion.div
            className="
              absolute
              left-[80%]
              top-[67%]
              z-10
              w-2
              h-2
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-blueprint
            "
            animate={{
              scale: activeStage === 2 ? 1.4 : 1,
              opacity: activeStage === 2 ? 1 : 0.3,
            }}
            transition={{
              duration: 0.25,
            }}
          />

          {/* =================================================
              HOUSE
              
              Always lives at Point 3.
          ================================================= */}

          <div
            className="
              absolute
              left-[80%]
              top-[44%]
              -translate-x-1/2
              -translate-y-1/2
            "
          >
            <DestinationHouse />
          </div>

          {/* =================================================
              BOX
              
              Starts at Point 1.
          ================================================= */}

          <ShippingBox
            controls={boxControls}
            leftFlapControls={leftFlapControls}
            rightFlapControls={rightFlapControls}
            tapeControls={tapeControls}
          />

          {/* =================================================
              SPARK PLUG
              
              Starts directly above Point 1.
              It ONLY moves vertically.
          ================================================= */}

          <motion.div
            animate={plugControls}
            className="
              absolute
              z-50
              flex
              items-center
              justify-center
            "
            style={{
              x: '-50%',
              y: '-50%',
            }}
          >
            <SparkPlug className="w-10 h-[90px] md:w-11 md:h-[99px]" />
          </motion.div>

          {/* =================================================
              TRUCK
              
              Starts at Point 2.
          ================================================= */}

          <DeliveryTruck controls={truckControls} />

          {/* =================================================
              STAGE LABELS
          ================================================= */}

          <StageLabel
            number="01"
            title="PACK"
            description="Drop & seal"
            active={activeStage === 0}
            position="left-[20%] bottom-3"
          />

          <StageLabel
            number="02"
            title="SHIP"
            description="Load & dispatch"
            active={activeStage === 1}
            position="left-[50%] bottom-3"
          />

          <StageLabel
            number="03"
            title="ARRIVE"
            description="At your doorstep"
            active={activeStage === 2}
            position="left-[80%] bottom-3"
          />

        </div>

        {/* =================================================
            BOTTOM MICRO FLOW
        ================================================= */}

        <div
          className="
            flex
            items-center
            justify-center
            gap-2
            mt-3
            font-mono
            text-[8px]
            tracking-[0.13em]
            uppercase
            text-slate
          "
        >
          <span>PART</span>

          <span className="text-blueprint">
            →
          </span>

          <span>BOX</span>

          <span className="text-blueprint">
            →
          </span>

          <span>TRUCK</span>

          <span className="text-blueprint">
            →
          </span>

          <span>HOME</span>
        </div>

      </div>
    </section>
  )
}