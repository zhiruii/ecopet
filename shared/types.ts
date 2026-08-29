export type Material =
  | 'aluminium'
  | 'pet_plastic'
  | 'hdpe_plastic'
  | 'steel'
  | 'glass'
  | 'paper_cardboard'
  | 'non_recyclable'

export const MATERIALS: Material[] = [
  'aluminium',
  'pet_plastic',
  'hdpe_plastic',
  'steel',
  'glass',
  'paper_cardboard',
  'non_recyclable',
]

export interface IdentifyResult {
  material: Material
  itemType: string // e.g. "500ml drink bottle"
  estimatedGrams: number
  recyclable: boolean
  rinseNeeded: boolean
  confidence: number // 0–1
}

export type PetMood = 'idle' | 'happy' | 'eating' | 'sleepy' | 'sad'

export type PetSpeciesId = 'sprout' | 'bloop' | 'pebble' | 'nimbus' | 'fern' | 'coco'

export type AccessoryId = 'hat' | 'scarf' | 'glasses' | 'leafCrown'
