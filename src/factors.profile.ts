import { lcm } from "./factors.ts";

const maxInput = Math.sqrt(Number.MAX_SAFE_INTEGER);

let trials = 0;
let totalTime = 0;

while (true) {
  const a = BigInt(Math.ceil(Math.random() * maxInput));
  const b = BigInt(Math.ceil(Math.random() * maxInput));
  const start = performance.now();
  lcm(a, b);
  const end = performance.now();
  trials++;
  totalTime += end - start;
  if (trials % 100 === 0) {
    console.log(`${trials} trials, ${totalTime / trials} ms/trial`);
  }
}
