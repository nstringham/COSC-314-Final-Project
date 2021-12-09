import { lcm } from "./src/factors.ts";

try {
  const a = promptInt("Enter a:");
  const b = promptInt("Enter b:");
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
function promptInt(message: string, radix = 10): number {
  const input = prompt(message) ?? "";
  const value = parseInt(input, radix);
  if (isNaN(value)) {
    throw new Error(`Invalid input! "${input}" is not an integer in base ${radix}.`);
  } else {
    return value;
  }
}
