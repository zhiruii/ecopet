export interface AwardBreakdown {
  base: number
  rinseBonus: number
  binBonus: number
  co2Bonus: number
  total: number
}

const BASE_CREDITS = 10
const RINSE_BONUS = 5
const BIN_BONUS = 5
const CREDITS_PER_KG_CO2 = 20

export interface AwardParams {
  recyclable: boolean
  rinseConfirmed: boolean
  binConfirmed: boolean
  co2SavedKg: number
}

/**
 * Base award rules for a single scan. Anti-gaming (daily cap, same-material
 * diminishing returns, dedupe) wraps this in Lap 3 — this function is
 * deliberately unaware of history.
 */
export function awardForScan(params: AwardParams): AwardBreakdown {
  if (!params.recyclable) {
    return { base: 0, rinseBonus: 0, binBonus: 0, co2Bonus: 0, total: 0 }
  }
  const base = BASE_CREDITS
  const rinseBonus = params.rinseConfirmed ? RINSE_BONUS : 0
  const binBonus = params.binConfirmed ? BIN_BONUS : 0
  const co2Bonus = Math.round(params.co2SavedKg * CREDITS_PER_KG_CO2)
  return { base, rinseBonus, binBonus, co2Bonus, total: base + rinseBonus + binBonus + co2Bonus }
}
