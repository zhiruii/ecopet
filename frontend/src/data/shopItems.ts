import type { AccessoryId } from 'shared/types'

export interface FoodItem {
  id: string
  name: string
  price: number
  /** hunger restored, 0-100 */
  restores: number
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
  { id: 'snack', name: 'Leaf Snack', price: 10, restores: 20 },
  { id: 'meal', name: 'Veggie Bowl', price: 25, restores: 50 },
  { id: 'feast', name: 'Garden Feast', price: 50, restores: 100 },
]

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
