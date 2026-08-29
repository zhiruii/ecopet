import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { IdentifyResult } from 'shared/types'
import { computeCo2 } from '../features/impact/computeCo2'
import { awardForScan } from '../features/economy/credits'
import { persistConfig } from './persist'

export interface ScanRecord {
  id: string
  timestamp: number
  material: IdentifyResult['material']
  itemType: string
  grams: number
  recyclable: boolean
  rinseConfirmed: boolean
  binConfirmed: boolean
  co2SavedKg: number
  creditsAwarded: number
}

interface AwardScanInput {
  result: IdentifyResult
  rinseConfirmed: boolean
  binConfirmed: boolean
}

interface ProgressState {
  credits: number
  /** Retention fields — plumbing only. Lap 3 owns the increment/decay rules. */
  streak: number
  streakFreezes: number
  scans: ScanRecord[]
  baseline: number | null
  setBaseline: (itemsPerWeek: number) => void
  awardScan: (input: AwardScanInput) => ScanRecord
  spend: (amount: number) => boolean
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      credits: 0,
      streak: 0,
      streakFreezes: 0,
      scans: [],
      baseline: null,
      setBaseline: (itemsPerWeek) => set({ baseline: itemsPerWeek }),
      awardScan: ({ result, rinseConfirmed, binConfirmed }) => {
        const co2SavedKg = result.recyclable
          ? computeCo2(result.material, result.estimatedGrams)
          : 0
        const { total } = awardForScan({
          recyclable: result.recyclable,
          rinseConfirmed,
          binConfirmed,
          co2SavedKg,
        })
        const record: ScanRecord = {
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          material: result.material,
          itemType: result.itemType,
          grams: result.estimatedGrams,
          recyclable: result.recyclable,
          rinseConfirmed,
          binConfirmed,
          co2SavedKg,
          creditsAwarded: total,
        }
        set((state) => ({
          scans: [...state.scans, record],
          credits: state.credits + total,
        }))
        return record
      },
      spend: (amount) => {
        if (get().credits < amount) return false
        set((state) => ({ credits: state.credits - amount }))
        return true
      },
    }),
    persistConfig('progress'),
  ),
)
