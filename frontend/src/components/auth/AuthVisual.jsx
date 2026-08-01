import { useEffect, useState } from 'react'

function AuthVisual() {
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="hidden lg:flex relative bg-ink overflow-hidden items-center justify-center p-12">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-blueprint-light) 1px, transparent 1px), linear-gradient(90deg, var(--color-blueprint-light) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="relative max-w-md text-center">
        <svg viewBox="40 40 840 390" className="w-full h-auto mb-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 125,315 L 120,285 C 125,265 145,252 175,248 L 285,232 C 335,192 385,142 440,140 C 510,136 580,138 625,148 C 680,163 740,205 780,240 L 825,248 C 840,255 845,270 842,290 L 835,315 C 830,335 815,340 790,340 L 730,340 A 42 42 0 0 0 646,340 L 292,340 A 42 42 0 0 0 208,340 L 145,340 C 130,340 125,328 125,315 Z"
            stroke="var(--color-blueprint-light)"
            strokeWidth="2.5"
            strokeDasharray="2800"
            strokeDashoffset={drawn ? 0 : 2800}
            style={{ transition: 'stroke-dashoffset 2.2s ease' }}
          />
          <path
            d="M 305,228 C 355,188 400,146 445,144 C 505,141 570,143 612,152 C 655,168 705,205 742,228 Z"
            fill="var(--color-blueprint-light)"
            fillOpacity={drawn ? 0.16 : 0}
            stroke="var(--color-blueprint-light)"
            strokeWidth="1.5"
            strokeDasharray="1100"
            strokeDashoffset={drawn ? 0 : 1100}
            style={{ transition: 'stroke-dashoffset 1s ease 1.3s, fill-opacity 1s ease 1.8s' }}
          />
          {[250, 688].map((cx, i) => (
            <circle
              key={cx} cx={cx} cy="340" r="40"
              stroke="var(--color-blueprint-light)" strokeWidth="2.5"
              strokeDasharray="260" strokeDashoffset={drawn ? 0 : 260}
              style={{ transition: `stroke-dashoffset 1s ease ${1.5 + i * 0.2}s` }}
            />
          ))}
        </svg>
        <h2 className="font-display font-semibold text-2xl text-paper mb-3">
          Genuine parts, wholesale rates
        </h2>
        <p className="font-body text-sm text-steel/60 max-w-xs mx-auto">
          Create an account to track orders, save your delivery details, and reorder in seconds.
        </p>
      </div>
    </div>
  )
}

export default AuthVisual