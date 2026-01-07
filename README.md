# Quickstart | Resonate TypeScript SDK

![quickstart banner](/assets/quickstart-banner.png)

## The function you are about to activate

A countdown as a loop. Simple, but the function can run for minutes, hours, or days, despite restarts.

<Tabs groupId="language" defaultValue="typescript" values={[
{ label: "TypeScript", value: "typescript" },
{ label: "Python", value: "python" },
]}>

<TabItem value="typescript">

```typescript title="countdown.ts"
import { Resonate, type Context } from "@resonatehq/sdk";

function* countdown(context: Context, count: number, delay: number) {
  for (let i = count; i > 0; i--) {
    // Run a function, persist its result
    yield* context.run((context: Context) => console.log(`Countdown: ${i}`));
    // Sleep
    yield* context.sleep(delay * 1000);
  }
  console.log("Done!");
}
// Instantiate Resonate
const resonate = new Resonate({ url: "http://localhost:8001" });
// Register the function
resonate.register(countdown);
```

## Steps to run

### 1. Install the Resonate Server & CLI

```shell
brew install resonatehq/tap/resonate
```

### 2. Install the Resonate SDK

```shell
npm install @resonatehq/sdk
```

### 3. Start the server

```shell
resonate dev
```

### 4. Start the worker

```shell
npx ts-node countdown.ts
```

### 5. Run the function

Run the function with execution ID `countdown.1`:

```shell
resonate invoke countdown.1 --func countdown --arg 5 --arg 60
```

## Result

You will see the countdown in the terminal

```shell
npx ts-node countdown.ts
Countdown: 5
Countdown: 4
Countdown: 3
Countdown: 2
Countdown: 1
Done!
```

## What to try

After starting the function, inspect the current state of the execution using the `resonate tree` command. The tree command visualizes the call graph of the function execution as a graph of durable promises.

```shell
resonate tree countdown.1
```

Now try killing the worker mid-countdown and restarting. **The countdown picks up right where it left off without missing a beat.**

## Next steps

- [Learn how Resonate works](https://docs.resonatehq.io/evaluate/how-it-works)
- [Explore examples](https://docs.resonatehq.io/get-started/examples)
- [Build a real application](https://docs.resonatehq.io/learn)
