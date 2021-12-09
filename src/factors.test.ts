import { assert, assertEquals, assertThrows } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { lcm } from "./factors.ts";

function testLcm(a: number, b: number, expected: number) {
  const start = Date.now();
  const actual = lcm(a, b);
  const end = Date.now();
  assertEquals(actual, expected, `lcm(${a}, ${b}) should be ${expected} but was ${actual}`);
  assert(end - start < 100, `lcm(${a}, ${b}) should take less than 100ms but took ` + (end - start) + "ms");
}

Deno.test("2 primes", () => {
  testLcm(1, 1, 1);
  testLcm(1, 2, 2);
  testLcm(2, 1, 2);
  testLcm(2, 2, 2);
  testLcm(7, 3, 21);
  testLcm(1, 1429, 1429);
  testLcm(3643, 7039, 3643 * 7039);
});

Deno.test("coprime", () => {
  testLcm(12, 1, 12);
  testLcm(6, 35, 6 * 35);
  testLcm(8, 9, 8 * 9);
  testLcm(7043 * 9, 1279 * 16, 7043 * 9 * 1279 * 16);
});

Deno.test("one common factor", () => {
  testLcm(6, 10, 30);
  testLcm(15, 10, 30);
  testLcm(12, 15, 60);
  testLcm(7867 * 4013, 7867 * 5153, 7867 * 4013 * 5153);
});

Deno.test("many common factors", () => {
  testLcm(144, 96, 288);
  testLcm(12, 20, 60);
  testLcm(100, 600, 600);
  testLcm(70_000_000, 50_000_000, 350_000_000);
  testLcm(1571 * 3671 * 5827, 1571 * 3671 * 4723, 1571 * 3671 * 5827 * 4723);
});

Deno.test("very large numbers", () => {
  testLcm(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
  testLcm(Number.MAX_SAFE_INTEGER + 1, Number.MAX_SAFE_INTEGER + 1, Number.MAX_SAFE_INTEGER + 1);
});

Deno.test("zero", () => {
  assertThrows(
    () => {
      lcm(1, 0);
    },
    Error,
    "a and b must be positive"
  );
  assertThrows(
    () => {
      lcm(0, 1);
    },
    Error,
    "a and b must be positive"
  );
  assertThrows(
    () => {
      lcm(0, 18);
    },
    Error,
    "a and b must be positive"
  );
});

Deno.test("negative", () => {
  assertThrows(
    () => {
      lcm(1, -1);
    },
    Error,
    "a and b must be positive"
  );
  assertThrows(
    () => {
      lcm(1, -1);
    },
    Error,
    "a and b must be positive"
  );
  assertThrows(
    () => {
      lcm(1, -120);
    },
    Error,
    "a and b must be positive"
  );
});

Deno.test("non-integer", () => {
  assertThrows(
    () => {
      lcm(1, 1.5);
    },
    Error,
    "a and b must be integers"
  );
  assertThrows(
    () => {
      lcm(1.5, 1);
    },
    Error,
    "a and b must be integers"
  );
  assertThrows(
    () => {
      lcm(Math.PI, 1);
    },
    Error,
    "a and b must be integers"
  );
});
