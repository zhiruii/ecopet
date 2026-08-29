import type { AccessoryId, FoodId } from 'shared/types'

export interface FoodItem {
  id: FoodId
  name: string
  price: number
  /** happiness added when eaten, on the same 0-100 scale as the pet's stat */
  happiness: number
}

/** Where an accessory sits on the pet. One worn item per slot. */
export type AccessorySlot = 'head' | 'face' | 'body'

export interface AccessoryItem {
  id: AccessoryId
  name: string
  price: number
  slot: AccessorySlot
}

export const FOODS: FoodItem[] = [
  { id: 'snack', name: 'Leaf Snack', price: 10, happiness: 3 },
  { id: 'meal', name: 'Veggie Bowl', price: 25, happiness: 9 },
  { id: 'feast', name: 'Garden Feast', price: 50, happiness: 20 },
]

export const FOOD_BY_ID = Object.fromEntries(FOODS.map((f) => [f.id, f])) as Record<
  FoodId,
  FoodItem
>

/** How many of each food the player is holding. Every id present, so callers never see undefined. */
export type FoodInventory = Record<FoodId, number>

export function emptyInventory(): FoodInventory {
  return Object.fromEntries(FOODS.map((f) => [f.id, 0])) as FoodInventory
}

/** Fills in missing/invalid counts so a persisted inventory always has every food id. */
export function normalizeInventory(raw: unknown): FoodInventory {
  const inventory = emptyInventory()
  if (raw && typeof raw === 'object') {
    for (const food of FOODS) {
      const count = (raw as Record<string, unknown>)[food.id]
      if (typeof count === 'number' && count > 0) inventory[food.id] = Math.floor(count)
    }
  }
  return inventory
}

export const ACCESSORIES: AccessoryItem[] = [
  { id: 'hat', name: 'Little Hat', price: 40, slot: 'head' },
  { id: 'scarf', name: 'Cozy Scarf', price: 40, slot: 'body' },
  { id: 'glasses', name: 'Round Glasses', price: 60, slot: 'face' },
  { id: 'leafCrown', name: 'Leaf Crown', price: 80, slot: 'head' },
]

export const ACCESSORY_SLOT = Object.fromEntries(
  ACCESSORIES.map((a) => [a.id, a.slot]),
) as Record<AccessoryId, AccessorySlot>

export const SLOT_LABEL: Record<AccessorySlot, string> = {
  head: 'Head',
  face: 'Face',
  body: 'Body',
}
