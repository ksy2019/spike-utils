import { DeepClone } from './object'

const cache: Record<string, unknown> = {}
export const CacheGet = (key: string): unknown => {
  return cache[key] ? cache[key] : {}
}

export const CacheSet = <T>(key: string, data: T): void => {
  cache[key] = DeepClone(data)
}
