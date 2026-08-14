import { useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

type InteractivePhotoProps = {
  src: string
  alt: string
  caption: string
  meta: string
}

/**
 * A photo that reacts to the pointer: the frame tilts, the image pans against
 * the tilt for depth, and a soft spotlight tracks the cursor. All motion is
 * expressed through custom properties so `prefers-reduced-motion` can disable
 * it entirely from CSS.
 */
function InteractivePhoto({ src, alt, caption, meta }: InteractivePhotoProps) {
  const ref = useRef<HTMLElement>(null)

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const element = ref.current
    if (!element || event.pointerType !== 'mouse') return

    const bounds = element.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height

    element.style.setProperty('--local-x', (x * 2 - 1).toFixed(4))
    element.style.setProperty('--local-y', (y * 2 - 1).toFixed(4))
    element.style.setProperty('--spot-x', `${(x * 100).toFixed(2)}%`)
    element.style.setProperty('--spot-y', `${(y * 100).toFixed(2)}%`)
  }

  const handlePointerLeave = () => {
    const element = ref.current
    if (!element) return

    element.style.setProperty('--local-x', '0')
    element.style.setProperty('--local-y', '0')
    element.style.setProperty('--spot-x', '50%')
    element.style.setProperty('--spot-y', '50%')
  }

  return (
    <figure
      ref={ref}
      className="photo-card"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="photo-card-inner">
        <img src={src} alt={alt} loading="lazy" decoding="async" />
        <span className="photo-spotlight" aria-hidden="true" />
        <span className="photo-scanlines" aria-hidden="true" />
      </div>
      <figcaption>
        <span className="photo-caption">{caption}</span>
        <span className="photo-meta">{meta}</span>
      </figcaption>
    </figure>
  )
}

export default InteractivePhoto
