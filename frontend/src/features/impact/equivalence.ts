import { EQUIVALENCE_TIERS } from '../../data/equivalences'

export interface Equivalence {
  value: number
  unit: string
  phrase: string
}

/** Picks the tier that makes `kg` legible at its current scale — see CLAUDE.md §8, trap 1. */
export function equivalenceFor(kg: number): Equivalence {
  let chosen = EQUIVALENCE_TIERS[0]
  for (const tier of EQUIVALENCE_TIERS) {
    if (kg >= tier.minKg) chosen = tier
  }

  const raw = kg / chosen.kgCo2ePerUnit
  const value = raw < 10 ? Math.round(raw * 10) / 10 : Math.round(raw)
  const unit = value === 1 ? chosen.unit : chosen.unitPlural
  return { value, unit, phrase: `≈ ${value} ${unit}` }
}
