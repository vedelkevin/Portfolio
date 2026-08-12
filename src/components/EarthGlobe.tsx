import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import {
  LAND_MASK_BASE64,
  LAND_MASK_HEIGHT,
  LAND_MASK_WIDTH,
} from '../data/landMask'

const GLOBE_RADIUS = 1
const DOT_SAMPLES = 60000

function decodeLandMask() {
  const binary = atob(LAND_MASK_BASE64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }

  return (lon: number, lat: number) => {
    const x = Math.min(
      LAND_MASK_WIDTH - 1,
      Math.max(0, Math.floor(((lon + 180) / 360) * LAND_MASK_WIDTH)),
    )
    const y = Math.min(
      LAND_MASK_HEIGHT - 1,
      Math.max(0, Math.floor(((90 - lat) / 180) * LAND_MASK_HEIGHT)),
    )
    const index = y * LAND_MASK_WIDTH + x
    return (bytes[index >> 3] & (1 << (7 - (index & 7)))) !== 0
  }
}

function createDotTexture() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (context) {
    const gradient = context.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    )
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.45, 'rgba(255, 255, 255, 0.9)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    context.fillStyle = gradient
    context.fillRect(0, 0, size, size)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function readThemeColors() {
  const styles = getComputedStyle(document.documentElement)
  const accent =
    styles.getPropertyValue('--accent').trim() || '#0284c7'
  const isDark = document.documentElement.dataset.theme === 'dark'

  return {
    land: new THREE.Color(isDark ? '#8ad9fb' : '#0b3b58'),
    ocean: new THREE.Color(isDark ? '#0a2434' : '#a8d7f2'),
    atmosphere: new THREE.Color(accent),
  }
}

function EarthGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0, 3.4)

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      return
    }
    renderer.setClearAlpha(0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const colors = readThemeColors()

    const globe = new THREE.Group()
    globe.rotation.z = THREE.MathUtils.degToRad(-23.4)
    scene.add(globe)

    const oceanMaterial = new THREE.MeshBasicMaterial({ color: colors.ocean })
    const ocean = new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_RADIUS * 0.995, 64, 64),
      oceanMaterial,
    )
    globe.add(ocean)

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: colors.land,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    })
    const wireframe = new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_RADIUS, 24, 16),
      wireframeMaterial,
    )
    globe.add(wireframe)

    const isLand = decodeLandMask()
    const positions: number[] = []
    const goldenAngle = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < DOT_SAMPLES; i += 1) {
      const y = 1 - (i / (DOT_SAMPLES - 1)) * 2
      const radius = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = goldenAngle * i
      const x = Math.cos(theta) * radius
      const z = Math.sin(theta) * radius

      const lat = THREE.MathUtils.radToDeg(Math.asin(y))
      const lon = THREE.MathUtils.radToDeg(Math.atan2(z, -x))
      if (!isLand(lon, lat)) continue

      positions.push(
        x * GLOBE_RADIUS * 1.004,
        y * GLOBE_RADIUS * 1.004,
        z * GLOBE_RADIUS * 1.004,
      )
    }

    const dotGeometry = new THREE.BufferGeometry()
    dotGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3),
    )
    const dotTexture = createDotTexture()
    const dotMaterial = new THREE.PointsMaterial({
      color: colors.land,
      size: 0.023,
      map: dotTexture,
      transparent: true,
      alphaTest: 0.1,
      depthWrite: false,
      sizeAttenuation: true,
    })
    const dots = new THREE.Points(dotGeometry, dotMaterial)
    globe.add(dots)

    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: colors.atmosphere,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    })
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_RADIUS * 1.12, 48, 48),
      atmosphereMaterial,
    )
    scene.add(atmosphere)

    const shadeMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uOpacity: { value: 0.45 } },
      vertexShader: `
        varying vec3 vNormalView;
        void main() {
          vNormalView = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormalView;
        uniform float uOpacity;
        void main() {
          float lambert = clamp(dot(normalize(vNormalView), normalize(vec3(0.55, 0.4, 0.75))), 0.0, 1.0);
          float shade = pow(1.0 - lambert, 1.6);
          gl_FragColor = vec4(vec3(0.0), shade * uOpacity);
        }
      `,
    })
    const shade = new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_RADIUS * 1.006, 64, 64),
      shadeMaterial,
    )
    globe.add(shade)

    const resize = () => {
      const { clientWidth, clientHeight } = container
      const width = clientWidth || 1
      const height = clientHeight || 1
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    resize()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    let visible = true
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting)
      },
      { threshold: 0 },
    )
    intersectionObserver.observe(container)

    const themeObserver = new MutationObserver(() => {
      const next = readThemeColors()
      dotMaterial.color.copy(next.land)
      oceanMaterial.color.copy(next.ocean)
      wireframeMaterial.color.copy(next.land)
      atmosphereMaterial.color.copy(next.atmosphere)
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    let frame = 0
    let previous = performance.now()
    const animate = (now: number) => {
      frame = requestAnimationFrame(animate)
      const delta = Math.min((now - previous) / 1000, 0.1)
      previous = now
      if (!visible) return
      if (!reducedMotion) {
        globe.rotation.y += delta * 0.22
      }
      renderer.render(scene, camera)
    }
    frame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      themeObserver.disconnect()
      dotGeometry.dispose()
      dotMaterial.dispose()
      dotTexture.dispose()
      ocean.geometry.dispose()
      oceanMaterial.dispose()
      wireframe.geometry.dispose()
      wireframeMaterial.dispose()
      atmosphere.geometry.dispose()
      atmosphereMaterial.dispose()
      shade.geometry.dispose()
      shadeMaterial.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div className="earth-globe" aria-hidden="true">
      <div className="earth-globe-canvas" ref={containerRef} />
    </div>
  )
}

export default EarthGlobe
