import { IconRecycle, IconTrendingUp, IconCheckCircle, IconLeaf } from '../components/icons'
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
          icon={<IconRecycle size={20} />}
          title="Items this week"
          subtitle={`Baseline: ${baseline ?? '—'} / week`}
          trailing={<span className="text-lg font-black">{thisWeek}</span>}
        />
        <ListItem
          icon={<IconLeaf size={20} />}
          title="CO2 saved"
          subtitle={equiv.phrase}
          trailing={<span className="text-lg font-black">{co2} kg</span>}
        />
      </div>


    </div>
  )
}
