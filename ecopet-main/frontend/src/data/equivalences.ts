export interface EquivalenceTier {
  id: string
  unit: string
  unitPlural: string
  /** kg CO2e that equals one unit of this tier */
  kgCo2ePerUnit: number
  /** cumulative kg CO2e at which this tier becomes the legible one to show */
  minKg: number
  source: string
}

/**
 * Ordered ascending by minKg. equivalenceFor() (features/impact/equivalence.ts)
 * picks the highest tier the current amount qualifies for, so a single scan
 * reads in phone charges / km, and only a cumulative total reads in tree-years
 * or flight legs. See CLAUDE.md §8, trap 1.
 */
export const EQUIVALENCE_TIERS: EquivalenceTier[] = [
  {
    id: 'phoneCharge',
    unit: 'phone charge',
    unitPlural: 'phone charges',
    kgCo2ePerUnit: 0.0124,
    minKg: 0,
    source: 'https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator-calculations-and-references',
  },
  {
    id: 'kmDriven',
    unit: 'km driven',
    unitPlural: 'km driven',
    kgCo2ePerUnit: 0.2443,
    minKg: 1,
    source: 'https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator-calculations-and-references',
  },
  {
    id: 'treeYear',
    unit: 'tree-year of CO2 absorbed',
    unitPlural: 'tree-years of CO2 absorbed',
    kgCo2ePerUnit: 60,
    minKg: 15,
    source: 'https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator-calculations-and-references',
  },
  {
    id: 'flightLeg',
    unit: 'short regional flight',
    unitPlural: 'short regional flights',
    kgCo2ePerUnit: 230,
    minKg: 150,
    source: 'DEFRA 2023 short-haul factor (0.156 kg CO2e/km) x ~1500km regional flight',
  },
]
