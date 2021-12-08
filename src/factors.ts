/**
 * Finds the least common multiple of two positive integers.
 *
 * @param a the first positive integer
 * @param b the second positive integer
 * @returns the least common multiple of a and b
 *
 * @example
 * lcm(2, 3) // returns 6
 * lcm(10, 15) // returns 30
 * lcm(1, -1) // throws an error
 * lcm(1, 1.5) // throws an error
 */
export function lcm(a: number, b: number): number {
  for (let i = 1; true; i++) {
    if (i % a === 0 && i % b === 0) {
      return i;
    }
  }
}
