import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// Normalized chassis data with identical SVG command signatures for 100% fluid CSS path morphing
const CARS = [
  {
    id: 'sedan',
    figBadge: 'FIG. 01 — CHASSIS SPECIFICATION',
    bodyPath:
      'M 130,310 L 125,285 C 128,265 145,255 175,250 L 280,235 C 330,195 385,145 440,142 C 510,138 580,140 625,150 C 680,165 740,205 780,240 L 820,248 C 835,255 840,270 838,290 L 830,315 C 825,335 810,340 790,340 L 720,340 A 42 42 0 0 0 636,340 L 302,340 A 42 42 0 0 0 218,340 L 150,340 C 135,340 130,325 130,310 Z',
    glassPath:
      'M 310,230 C 355,190 400,148 445,146 C 505,143 570,145 612,154 C 655,170 705,205 742,230 Z',
    wheels: [260, 678],
    pillars: [
      { x1: 480, y1: 145, x2: 480, y2: 340 },
      { x1: 605, y1: 152, x2: 605, y2: 340 },
    ],
    handles: [
      { x: 420, y: 242, w: 22, h: 4 },
      { x: 550, y: 242, w: 22, h: 4 },
    ],
    shoulder: 'M 175,250 C 300,240 600,235 820,248',
    mirror: 'M 315,222 L 290,215 L 295,228 Z',
    headlight: 'M 132,260 L 165,255 L 158,272 Z',
    taillight: 'M 835,255 L 815,250 L 820,270 Z',
    callout1: {
      title: 'SUSPENSION MOUNT',
      sub: 'STRUT & DAMPER ASSY',
      points: '260,300 260,90 200,90',
      textX: 190,
      align: 'end',
      cx: 260,
      cy: 300,
    },
    callout2: {
      title: 'DISC BRAKE SYSTEM',
      sub: 'SLOTTED ROTOR + PAD',
      points: '678,300 678,90 738,90',
      textX: 748,
      align: 'start',
      cx: 678,
      cy: 300,
    },
  },
  {
    id: 'supercar',
    figBadge: 'FIG. 02 — PERFORMANCE SPECIFICATION',
    bodyPath:
      'M 120,322 L 115,302 C 120,288 150,272 200,260 L 330,225 C 410,180 480,152 550,158 C 620,164 670,188 720,228 L 815,255 C 835,265 842,278 840,298 L 835,318 C 830,335 815,340 790,340 L 730,340 A 42 42 0 0 0 646,340 L 292,340 A 42 42 0 0 0 208,340 L 140,340 C 125,340 120,332 120,322 Z',
    glassPath:
      'M 340,222 C 400,182 460,156 520,160 C 575,164 620,182 660,208 C 685,222 710,232 730,238 Z',
    wheels: [250, 688],
    pillars: [
      { x1: 520, y1: 162, x2: 500, y2: 340 },
      { x1: 610, y1: 175, x2: 600, y2: 340 },
    ],
    handles: [
      { x: 480, y: 232, w: 20, h: 3 },
      { x: 530, y: 232, w: 20, h: 3 },
    ],
    shoulder: 'M 160,265 C 340,235 640,225 825,260',
    mirror: 'M 335,212 L 310,204 L 315,220 Z',
    headlight: 'M 122,280 L 175,260 L 160,290 Z',
    taillight: 'M 840,275 L 805,268 L 812,288 Z',
    callout1: {
      title: 'AERODYNAMIC SPLITTER',
      sub: 'CARBON COMPOSITE',
      points: '250,300 250,90 190,90',
      textX: 180,
      align: 'end',
      cx: 250,
      cy: 300,
    },
    callout2: {
      title: 'CARBON CERAMIC BRAKES',
      sub: '6-PISTON MONOBLOC',
      points: '688,300 688,90 748,90',
      textX: 758,
      align: 'start',
      cx: 688,
      cy: 300,
    },
  },
  {
    id: 'executive',
    figBadge: 'FIG. 03 — EXECUTIVE SPECIFICATION',
    bodyPath:
      'M 130,310 L 122,275 C 125,255 145,245 180,240 L 290,230 C 350,185 410,138 480,135 C 555,132 625,135 670,150 C 725,170 760,205 795,238 L 830,248 C 845,258 848,272 845,292 L 835,318 C 830,338 815,340 790,340 L 730,340 A 42 42 0 0 0 646,340 L 292,340 A 42 42 0 0 0 208,340 L 150,340 C 135,340 130,325 130,310 Z',
    glassPath:
      'M 320,222 C 375,178 430,140 485,138 C 555,135 625,138 670,152 C 715,175 745,210 765,225 Z',
    wheels: [250, 688],
    pillars: [
      { x1: 490, y1: 138, x2: 490, y2: 340 },
      { x1: 615, y1: 145, x2: 615, y2: 340 },
    ],
    handles: [
      { x: 430, y: 236, w: 22, h: 4 },
      { x: 560, y: 236, w: 22, h: 4 },
    ],
    shoulder: 'M 180,240 C 320,230 620,225 830,250',
    mirror: 'M 325,215 L 300,208 L 305,222 Z',
    headlight: 'M 125,250 L 165,245 L 158,265 Z',
    taillight: 'M 840,260 L 815,255 L 820,275 Z',
    callout1: {
      title: 'AIR SUSPENSION',
      sub: 'MULTI-CHAMBER SYSTEM',
      points: '250,300 250,90 190,90',
      textX: 180,
      align: 'end',
      cx: 250,
      cy: 300,
    },
    callout2: {
      title: 'RADAR & SENSOR MATRIX',
      sub: 'DRIVE PILOT ASSIST',
      points: '688,300 688,90 748,90',
      textX: 758,
      align: 'start',
      cx: 688,
      cy: 300,
    },
  },
]

