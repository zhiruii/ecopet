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

/** Phase-1 stand-in for the real /api/identify call, and the demo-mode data source. */
export function mockIdentify(options: MockIdentifyOptions = {}): Promise<IdentifyResult> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (options.force === 'error') {
        reject(new Error('mock identify: forced error'))
        return
      }
      if (options.force === 'lowConfidence') {
        resolve({ ...DEFAULT_RESULT, confidence: 0.42 })
        return
      }
      resolve({ ...DEFAULT_RESULT, material: options.material ?? DEFAULT_RESULT.material })
    }, DELAY_MS)
  })
}
