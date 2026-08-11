import ThemeToggle from './components/ThemeToggle'
import ScrollToTop from './components/ScrollToTop'
import './App.css'

const interests = [
  'Software development',
  'Web development',
  'Artificial intelligence',
  'LLM applications',
  'UI/UX',
  'Derivatives',
  'Economics',
  'Product development',
  'Sales and marketing',
]

const achievementAreas = [
  'Certifications',
  'Hackathons & competitions',
  'Academic achievements',
  'Innovation challenges',
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" />
    </svg>
  )
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Kevin Langat, home">
          <span className="wordmark-mark">K</span>
          <span className="wordmark-copy">
            <span>Kevin Langat</span>
            <span className="wordmark-slogan">Carpe Diem</span>
          </span>
        </a>

        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#achievements">Achievements</a>
        </nav>

        <ThemeToggle />
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-status">
            <span aria-hidden="true" />
            Student developer
          </div>
          <h1>
            Learning by building.
            <br />
            <span>Turning ideas into useful things.</span>
          </h1>
          <p className="hero-copy">
            I&apos;m Kevin Langat, a student developer exploring software, AI, and
            creative technology through ambitious, practical projects.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              Explore my work
              <ArrowIcon />
            </a>
            <a className="button button-secondary" href="#about">
              More about me
            </a>
          </div>
          <div className="hero-grid" aria-hidden="true">
            <span>01</span>
            <span>Build</span>
            <span>Learn</span>
            <span>Iterate</span>
          </div>
        </section>

        <section className="section" id="work">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Featured work</p>
              <h2>Ideas explored with intent.</h2>
            </div>
            <p>
              A growing collection of projects that combine technical
              problem-solving with thoughtful product design.
            </p>
          </div>

          <article className="project-card">
            <div className="project-visual" aria-hidden="true">
              <div className="memory-orbit orbit-one" />
              <div className="memory-orbit orbit-two" />
              <div className="memory-core">M</div>
              <div className="project-grid-lines" />
            </div>
            <div className="project-content">
              <div className="project-meta">
                <span className="status-badge">Concept</span>
                <span>AI · Educational technology</span>
              </div>
              <h3>Memora</h3>
              <p>
                An AI-powered learning and memory-palace concept exploring
                interactive learning, mastery tracking, and LLM-powered
                teach-back experiences.
              </p>
              <div className="project-focus">
                <span>Interactive learning</span>
                <span>Mastery tracking</span>
                <span>Teach-back</span>
              </div>
              <p className="project-note">
                Currently documented as a concept. Development details and
                outcomes will be added as the project evolves.
              </p>
            </div>
          </article>
        </section>

        <section className="section about-section" id="about">
          <div className="section-heading">
            <div>
              <p className="eyebrow">About</p>
              <h2>Curious by nature.<br />Practical by choice.</h2>
            </div>
          </div>

          <div className="photo-strip">
            <figure className="photo-card photo-card-wide">
              <img
                src="/images/building.webp"
                alt="Laptop displaying code in a development workspace"
                loading="lazy"
                decoding="async"
              />
              <figcaption>Build</figcaption>
            </figure>
            <figure className="photo-card">
              <img
                src="/images/analysis.webp"
                alt="Analytics dashboard showing data visualizations"
                loading="lazy"
                decoding="async"
              />
              <figcaption>Analyze</figcaption>
            </figure>
            <figure className="photo-card">
              <img
                src="/images/collaboration.webp"
                alt="Team collaborating around a table"
                loading="lazy"
                decoding="async"
              />
              <figcaption>Collaborate</figcaption>
            </figure>
          </div>

          <div className="about-grid">
            <div className="about-copy">
              <p className="lead">
                I&apos;m interested in how emerging technology can become
                clear, accessible, and genuinely useful.
              </p>
              <p>
                My work sits at the intersection of software development,
                artificial intelligence, and creative technology. I learn
                independently, test ideas by building, and care about both how
                products work and how they feel to use.
              </p>
              <div className="contact-links" aria-label="Contact links">
                <a href="mailto:kevindek54@gmail.com">
                  <span>Email</span>
                  kevindek54@gmail.com
                </a>
                <a
                  href="https://www.instagram.com/ved.el.kev/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Instagram</span>
                  @ved.el.kev
                </a>
                <a
                  href="https://github.com/vedelkevin"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>GitHub</span>
                  @vedelkevin
                </a>
              </div>
            </div>

            <div className="interests">
              <p className="list-label">Areas I&apos;m exploring</p>
              <ul>
                {interests.map((interest, index) => (
                  <li key={interest}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="achievements">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Achievements</p>
              <h2>A record of progress.</h2>
            </div>
            <p>
              Verified milestones and experiences will be documented here as
              the portfolio develops.
            </p>
          </div>

          <div className="achievement-grid">
            {achievementAreas.map((area, index) => (
              <article className="achievement-card" key={area}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{area}</h3>
                <p>Details to be added.</p>
              </article>
            ))}
          </div>
        </section>

        <section className="closing">
          <p className="eyebrow">What&apos;s next</p>
          <h2>Still learning. Still building.</h2>
          <p>
            This portfolio will grow alongside the projects, experiments, and
            challenges that shape my work.
          </p>
          <a className="button button-secondary" href="#top">
            Back to top
            <span aria-hidden="true">↑</span>
          </a>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Kevin Langat</p>
        <p>Designed and built with curiosity.</p>
      </footer>

      <ScrollToTop />
    </>
  )
}

export default App
