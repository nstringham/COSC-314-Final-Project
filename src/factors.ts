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
export function lcm(a: bigint, b: bigint): bigint {
  if (a <= 0 || b <= 0) {
    throw new Error("a and b must be positive");
  }

  let gcf = 1n;

  // for every prime (and also some other numbers)
  for (const n of primeNumbers()) {
    /*
      loop invariant: a and b are not both divisible by any value less than n
        ∀x(x < n -> ¬(a divisible by x) ∨ ¬(b divisible by x))
    */

    if (n > a || n > b) {
      /*
        ∀x∀y(x > y -> ¬(y divisible by x))
        ∴ a and b are coprime
      */
      break;
    }

    while (a % n === 0n && b % n === 0n) {
      gcf *= n;
      a /= n;
      b /= n;
    }
  }
  /*
    gcf` = the greatest common factor of a and b
    a` = `a / gcf`
    b` = `b / gcf`
  */

  return gcf * a * b;
  /*
    return = a` * b` * gcf`
      = `a * `b / gcf`
      = the least common multiple of a and b
  */
}

/**
 * @yields a sequence of numbers that includes all prime numbers
 *
 * @note this function also yields numbers 9 and 15 (which are not prime)
 *
 * @example
 * 2, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, ...
 */
function* primeNumbers(): IterableIterator<bigint> {
  // 2 is the only even prime number
  yield 2n;

  // all odd numbers starting at 3
  for (let n = 3n; true; n += 2n) {
    yield n;
  }
}
