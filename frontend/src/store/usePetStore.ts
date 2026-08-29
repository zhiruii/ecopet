import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AccessoryId, FoodId, PetMood, PetSpeciesId } from 'shared/types'
import {
  ACCESSORY_SLOT,
  FOOD_BY_ID,
  emptyInventory,
  normalizeInventory,
} from '../data/shopItems'
import type { FoodInventory } from '../data/shopItems'
import { PET_SPECIES_LIST } from '../pet/registry'
import { persistConfig } from './persist'

const MAX_HAPPINESS = 100

interface PetState {
  species: PetSpeciesId | null
  name: string
  mood: PetMood
  /** 0-100. Raised by food and by recycling; never falls. */
  happiness: number
  /** Foods bought but not yet eaten. */
  inventory: FoodInventory
  owned: AccessoryId[]
  worn: AccessoryId[]
  setSpecies: (species: PetSpeciesId) => void
  setName: (name: string) => void
  setMood: (mood: PetMood) => void
  addHappiness: (amount: number) => void
  buyFood: (id: FoodId) => void
  /** Eats one held unit and applies its happiness. Returns false if none held. */
  consumeFood: (id: FoodId) => boolean
  own: (id: AccessoryId) => void
  wear: (id: AccessoryId) => void
  unwear: (id: AccessoryId) => void
}

const clampHappiness = (value: number) => Math.max(0, Math.min(MAX_HAPPINESS, value))

/**
 * v1 stored the same 0-100 stat as `hunger` and held no food inventory.
 * v3 additionally drops a species left over from the 6-pet roster: those
 * components and accessory placements no longer exist, so keeping the id
 * would render a pet that cannot be drawn. Null sends the player back to
 * onboarding to pick again, which is the only honest recovery.
 */
function migratePetState(persisted: unknown): PetState {
  const { hunger, ...rest } = (persisted ?? {}) as Record<string, unknown>
  const carried = typeof hunger === 'number' ? hunger : undefined
  const prev = rest as Partial<PetState>
  const speciesIsKnown =
    prev.species != null && PET_SPECIES_LIST.includes(prev.species as PetSpeciesId)

  return {
    ...rest,
    species: speciesIsKnown ? prev.species : null,
    happiness: clampHappiness(typeof prev.happiness === 'number' ? prev.happiness : (carried ?? 80)),
    inventory: normalizeInventory(prev.inventory),
  } as PetState
}

export const usePetStore = create<PetState>()(
  persist(
    (set, get) => ({
      species: null,
      name: '',
      mood: 'idle',
      happiness: 80,
      inventory: emptyInventory(),
      owned: [],
      worn: [],
      setSpecies: (species) => set({ species }),
      setName: (name) => set({ name: name.slice(0, 12) }),
      setMood: (mood) => set({ mood }),
      addHappiness: (amount) =>
        set((state) => ({ happiness: clampHappiness(state.happiness + amount) })),
      buyFood: (id) =>
        set((state) => ({ inventory: { ...state.inventory, [id]: state.inventory[id] + 1 } })),
      consumeFood: (id) => {
        const state = get()
        if (state.inventory[id] <= 0) return false
        set({
          inventory: { ...state.inventory, [id]: state.inventory[id] - 1 },
          happiness: clampHappiness(state.happiness + FOOD_BY_ID[id].happiness),
          mood: 'happy',
        })
        return true
      },
      own: (id) =>
        set((state) => (state.owned.includes(id) ? state : { owned: [...state.owned, id] })),
      // One item per slot: wearing a second head piece takes the first one off.
      wear: (id) =>
        set((state) => {
          if (state.worn.includes(id)) return state
          const slot = ACCESSORY_SLOT[id]
          return { worn: [...state.worn.filter((w) => ACCESSORY_SLOT[w] !== slot), id] }
        }),
      unwear: (id) => set((state) => ({ worn: state.worn.filter((w) => w !== id) })),
    }),
    persistConfig<PetState>('pet', migratePetState),
  ),
)
