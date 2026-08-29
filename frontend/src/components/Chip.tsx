import { clsx } from 'clsx'
import type { HTMLAttributes } from 'react'

type ChipTone = 'neutral' | 'good' | 'warn' | 'bad' | 'credit'

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: ChipTone
}

// Pastel fills (good/credit) pair with dark ink text; the two deepened
// alert tones (warn/bad) pair with white — see tokens.css for why.
const TONE_CLASSES: Record<ChipTone, string> = {
  neutral: 'bg-card text-ink',
  good: 'bg-good text-ink',
  warn: 'bg-warn text-white',
  bad: 'bg-bad text-white',
  credit: 'bg-credit text-ink',
}

export function Chip({ tone = 'neutral', className, ...props }: ChipProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full border-[2px] border-ink px-3 py-1 text-sm font-bold',
        TONE_CLASSES[tone],
        className,
      )}
      {...props}
    />
  )
}
