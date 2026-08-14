import { useEffect, useRef, useState } from 'react'
import type { ComponentType } from 'react'

type SceneVariant = 'hero' | 'work' | 'about' | 'achievements' | 'closing'

type Scene = {
  far: ComponentType
  mid: ComponentType
  near: ComponentType
}

type SceneBackdropProps = {
  variant: SceneVariant
}

const NEURAL_COLUMNS = [
  { x: 44, nodes: [70, 140, 210] },
  { x: 152, nodes: [42, 106, 170, 234] },
  { x: 260, nodes: [70, 140, 210] },
  { x: 356, nodes: [106, 170] },
]

function NeuralArt() {
  return (
    <svg viewBox="0 0 400 280" fill="none" focusable="false">
      {NEURAL_COLUMNS.slice(0, -1).map((column, columnIndex) => {
        const next = NEURAL_COLUMNS[columnIndex + 1]
        return column.nodes.flatMap((y) =>
          next.nodes.map((nextY) => (
            <path
              key={`${columnIndex}-${y}-${nextY}`}
              d={`M${column.x} ${y}L${next.x} ${nextY}`}
              className="scene-hairline"
            />
          )),
        )
      })}
      {NEURAL_COLUMNS.flatMap((column) =>
        column.nodes.map((y) => (
          <circle
            key={`${column.x}-${y}`}
            cx={column.x}
            cy={y}
            r="5"
            className="scene-node"
          />
        )),
      )}
    </svg>
  )
}

function TerminalArt() {
  return (
    <svg viewBox="0 0 340 230" fill="none" focusable="false">
      <rect x="1" y="1" width="338" height="228" rx="14" />
      <path d="M1 46h338" />
      <circle cx="26" cy="23.5" r="4.5" className="scene-node" />
      <circle cx="44" cy="23.5" r="4.5" />
      <circle cx="62" cy="23.5" r="4.5" />
      <g strokeLinecap="round">
        <path d="M28 82h26" className="scene-accent" />
        <path d="M64 82h84M28 110h52M92 110h108M44 138h44M100 138h72M28 166h34M74 166h122M28 194h64" />
      </g>
    </svg>
  )
}

function BracketArt() {
  return (
    <svg viewBox="0 0 260 180" fill="none" focusable="false">
      <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M84 40 30 90l54 50" />
        <path d="M176 40l54 50-54 50" />
        <path d="M148 26 112 154" className="scene-accent" />
      </g>
    </svg>
  )
}

function ConstellationArt() {
  return (
    <svg viewBox="0 0 380 300" fill="none" focusable="false">
      <path
        d="M36 254 128 168 218 208 304 74"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M128 168 154 62M218 208 304 74M154 62 304 74" className="scene-hairline" />
      <circle cx="36" cy="254" r="6" className="scene-node" />
      <circle cx="128" cy="168" r="6" />
      <circle cx="154" cy="62" r="6" />
      <circle cx="218" cy="208" r="6" />
      <circle cx="304" cy="74" r="8" className="scene-node" />
    </svg>
  )
}

function ArchArt() {
  return (
    <svg viewBox="0 0 320 260" fill="none" focusable="false">
      <path d="M40 248V132a48 48 0 0 1 96 0v116" />
      <path d="M104 248V96a56 56 0 0 1 112 0v152" className="scene-accent" />
      <path d="M184 248V140a44 44 0 0 1 88 0v108" />
      <path d="M16 248h288" strokeLinecap="round" />
      <circle cx="160" cy="96" r="7" className="scene-node" />
    </svg>
  )
}

function ContourArt() {
  return (
    <svg viewBox="0 0 1200 300" fill="none" focusable="false">
      <path d="M-20 268c150-6 236-52 420-52s300 44 480 38 190-30 340-38" />
      <path d="M-20 228c164-12 252-52 436-52s298 40 478 34 176-26 326-34" />
      <path
        d="M-20 188c178-18 268-50 452-50s296 36 476 30 162-22 312-30"
        className="scene-accent"
      />
      <path d="M-20 148c192-24 284-46 468-46s294 32 474 26 148-18 298-26" />
      <path d="M-20 108c206-30 300-42 484-42s292 28 472 22 134-14 284-22" />
      <path
        d="M-20 68c220-36 316-38 500-38s290 24 470 18 120-10 270-18"
        className="scene-hairline"
      />
      <circle cx="452" cy="138" r="7" className="scene-node" />
    </svg>
  )
}

