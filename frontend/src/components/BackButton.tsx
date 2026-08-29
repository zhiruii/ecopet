import { IconBack } from './icons'

interface BackButtonProps {
  onClick: () => void
  label?: string
}

/** Circular back-chevron, used at the top of any screen reached by pushing forward. */
export function BackButton({ onClick, label = 'Back' }: BackButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-ink bg-card shadow-[3px_3px_0_var(--ink)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-info/15 hover:shadow-[5px_5px_0_var(--ink)] active:translate-y-0 active:shadow-[1px_1px_0_var(--ink)]"
    >
      <IconBack size={20} className="text-ink" />
    </button>
  )
}
