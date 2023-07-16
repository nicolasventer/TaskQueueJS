import { TaksQueue } from "./TaksQueue";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const taskQueue = new TaksQueue();

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
