import { clsx } from 'clsx'
import type { HTMLAttributes } from 'react'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'pixel-notch border-[3px] border-ink bg-card p-4 shadow-[4px_4px_0_var(--ink)]',
        className,
      )}
      {...props}
    />
  )
}
