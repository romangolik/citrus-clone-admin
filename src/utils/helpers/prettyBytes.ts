export function prettyBytes(number: number) {
  const UNITS = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const exponent = Math.min(
    Math.floor(Math.log(number) / Math.log(1024)),
    UNITS.length - 1
  );

  number /= 1024 ** exponent;

  return number.toPrecision(3) + " " + UNITS[exponent];
}
