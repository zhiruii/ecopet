import type { Material } from 'shared/types'

export interface EmissionFactor {
  /** kg CO2e avoided per kg recycled vs. landfilled, EPA WARM "Net Recycling Emissions" */
  kgCo2ePerKg: number
  /** Typical single-item mass in grams — fallback when the AI can't estimate */
  typicalGrams: number
  /** Citation URL — see docs/sources.md for the exact figure, exhibit and date accessed */
  source: string
}

export const EMISSION_FACTORS: Record<Material, EmissionFactor> = {
  aluminium: {
    kgCo2ePerKg: 10.04,
    typicalGrams: 15,
    source: 'https://archive.epa.gov/epawaste/conserve/tools/warm/pdfs/Metals.pdf',
  },
  pet_plastic: {
    kgCo2ePerKg: 1.25,
    typicalGrams: 25,
    source: 'https://archive.epa.gov/epawaste/conserve/tools/warm/pdfs/Plastics.pdf',
  },
  hdpe_plastic: {
    kgCo2ePerKg: 0.97,
    typicalGrams: 40,
    source: 'https://archive.epa.gov/epawaste/conserve/tools/warm/pdfs/Plastics.pdf',
  },
  steel: {
    kgCo2ePerKg: 2.0,
    typicalGrams: 60,
    source: 'https://archive.epa.gov/epawaste/conserve/tools/warm/pdfs/Metals.pdf',
  },
  glass: {
    kgCo2ePerKg: 0.31,
    typicalGrams: 300,
    source: 'https://archive.epa.gov/epawaste/conserve/tools/warm/pdfs/Glass.pdf',
  },
  paper_cardboard: {
    kgCo2ePerKg: 3.44,
    typicalGrams: 200,
    source: 'https://archive.epa.gov/epawaste/conserve/tools/warm/pdfs/Paper_Products.pdf',
  },
  non_recyclable: {
    kgCo2ePerKg: 0,
    typicalGrams: 0,
    source: 'https://archive.epa.gov/epawaste/conserve/tools/warm/pdfs/Paper_Products.pdf',
  },
}
