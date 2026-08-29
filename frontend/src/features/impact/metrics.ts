import type { ScanRecord } from '../../store/useProgressStore'

const WEEK_MS = 7 * 24 * 60 * 60 * 1000

/** Recyclable items scanned in the trailing 7 days — the primary metric. */
export function itemsThisWeek(scans: ScanRecord[], now = Date.now()): number {
  return scans.filter((s) => s.recyclable && now - s.timestamp <= WEEK_MS).length
}

/** % change vs. the onboarding baseline. Target: +0.5 (see CLAUDE.md §2). */
export function baselineDelta(scans: ScanRecord[], baseline: number, now = Date.now()): number {
  const current = itemsThisWeek(scans, now)
  if (baseline <= 0) return current > 0 ? 1 : 0
  return (current - baseline) / baseline
}

/** % of recyclable scans where the user confirmed BOTH rinse and bin — the secondary metric. */
export function correctSortingRate(scans: ScanRecord[]): number {
  const relevant = scans.filter((s) => s.recyclable)
  if (relevant.length === 0) return 0
  const correct = relevant.filter((s) => s.rinseConfirmed && s.binConfirmed).length
  return correct / relevant.length
}

export function cumulativeCo2(scans: ScanRecord[]): number {
  return Math.round(scans.reduce((sum, s) => sum + s.co2SavedKg, 0) * 1000) / 1000
}
