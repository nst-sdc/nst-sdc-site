'use client'

import { useEffect, useRef } from 'react'

interface FloatingElement {
  x: number
  y: number
  vx: number
  vy: number
  content: string
  type: 'code' | 'logo' | 'framework' | 'icon'
  rotation: number
  rotationSpeed: number
  scale: number
  role?: 'pair' | 'leader' | 'follower'
  iconName?:
  | 'react' | 'graphql' | 'docker' | 'kubernetes'
  | 'typescript' | 'node' | 'aws' | 'postgres'
  | 'python' | 'go' | 'rust' | 'cpp' | 'java' | 'html5' | 'css3'
  | 'nextjs' | 'vue' | 'angular' | 'tailwind' | 'express' | 'nestjs' | 'django'
  | 'gcp' | 'azure' | 'vercel' | 'netlify' | 'firebase' | 'gha' | 'terraform' | 'jenkins'
  | 'mongodb' | 'redis' | 'mysql' | 'sqlite' | 'supabase'
  | 'openai' | 'tensorflow' | 'pytorch' | 'huggingface' | 'langchain'
  | 'git' | 'github' | 'gitlab' | 'vscode' | 'postman' | 'dockercompose'
  leaderIndex?: number
  orbitAngle?: number
  orbitRadius?: number
  pulseSpeed?: number
  // Upward floating params
  speed?: number
  phase?: number
}

