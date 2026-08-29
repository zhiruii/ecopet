import { clsx } from 'clsx'

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
}

export function ProgressBar({ value, max = 100, className }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(max, value))
  const percentage = max > 0 ? (clamped / max) * 100 : 0
  return (
    <div
      className={clsx(
        'h-4 w-full overflow-hidden rounded-full border-[2px] border-ink bg-paper',
        className,
      )}
    >
      <div className="h-full bg-info transition-[width]" style={{ width: `${percentage}%` }} />
    </div>
  )
}
