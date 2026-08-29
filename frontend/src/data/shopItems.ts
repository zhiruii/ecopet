import type { AccessoryId } from 'shared/types'

export interface FoodItem {
  id: string
  name: string
  price: number
  /** hunger restored, 0-100 */
  restores: number
}

export interface AccessoryItem {
  id: AccessoryId
  name: string
  price: number
}

export const FOODS: FoodItem[] = [
  { id: 'snack', name: 'Leaf Snack', price: 10, restores: 20 },
  { id: 'meal', name: 'Veggie Bowl', price: 25, restores: 50 },
  { id: 'feast', name: 'Garden Feast', price: 50, restores: 100 },
]

export const ACCESSORIES: AccessoryItem[] = [
  { id: 'hat', name: 'Little Hat', price: 40 },
  { id: 'scarf', name: 'Cozy Scarf', price: 40 },
  { id: 'glasses', name: 'Round Glasses', price: 60 },
  { id: 'leafCrown', name: 'Leaf Crown', price: 80 },
]
