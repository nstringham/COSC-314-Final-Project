import { lcm } from "./src/factors.ts";

try {
  const a = promptBigInt("Enter a:");
  const b = promptBigInt("Enter b:");
  console.log(`The least common multiple of ${a} and ${b} is ${lcm(a, b)}`);
} catch (error) {
  console.error(error.message);
}

/**
 * Asks the user for an integer and asks again if the input is not an integer.
 *
 * @param message the message to display when asking for an integer
 * @returns the integer entered by the user
 */
function promptBigInt(message: string): bigint {
  const input = prompt(message);
  try {
    return BigInt(input as string);
  } catch {
    throw new Error(`Invalid input! "${input ?? ""}" is not an integer.`);
  }
}
