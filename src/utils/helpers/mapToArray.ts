export function mapToArray<K, V>(map: ReadonlyMap<K, V>): V[] {
  return Array.from(map.values());
}
