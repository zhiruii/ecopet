/** Bumped to 2 when the pet's `hunger` stat became `happiness`. Every store
 * sharing this version needs a `migrate`, even an identity one, or zustand
 * logs an error when it reads a v1 payload. */
export const STORAGE_VERSION = 2

export function persistConfig<S>(
  name: string,
  migrate?: (persistedState: unknown, version: number) => S,
) {
  return { name: `ecopet:${name}`, version: STORAGE_VERSION, migrate }
}
