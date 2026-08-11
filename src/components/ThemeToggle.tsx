import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  const theme = document.documentElement.dataset.theme
  return theme === 'dark' ? 'dark' : 'light'
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const nextTheme = theme === 'light' ? 'dark' : 'light'

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      {theme === 'light' ? (
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M10 1.75v1.5M10 16.75v1.5M4.17 4.17 5.23 5.23M14.77 14.77l1.06 1.06M1.75 10h1.5M16.75 10h1.5M4.17 15.83l1.06-1.06M14.77 5.23l1.06-1.06" />
          <circle cx="10" cy="10" r="3.5" />
        </svg>
      ) : (
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M16.8 12.65A7.25 7.25 0 0 1 7.35 3.2a7.25 7.25 0 1 0 9.45 9.45Z" />
        </svg>
      )}
    </button>
  )
}

export default ThemeToggle
