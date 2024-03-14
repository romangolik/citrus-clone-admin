export function arrayToMap<K, V>(
  items: readonly V[],
  mapFn: (value: V) => K
): Map<K, V> {
  return new Map<K, V>(items.map((item) => [mapFn(item), item]));
}
