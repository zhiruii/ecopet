import { clsx } from 'clsx'
import { IconHome, IconScan, IconShop, IconStats } from './icons'
import type { Screen } from '../App'

interface TabBarProps {
  active: Screen
  onNavigate: (screen: Screen) => void
}

const TABS: { id: Screen; label: string; Icon: typeof IconHome }[] = [
  { id: 'home', label: 'Home', Icon: IconHome },
  { id: 'scan', label: 'Scan', Icon: IconScan },
  { id: 'shop', label: 'Shop', Icon: IconShop },
  { id: 'stats', label: 'Stats', Icon: IconStats },
]

export function TabBar({ active, onNavigate }: TabBarProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto flex max-w-[430px] justify-around border-t-[3px] border-ink bg-card px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      {TABS.map(({ id, label, Icon }) => {
        const isActive = id === active
        return (
          <button
            key={id}
            type="button"
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onNavigate(id)}
            className="group flex flex-col items-center gap-1 px-2 py-1"
          >
            <span
              className={clsx(
                'flex h-9 w-9 items-center justify-center rounded-full border-[2px] transition-colors',
                isActive
                  ? 'border-ink bg-accent group-hover:bg-accent/90'
                  : 'border-transparent group-hover:bg-info/25',
              )}
            >
              <Icon
                size={20}
                strokeWidth={2.5}
                className={isActive ? 'text-white' : 'text-ink/45'}
              />
            </span>
            <span className={clsx('text-xs font-bold', isActive ? 'text-ink' : 'text-ink/45')}>
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
