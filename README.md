# TaskQueue

# Description

TaskQueue is a typescript/javascript library that allows you to queue asynchronous tasks and execute them sequentially.

# Features

- function `push` to add a task to the queue for a key
- return a promise that resolves when the task is executed

# Installation

### Prerequisites

*(It is recommanded to install Node and npm with [nvm](https://github.com/nvm-sh/nvm), check for [nvm-windows](https://github.com/coreybutler/nvm-windows) if you are on Windows)*
- [Node.js](https://nodejs.org/en/) (v19.0.0)
- [npm](https://www.npmjs.com/) (v9.7.2)

```bash
# Install ts-node
npm install -g ts-node@10.9.1
```

# Example

index.ts:

```typescript
import { TaskQueue } from "./TaskQueue";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const taskQueue = new TaskQueue();

const task1 = () => wait(1000).then(() => console.log("Task 1"));
const task2 = () => wait(2000).then(() => console.log("Task 2"));
const task3 = () => wait(1000).then(() => console.log("Task 3"));

console.log("Start");
taskQueue.push(task1).then(() => console.log("Task 1 finished"));
taskQueue.push(task2).then(() => console.log("Task 2 finished"));
taskQueue.push(task3).then(() => console.log("Task 3 finished"));
taskQueue.push(task1, "key1").then(() => console.log("Task 1 finished (key1)"));
taskQueue.push(task2, "key1").then(() => console.log("Task 2 finished (key1)"));
taskQueue.push(task3, "key1").then(() => console.log("Task 3 finished (key1)"));
```

Output:

```
Start
Task 1
Task 1 finished
Task 1
Task 1 finished (key1)
Task 2
Task 2 finished
Task 2
Task 2 finished (key1)
Task 3
Task 3 finished
Task 3
Task 3 finished (key1)
```

# Usage


```ts
export class TaskQueue {
	public push<T>(task: () => Promise<T>, key = "") {}
}
```


# License

MIT Licence. See [LICENSE file](LICENSE).
Please refer me with:

	Copyright (c) Nicolas VENTER All rights reserved.