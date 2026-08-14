import { useEffect } from 'react'

const EASING = 0.075
const SETTLE_THRESHOLD = 0.0005

/**
 * Publishes eased, normalised pointer coordinates (-1..1) and page scroll
 * progress (0..1) as custom properties on :root so any decorative layer can
 * react in pure CSS from a single listener and a single animation frame loop.
 */
function usePointerScene() {
  useEffect(() => {
    const root = document.documentElement
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fineQuery = window.matchMedia('(hover: hover) and (pointer: fine)')

    let frame = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const write = (x: number, y: number) => {
      root.style.setProperty('--pointer-x', x.toFixed(4))
      root.style.setProperty('--pointer-y', y.toFixed(4))
    }

    const render = () => {
      currentX += (targetX - currentX) * EASING
      currentY += (targetY - currentY) * EASING
      write(currentX, currentY)

      const settled =
        Math.abs(targetX - currentX) < SETTLE_THRESHOLD &&
        Math.abs(targetY - currentY) < SETTLE_THRESHOLD

      frame = settled ? 0 : requestAnimationFrame(render)
    }

    const requestRender = () => {
      if (!frame) frame = requestAnimationFrame(render)
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      targetX = (event.clientX / window.innerWidth) * 2 - 1
      targetY = (event.clientY / window.innerHeight) * 2 - 1
      requestRender()
    }

    const handlePointerLeave = () => {
      targetX = 0
      targetY = 0
      requestRender()
    }

    const updateScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      root.style.setProperty(
        '--scroll-progress',
        Math.min(Math.max(progress, 0), 1).toFixed(4),
      )
    }

    const enablePointer = () => {
      if (motionQuery.matches || !fineQuery.matches) return
      window.addEventListener('pointermove', handlePointerMove, {
        passive: true,
      })
      document.addEventListener('pointerleave', handlePointerLeave)
    }

    const disablePointer = () => {
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerleave', handlePointerLeave)
      targetX = 0
      targetY = 0
      currentX = 0
      currentY = 0
      write(0, 0)
    }

    const handlePreferenceChange = () => {
      disablePointer()
      enablePointer()
    }

    write(0, 0)
    updateScroll()
    enablePointer()

    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', updateScroll)
    motionQuery.addEventListener('change', handlePreferenceChange)
    fineQuery.addEventListener('change', handlePreferenceChange)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      disablePointer()
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('resize', updateScroll)
      motionQuery.removeEventListener('change', handlePreferenceChange)
      fineQuery.removeEventListener('change', handlePreferenceChange)
    }
  }, [])
}

export default usePointerScene
