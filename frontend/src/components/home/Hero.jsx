import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative overflow-hidden bg-steel border-b border-ink/10">
      {/* Drifting blueprint grid — pure CSS, GPU-cheap */}
      <div
        className="absolute inset-0 opacity-[0.07] animate-grid-pan"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-blueprint) 1px, transparent 1px), linear-gradient(90deg, var(--color-blueprint) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-16 md:pt-28 md:pb-24">
        <span className="font-mono text-xs tracking-widest text-blueprint uppercase">
          Wholesale &amp; Retail — Pakistan
        </span>

        <h1 className="font-display font-semibold text-ink text-4xl md:text-6xl leading-[1.05] mt-4 max-w-3xl">
          Genuine auto parts, built for the road and priced for the trade.
        </h1>

        <p className="font-body text-slate text-lg mt-6 max-w-xl">
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

        {/* Blueprint car — draws itself in once on load */}
        <div className="mt-16 md:mt-6 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:w-[46%] w-full">
          <svg
            viewBox="0 0 800 300"
            className="w-full h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Car body */}
            <path
              d="M50,180 L50,150 C50,140 60,130 75,128 L150,110 C180,80 220,58 260,58 L420,58 C460,58 490,80 510,110 L580,128 C610,130 640,140 650,150 L720,155 C740,155 750,165 750,180 L750,190 L50,190 Z"
              stroke="var(--color-blueprint)"
              strokeWidth="2.5"
              strokeDasharray="3200"
              strokeDashoffset={drawn ? 0 : 3200}
              style={{ transition: 'stroke-dashoffset 2.4s ease' }}
            />
            {/* Wheels */}
            {[150, 600].map((cx, i) => (
              <g key={cx}>
                <circle
                  cx={cx}
                  cy="190"
                  r="35"
                  stroke="var(--color-blueprint)"
                  strokeWidth="2.5"
                  strokeDasharray="220"
                  strokeDashoffset={drawn ? 0 : 220}
                  style={{ transition: `stroke-dashoffset 1.2s ease ${1.6 + i * 0.2}s` }}
                />
                <circle
                  cx={cx}
                  cy="190"
                  r="16"
                  stroke="var(--color-blueprint-light)"
                  strokeWidth="1.5"
                  opacity={drawn ? 1 : 0}
                  style={{ transition: `opacity 0.6s ease ${2.4 + i * 0.2}s` }}
                />
              </g>
            ))}
            {/* Measurement ticks — engineering-drawing detail */}
            <g
              stroke="var(--color-slate)"
              strokeWidth="1"
              opacity={drawn ? 0.6 : 0}
              style={{ transition: 'opacity 0.8s ease 2.8s' }}
            >
              <line x1="50" y1="230" x2="750" y2="230" strokeDasharray="4 4" />
              <line x1="50" y1="220" x2="50" y2="240" />
              <line x1="750" y1="220" x2="750" y2="240" />
            </g>
            <text
              x="400"
              y="255"
              textAnchor="middle"
              fill="var(--color-slate)"
              fontFamily="var(--font-mono)"
              fontSize="13"
              opacity={drawn ? 0.7 : 0}
              style={{ transition: 'opacity 0.8s ease 3s' }}
            >
              FIG. 01 — CHASSIS REFERENCE
            </text>
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero