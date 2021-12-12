import { assert, assertEquals, assertThrows } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { lcm } from "./factors.ts";

function testLcm(a: bigint, b: bigint, expected: bigint) {
  const start = Date.now();
  const actual = lcm(a, b);
  const end = Date.now();
  assertEquals(actual, expected, `lcm(${a}, ${b}) should be ${expected} but was ${actual}`);
  assert(end - start < 100, `lcm(${a}, ${b}) should take less than 100ms but took ` + (end - start) + "ms");
}

Deno.test("2 primes", () => {
  testLcm(1n, 1n, 1n);
  testLcm(1n, 2n, 2n);
  testLcm(2n, 1n, 2n);
  testLcm(2n, 2n, 2n);
  testLcm(7n, 3n, 21n);
  testLcm(1n, 1429n, 1429n);
  testLcm(3643n, 7039n, 3643n * 7039n);
});

Deno.test("coprime", () => {
  testLcm(12n, 1n, 12n);
  testLcm(6n, 35n, 6n * 35n);
  testLcm(8n, 9n, 8n * 9n);
  testLcm(7043n * 9n, 1279n * 16n, 7043n * 9n * 1279n * 16n);
});

Deno.test("one common factor", () => {
  testLcm(6n, 10n, 30n);
  testLcm(15n, 10n, 30n);
  testLcm(12n, 15n, 60n);
  testLcm(7867n * 4013n, 7867n * 5153n, 7867n * 4013n * 5153n);
});

Deno.test("many common factors", () => {
  testLcm(144n, 96n, 288n);
  testLcm(12n, 20n, 60n);
  testLcm(100n, 600n, 600n);
  testLcm(70_000_000n, 50_000_000n, 350_000_000n);
  testLcm(1571n * 3671n * 5827n, 1571n * 3671n * 4723n, 1571n * 3671n * 5827n * 4723n);
});

const veryBigInt = 1n << 100n;

Deno.test("very large numbers", () => {
  testLcm(3_000_000_000_000n, 5_000_000_000_000n, 15_000_000_000_000n);
  testLcm(veryBigInt, 1n, veryBigInt);
  testLcm(veryBigInt, veryBigInt, veryBigInt);
  testLcm(veryBigInt + 1n, veryBigInt + 1n, veryBigInt + 1n);
  testLcm(veryBigInt - 1n, veryBigInt - 1n, veryBigInt - 1n);
});

Deno.test("zero", () => {
  assertThrows(
    () => {
      lcm(1n, 0n);
    },
    Error,
    "a and b must be positive"
  );
  assertThrows(
    () => {
      lcm(0n, 1n);
    },
    Error,
    "a and b must be positive"
  );
  assertThrows(
    () => {
      lcm(0n, 18n);
    },
    Error,
    "a and b must be positive"
  );
});

Deno.test("negative", () => {
  assertThrows(
    () => {
      lcm(1n, -1n);
    },
    Error,
    "a and b must be positive"
  );
  assertThrows(
    () => {
      lcm(1n, -1n);
    },
    Error,
    "a and b must be positive"
  );
  assertThrows(
    () => {
      lcm(1n, -120n);
    },
    Error,
    "a and b must be positive"
  );
});
