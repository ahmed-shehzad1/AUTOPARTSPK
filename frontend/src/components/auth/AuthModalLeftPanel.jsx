import React from 'react'

/**
 * AuthModalLeftPanel
 * 
 * Creative Choice:
 * - Abstract "Exploded CAD Blueprint" graphic represents parts precision without using cliché car vectors.
 * - Single idle animation: a slow 45-second rotation of the outer angular reticle ring.
 * - Single entrance animation: a keyframe dash-draw + scale-in effect on mount.
 * - Uses strictly CSS custom properties for total theme integration.
 */
export default function AuthModalLeftPanel() {
  return (
<div className="relative flex flex-col justify-between w-full h-full p-8 md:p-10 overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)] rounded-l-2xl border-r border-[var(--color-steel)]/20 select-none">
      {/* Embedded scoped animation keyframes for 100% self-containment */}
      <style>{`
        @keyframes blueprintDraw {
          0% {
            stroke-dashoffset: 1000;
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        @keyframes panelEntrance {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slowReticleRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulseNode {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.25);
          }
        }

        .animate-panel-entrance {
          animation: panelEntrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-blueprint-line {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: blueprintDraw 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-reticle-idle {
          transform-origin: 200px 200px;
          animation: slowReticleRotate 45s linear infinite;
        }

        .animate-node-pulse {
          transform-origin: center;
          animation: pulseNode 3s ease-in-out infinite;
        }
      `}</style>

      {/* Subtle Background Blueprint Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-blueprint) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-blueprint) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)'
        }}
      />

      {/* Header Badge */}
      <div className="relative z-10 flex items-center justify-between animate-panel-entrance">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-steel)]/10 border border-[var(--color-steel)]/20 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-volt)] animate-node-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-steel)] font-semibold">
            B2B WHOLESALE SPEC
          </span>
        </div>
        <span className="font-mono text-[10px] text-[var(--color-steel)]/50 tracking-wider">
          CAD // 0.002mm
        </span>
      </div>

      {/* Center Graphic: Technical CAD Exploded Schematic */}
      <div className="relative z-10 my-auto flex items-center justify-center py-6 animate-panel-entrance" style={{ animationDelay: '150ms' }}>
        <svg 
          viewBox="0 0 400 400" 
          className="w-full max-w-[340px] aspect-square overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Creative Choice: Angular degree tick marks establishing coordinate precision */}
          <g className="animate-reticle-idle" stroke="var(--color-blueprint)" strokeWidth="1" opacity="0.35">
            <circle cx="200" cy="200" r="175" strokeDasharray="2 8" />
            <circle cx="200" cy="200" r="155" strokeDasharray="1 15" />
            {/* Degree indicators */}
            <line x1="200" y1="20" x2="200" y2="30" stroke="var(--color-blueprint-light)" strokeWidth="2" />
            <line x1="380" y1="200" x2="370" y2="200" stroke="var(--color-blueprint-light)" strokeWidth="2" />
            <line x1="200" y1="380" x2="200" y2="370" stroke="var(--color-blueprint-light)" strokeWidth="2" />
            <line x1="20" y1="200" x2="30" y2="200" stroke="var(--color-blueprint-light)" strokeWidth="2" />
          </g>

          {/* Coordinate Crosshairs */}
          <path 
            d="M 50 200 H 350 M 200 50 V 350" 
            stroke="var(--color-steel)" 
            strokeWidth="1" 
            strokeDasharray="4 6" 
            opacity="0.25"
          />

          {/* Core Outer Precision Gear Ring */}
          <circle 
            cx="200" 
            cy="200" 
            r="120" 
            stroke="var(--color-blueprint)" 
            strokeWidth="1.5"
            strokeDasharray="12 4"
            className="animate-blueprint-line"
          />

          {/* Inner Structural Ring Stack */}
          <circle 
            cx="200" 
            cy="200" 
            r="90" 
            stroke="var(--color-paper)" 
            strokeWidth="1" 
            opacity="0.2"
          />
          <circle 
            cx="200" 
            cy="200" 
            r="65" 
            stroke="var(--color-blueprint-light)" 
            strokeWidth="2"
            className="animate-blueprint-line"
            style={{ animationDelay: '300ms' }}
          />

          {/* Center Assembly Shaft / Core Node */}
          <circle 
            cx="200" 
            cy="200" 
            r="32" 
            fill="var(--color-ink)"
            stroke="var(--color-volt)" 
            strokeWidth="1.5"
          />
          <circle cx="200" cy="200" r="8" fill="var(--color-volt)" />

          {/* Creative Choice: Exploded dimensional callouts pointing to key alignment nodes */}
          {/* Callout 1 - Top Right: OEM Match */}
          <g className="animate-panel-entrance" style={{ animationDelay: '400ms' }}>
            <polyline 
              points="245,155 310,100 360,100" 
              stroke="var(--color-blueprint-light)" 
              strokeWidth="1.2" 
              fill="none"
            />
            <circle cx="245" cy="155" r="3" fill="var(--color-blueprint-light)" />
            <text x="312" y="92" fill="var(--color-blueprint-light)" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1">
              SPEC :: OEM_MATCH
            </text>
          </g>

          {/* Callout 2 - Bottom Left: Tolerance Verification */}
          <g className="animate-panel-entrance" style={{ animationDelay: '550ms' }}>
            <polyline 
              points="155,245 90,300 35,300" 
              stroke="var(--color-gold)" 
              strokeWidth="1.2" 
              fill="none"
              opacity="0.8"
            />
            <circle cx="155" cy="245" r="3" fill="var(--color-gold)" />
            <text x="37" y="292" fill="var(--color-gold)" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1">
              TOLERANCE :: PASS
            </text>
          </g>

          {/* Creative Choice: Vector Dimension Measurement Brackets */}
          <path 
            d="M 120 70 L 120 50 L 280 50 L 280 70" 
            stroke="var(--color-steel)" 
            strokeWidth="1" 
            fill="none"
            opacity="0.4"
          />
          <text 
            x="200" 
            y="44" 
            textAnchor="middle" 
            fill="var(--color-steel)" 
            fontFamily="var(--font-mono)" 
            fontSize="8" 
            letterSpacing="1.5"
            opacity="0.7"
          >
            PARTS INDEX MATRIX
          </text>
        </svg>
      </div>

      {/* Footer Text Lockup */}
      <div className="relative z-10 space-y-3 animate-panel-entrance" style={{ animationDelay: '300ms' }}>
        <h2 className="font-display font-bold text-2xl lg:text-3xl tracking-tight text-[var(--color-paper)] leading-tight">
          Engineered Trust. <br />
          <span className="text-[var(--color-blueprint-light)]">Direct Wholesale Supply.</span>
        </h2>
        <p className="font-body text-xs lg:text-sm text-[var(--color-steel)] leading-relaxed max-w-xs">
          Access verified OEM components, tiered trade margins, and rapid fulfillment built for high-volume workshops and distributors.
        </p>

        {/* Quiet footer compliance note */}
        <div className="pt-4 border-t border-[var(--color-steel)]/15 flex items-center justify-between text-[10px] font-mono text-[var(--color-steel)]/60">
          <span>CATALOG v4.2</span>
          <span>TRADE PORTAL</span>
        </div>
      </div>
    </div>
  )
}