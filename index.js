// Lazy initialization for MessageChannel implementation
let messageChannelSetImmediate;

const setImmediate = (callback, ...arguments_) => {
	// Validate callback like native setImmediate
	if (typeof callback !== 'function') {
		throw new TypeError('The "callback" argument must be of type function. Received type ' + typeof callback + (callback === null ? ' (null)' : ` (${String(callback)})`));
	}

	// Use native setImmediate if available
	if (typeof globalThis.setImmediate === 'function') {
		globalThis.setImmediate(callback, ...arguments_);
		return;
	}

	// Initialize MessageChannel implementation once
	if (!messageChannelSetImmediate && typeof globalThis.MessageChannel === 'function') {
		const {port1, port2} = new globalThis.MessageChannel();
		const queue = [];

		port1.addEventListener('message', () => {
			if (queue.length > 0) {
				const {callback, args} = queue.shift();
				callback(...args);
			}
		});

		port1.start();

		// Prevent Node.js from hanging
		if (typeof port1.unref === 'function') {
			port1.unref();
		}

		messageChannelSetImmediate = (callback_, ...arguments__) => {
			queue.push({callback: callback_, args: arguments__});
			port2.postMessage(null);
		};
	}

	// Use MessageChannel if available, otherwise setTimeout
	if (messageChannelSetImmediate) {
		messageChannelSetImmediate(callback, ...arguments_);
	} else {
		setTimeout(callback, 0, ...arguments_);
	}
};

export default setImmediate;
