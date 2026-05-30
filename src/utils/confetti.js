const COLORS = ['#4a9b8e', '#a16207', '#059669', '#78716c', '#6bb5a8', '#d6d3d1']

export function launchConfetti(durationMs = 2800) {
  const canvas = document.createElement('canvas')
  canvas.className = 'confetti-canvas'
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  const particles = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.4 - canvas.height * 0.2,
    r: 4 + Math.random() * 6,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    vx: (Math.random() - 0.5) * 6,
    vy: 2 + Math.random() * 5,
    spin: (Math.random() - 0.5) * 0.2,
    angle: Math.random() * Math.PI,
  }))

  const start = performance.now()

  function frame(now) {
    const elapsed = now - start
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.12
      p.angle += p.spin
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.angle)
      ctx.fillStyle = p.color
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6)
      ctx.restore()
    }

    if (elapsed < durationMs) {
      requestAnimationFrame(frame)
    } else {
      canvas.remove()
    }
  }

  requestAnimationFrame(frame)

  const onResize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  window.addEventListener('resize', onResize)
  setTimeout(() => window.removeEventListener('resize', onResize), durationMs)
}
