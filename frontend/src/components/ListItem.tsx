import { clsx } from 'clsx'
import type { ReactNode } from 'react'

interface ListItemProps {
  icon?: ReactNode
  title: string
  subtitle?: string
  trailing?: ReactNode
  className?: string
}

/** Icon + title/subtitle + trailing action row. The task/goal-row pattern used in Home, Shop, SortingGuide. */
export function ListItem({ icon, title, subtitle, trailing, className }: ListItemProps) {
  return (
    <div
      className={clsx(
        'pixel-notch flex items-center gap-3 border-[3px] border-ink bg-card p-4 shadow-[4px_4px_0_var(--ink)]',
        className,
      )}
    >
      {icon && (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center border-[2px] border-ink bg-info/20 text-ink">
          {icon}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate font-bold">{title}</p>
        {subtitle && <p className="truncate text-sm opacity-70">{subtitle}</p>}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </div>
  )
}
