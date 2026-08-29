import { clsx } from 'clsx'
import { Check } from 'lucide-react'

interface CheckToggleProps {
  checked: boolean
  onToggle: () => void
  label: string
}

/** Circular confirm toggle — the one-tap "did you do this?" control. */
export function CheckToggle({ checked, onToggle, label }: CheckToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      aria-label={label}
      onClick={onToggle}
      className={clsx(
        'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[3px] transition-all active:scale-95',
        checked
          ? 'border-ink bg-good hover:bg-good/80'
          : 'border-ink/25 bg-transparent hover:border-ink/50 hover:bg-info/20',
      )}
    >
      {checked && <Check size={20} strokeWidth={3} className="text-ink" />}
    </button>
  )
}