function CircuitArt() {
  return (
    <svg viewBox="0 0 300 300" fill="none" focusable="false">
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 60h80l32 32h60" />
        <path d="M20 150h44l36-36h72l28 28h64" className="scene-accent" />
        <path d="M20 240h104l40-40h100" />
        <path d="M192 92v148" className="scene-hairline" />
      </g>
      <circle cx="192" cy="92" r="5" className="scene-node" />
      <circle cx="264" cy="142" r="5" />
      <circle cx="264" cy="200" r="5" className="scene-node" />
      <rect x="112" y="128" width="40" height="40" rx="7" />
    </svg>
  )
}

function SummitArt() {
  return (
    <svg viewBox="0 0 360 260" fill="none" focusable="false">
      <path
        d="M20 236h56v-44h56v-62h56V60h56v176"
        strokeLinejoin="round"
        className="scene-accent"
      />
      <path d="M8 236h344" strokeLinecap="round" />
      <path d="M188 60V22" className="scene-hairline" />
      <path d="M188 22h56l-14 17 14 17h-56" strokeLinejoin="round" />
      <circle cx="188" cy="60" r="6" className="scene-node" />
    </svg>
  )
}

function OrbitArt() {
  return (
    <svg viewBox="0 0 400 400" fill="none" focusable="false">
      <circle cx="200" cy="200" r="188" strokeDasharray="2 12" strokeLinecap="round" />
      <circle cx="200" cy="200" r="136" />
      <ellipse cx="200" cy="200" rx="188" ry="72" className="scene-hairline" />
      <ellipse
        cx="200"
        cy="200"
        rx="72"
        ry="188"
        className="scene-hairline"
        transform="rotate(28 200 200)"
      />
      <circle cx="200" cy="64" r="7" className="scene-node" />
    </svg>
  )
}

function HorizonArt() {
  return (
    <svg viewBox="0 0 1200 200" fill="none" focusable="false">
      <path d="M0 168h1200" strokeLinecap="round" />
      <path d="M0 136h1200M0 104h1200" className="scene-hairline" />
      <path
        d="M600 26a78 78 0 0 1 78 78"
        className="scene-accent"
        strokeLinecap="round"
      />
      <circle cx="600" cy="104" r="78" />
      <circle cx="600" cy="104" r="9" className="scene-node" />
      <path d="M300 168V88M900 168V88" className="scene-hairline" />
      <circle cx="300" cy="88" r="5" className="scene-node" />
      <circle cx="900" cy="88" r="5" className="scene-node" />
    </svg>
  )
}

const SCENES: Record<SceneVariant, Scene> = {
  hero: { far: OrbitArt, mid: TerminalArt, near: ConstellationArt },
  work: { far: OrbitArt, mid: NeuralArt, near: ArchArt },
  about: { far: ContourArt, mid: CircuitArt, near: BracketArt },
  achievements: { far: ContourArt, mid: SummitArt, near: ConstellationArt },
  closing: { far: OrbitArt, mid: HorizonArt, near: BracketArt },
}

function SceneBackdrop({ variant }: SceneBackdropProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsRevealed(entry.isIntersecting))
      },
      { rootMargin: '-10% 0px -10% 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const { far: Far, mid: Mid, near: Near } = SCENES[variant]

  return (
    <div
      ref={ref}
      className={`scene${isRevealed ? ' is-revealed' : ''}`}
      data-scene={variant}
      aria-hidden="true"
    >
      <div className="scene-layer scene-layer-far">
        <Far />
      </div>
      <div className="scene-layer scene-layer-mid">
        <Mid />
      </div>
      <div className="scene-layer scene-layer-near">
        <Near />
      </div>
    </div>
  )
}

export default SceneBackdrop
