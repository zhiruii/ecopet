import { Recycle, TrendingUp, CheckCircle2, Leaf } from 'lucide-react'
import { useProgressStore } from '../store/useProgressStore'
import {
  itemsThisWeek,
  baselineDelta,
  correctSortingRate,
  cumulativeCo2,
} from '../features/impact/metrics'
import { equivalenceFor } from '../features/impact/equivalence'
import { BackButton } from '../components/BackButton'
import { ListItem } from '../components/ListItem'

interface StatsProps {
  onBack: () => void
}

export function Stats({ onBack }: StatsProps) {
  const scans = useProgressStore((s) => s.scans)
  const baseline = useProgressStore((s) => s.baseline)

  const thisWeek = itemsThisWeek(scans)
  const delta = baseline ? baselineDelta(scans, baseline) : null
  const rate = correctSortingRate(scans)
  const co2 = cumulativeCo2(scans)
  const equiv = equivalenceFor(co2)

  return (
    <div className="flex flex-col gap-5 p-5 pb-28">
      <div className="flex items-center gap-3">
        <BackButton onClick={onBack} label="Back to home" />
        <h1 className="text-xl font-black">Stats</h1>
      </div>

      <div className="flex flex-col gap-2">
        <ListItem
          icon={<Recycle size={20} strokeWidth={2.5} />}
          title="Items this week"
          subtitle={`Baseline: ${baseline ?? '—'} / week`}
          trailing={<span className="text-lg font-black">{thisWeek}</span>}
        />
        <ListItem
          icon={<TrendingUp size={20} strokeWidth={2.5} />}
          title="Change vs. baseline"
          subtitle="Primary metric — target +50%"
          trailing={
            <span className="text-lg font-black">
              {delta === null ? '—' : `${delta >= 0 ? '+' : ''}${Math.round(delta * 100)}%`}
            </span>
          }
        />
        <ListItem
          icon={<CheckCircle2 size={20} strokeWidth={2.5} />}
          title="Correct-sorting rate"
          subtitle="Rinsed + right bin, both confirmed"
          trailing={<span className="text-lg font-black">{Math.round(rate * 100)}%</span>}
        />
        <ListItem
          icon={<Leaf size={20} strokeWidth={2.5} />}
          title="CO2 saved"
          subtitle={equiv.phrase}
          trailing={<span className="text-lg font-black">{co2} kg</span>}
        />
      </div>

      <p className="text-xs opacity-60">Source: docs/sources.md — EPA WARM factors</p>
    </div>
  )
}
