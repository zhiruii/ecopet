import type { Material } from 'shared/types'

export interface BinRule {
  accepted: boolean
  rinseNeeded: boolean
  /** Which physical stream the item goes into */
  stream: string
  /** Shown on SortingGuide as the prep instruction */
  note: string
}

/**
 * Singapore uses a single commingled blue recycling bin for paper, plastic,
 * metal and glass — no on-site sorting by the resident. Source: NEA National
 * Recycling Programme, https://www.nea.gov.sg/our-services/waste-management/3r-programmes-and-resources/national-recycling-programme
 */
export const BIN_RULES: Record<Material, BinRule> = {
  aluminium: {
    accepted: true,
    rinseNeeded: true,
    stream: 'Blue recycling bin',
    note: 'Rinse out any drink residue and drop it in loose — no bag.',
  },
  pet_plastic: {
    accepted: true,
    rinseNeeded: true,
    stream: 'Blue recycling bin',
    note: 'Empty and rinse. Cap can stay on.',
  },
  hdpe_plastic: {
    accepted: true,
    rinseNeeded: true,
    stream: 'Blue recycling bin',
    note: 'Empty and rinse out any detergent or food residue.',
  },
  steel: {
    accepted: true,
    rinseNeeded: true,
    stream: 'Blue recycling bin',
    note: 'Rinse out food residue. Lids can go in too.',
  },
  glass: {
    accepted: true,
    rinseNeeded: true,
    stream: 'Blue recycling bin',
    note: 'Rinse out any liquid. Leave the lid on or off — either is fine.',
  },
  paper_cardboard: {
    accepted: true,
    rinseNeeded: false,
    stream: 'Blue recycling bin',
    note: 'Flatten it and keep it dry. Greasy sections (e.g. a pizza box centre) should be torn off and binned as general waste.',
  },
  non_recyclable: {
    accepted: false,
    rinseNeeded: false,
    stream: 'General waste',
    note: "This isn't accepted in the blue bin — it goes in general waste.",
  },
}
