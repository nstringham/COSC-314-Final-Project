import { assert, assertEquals, assertThrows } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { gcf, lcm } from "./factors.ts";

function testLcm(a: bigint, b: bigint, expected: bigint) {
  const start = Date.now();
  const actual = lcm(a, b);
  const end = Date.now();
  assertEquals(actual, expected, `lcm(${a}, ${b}) should be ${expected} but was ${actual}`);
  assert(end - start < 100, `lcm(${a}, ${b}) should take less than 100ms but took ` + (end - start) + "ms");
}

Deno.test("2 primes lcm", () => {
  testLcm(1n, 1n, 1n);
  testLcm(1n, 2n, 2n);
  testLcm(2n, 1n, 2n);
  testLcm(2n, 2n, 2n);
  testLcm(7n, 3n, 21n);
  testLcm(1n, 1429n, 1429n);
  testLcm(3643n, 7039n, 3643n * 7039n);
});

Deno.test("coprime lcm", () => {
  testLcm(12n, 1n, 12n);
  testLcm(6n, 35n, 6n * 35n);
  testLcm(8n, 9n, 8n * 9n);
  testLcm(7043n * 9n, 1279n * 16n, 7043n * 9n * 1279n * 16n);
});

Deno.test("one common factor lcm", () => {
  testLcm(6n, 10n, 30n);
  testLcm(15n, 10n, 30n);
  testLcm(12n, 15n, 60n);
  testLcm(7867n * 4013n, 7867n * 5153n, 7867n * 4013n * 5153n);
});

Deno.test("many common factors lcm", () => {
  testLcm(144n, 96n, 288n);
  testLcm(12n, 20n, 60n);
  testLcm(100n, 600n, 600n);
  testLcm(70_000_000n, 50_000_000n, 350_000_000n);
  testLcm(1571n * 3671n * 5827n, 1571n * 3671n * 4723n, 1571n * 3671n * 5827n * 4723n);
});

const veryBigInt = 1n << 100n;

Deno.test("very large numbers lcm", () => {
  testLcm(3_000_000_000_000n, 5_000_000_000_000n, 15_000_000_000_000n);
  testLcm(veryBigInt, 1n, veryBigInt);
  testLcm(veryBigInt, veryBigInt, veryBigInt);
  testLcm(veryBigInt + 1n, veryBigInt + 1n, veryBigInt + 1n);
  testLcm(veryBigInt - 1n, veryBigInt - 1n, veryBigInt - 1n);
});

Deno.test("zero lcm", () => {
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

Deno.test("negative lcm", () => {
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

function testGcf(a: bigint, b: bigint, expected: bigint) {
  const start = Date.now();
  const actual = gcf(a, b);
  const end = Date.now();
  assertEquals(actual, expected, `gcf(${a}, ${b}) should be ${expected} but was ${actual}`);
  assert(end - start < 100, `gcf(${a}, ${b}) should take less than 100ms but took ` + (end - start) + "ms");
}

Deno.test("2 primes gcf", () => {
  testGcf(1n, 1n, 1n);
  testGcf(1n, 2n, 1n);
  testGcf(2n, 1n, 1n);
  testGcf(2n, 2n, 2n);
  testGcf(7n, 3n, 1n);
  testGcf(1n, 1429n, 1n);
  testGcf(3643n, 7039n, 1n);
});

Deno.test("coprime gcf", () => {
  testGcf(12n, 1n, 1n);
  testGcf(6n, 35n, 1n);
  testGcf(8n, 9n, 1n);
  testGcf(7043n * 9n, 1279n * 16n, 1n);
});

Deno.test("one common factor gcf", () => {
  testGcf(6n, 10n, 2n);
  testGcf(15n, 10n, 5n);
  testGcf(12n, 15n, 3n);
  testGcf(7867n * 4013n, 7867n * 5153n, 7867n);
});

Deno.test("many common factors gcf", () => {
  testGcf(144n, 96n, 48n);
  testGcf(12n, 20n, 4n);
  testGcf(100n, 600n, 100n);
  testGcf(70_000_000n, 50_000_000n, 10_000_000n);
  testGcf(1571n * 3671n * 5827n, 1571n * 3671n * 4723n, 1571n * 3671n);
});

Deno.test("very large numbers gcf", () => {
  testGcf(3_000_000_000_000n, 5_000_000_000_000n, 1_000_000_000_000n);
  testGcf(veryBigInt, 1n, 1n);
  testGcf(veryBigInt, veryBigInt, veryBigInt);
  testGcf(veryBigInt + 1n, veryBigInt + 1n, veryBigInt + 1n);
  testGcf(veryBigInt - 1n, veryBigInt - 1n, veryBigInt - 1n);
});

Deno.test("zero gcf", () => {
  testGcf(1n, 0n, 1n);
  testGcf(0n, 1n, 1n);
  testGcf(0n, 18n, 18n);
  testGcf(12345n, 0n, 12345n);
});

Deno.test("negative gcf", () => {
  assertThrows(
    () => {
      gcf(1n, -1n);
    },
    Error,
    "a and b cannot be negative"
  );
  assertThrows(
    () => {
      gcf(1n, -1n);
    },
    Error,
    "a and b cannot be negative"
  );
  assertThrows(
    () => {
      gcf(1n, -120n);
    },
    Error,
    "a and b cannot be negative"
  );
});
