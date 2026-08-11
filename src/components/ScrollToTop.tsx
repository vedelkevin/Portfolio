import { useEffect, useState } from 'react'

const circleLength = 113

function ScrollToTop() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const progress =
        scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0

      setScrollProgress(Math.min(Math.max(progress, 0), 1))
      setIsVisible(window.scrollY > 320)
    }

    updateScrollProgress()
    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    window.addEventListener('resize', updateScrollProgress)

    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
      window.removeEventListener('resize', updateScrollProgress)
    }
  }, [])

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <button
      className={`scroll-to-top${isVisible ? ' is-visible' : ''}`}
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
    >
      <svg className="scroll-progress" viewBox="0 0 44 44" aria-hidden="true">
        <circle className="scroll-progress-track" cx="22" cy="22" r="18" />
        <circle
          className="scroll-progress-value"
          cx="22"
          cy="22"
          r="18"
          strokeDasharray={circleLength}
          strokeDashoffset={circleLength * (1 - scrollProgress)}
        />
      </svg>
      <svg className="scroll-arrow" viewBox="0 0 20 20" aria-hidden="true">
        <path d="m5 11 5-5 5 5M10 6v9" />
      </svg>
    </button>
  )
}

export default ScrollToTop
