/** Procedural pixel-art helpers: build small flat-fill icons from circles/rects
 * instead of hand-typed ASCII grids, so shapes stay correct without manual
 * row-length counting. Used by data/shopIcons.tsx. */

export type Pixel = [x: number, y: number, color: string]

export function rectPx(x0: number, y0: number, w: number, h: number, color: string): Pixel[] {
  const px: Pixel[] = []
  const xStart = Math.round(x0)
  const xEnd = Math.round(x0 + w)
  const yStart = Math.round(y0)
  const yEnd = Math.round(y0 + h)
  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) px.push([x, y, color])
  }
  return px
}

export function vLinePx(x: number, y0: number, y1: number, color: string): Pixel[] {
  const px: Pixel[] = []
  const xr = Math.round(x)
  for (let y = Math.round(y0); y <= Math.round(y1); y++) px.push([xr, y, color])
  return px
}

export function circlePx(cx: number, cy: number, r: number, color: string): Pixel[] {
  const px: Pixel[] = []
  for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++) {
    for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
      const dx = x + 0.5 - cx
      const dy = y + 0.5 - cy
      if (dx * dx + dy * dy <= r * r) px.push([x, y, color])
    }
  }
  return px
}

/** Only the upper half of a circle (dome), based at cyBase. */
export function domePx(cx: number, cyBase: number, r: number, color: string): Pixel[] {
  const px: Pixel[] = []
  for (let y = Math.floor(cyBase - r); y <= Math.ceil(cyBase); y++) {
    for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
      const dx = x + 0.5 - cx
      const dy = y + 0.5 - cyBase
      if (dx * dx + dy * dy <= r * r) px.push([x, y, color])
    }
  }
  return px
}

export function ellipsePx(cx: number, cy: number, rx: number, ry: number, color: string): Pixel[] {
  const px: Pixel[] = []
  for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) {
    for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
      const dx = (x + 0.5 - cx) / rx
      const dy = (y + 0.5 - cy) / ry
      if (dx * dx + dy * dy <= 1) px.push([x, y, color])
    }
  }
  return px
}

export function ringPx(cx: number, cy: number, rOuter: number, rInner: number, color: string): Pixel[] {
  const px: Pixel[] = []
  for (let y = Math.floor(cy - rOuter); y <= Math.ceil(cy + rOuter); y++) {
    for (let x = Math.floor(cx - rOuter); x <= Math.ceil(cx + rOuter); x++) {
      const dx = x + 0.5 - cx
      const dy = y + 0.5 - cy
      const d2 = dx * dx + dy * dy
      if (d2 <= rOuter * rOuter && d2 >= rInner * rInner) px.push([x, y, color])
    }
  }
  return px
}

/** Trapezoid centered on cx, from (yTop, wTop) down to (yBottom, wBottom). */
export function trapezoidPx(
  cx: number,
  yTop: number,
  wTop: number,
  yBottom: number,
  wBottom: number,
  color: string,
): Pixel[] {
  const px: Pixel[] = []
  const rows = Math.max(1, Math.round(yBottom - yTop))
  for (let i = 0; i <= rows; i++) {
    const y = Math.round(yTop + i)
    const t = i / rows
    const w = wTop + (wBottom - wTop) * t
    const xStart = Math.round(cx - w / 2)
    const xEnd = Math.round(cx + w / 2)
    for (let x = xStart; x < xEnd; x++) px.push([x, y, color])
  }
  return px
}

interface PixelArtProps {
  /** Grid is size x size cells. */
  size: number
  pixels: Pixel[]
  className?: string
}

/** Renders a list of {x,y,color} cells as crisp square pixels, scaled by CSS (no fixed px size). */
export function PixelArt({ size, pixels, className }: PixelArtProps) {
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={className} shapeRendering="crispEdges">
      {pixels.map(([x, y, color], i) => (
        <rect key={i} x={x} y={y} width={1} height={1} fill={color} />
      ))}
    </svg>
  )
}
