export class TaksQueue {
	private queueMap = new Map<string, (() => Promise<void>)[]>();
	private runningSet = new Set<string>();

	private async run(key: string) {
		if (this.runningSet.has(key)) return;
		this.runningSet.add(key);
		const queue = this.queueMap.get(key);
		if (queue) {
			while (queue.length > 0) {
				const task = queue.shift();
				if (task) await task();
			}
		}
		this.runningSet.delete(key);
	}

	public push<T>(task: () => Promise<T>, key = "") {
		const promise = new Promise<T>((resolve, reject) => {
			const queue = this.queueMap.get(key);
			if (!queue) this.queueMap.set(key, [() => task().then(resolve).catch(reject)]);
			else queue.push(() => task().then(resolve).catch(reject));
			this.run(key);
		});
		return promise;
	}
}
