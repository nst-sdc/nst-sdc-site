'use client'

import { useEffect, useRef } from 'react'

interface FloatingElement {
  x: number
  y: number
  vx: number
  vy: number
  content: string
  type: 'code' | 'logo' | 'framework'
  rotation: number
  rotationSpeed: number
  scale: number
}

const codeSnippets = [
  '// TODO: Build something amazing',
  'git commit -am "feat: new feature"',
  'npm run build',
  'docker-compose up',
  'kubectl apply -f deployment.yaml',
  'cargo test --release',
  'go build -o main',
  'python manage.py migrate',
  'terraform apply',
  'ansible-playbook deploy.yml',
  'make test',
  'CI/CD Pipeline',
  'microservices',
  'serverless',
  'GraphQL',
  'REST API',
  'WebSocket',
  'gRPC',
]

const techStack = [
  'TypeScript', 'Rust', 'Go', 'Python',
  'React', 'Next.js', 'Node.js', 'PostgreSQL',
  'MongoDB', 'Redis', 'Docker', 'Kubernetes',
  'AWS', 'GCP', 'Azure', 'Terraform',
  'GitHub Actions', 'Jenkins', 'Nginx', 'GraphQL'
]

export function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const elementsRef = useRef<FloatingElement[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize floating elements
    const numElements = 50
    const elements: FloatingElement[] = []
    
    const allContent = [
      ...codeSnippets.map(c => ({ content: c, type: 'code' as const })),
      ...techStack.map(t => ({ content: t, type: 'framework' as const }))
    ]
    
    for (let i = 0; i < numElements; i++) {
      const item = allContent[Math.floor(Math.random() * allContent.length)]
      elements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        content: item.content,
        type: item.type,
        rotation: (Math.random() - 0.5) * 6,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        scale: 0.8 + Math.random() * 0.4
      })
    }
    elementsRef.current = elements

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const isDark = document.documentElement.classList.contains('dark')

      // Update and draw floating elements
      elements.forEach((element) => {
        // Move elements
        element.x += element.vx
        element.y += element.vy
        element.rotation += element.rotationSpeed

        // Wrap around edges
        if (element.x < -100) element.x = canvas.width + 100
        if (element.x > canvas.width + 100) element.x = -100
        if (element.y < -100) element.y = canvas.height + 100
        if (element.y > canvas.height + 100) element.y = -100

        // Mouse interaction - repel elements from mouse
        const dx = element.x - mouseRef.current.x
        const dy = element.y - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 200 && distance > 0) {
          const force = (200 - distance) / 200
          element.vx += (dx / distance) * force * 0.05
          element.vy += (dy / distance) * force * 0.05
        }

        // Limit velocity
        const speed = Math.sqrt(element.vx * element.vx + element.vy * element.vy)
        if (speed > 1.5) {
          element.vx = (element.vx / speed) * 1.5
          element.vy = (element.vy / speed) * 1.5
        }

        // Draw element
        ctx.save()
        ctx.translate(element.x, element.y)
        ctx.rotate((element.rotation * Math.PI) / 180)
        ctx.scale(element.scale, element.scale)

        // Set styles based on type
        ctx.font = element.type === 'code' 
          ? '13px "SF Mono", "Monaco", "Inconsolata", "Fira Code", monospace' 
          : '14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        // Minimal, professional color scheme
        let color = ''
        let bgColor = ''
        let borderColor = ''
        
        if (element.type === 'code') {
          // Code snippets - subtle gray with accent
          color = isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(15, 23, 42, 0.5)'
          bgColor = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(15, 23, 42, 0.03)'
          borderColor = isDark ? 'rgba(255, 235, 59, 0.2)' : 'rgba(59, 130, 246, 0.2)'
        } else {
          // Tech stack - slightly more prominent
          color = isDark ? 'rgba(255, 235, 59, 0.6)' : 'rgba(59, 130, 246, 0.6)'
          bgColor = isDark ? 'rgba(255, 235, 59, 0.05)' : 'rgba(59, 130, 246, 0.05)'
          borderColor = isDark ? 'rgba(255, 235, 59, 0.3)' : 'rgba(59, 130, 246, 0.3)'
        }

        // Measure text
        const metrics = ctx.measureText(element.content)
        const padding = 10
        const width = metrics.width + padding * 2
        const height = 26

        // Draw minimal background with sharp corners
        ctx.fillStyle = bgColor
        ctx.fillRect(-width / 2, -height / 2, width, height)
        
        // Draw border
        ctx.strokeStyle = borderColor
        ctx.lineWidth = 1
        ctx.strokeRect(-width / 2, -height / 2, width, height)

        // Draw text
        ctx.fillStyle = color
        ctx.fillText(element.content, 0, 0)

        ctx.restore()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  )
}
