/** 2: the pet's `hunger` stat became `happiness`.
 *  3: clear a `species` left over from the old 6-pet roster, which crashed
 *     the accessory renderer. Every store sharing this version needs a
 *     `migrate`, even an identity one, or zustand logs an error on old data. */
export const STORAGE_VERSION = 3

export function persistConfig<S>(
  name: string,
  migrate?: (persistedState: unknown, version: number) => S,
) {
  return { name: `ecopet:${name}`, version: STORAGE_VERSION, migrate }
}
