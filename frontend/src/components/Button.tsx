import { clsx } from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  loading?: boolean
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--ink)]',
  secondary:
    'bg-card text-ink hover:bg-info/15 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--ink)]',
  ghost: 'border-transparent bg-transparent text-ink shadow-none hover:bg-info/15',
}

export function Button({
  variant = 'primary',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-2xl border-[3px] border-ink px-5 py-3 font-extrabold tracking-wide shadow-[4px_4px_0_var(--ink)] transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_var(--ink)] disabled:pointer-events-none disabled:opacity-50',
        VARIANT_CLASSES[variant],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Loading…' : children}
    </button>
  )
}
