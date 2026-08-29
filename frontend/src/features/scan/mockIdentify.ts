import type { IdentifyResult } from 'shared/types'

export interface MockIdentifyOptions {
  force?: 'lowConfidence' | 'error'
  material?: IdentifyResult['material']
}

const DEFAULT_RESULT: IdentifyResult = {
  material: 'aluminium',
  itemType: '330ml drink can',
  estimatedGrams: 15,
  recyclable: true,
  rinseNeeded: true,
  confidence: 0.94,
}

const DELAY_MS = 1500

export function mockIdentify(options: MockIdentifyOptions = {}): Promise<IdentifyResult[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (options.force === 'error') {
        reject(new Error('mock identify: forced error'))
        return
      }
      
      const item1 = { ...DEFAULT_RESULT, material: options.material ?? DEFAULT_RESULT.material }
      if (options.force === 'lowConfidence') {
        item1.confidence = 0.42
      }

      // Add a second distinct item for the multi-item UI testing
      const item2: IdentifyResult = {
        material: 'pet_plastic',
        itemType: '500ml water bottle',
        estimatedGrams: 20,
        recyclable: true,
        rinseNeeded: true,
        confidence: 0.88,
      }

      resolve([item1, item2])
    }, DELAY_MS)
  })
}
