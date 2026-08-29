import type { Material } from 'shared/types'
import { EMISSION_FACTORS } from '../../data/emissionFactors'

/** Deterministic: kg CO2e avoided, computed locally from the cited factor table. */
export function computeCo2(material: Material, grams: number): number {
  const { kgCo2ePerKg } = EMISSION_FACTORS[material]
  const kg = kgCo2ePerKg * (grams / 1000)
  return Math.round(kg * 1000) / 1000
}
