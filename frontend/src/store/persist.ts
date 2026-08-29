export const STORAGE_VERSION = 1

export function persistConfig(name: string) {
  return { name: `ecopet:${name}`, version: STORAGE_VERSION } as const
}
