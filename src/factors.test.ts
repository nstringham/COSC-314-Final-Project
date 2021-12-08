import { assert, assertEquals, assertThrows } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { lcm } from "./factors.ts";

Deno.test("LCM of 1 and 1", () => {
  assertEquals(lcm(1, 1), 1, "lcm(1, 1) should be 1");
});
Deno.test("LCM of 1 and 2", () => {
  assertEquals(lcm(1, 2), 2, "lcm(1, 2) should be 2");
});

Deno.test("LCM of 2 and 3", () => {
  assertEquals(lcm(2, 3), 6, "lcm(2, 3) should be 6");
});

Deno.test("LCM of 10 and 15", () => {
  assertEquals(lcm(10, 15), 30, "lcm(10, 15) should be 30");
});

Deno.test("LCM of 100 and 600", () => {
  assertEquals(lcm(100, 600), 600, "lcm(100, 600) should be 600");
});

Deno.test("LCM of 70_000_000 and 50_000_000 (timed)", () => {
  const start = Date.now();
  assertEquals(lcm(70_000_000, 50_000_000), 350_000_000, "lcm(70_000_000, 50_000_000) should be 350_000_000");
  const end = Date.now();
  assert(
    end - start < 1000,
    "lcm(70_000_000, 50_000_000) should take less than 1 second but took " + (end - start) + "ms"
  );
});

Deno.test("LCM of 1 and 0", () => {
  assertThrows(
    () => {
      lcm(1, 0);
    },
    Error,
    "a and b must be positive"
  );
});

Deno.test("LCM of 0 and 1", () => {
  assertThrows(
    () => {
      lcm(0, 1);
    },
    Error,
    "a and b must be positive"
  );
});

Deno.test("LCM of 1 and -1", () => {
  assertThrows(
    () => {
      lcm(1, -1);
    },
    Error,
    "a and b must be positive"
  );
});

Deno.test("LCM of 1 and 1.5", () => {
  assertThrows(
    () => {
      lcm(1, 1.5);
    },
    Error,
    "a and b must be integers"
  );
});

Deno.test("LCM of 1.5 and 1", () => {
  assertThrows(
    () => {
      lcm(1.5, 1);
    },
    Error,
    "a and b must be integers"
  );
});
