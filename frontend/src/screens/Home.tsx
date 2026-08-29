import { Zap, Coins, ScanLine } from 'lucide-react'
import type { Screen } from '../App'
import { usePetStore } from '../store/usePetStore'
import { useProgressStore } from '../store/useProgressStore'
import { itemsThisWeek } from '../features/impact/metrics'
import { Chip } from '../components/Chip'
import { Button } from '../components/Button'
import { ProgressBar } from '../components/ProgressBar'
import { ListItem } from '../components/ListItem'

interface HomeProps {
  onNavigate: (screen: Screen) => void
}

export function Home({ onNavigate }: HomeProps) {
  const name = usePetStore((s) => s.name)
  const species = usePetStore((s) => s.species)
  const credits = useProgressStore((s) => s.credits)
  const streak = useProgressStore((s) => s.streak)
  const scans = useProgressStore((s) => s.scans)
  const baseline = useProgressStore((s) => s.baseline)

  const thisWeek = itemsThisWeek(scans)
  const target = baseline && baseline > 0 ? baseline : 5
  const progressPct = Math.min(100, (thisWeek / target) * 100)

  return (
    <div className="flex flex-col gap-5 p-5 pb-28">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-black">{name || 'Your pet'}</h1>
        <div className="flex gap-2">
          <Chip tone="warn">
            <Zap size={14} strokeWidth={3} />
            {streak}
          </Chip>
          <Chip tone="credit">
            <Coins size={14} strokeWidth={3} />
            {credits}
          </Chip>
        </div>
      </header>

      {/* Hero stage — pet/ renders the real species + mood + accessories here */}
      <div className="flex h-60 flex-col items-center justify-center gap-3 rounded-3xl border-[3px] border-ink bg-card shadow-[4px_4px_0_var(--ink)]">
        <div className="flex h-28 w-28 items-center justify-center rounded-full border-[3px] border-dashed border-ink/25 text-center text-xs font-bold uppercase tracking-wide text-ink/40">
          {species ?? 'no pet'}
        </div>
        <p className="text-xs font-bold uppercase tracking-wide text-ink/40">pet/ renders here</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-sm font-bold">
          <span>This week&apos;s items</span>
          <span className="opacity-60">
            {thisWeek} / {target}
          </span>
        </div>
        <ProgressBar value={progressPct} />
      </div>

      <ListItem
        icon={<ScanLine size={20} strokeWidth={2.5} />}
        title="Got something to recycle?"
        subtitle="Snap it, sort it, earn credits"
        trailing={
          <Button className="px-4 py-2 text-sm" onClick={() => onNavigate('scan')}>
            Start
          </Button>
        }
      />
    </div>
  )
}
