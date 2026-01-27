import { Resonate, type Context } from "@resonatehq/sdk";

async function notify(_: Context, message: string) {
  console.log(message);
}

function* countdown(context: Context, count: number | number[], delay?: number) {
  // Handle SDK array wrapping of parameters
  let actualCount: number;
  let actualDelay: number;

  if (Array.isArray(count)) {
    [actualCount, actualDelay] = count as any;
  } else {
    actualCount = count;
    actualDelay = delay!;
  }

  for (let i = actualCount; i > 0; i--) {
    // Run a function, persist its result
    yield* context.run(notify, `Countdown: ${i}`);
    // Sleep
    yield* context.sleep(actualDelay * 1000);
  }
  console.log("Done!");
}

// Instantiate Resonate (local mode with embedded server)
const resonate = new Resonate();

// Register the function
const countdownR = resonate.register(countdown);

// Run the countdown
async function main() {
  try {
    console.log("Starting countdown...");
    const id = `countdown-${Date.now()}`; // Unique ID to avoid caching
    await countdownR.run(id, 3, 0.5); // Count from 3 with 0.5-second delay
    console.log("Countdown completed!");
    resonate.stop();
  } catch (e) {
    console.error("Error:", e);
    resonate.stop();
  }
}

main();
