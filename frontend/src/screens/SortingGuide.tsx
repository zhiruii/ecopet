import { Droplets, Recycle } from 'lucide-react'
import type { Material } from 'shared/types'
import { BIN_RULES } from '../data/binRules'
import { Button } from '../components/Button'
import { ListItem } from '../components/ListItem'
import { CheckToggle } from '../components/CheckToggle'

interface SortingGuideProps {
  material: Material
  rinseConfirmed: boolean
  binConfirmed: boolean
  onToggleRinse: () => void
  onToggleBin: () => void
  onConfirm: () => void
}

/** Rinse + which-bin instruction, plus the two one-tap confirmations — a graded metric, not decoration. */
export function SortingGuide({
  material,
  rinseConfirmed,
  binConfirmed,
  onToggleRinse,
  onToggleBin,
  onConfirm,
}: SortingGuideProps) {
  const rule = BIN_RULES[material]
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-lg font-black">{rule.stream}</p>
        <p className="text-sm opacity-70">{rule.note}</p>
      </div>

      <div className="flex flex-col gap-2">
        <ListItem
          icon={<Droplets size={20} strokeWidth={2.5} />}
          title="Rinsed"
          trailing={<CheckToggle checked={rinseConfirmed} onToggle={onToggleRinse} label="Rinsed" />}
        />
        <ListItem
          icon={<Recycle size={20} strokeWidth={2.5} />}
          title="Sorted into the right bin"
          trailing={
            <CheckToggle
              checked={binConfirmed}
              onToggle={onToggleBin}
              label="Sorted into the right bin"
            />
          }
        />
      </div>

      <Button onClick={onConfirm}>Confirm</Button>
    </div>
  )
}