function Hero() {
  const [carIndex, setCarIndex] = useState(0)
  const [drawn, setDrawn] = useState(false)
  const [textVisible, setTextVisible] = useState(true)

  const activeCar = CARS[carIndex]

  // Initial draw animation trigger
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Morph loop
  useEffect(() => {
    const interval = setInterval(() => {
      setTextVisible(false)

      setTimeout(() => {
        setCarIndex((prev) => (prev + 1) % CARS.length)
        setTextVisible(true)
      }, 350)
    }, 4500)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden bg-steel pb-20">
      {/* Drifting blueprint grid background */}
      <div
        className="absolute inset-0 opacity-[0.07] animate-grid-pan"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-blueprint) 1px, transparent 1px), linear-gradient(90deg, var(--color-blueprint) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-2 gap-12 md:gap-8 items-center">
        {/* Text column */}
        <div className="max-w-xl">
          <span className="font-mono text-xs tracking-widest text-blueprint uppercase">
            Wholesale &amp; Retail — Pakistan
          </span>

          <h1 className="font-display font-semibold text-ink text-4xl md:text-5xl leading-[1.05] mt-4">
            Genuine auto parts, built for the road and priced for the trade.
          </h1>

          <p className="font-body text-slate text-lg mt-6 max-w-md">
            Engine, suspension, electrical and body parts for every major make — supplied to workshops, dealers and individual buyers nationwide.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              to="/products"
              className="bg-ink text-paper font-body font-medium px-7 py-3 rounded-md hover:bg-blueprint transition-colors"
            >
              Browse Catalog
            </Link>
            <Link
              to="/wholesale"
              className="bg-ignition text-paper font-body font-medium px-7 py-3 rounded-md hover:brightness-95 transition"
            >
              Wholesale Pricing
            </Link>
          </div>
        </div>

        {/* Blueprint SVG column */}
        <div className="w-full">
          <svg
            viewBox="40 40 840 390"
            className="w-full h-auto drop-shadow-sm"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ground shadow */}
            <ellipse
              cx="460"
              cy="365"
              rx="360"
              ry="12"
              fill="var(--color-ink)"
              opacity={drawn ? 0.07 : 0}
              style={{ transition: 'opacity 0.8s ease' }}
            />

            {/* Body Outer Shell */}
            <path
              d={activeCar.bodyPath}
              stroke="var(--color-blueprint)"
              strokeWidth="2.5"
              strokeDasharray="2800"
              strokeDashoffset={drawn ? 0 : 2800}
              style={{
                transition:
                  'd 1.2s cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 2.4s ease',
              }}
            />

            {/* Glass / cabin */}
            <path
              d={activeCar.glassPath}
              fill="var(--color-blueprint-light)"
              fillOpacity={drawn ? 0.16 : 0}
              stroke="var(--color-blueprint)"
              strokeWidth="1.5"
              strokeDasharray="1100"
              strokeDashoffset={drawn ? 0 : 1100}
              style={{
                transition:
                  'd 1.2s cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 1s ease 1.2s, fill-opacity 0.8s ease 1.8s',
              }}
            />

            {/* Door pillars */}
            {activeCar.pillars.map((p, i) => (
              <line
                key={i}
                x1={p.x1}
                y1={p.y1}
                x2={p.x2}
                y2={p.y2}
                stroke="var(--color-blueprint)"
                strokeWidth="1.5"
                opacity={drawn ? 0.8 : 0}
                style={{
                  transition:
                    'x1 1.2s ease, y1 1.2s ease, x2 1.2s ease, y2 1.2s ease, opacity 0.5s ease 1.6s',
                }}
              />
            ))}

            {/* Door handles */}
            {activeCar.handles.map((h, i) => (
              <rect
                key={i}
                x={h.x}
                y={h.y}
                width={h.w}
                height={h.h}
                rx="1"
                fill="var(--color-blueprint-light)"
                opacity={drawn ? 0.9 : 0}
                style={{
                  transition:
                    'x 1.2s ease, y 1.2s ease, opacity 0.5s ease 1.8s',
                }}
              />
            ))}

            {/* Shoulder character line */}
            <path
              d={activeCar.shoulder}
              stroke="var(--color-blueprint)"
              strokeWidth="1"
              strokeDasharray="6 3"
              opacity={drawn ? 0.6 : 0}
              style={{
                transition: 'd 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease 1.7s',
              }}
            />

            {/* Mirror */}
            <path
              d={activeCar.mirror}
              fill="var(--color-blueprint)"
              opacity={drawn ? 0.9 : 0}
              style={{
                transition: 'd 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease 1.7s',
              }}
            />

            {/* Headlight */}
            <path
              d={activeCar.headlight}
              fill="var(--color-blueprint-light)"
              className={drawn ? 'headlight-pulse' : ''}
              opacity={drawn ? 0.9 : 0}
              style={{
                transition: 'd 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease 1.9s',
              }}
            />

            {/* Taillight */}
            <path
              d={activeCar.taillight}
              fill="var(--color-ignition)"
              opacity={drawn ? 0.9 : 0}
              style={{
                transition: 'd 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease 1.9s',
              }}
            />

            {/* Wheels */}
            {activeCar.wheels.map((cx, i) => (
              <g
                key={i}
                style={{
                  transform: `translateX(${cx - (i === 0 ? 260 : 678)}px)`,
                  transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <circle
                  cx={i === 0 ? 260 : 678}
                  cy="340"
                  r="40"
                  stroke="var(--color-blueprint)"
                  strokeWidth="2.5"
                  strokeDasharray="260"
                  strokeDashoffset={drawn ? 0 : 260}
                  style={{
                    transition: `stroke-dashoffset 1s ease ${1.4 + i * 0.2}s`,
                  }}
                />
                <circle
                  cx={i === 0 ? 260 : 678}
                  cy="340"
                  r="24"
                  stroke="var(--color-slate)"
                  strokeWidth="1"
                  strokeDasharray="6 2"
                  opacity={drawn ? 0.6 : 0}
                  style={{ transition: `opacity 0.5s ease ${1.8 + i * 0.2}s` }}
                />
                <circle
                  cx={i === 0 ? 260 : 678}
                  cy="340"
                  r="8"
                  fill="var(--color-paper)"
                  stroke="var(--color-blueprint)"
                  strokeWidth="1.2"
                  opacity={drawn ? 1 : 0}
                  style={{ transition: `opacity 0.5s ease ${2.0 + i * 0.2}s` }}
                />
                <g
                  className={drawn ? 'spoke-spin' : ''}
                  style={{
                    transformBox: 'fill-box',
                    transformOrigin: 'center',
                    opacity: drawn ? 0.85 : 0,
                    animationDirection: 'reverse',
                    transition: `opacity 0.5s ease ${2.2 + i * 0.2}s`,
                  }}
                >
                  {[0, 60, 120, 180, 240, 300].map((angle) => (
                    <line
                      key={angle}
                      x1={i === 0 ? 260 : 678}
                      y1="340"
                      x2={
                        (i === 0 ? 260 : 678) +
                        32 * Math.cos((angle * Math.PI) / 180)
                      }
                      y2={340 + 32 * Math.sin((angle * Math.PI) / 180)}
                      stroke="var(--color-blueprint-light)"
                      strokeWidth="1.2"
                    />
                  ))}
                </g>
              </g>
            ))}

            {/* Callout 1 */}
            <g
              opacity={drawn && textVisible ? 1 : 0}
              style={{ transition: 'opacity 0.35s ease' }}
            >
              <circle
                cx={activeCar.callout1.cx}
                cy={activeCar.callout1.cy}
                r="3"
                fill="var(--color-blueprint)"
              />
              <polyline
                points={activeCar.callout1.points}
                fill="none"
                stroke="var(--color-blueprint)"
                strokeWidth="1"
                strokeDasharray="3 2"
              />
              <text
                x={activeCar.callout1.textX}
                y="82"
                textAnchor={activeCar.callout1.align}
                fill="var(--color-ink)"
                fontFamily="var(--font-display)"
                fontSize="12"
                fontWeight="600"
              >
                {activeCar.callout1.title}
              </text>
              <text
                x={activeCar.callout1.textX}
                y="97"
                textAnchor={activeCar.callout1.align}
                fill="var(--color-slate)"
                fontFamily="var(--font-mono)"
                fontSize="10"
              >
                {activeCar.callout1.sub}
              </text>
            </g>

            {/* Callout 2 */}
            <g
              opacity={drawn && textVisible ? 1 : 0}
              style={{ transition: 'opacity 0.35s ease' }}
            >
              <circle
                cx={activeCar.callout2.cx}
                cy={activeCar.callout2.cy}
                r="3"
                fill="var(--color-blueprint)"
              />
              <polyline
                points={activeCar.callout2.points}
                fill="none"
                stroke="var(--color-blueprint)"
                strokeWidth="1"
                strokeDasharray="3 2"
              />
              <text
                x={activeCar.callout2.textX}
                y="82"
                textAnchor={activeCar.callout2.align}
                fill="var(--color-ink)"
                fontFamily="var(--font-display)"
                fontSize="12"
                fontWeight="600"
              >
                {activeCar.callout2.title}
              </text>
              <text
                x={activeCar.callout2.textX}
                y="97"
                textAnchor={activeCar.callout2.align}
                fill="var(--color-slate)"
                fontFamily="var(--font-mono)"
                fontSize="10"
              >
                {activeCar.callout2.sub}
              </text>
            </g>

            {/* Ground reference */}
            <g
              stroke="var(--color-slate)"
              strokeWidth="1"
              opacity={drawn ? 0.5 : 0}
              style={{ transition: 'opacity 0.8s ease 2.7s' }}
            >
              <line x1="140" y1="395" x2="800" y2="395" strokeDasharray="4 4" />
              <line x1="140" y1="388" x2="140" y2="402" />
              <line x1="800" y1="388" x2="800" y2="402" />
            </g>
            <text
              x="460"
              y="420"
              textAnchor="middle"
              fill="var(--color-slate)"
              fontFamily="var(--font-mono)"
              fontSize="12"
              opacity={drawn && textVisible ? 0.7 : 0}
              style={{ transition: 'opacity 0.35s ease' }}
            >
              {activeCar.figBadge}
            </text>
          </svg>
        </div>
      </div>

      {/* Subtle modern section boundary */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none">
        {/* Soft gradient divider line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blueprint/35 to-transparent" />

       
      </div>
    </section>
  )
}

export default Hero