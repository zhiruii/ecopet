import type { ReactElement } from 'react'
import { PixelArt } from '../components/PixelArt'
import type { Pixel } from '../components/PixelArt'
import {
  rectPx,
  vLinePx,
  circlePx,
  domePx,
  ellipsePx,
  ringPx,
  trapezoidPx,
} from '../components/PixelArt'

const INK = 'var(--ink)'
const GRID = 16

function icon(pixels: Pixel[], className?: string) {
  return <PixelArt size={GRID} pixels={pixels} className={className ?? 'w-full h-full'} />
}

function leafSnackPixels(): Pixel[] {
  const cx = 8
  const cy = 7
  return [
    ...ellipsePx(cx, cy, 5.5, 4.2, INK),
    ...ellipsePx(cx, cy, 4.5, 3.3, '#8BC34A'),
    ...vLinePx(cx, cy - 2.5, cy + 2.5, '#5C8F35'),
    ...rectPx(cx - 0.5, cy + 3.3, 1, 2.2, '#6B4423'),
  ]
}

function veggieBowlPixels(): Pixel[] {
  const cx = 8
  return [
    ...trapezoidPx(cx, 8, 11, 13, 7, INK),
    ...trapezoidPx(cx, 8.8, 10, 12.3, 6, '#C98B4B'),
    ...rectPx(cx - 5.2, 8.3, 10.4, 1, '#8B5A2B'),
    ...circlePx(cx - 3, 6.5, 1.6, INK),
    ...circlePx(cx - 3, 6.5, 1.1, '#E8934A'),
    ...circlePx(cx, 5.8, 1.8, INK),
    ...circlePx(cx, 5.8, 1.3, '#8B5FA6'),
    ...circlePx(cx + 3, 6.5, 1.6, INK),
    ...circlePx(cx + 3, 6.5, 1.1, '#5FA85F'),
  ]
}

function gardenFeastPixels(): Pixel[] {
  const cx = 8
  return [
    ...trapezoidPx(cx, 7.5, 12.5, 13.5, 8, INK),
    ...trapezoidPx(cx, 8.3, 11.5, 12.8, 7, '#B97A3D'),
    ...rectPx(cx - 5.8, 7.8, 11.6, 1, '#7A4E28'),
    ...circlePx(cx - 3.6, 5.8, 1.5, INK),
    ...circlePx(cx - 3.6, 5.8, 1, '#E8934A'),
    ...circlePx(cx - 1.2, 5.2, 1.6, INK),
    ...circlePx(cx - 1.2, 5.2, 1.1, '#8B5FA6'),
    ...circlePx(cx + 1.2, 5.2, 1.6, INK),
    ...circlePx(cx + 1.2, 5.2, 1.1, '#5FA85F'),
    ...circlePx(cx + 3.6, 5.8, 1.5, INK),
    ...circlePx(cx + 3.6, 5.8, 1, '#D9534F'),
  ]
}

function littleHatPixels(): Pixel[] {
  const cx = 8
  const brimY = 10
  return [
    ...domePx(cx, brimY, 5.2, INK),
    ...domePx(cx, brimY, 4.2, '#5EC7EE'),
    ...rectPx(cx - 4.6, brimY - 0.4, 9.2, 2.2, INK),
    ...rectPx(cx - 4, brimY, 8, 1.6, '#3D8FB8'),
    ...circlePx(cx, brimY - 5.6, 1.4, INK),
    ...circlePx(cx, brimY - 5.6, 0.9, '#FFFFFF'),
  ]
}

function cozyScarfPixels(): Pixel[] {
  const left = 8 - 2.2
  const width = 4.4
  const top = 3
  const bottom = 12
  const px: Pixel[] = []
  px.push(...rectPx(left - 0.6, top - 0.6, width + 1.2, bottom - top + 1.2, INK))
  px.push(...rectPx(left, top, width, bottom - top, '#B5533E'))
  for (let y = top + 1; y < bottom; y += 3) {
    px.push(...rectPx(left, y, width, 1, '#F0E4D4'))
  }
  for (let x = left; x < left + width; x += 1.4) {
    px.push(...rectPx(x, bottom, 0.8, 1.4, INK))
    px.push(...rectPx(x, bottom, 0.6, 1.1, '#B5533E'))
  }
  return px
}

function roundGlassesPixels(): Pixel[] {
  const cy = 8
  const r = 3.2
  const leftCx = 8 - 4
  const rightCx = 8 + 4
  return [
    ...ringPx(leftCx, cy, r, r - 1, INK),
    ...circlePx(leftCx, cy, r - 1, '#BFE3F0'),
    ...ringPx(rightCx, cy, r, r - 1, INK),
    ...circlePx(rightCx, cy, r - 1, '#BFE3F0'),
    ...rectPx(leftCx + r - 1, cy - 0.5, rightCx - r + 1 - (leftCx + r - 1), 1, INK),
  ]
}

function leafCrownPixels(): Pixel[] {
  const cx = 8
  const cy = 8
  const px: Pixel[] = [
    ...ringPx(cx, cy, 5.6, 3.6, INK),
    ...ringPx(cx, cy, 5.1, 4.1, '#5FA85F'),
  ]
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2
    const nx = cx + Math.cos(angle) * 4.6
    const ny = cy + Math.sin(angle) * 4.6
    px.push(...circlePx(nx, ny, 0.9, '#3F7A3F'))
  }
  px.push(...rectPx(cx - 1, cy + 5.2, 2, 1.4, INK))
  px.push(...rectPx(cx - 0.7, cy + 5.4, 1.4, 1, '#D9534F'))
  return px
}

export const IconLeafSnack = ({ className }: { className?: string }) => icon(leafSnackPixels(), className)
export const IconVeggieBowl = ({ className }: { className?: string }) => icon(veggieBowlPixels(), className)
export const IconGardenFeast = ({ className }: { className?: string }) => icon(gardenFeastPixels(), className)
export const IconLittleHat = ({ className }: { className?: string }) => icon(littleHatPixels(), className)
export const IconCozyScarf = ({ className }: { className?: string }) => icon(cozyScarfPixels(), className)
export const IconRoundGlasses = ({ className }: { className?: string }) => icon(roundGlassesPixels(), className)
export const IconLeafCrown = ({ className }: { className?: string }) => icon(leafCrownPixels(), className)

type ShopIcon = (props: { className?: string }) => ReactElement

export const FOOD_ICONS: Record<string, ShopIcon> = {
  snack: IconLeafSnack,
  meal: IconVeggieBowl,
  feast: IconGardenFeast,
}

export const ACCESSORY_ICONS: Record<string, ShopIcon> = {
  hat: IconLittleHat,
  scarf: IconCozyScarf,
  glasses: IconRoundGlasses,
  leafCrown: IconLeafCrown,
}
