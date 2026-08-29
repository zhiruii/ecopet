import { useState, useEffect, useRef } from 'react'

export function usePetWalk(isPaused: boolean = false) {
  const [x, setX] = useState(50)
  const [y, setY] = useState(0)
  const [facingLeft, setFacingLeft] = useState(false)
  const [isWalking, setIsWalking] = useState(false)
  
  const isPausedRef = useRef(isPaused)
  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  const stateRef = useRef({
    x: 50,
    y: 0,
    targetX: 50,
    targetY: 0,
    state: 'idle', // 'idle' | 'walking'
    timer: 1000,
    lastTime: 0,
  })

  useEffect(() => {
    let animationFrameId: number

    const tick = (time: number) => {
      const s = stateRef.current
      const dt = time - (s.lastTime || time)
      s.lastTime = time

      // If paused, skip logic but keep looping
      if (isPausedRef.current) {
        animationFrameId = requestAnimationFrame(tick)
        return
      }

      if (s.state === 'idle') {
        s.timer -= dt
        if (s.timer <= 0) {
          if (Math.random() < 0.4) {
            // Walk!
            s.state = 'walking'
            s.targetX = 10 + Math.random() * 75
            s.targetY = Math.random() * 100
            
            // Bin avoidance
            if (s.targetX < 22 && s.targetY < 20) {
               s.targetX = 25 + Math.random() * 10
            }
            
            setFacingLeft(s.targetX < s.x)
            setIsWalking(true)
          } else {
            // Stay idle
            s.timer = 3000 + Math.random() * 3000
            setFacingLeft(false)
            setIsWalking(false)
          }
        }
      } else if (s.state === 'walking') {
        const dx = s.targetX - s.x
        const dy = s.targetY - s.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        // Speed: 50% distance in 6000ms = ~0.00833 %/ms
        const step = 0.00833 * dt

        if (dist <= step) {
          s.x = s.targetX
          s.y = s.targetY
          s.state = 'idle'
          s.timer = 1000 + Math.random() * 2000
          setIsWalking(false)
        } else {
          s.x += (dx / dist) * step
          s.y += (dy / dist) * step
        }
        
        setX(s.x)
        setY(s.y)
      }

      animationFrameId = requestAnimationFrame(tick)
    }

    animationFrameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return { x, y, facingLeft, isWalking }
}
