export function sorterByPattern<T extends object>(pattern: T[], key: keyof T) {
  const hash: Record<string, number> = {};
  pattern.forEach((item, index) => {
    hash[item[key].toString()] = index;
  });

  return function (n1: T, n2: T) {
    const firstValue = n1[key].toString();
    const secondValue = n2[key].toString();
    if (!(firstValue in hash)) return 1;
    if (!(secondValue in hash)) return -1;
    return hash[firstValue] - hash[secondValue];
  };
}
