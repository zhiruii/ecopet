import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AccessoryId, PetMood, PetSpeciesId } from 'shared/types'
import { ACCESSORY_SLOT } from '../data/shopItems'
import { persistConfig } from './persist'

interface PetState {
  species: PetSpeciesId | null
  name: string
  mood: PetMood
  hunger: number // 0-100
  owned: AccessoryId[]
  worn: AccessoryId[]
  setSpecies: (species: PetSpeciesId) => void
  setName: (name: string) => void
  setMood: (mood: PetMood) => void
  feed: (restores: number) => void
  own: (id: AccessoryId) => void
  wear: (id: AccessoryId) => void
  unwear: (id: AccessoryId) => void
}

export const usePetStore = create<PetState>()(
  persist(
    (set) => ({
      species: null,
      name: '',
      mood: 'idle',
      hunger: 80,
      owned: [],
      worn: [],
      setSpecies: (species) => set({ species }),
      setName: (name) => set({ name: name.slice(0, 12) }),
      setMood: (mood) => set({ mood }),
      feed: (restores) =>
        set((state) => ({
          hunger: Math.min(100, state.hunger + restores),
          mood: 'eating',
        })),
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
    persistConfig('pet'),
  ),
)
