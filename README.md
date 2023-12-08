# TaskQueueJS

TaskQueueJS is a typescript/javascript library that allows you to queue asynchronous tasks and execute them sequentially.

## Features

- function `push` to add a task to the queue for a key
- return a promise that resolves when the task is executed

## Installation

```bash
npm install https://github.com/nicolasventer/TaskQueueJS/releases/latest/download/task-queue-js.tgz
```

*After the first installation, you can update with `npm update task-queue-js`.*

## Example

Content of [example/ts/ts_example.ts](example/ts/ts_example.ts):

```ts
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

Content of [example/js/js_example.js](example/js/js_example.js):

```js
// TODO:
```

## Usage


```ts
export declare class TaskQueue {
    /**
     * Enqueue a task to be executed.
     * @param task task to execute
     * @param key [default=""] key of the queue where to store the task
     * @returns the promise of the task that is resolved (or rejected) when the task is executed
     */
    push<T>(task: () => Promise<T>, key?: string): Promise<T>;
}
```


# License

MIT Licence. See [LICENSE file](LICENSE).
Please refer me with:

	Copyright (c) Nicolas VENTER All rights reserved.