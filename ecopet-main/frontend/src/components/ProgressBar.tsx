import { clsx } from 'clsx'

interface ProgressBarProps {
  /** 0-100 */
  value: number
  className?: string
}

export function ProgressBar({ value, className }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div
      className={clsx(
        'h-4 w-full overflow-hidden rounded-full border-[2px] border-ink bg-paper',
        className,
      )}
    >
      <div className="h-full bg-info transition-[width]" style={{ width: `${clamped}%` }} />
    </div>
  )
}
