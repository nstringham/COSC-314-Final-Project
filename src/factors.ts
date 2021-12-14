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
 */
export function lcm(a: bigint, b: bigint): bigint {
  if (a <= 0 || b <= 0) {
    throw new Error("a and b must be positive");
  }

  return (a * b) / gcf(a, b);
}

/**
 * Finds the greatest common factor of two non-zero integers using Stein’s Algorithm.
 *
 * @param a the first integer
 * @param b the second integer
 * @returns the greatest common factor of a and b
 *
 * @example
 * gcf(2, 3) // returns 1
 * gcf(10, 15) // returns 5
 * gcf(1, -1) // throws an error
 *
 * @see https://en.wikipedia.org/wiki/Binary_GCD_algorithm
 *
 * @credit adapted from https://www.geeksforgeeks.org/steins-algorithm-for-finding-gcd
 */
export function gcf(a: bigint, b: bigint): bigint {
  if (a < 0 || b < 0) {
    throw new Error("a and b cannot be negative");
  }

  // the gcf of 0 and any number is that number
  if (a === 0n) {
    return b;
  } else if (b === 0n) {
    return a;
  }
  // a > 0 ∧ b > 0

  // apply the gcf(2a, 2b) = 2gcf(a, b) rule k times
  let k = 0n;
  while (((a | b) & 1n) === 0n) {
    a >>= 1n;
    b >>= 1n;
    k++;
  }
  // a is odd ∨ b is odd

  while ((a & 1n) === 0n) {
    // a is even => b is odd

    // gcf(2a, b) = gcf(a, b)
    a >>= 1n;
  }
  // a is odd

  do {
    // gcf(a, 2b) = gcf(a, b)
    while ((b & 1n) === 0n) {
      b >>= 1n;
    }

    // gcf(a, b) = gcf(|a − b|, min(a, b))

    // this sets a = min(a, b) and b = max(a, b)
    if (a > b) {
      const temp = a;
      a = b;
      b = temp;
    }

    // b := |a - b| = max(a, b) - min(a, b)
    b = b - a;
  } while (b !== 0n);

  // multiply the 2^k back in from the gcf(2a, 2b) = 2gcf(a, b) rule
  return a << k;
}
