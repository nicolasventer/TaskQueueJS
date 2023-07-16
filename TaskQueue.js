// @ts-check

const TaskQueue = function () {
	/** @type {Map<string, (() => Promise<void>)[]>} */
	const queueMap = new Map();
	/** @type {Set<string>} */
	const runningSet = new Set();

	/** @type {(key: string) => Promise<void>} */
	const run = async (key) => {
		if (runningSet.has(key)) return;
		runningSet.add(key);
		const queue = queueMap.get(key);
		if (queue) {
			while (queue.length > 0) {
				const task = queue.shift();
				if (task) await task();
			}
		}
		runningSet.delete(key);
	};

	/**
	 * @template T
	 * @param {() => Promise<T>} task
	 * @param {string} [key=""]
	 * @returns
	 */
	this.push = (task, key = "") => {
		/** @type {Promise<T>} */
		const promise = new Promise((resolve, reject) => {
			const queue = queueMap.get(key);
			if (!queue) queueMap.set(key, [() => task().then(resolve).catch(reject)]);
			else queue.push(() => task().then(resolve).catch(reject));
			run(key);
		});
		return promise;
	};
};
