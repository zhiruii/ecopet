import { IconDroplet, IconRecycle } from '../components/icons'
import type { Material } from 'shared/types'
import { BIN_RULES } from '../data/binRules'
import { Button } from '../components/Button'
import { ListItem } from '../components/ListItem'
import { CheckToggle } from '../components/CheckToggle'

interface SortingGuideProps {
  material: Material
  recyclable: boolean
  rinseConfirmed: boolean
  binConfirmed: boolean
  onToggleRinse: () => void
  onToggleBin: () => void
  onConfirm?: () => void
}

/** Rinse + which-bin instruction, plus the two one-tap confirmations — a graded metric, not decoration. */
export function SortingGuide({
  material,
  recyclable,
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

      {recyclable && (
        <div className="flex flex-col gap-2">
          <ListItem
            icon={<IconDroplet size={20} />}
            title="Rinsed"
            trailing={<CheckToggle checked={rinseConfirmed} onToggle={onToggleRinse} label="Rinsed" />}
          />
          <ListItem
            icon={<IconRecycle size={20} />}
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
      )}

      {onConfirm && <Button onClick={onConfirm}>Confirm</Button>}
    </div>
  )
}