const codeSnippets = [
  'TODO: Build something amazing',
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

// Simple icon renderers using canvas paths for brand marks
function drawIcon(
  ctx: CanvasRenderingContext2D,
  name:
    | 'react' | 'graphql' | 'docker' | 'kubernetes'
    | 'typescript' | 'node' | 'aws' | 'postgres'
    | 'python' | 'go' | 'rust' | 'cpp' | 'java' | 'html5' | 'css3'
    | 'nextjs' | 'vue' | 'angular' | 'tailwind' | 'express' | 'nestjs' | 'django'
    | 'gcp' | 'azure' | 'vercel' | 'netlify' | 'firebase' | 'gha' | 'terraform' | 'jenkins'
    | 'mongodb' | 'redis' | 'mysql' | 'sqlite' | 'supabase'
    | 'openai' | 'tensorflow' | 'pytorch' | 'huggingface' | 'langchain'
    | 'git' | 'github' | 'gitlab' | 'vscode' | 'postman' | 'dockercompose',
  size: number,
  isDark: boolean
) {
  ctx.save()
  // size is roughly height in pixels
  const colorMap: Record<string, string> = {
    react: '#61DAFB',
    graphql: '#E535AB',
    docker: '#0db7ed',
    kubernetes: '#326CE5',
    typescript: '#3178C6',
    node: '#68A063',
    aws: '#FF9900',
    postgres: '#336791',
    python: '#3776AB', // primary blue
    go: '#00ADD8',
    rust: '#333333',
    cpp: '#00599C',
    java: '#E11D2E',
    html5: '#E34F26',
    css3: '#1572B6',
    nextjs: '#111111',
    vue: '#41B883',
    angular: '#DD0031',
    tailwind: '#06B6D4',
    express: '#6B7280',
    nestjs: '#E0234E',
    django: '#0C4B33',
    gcp: '#4285F4',
    azure: '#0078D4',
    vercel: '#000000',
    netlify: '#00C7B7',
    firebase: '#FFCA28',
    gha: '#2088FF',
    terraform: '#7B42BC',
    jenkins: '#D33833',
    mongodb: '#47A248',
    redis: '#DC382D',
    mysql: '#00758F',
    sqlite: '#0E76A8',
    supabase: '#3ECF8E',
    openai: '#000000',
    tensorflow: '#FF6F00',
    pytorch: '#EE4C2C',
    huggingface: '#FFCC4D',
    langchain: '#2E7D32',
    github: '#181717',
    git: '#F34F29',
    gitlab: '#FC6D26',
    vscode: '#007ACC',
    postman: '#FF6C37',
    dockercompose: '#0db7ed',
  }
  // allow subtle transparency to blend with background theme
  const base = colorMap[name]
  ctx.strokeStyle = base + 'CC' // ~80% opacity
  ctx.fillStyle = base + '99' // ~60% opacity
  ctx.lineWidth = Math.max(1, size * 0.08)

  switch (name) {
    case 'react': {
      // React atom: three ellipses rotated around center
      const r = size * 0.22
      const a = size * 0.55
      for (let i = 0; i < 3; i++) {
        ctx.save()
        ctx.rotate((i * Math.PI) / 3)
        ctx.scale(1, 0.35)
        ctx.beginPath()
        ctx.ellipse(0, 0, a, a, 0, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }
      ctx.beginPath()
      ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.fill()
      break
    }
    case 'graphql': {
      // GraphQL hexagon with nodes
      const r = size * 0.42
      const n = 6
      const pts: [number, number][] = []
      for (let i = 0; i < n; i++) {
        const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n
        pts.push([Math.cos(ang) * r, Math.sin(ang) * r])
      }
      ctx.beginPath()
      pts.forEach(([x, y], i) => {
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.closePath()
      ctx.stroke()
      // diagonals
      for (let i = 0; i < n; i++) {
        const [x1, y1] = pts[i]
        const [x2, y2] = pts[(i + 1) % n]
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }
      // nodes
      const nodeR = size * 0.6
      pts.forEach(([x, y]) => {
        ctx.beginPath()
        ctx.arc(x, y, nodeR, 0, Math.PI * 3)
        ctx.fill()
      })
      break
    }
    case 'docker': {
      // Simplified docker: whale base + containers
      const w = size * 0.8
      const h = size * 1
      const bx = -w / 2
      const by = -h * 0.2
      // containers grid
      const cw = w / 6
      const ch = h / 3
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 4; col++) {
          ctx.strokeRect(bx + col * (cw + 2), by - row * (ch + 2) - ch, cw, ch)
        }
      }
      // whale body
      ctx.beginPath()
      ctx.moveTo(bx - cw * 0.3, by)
      ctx.lineTo(bx + w * 0.8, by)
      ctx.quadraticCurveTo(bx + w * 0.95, by + h * 0.2, bx + w * 0.75, by + h * 0.3)
      ctx.lineTo(bx + w * 0.2, by + h * 0.3)
      ctx.quadraticCurveTo(bx - cw * 0.2, by + h * 0.3, bx - cw * 0.3, by)
      ctx.closePath()
      ctx.stroke()
      break
    }
    case 'kubernetes': {
      // Simplified helm-like wheel with spokes
      const r = size * 0.42
      ctx.beginPath()
      ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.stroke()
      for (let i = 0; i < 8; i++) {
        const ang = (i * Math.PI * 2) / 8
        ctx.beginPath()
        ctx.moveTo(Math.cos(ang) * (r * 0.6), Math.sin(ang) * (r * 0.6))
        ctx.lineTo(Math.cos(ang) * r, Math.sin(ang) * r)
        ctx.stroke()
      }
      // hub
      ctx.beginPath()
      ctx.arc(0, 0, r * 0.18, 0, Math.PI * 2)
      ctx.fill()
      break
    }
    case 'typescript': {
      // TS logo stylized: rounded square with T S letters
      const s = size * 0.9
      const r = Math.max(1, s * 0.15)
      const x = -s / 2
      const y = -s / 2
      ctx.beginPath()
      // rounded rect
      ctx.moveTo(x + r, y)
      ctx.lineTo(x + s - r, y)
      ctx.quadraticCurveTo(x + s, y, x + s, y + r)
      ctx.lineTo(x + s, y + s - r)
      ctx.quadraticCurveTo(x + s, y + s, x + s - r, y + s)
      ctx.lineTo(x + r, y + s)
      ctx.quadraticCurveTo(x, y + s, x, y + s - r)
      ctx.lineTo(x, y + r)
      ctx.quadraticCurveTo(x, y, x + r, y)
      ctx.closePath()
      ctx.stroke()
      // T
      ctx.beginPath()
      ctx.moveTo(x + s * 0.2, y + s * 0.35)
      ctx.lineTo(x + s * 0.8, y + s * 0.35)
      ctx.moveTo(x + s * 0.5, y + s * 0.35)
      ctx.lineTo(x + s * 0.5, y + s * 0.75)
      ctx.stroke()
      // S (approx)
      ctx.beginPath()
      ctx.moveTo(x + s * 0.7, y + s * 0.45)
      ctx.bezierCurveTo(x + s * 0.55, y + s * 0.45, x + s * 0.55, y + s * 0.6, x + s * 0.7, y + s * 0.6)
      ctx.bezierCurveTo(x + s * 0.85, y + s * 0.6, x + s * 0.85, y + s * 0.75, x + s * 0.7, y + s * 0.75)
      ctx.stroke()
      break
    }
    case 'node': {
      // Node.js hex outline with 'n'
      const r = size * 0.45
      const pts: [number, number][] = []
      for (let i = 0; i < 6; i++) {
        const ang = Math.PI / 6 + (i * Math.PI * 2) / 6
        pts.push([Math.cos(ang) * r, Math.sin(ang) * r])
      }
      ctx.beginPath()
      pts.forEach(([px, py], i) => {
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      })
      ctx.closePath()
      ctx.stroke()
      // n
      ctx.beginPath()
      ctx.moveTo(-r * 0.4, r * 0.3)
      ctx.lineTo(-r * 0.4, -r * 0.1)
      ctx.quadraticCurveTo(-r * 0.1, -r * 0.25, 0, -r * 0.05)
      ctx.lineTo(0, r * 0.3)
      ctx.stroke()
      break
    }
    case 'aws': {
      // AWS word arc simplified + smile
      const r = size * 0.5
      // arc (smile)
      ctx.beginPath()
      ctx.arc(0, r * 0.05, r * 0.6, 0.15 * Math.PI, 0.85 * Math.PI)
      ctx.stroke()
      // A stylized
      ctx.beginPath()
      ctx.moveTo(-r * 0.6, r * 0.2)
      ctx.lineTo(-r * 0.35, -r * 0.4)
      ctx.lineTo(-r * 0.1, r * 0.2)
      ctx.moveTo(-r * 0.5, -r * 0.1)
      ctx.lineTo(-r * 0.2, -r * 0.1)
      ctx.stroke()
      break
    }
    case 'postgres': {
      // Elephant head simplified
      const r = size * 0.48
      ctx.beginPath()
      ctx.arc(0, 0, r * 0.6, 0.2 * Math.PI, 0.8 * Math.PI)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(-r * 0.2, -r * 0.1)
      ctx.bezierCurveTo(-r * 0.1, r * 0.25, r * 0.1, r * 0.25, r * 0.2, -r * 0.1)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, -r * 0.2)
      ctx.lineTo(0, r * 0.4)
      ctx.stroke()
      break
    }
    case 'python': {
      // Two-tone python blocks
      const s = size
      // top (blue)
      ctx.fillStyle = '#3776ABCC'
      ctx.beginPath()
      ctx.roundRect(-s * 0.35, -s * 0.42, s * 0.7, s * 0.36, s * 0.12)
      ctx.fill()
      // bottom (yellow)
      ctx.fillStyle = '#FFD343CC'
      ctx.beginPath()
      ctx.roundRect(-s * 0.35, s * 0.06, s * 0.7, s * 0.36, s * 0.12)
      ctx.fill()
      break
    }
    case 'go': {
      // GO wordmark simplified
      const w = size
      ctx.strokeStyle = '#00ADD8CC'
      ctx.lineWidth = Math.max(1, size * 0.08)
      ctx.beginPath()
      ctx.arc(-w * 0.2, 0, w * 0.22, Math.PI * 0.2, Math.PI * 1.8)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(w * 0.28, 0, w * 0.22, 0, Math.PI * 2)
      ctx.stroke()
      break
    }
    case 'rust': {
      // gear-like circle
      const r = size * 0.45
      for (let i = 0; i < 12; i++) {
        const a = (i * Math.PI * 2) / 12
        ctx.beginPath()
        ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
        ctx.lineTo(Math.cos(a) * (r * 0.8), Math.sin(a) * (r * 0.8))
        ctx.stroke()
      }
      ctx.beginPath()
      ctx.arc(0, 0, r * 0.7, 0, Math.PI * 2)
      ctx.stroke()
      break
    }
    case 'cpp': {
      // Blue hex with C++ inside as two pluses
      const r = size * 0.48
      ctx.fillStyle = '#00599CCC'
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const a = Math.PI / 6 + (i * Math.PI * 2) / 6
        const x = Math.cos(a) * r
        const y = Math.sin(a) * r
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.fill()
      ctx.strokeStyle = '#FFFFFFCC'
      ctx.beginPath()
      ctx.moveTo(-r * 0.05, -r * 0.2)
      ctx.arc(-r * 0.05, 0, r * 0.22, -Math.PI / 2, Math.PI / 2)
      ctx.stroke()
      // plus signs
      const p = r * 0.35
      ctx.beginPath()
      ctx.moveTo(p, -r * 0.1)
      ctx.lineTo(p, r * 0.1)
      ctx.moveTo(p - r * 0.1, 0)
      ctx.lineTo(p + r * 0.1, 0)
      ctx.moveTo(p + r * 0.25, -r * 0.1)
      ctx.lineTo(p + r * 0.25, r * 0.1)
      ctx.moveTo(p + r * 0.15, 0)
      ctx.lineTo(p + r * 0.35, 0)
      ctx.stroke()
      break
    }
    case 'java': {
      // Cup + steam lines
      const s = size
      ctx.beginPath()
      ctx.moveTo(-s * 0.35, s * 0.15)
      ctx.lineTo(s * 0.35, s * 0.15)
      ctx.quadraticCurveTo(s * 0.2, s * 0.35, -s * 0.2, s * 0.35)
      ctx.closePath()
      ctx.stroke()
      ctx.strokeStyle = '#E11D2ECC'
      ctx.beginPath()
      ctx.moveTo(-s * 0.1, -s * 0.1)
      ctx.bezierCurveTo(-s * 0.05, -s * 0.25, s * 0.05, -s * 0.25, s * 0.1, -s * 0.1)
      ctx.moveTo(0, -s * 0.2)
      ctx.bezierCurveTo(s * 0.05, -s * 0.35, s * 0.15, -s * 0.35, s * 0.2, -s * 0.2)
      ctx.stroke()
      break
    }
    case 'html5': {
      // Shield
      const s = size
      ctx.fillStyle = '#E34F26CC'
      ctx.beginPath()
      ctx.moveTo(0, -s * 0.5)
      ctx.lineTo(s * 0.45, -s * 0.35)
      ctx.lineTo(s * 0.35, s * 0.45)
      ctx.lineTo(0, s * 0.55)
      ctx.lineTo(-s * 0.35, s * 0.45)
      ctx.lineTo(-s * 0.45, -s * 0.35)
      ctx.closePath()
      ctx.fill()
      break
    }
    case 'css3': {
      // Shield
      const s = size
      ctx.fillStyle = '#1572B6CC'
      ctx.beginPath()
      ctx.moveTo(0, -s * 0.5)
      ctx.lineTo(s * 0.45, -s * 0.35)
      ctx.lineTo(s * 0.35, s * 0.45)
      ctx.lineTo(0, s * 0.55)
      ctx.lineTo(-s * 0.35, s * 0.45)
      ctx.lineTo(-s * 0.45, -s * 0.35)
      ctx.closePath()
      ctx.fill()
      break
    }
    case 'nextjs': {
      // Circle with slice
      const r = size * 0.48
      ctx.strokeStyle = '#111111CC'
      ctx.beginPath()
      ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(r * 0.7, -r * 0.7)
      ctx.stroke()
      break
    }
    case 'vue': {
      // V shape
      const s = size
      ctx.strokeStyle = '#41B883CC'
      ctx.beginPath()
      ctx.moveTo(-s * 0.5, -s * 0.4)
      ctx.lineTo(0, s * 0.5)
      ctx.lineTo(s * 0.5, -s * 0.4)
      ctx.stroke()
      break
    }
    case 'angular': {
      // Angular shield outline
      const s = size
      ctx.strokeStyle = '#DD0031CC'
      ctx.beginPath()
      ctx.moveTo(0, -s * 0.5)
      ctx.lineTo(s * 0.45, -s * 0.1)
      ctx.lineTo(s * 0.25, s * 0.5)
      ctx.lineTo(-s * 0.25, s * 0.5)
      ctx.lineTo(-s * 0.45, -s * 0.1)
      ctx.closePath()
      ctx.stroke()
      break
    }
    case 'tailwind': {
      // Two waves
      const s = size
      ctx.strokeStyle = '#06B6D4CC'
      ctx.beginPath()
      ctx.moveTo(-s * 0.5, 0)
      ctx.bezierCurveTo(-s * 0.2, -s * 0.3, s * 0.2, -s * 0.1, s * 0.5, -s * 0.2)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(-s * 0.5, s * 0.2)
      ctx.bezierCurveTo(-s * 0.2, -s * 0.1, s * 0.2, 0.1 * s, s * 0.5, 0)
      ctx.stroke()
      break
    }
    case 'express': {
      // Simple circle wordmark hint
      const r = size * 0.4
      ctx.strokeStyle = '#6B7280CC'
      ctx.beginPath()
      ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.stroke()
      break
    }
    case 'nestjs': {
      // Swirl mark
      const s = size
      ctx.strokeStyle = '#E0234ECC'
      ctx.beginPath()
      ctx.moveTo(-s * 0.2, 0)
      ctx.quadraticCurveTo(0, -s * 0.6, s * 0.3, 0)
      ctx.quadraticCurveTo(0, s * 0.4, -s * 0.2, 0)
      ctx.stroke()
      break
    }
    case 'django': {
      // d j letters rough
      const s = size
      ctx.strokeStyle = '#0C4B33CC'
      ctx.beginPath()
      ctx.moveTo(-s * 0.2, -s * 0.2)
      ctx.lineTo(-s * 0.2, s * 0.25)
      ctx.arc(-s * 0.05, s * 0.1, s * 0.15, Math.PI, 0)
      ctx.moveTo(s * 0.15, -s * 0.2)
      ctx.lineTo(s * 0.15, s * 0.35)
      ctx.stroke()
      break
    }
    case 'gcp': {
      // Multicolor ring segments
      const r = size * 0.5
      const segs = [
        { c: '#4285F4', s: 0 },
        { c: '#EA4335', s: 0.5 },
        { c: '#FBBC05', s: 1.0 },
        { c: '#34A853', s: 1.5 },
      ]
      ctx.lineWidth = Math.max(2, size * 0.18)
      segs.forEach(({ c, s }) => {
        ctx.strokeStyle = c + 'CC'
        ctx.beginPath()
        ctx.arc(0, 0, r, s * Math.PI, (s + 0.45) * Math.PI)
        ctx.stroke()
      })
      break
    }
    case 'azure': {
      // Azure A
      const s = size
      ctx.strokeStyle = '#0078D4CC'
      ctx.beginPath()
      ctx.moveTo(-s * 0.5, s * 0.5)
      ctx.lineTo(0, -s * 0.5)
      ctx.lineTo(s * 0.2, -s * 0.1)
      ctx.lineTo(-s * 0.2, -s * 0.1)
      ctx.stroke()
      break
    }
    case 'vercel': {
      // Black triangle
      const s = size
      ctx.fillStyle = '#000000CC'
      ctx.beginPath()
      ctx.moveTo(0, -s * 0.5)
      ctx.lineTo(s * 0.5, s * 0.5)
      ctx.lineTo(-s * 0.5, s * 0.5)
      ctx.closePath()
      ctx.fill()
      break
    }
    case 'netlify': {
      // Diamond grid
      const s = size
      ctx.strokeStyle = '#00C7B7CC'
      ctx.beginPath()
      ctx.moveTo(0, -s * 0.5)
      ctx.lineTo(s * 0.5, 0)
      ctx.lineTo(0, s * 0.5)
      ctx.lineTo(-s * 0.5, 0)
      ctx.closePath()
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(-s * 0.25, -s * 0.25)
      ctx.lineTo(s * 0.25, s * 0.25)
      ctx.moveTo(-s * 0.25, s * 0.25)
      ctx.lineTo(s * 0.25, -s * 0.25)
      ctx.stroke()
      break
    }
    case 'firebase': {
      // Yellow/orange flame
      const s = size
      ctx.fillStyle = '#FFCA28CC'
      ctx.beginPath()
      ctx.moveTo(0, -s * 0.5)
      ctx.lineTo(s * 0.2, 0)
      ctx.lineTo(-s * 0.15, s * 0.3)
      ctx.closePath()
      ctx.fill()
      ctx.fillStyle = '#F57C00CC'
      ctx.beginPath()
      ctx.moveTo(0, -s * 0.4)
      ctx.lineTo(s * 0.1, 0)
      ctx.lineTo(-s * 0.08, s * 0.2)
      ctx.closePath()
      ctx.fill()
      break
    }
    case 'gha': {
      // Gear with arm
      const r = size * 0.42
      ctx.strokeStyle = '#2088FFCC'
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI * 2) / 8
        ctx.beginPath()
        ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
        ctx.lineTo(Math.cos(a) * (r * 0.7), Math.sin(a) * (r * 0.7))
        ctx.stroke()
      }
      ctx.beginPath()
      ctx.arc(0, 0, r * 0.55, 0, Math.PI * 2)
      ctx.stroke()
      break
    }
    case 'terraform': {
      // Blocks (purple)
      const s = size * 0.4
      ctx.fillStyle = '#7B42BCCC'
      ctx.fillRect(-s * 2, -s, s, s)
      ctx.fillRect(-s, 0, s, s)
      ctx.fillRect(0, -s, s, s)
      break
    }
    case 'jenkins': {
      // Bowtie + head outline simplified
      const s = size
      ctx.strokeStyle = '#D33833CC'
      ctx.beginPath()
      ctx.arc(0, -s * 0.05, s * 0.45, Math.PI, 0)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(-s * 0.2, s * 0.2)
      ctx.lineTo(0, s * 0.1)
      ctx.lineTo(s * 0.2, s * 0.2)
      ctx.stroke()
      break
    }
    case 'mongodb': {
      // Leaf two-tone
      const s = size
      ctx.fillStyle = '#47A248CC'
      ctx.beginPath()
      ctx.moveTo(0, -s * 0.5)
      ctx.quadraticCurveTo(s * 0.3, -s * 0.1, 0, s * 0.5)
      ctx.quadraticCurveTo(-s * 0.3, -s * 0.1, 0, -s * 0.5)
      ctx.fill()
      break
    }
    case 'redis': {
      // Cube/stack
      const s = size
      ctx.fillStyle = '#DC382DCC'
      ctx.beginPath()
      ctx.moveTo(0, -s * 0.4)
      ctx.lineTo(s * 0.5, -s * 0.2)
      ctx.lineTo(0, 0)
      ctx.lineTo(-s * 0.5, -s * 0.2)
      ctx.closePath()
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(s * 0.5, s * 0.2)
      ctx.lineTo(0, s * 0.4)
      ctx.lineTo(-s * 0.5, s * 0.2)
      ctx.closePath()
      ctx.fill()
      break
    }
    case 'mysql': {
      // Dolphin curve
      const s = size
      ctx.strokeStyle = '#00758FCC'
      ctx.beginPath()
      ctx.moveTo(-s * 0.5, 0)
      ctx.bezierCurveTo(-s * 0.1, -s * 0.6, s * 0.2, -s * 0.1, s * 0.5, -s * 0.4)
      ctx.stroke()
      break
    }
    case 'sqlite': {
      // Feather/quill
      const s = size
      ctx.strokeStyle = '#0E76A8CC'
      ctx.beginPath()
      ctx.moveTo(-s * 0.3, -s * 0.4)
      ctx.quadraticCurveTo(0, -s * 0.5, s * 0.3, -s * 0.2)
      ctx.quadraticCurveTo(0, s * 0.2, -s * 0.3, -s * 0.1)
      ctx.stroke()
      break
    }
    case 'supabase': {
      // Bolt-like
      const s = size
      ctx.fillStyle = '#3ECF8ECC'
      ctx.beginPath()
      ctx.moveTo(-s * 0.2, -s * 0.5)
      ctx.lineTo(s * 0.1, -s * 0.1)
      ctx.lineTo(-s * 0.05, -s * 0.1)
      ctx.lineTo(s * 0.2, s * 0.5)
      ctx.lineTo(-s * 0.1, 0)
      ctx.lineTo(s * 0.05, 0)
      ctx.closePath()
      ctx.fill()
      break
    }
    case 'openai': {
      // Swirl segments
      const r = size * 0.42
      ctx.strokeStyle = (isDark ? '#FFFFFF' : '#000000') + 'CC'
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.arc(0, 0, r * (0.6 + i * 0.08), i * 0.6, i * 0.6 + 1.2)
        ctx.stroke()
      }
      break
    }
    case 'tensorflow': {
      // T blocks
      const s = size * 0.45
      ctx.fillStyle = '#FF6F00CC'
      ctx.fillRect(-s * 2, -s, s * 4, s)
      ctx.fillRect(-s, -s, s, s * 4)
      break
    }
    case 'pytorch': {
      // Flame + dot
      const s = size
      ctx.strokeStyle = '#EE4C2CCC'
      ctx.beginPath()
      ctx.moveTo(0, -s * 0.5)
      ctx.quadraticCurveTo(s * 0.4, -s * 0.1, 0, s * 0.4)
      ctx.quadraticCurveTo(-s * 0.4, -s * 0.1, 0, -s * 0.5)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(s * 0.25, -s * 0.1, s * 0.08, 0, Math.PI * 2)
      ctx.fill()
      break
    }
    case 'huggingface': {
      // Smiley
      const r = size * 0.45
      ctx.fillStyle = '#FFCC4DCC'
      ctx.beginPath()
      ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#000000AA'
      ctx.beginPath()
      ctx.arc(-r * 0.25, -r * 0.1, r * 0.08, 0, Math.PI * 2)
      ctx.arc(r * 0.25, -r * 0.1, r * 0.08, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#000000AA'
      ctx.beginPath()
      ctx.arc(0, r * 0.1, r * 0.25, 0.1 * Math.PI, 0.9 * Math.PI)
      ctx.stroke()
      break
    }
    case 'langchain': {
      // Chain links
      const r = size * 0.22
      ctx.strokeStyle = '#2E7D32CC'
      for (let i = -1; i <= 1; i += 2) {
        ctx.beginPath()
        ctx.ellipse(i * r, 0, r, r * 0.6, 0, 0, Math.PI * 2)
        ctx.stroke()
      }
      ctx.beginPath()
      ctx.moveTo(-r * 0.4, 0)
      ctx.lineTo(r * 0.4, 0)
      ctx.stroke()
      break
    }
    case 'git': {
      // Diamond with node
      const s = size
      ctx.fillStyle = '#F34F29CC'
      ctx.beginPath()
      ctx.moveTo(0, -s * 0.45)
      ctx.lineTo(s * 0.45, 0)
      ctx.lineTo(0, s * 0.45)
      ctx.lineTo(-s * 0.45, 0)
      ctx.closePath()
      ctx.fill()
      break
    }
    case 'github': {
      // Octocat head simplified
      const r = size * 0.45
      ctx.fillStyle = '#181717CC'
      ctx.beginPath()
      ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.fill()
      break
    }
    case 'gitlab': {
      // Fox head simplified (triangle cluster)
      const s = size
      ctx.fillStyle = '#FC6D26CC'
      ctx.beginPath()
      ctx.moveTo(0, -s * 0.5)
      ctx.lineTo(s * 0.2, 0)
      ctx.lineTo(0, s * 0.5)
      ctx.lineTo(-s * 0.2, 0)
      ctx.closePath()
      ctx.fill()
      break
    }
    case 'vscode': {
      // Ribbon-like
      const s = size
      ctx.strokeStyle = '#007ACCCC'
      ctx.beginPath()
      ctx.moveTo(-s * 0.5, 0)
      ctx.lineTo(0, -s * 0.35)
      ctx.lineTo(s * 0.5, 0)
      ctx.lineTo(0, s * 0.35)
      ctx.closePath()
      ctx.stroke()
      break
    }
    case 'postman': {
      // Circle mark
      const r = size * 0.45
      ctx.fillStyle = '#FF6C37CC'
      ctx.beginPath()
      ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.fill()
      break
    }
    case 'dockercompose': {
      // Pair with docker: stack two small boxes next to whale body hint
      const s = size
      ctx.strokeStyle = '#0db7edCC'
      ctx.strokeRect(-s * 0.4, -s * 0.2, s * 0.25, s * 0.2)
      ctx.strokeRect(-s * 0.1, -s * 0.2, s * 0.25, s * 0.2)
      ctx.beginPath()
      ctx.moveTo(-s * 0.5, 0)
      ctx.lineTo(s * 0.5, 0)
      ctx.stroke()
      break
    }
  }
  ctx.restore()
}

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

    // Performance-optimized constants
    const MAX_ELEMENTS = 30 // Reduced number of elements for better performance
    const BASE_ALPHA = 0.7 // Slightly increased alpha for better visibility with fewer elements
    const SWAY_AMPLITUDE = 10 // Reduced sway for better performance
    const SPEED_RANGE: [number, number] = [1.0, 1.8] // Slightly reduced speed range
    const DEPTH_RANGE: [number, number] = [0.6, 1.5] // Narrower depth range for better performance
    const FADE_THRESHOLD = 80 // Standard fade threshold

    const rng = (min: number, max: number) => min + Math.random() * (max - min)

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Prepare pool of items (icons + labels + code) but create element instances once
    type Elem = FloatingElement & { depth: number; alpha: number; baseSize: number; delay: number }

    const iconPool: Array<{
      iconName:
      | 'react' | 'graphql' | 'docker' | 'kubernetes'
      | 'typescript' | 'node' | 'aws' | 'postgres'
      | 'python' | 'go' | 'rust' | 'cpp' | 'java' | 'html5' | 'css3'
      | 'nextjs' | 'vue' | 'angular' | 'tailwind' | 'express' | 'nestjs' | 'django'
      | 'gcp' | 'azure' | 'vercel' | 'netlify' | 'firebase' | 'gha' | 'terraform' | 'jenkins'
      | 'mongodb' | 'redis' | 'mysql' | 'sqlite' | 'supabase'
      | 'openai' | 'tensorflow' | 'pytorch' | 'huggingface' | 'langchain'
      | 'git' | 'github' | 'gitlab' | 'vscode' | 'postman' | 'dockercompose'
    }> = [
        { iconName: 'react' },
        { iconName: 'graphql' },
        { iconName: 'docker' },
        { iconName: 'kubernetes' },
        { iconName: 'typescript' },
        { iconName: 'node' },
        { iconName: 'aws' },
        { iconName: 'postgres' },
        { iconName: 'python' },
        { iconName: 'go' },
        { iconName: 'rust' },
        { iconName: 'cpp' },
        { iconName: 'java' },
        { iconName: 'html5' },
        { iconName: 'css3' },
        { iconName: 'nextjs' },
        { iconName: 'vue' },
        { iconName: 'angular' },
        { iconName: 'tailwind' },
        { iconName: 'express' },
        { iconName: 'nestjs' },
        { iconName: 'django' },
        { iconName: 'gcp' },
        { iconName: 'azure' },
        { iconName: 'vercel' },
        { iconName: 'netlify' },
        { iconName: 'firebase' },
        { iconName: 'gha' },
        { iconName: 'terraform' },
        { iconName: 'jenkins' },
        { iconName: 'mongodb' },
        { iconName: 'redis' },
        { iconName: 'mysql' },
        { iconName: 'sqlite' },
        { iconName: 'supabase' },
        { iconName: 'openai' },
        { iconName: 'tensorflow' },
        { iconName: 'pytorch' },
        { iconName: 'huggingface' },
        { iconName: 'langchain' },
        { iconName: 'git' },
        { iconName: 'github' },
        { iconName: 'gitlab' },
        { iconName: 'vscode' },
        { iconName: 'postman' },
        { iconName: 'dockercompose' },
      ]

    // --- CHANGE 2: Only populate the pool with icons ---
    const pool: Array<{ type: 'icon' | 'code' | 'framework'; content?: string; iconName?: Elem['iconName'] }> = [
      ...iconPool.map(({ iconName }) => ({ type: 'icon' as const, iconName })),
      // ...codeSnippets.map((content) => ({ type: 'code' as const, content })), // <-- REMOVED
      // ...techStack.map((content) => ({ type: 'framework' as const, content })), // <-- REMOVED
    ]

    const elements: Elem[] = new Array(Math.min(MAX_ELEMENTS, pool.length)).fill(0).map(() => {
      const item = pool[Math.floor(Math.random() * pool.length)]
      const depth = rng(DEPTH_RANGE[0], DEPTH_RANGE[1])
      const baseSize = item.type === 'icon' ? 20 : 14
      const x = rng(0, canvas.width)
      const y = canvas.height + rng(0, canvas.height * 0.5)
      const delay = rng(0, 1500)
      return {
        x,
        y,
        vx: 0,
        vy: 0,
        content: item.content || '',
        type: item.type,
        rotation: 0,
        rotationSpeed: 0,
        scale: 1,
        phase: Math.random() * Math.PI * 2,
        speed: rng(SPEED_RANGE[0], SPEED_RANGE[1]),
        iconName: item.iconName,
        // depth params
        depth,
        alpha: BASE_ALPHA * depth,
        baseSize,
        delay,
      }
    })

    elementsRef.current = elements

    // Mouse for optional proximity highlight
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    let start = performance.now()

    const animate = () => {
      const now = performance.now()
      const t = now - start

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDark = document.documentElement.classList.contains('dark')

      // Use simpler blending for better performance
      ctx.globalCompositeOperation = 'source-over'

      for (let i = 0; i < elements.length; i++) {
        const el = elements[i]

        // skip until delay elapsed for staggered starts
        if (t < el.delay) continue

        // depth-affecting params
        const speed = (el!.speed || 0.4) * (1 / el.depth)
        const size = (el.baseSize || 14) * el.depth

        // upward motion with depth-based speed variation
        el.y -= speed * 1.2 // Slightly increase vertical speed

        // horizontal sway with smoother motion
        const sway = Math.sin(now * 0.0015 + (el.phase || 0)) * SWAY_AMPLITUDE * el.depth
        el.x += (sway - (el.x - canvas.width/2) * 0.0005) * 0.1 // Center-seeking behavior

        // fade near top
        if (el.y < FADE_THRESHOLD) {
          el.alpha = Math.max(0, el.alpha - 0.01)
        }

        // recycle once fully faded or off top
        if (el.alpha <= 0 || el.y < -40) {
          // Recycle with more variety in positioning and timing
          el.depth = rng(DEPTH_RANGE[0], DEPTH_RANGE[1])
          el.speed = rng(SPEED_RANGE[0], SPEED_RANGE[1])
          el.phase = Math.random() * Math.PI * 2
          el.x = rng(-100, canvas.width + 100) // Allow some overflow on sides
          el.y = canvas.height + rng(0, canvas.height * 0.5) // More spread in initial Y position
          el.alpha = BASE_ALPHA * el.depth
          el.delay = rng(0, 800) // Shorter delay for more frequent recycling
        }

        // enhanced proximity hover effect
        const dx = el.x - mouseRef.current.x
        const dy = el.y - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const hoverBoost = dist < 180 ? 1.0 - (dist / 180) : 0
        const alpha = Math.min(1, (el.alpha ?? BASE_ALPHA) + hoverBoost * 0.3) // Increased hover effect

        // draw
        ctx.save()
        ctx.translate(el.x, el.y)

        // Only apply shadow on hover for better performance
        if (hoverBoost > 0.5) {
          ctx.shadowBlur = 10 * el.depth
          ctx.shadowColor = 'rgba(255, 255, 255, 0.15)'
        } else {
          ctx.shadowBlur = 0
        }

        ctx.globalAlpha = alpha

        if (el.type === 'icon' && el.iconName) {
          drawIcon(ctx, el.iconName, size, isDark)
        } else {
          // This 'else' block will no longer be reached, but is safe to leave
          ctx.font = el.type === 'code'
            ? `${Math.round(12 * el.depth)}px "SF Mono", "Monaco", "Inconsolata", "Fira Code", monospace`
            : `${Math.round(13 * el.depth)}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'

          const metrics = ctx.measureText(el.content)
          const padding = 8 * el.depth
          const width = metrics.width + padding * 2
          const height = 22 * el.depth

          const bgColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 23, 42, 0.06)'
          const borderColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(15, 23, 42, 0.15)'
          const textColor = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.8)'

          ctx.fillStyle = bgColor
          ctx.fillRect(-width / 2, -height / 2, width, height)
          ctx.strokeStyle = borderColor
          ctx.lineWidth = 1
          ctx.strokeRect(-width / 2, -height / 2, width, height)

          ctx.fillStyle = textColor
          ctx.fillText(el.content, 0, 1)
        }

        ctx.restore()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
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