import { clsx } from 'clsx'

interface CounterProps {
  value: number
  className?: string
}

/** Plain number display. The animated tick-up on award is B's reward-moment work. */
export function Counter({ value, className }: CounterProps) {
  return <span className={clsx('font-extrabold tabular-nums', className)}>{value}</span>
}
