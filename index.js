const setImmediate = typeof globalThis.setImmediate === 'function' ? globalThis.setImmediate : (...arguments_) => {
	arguments_.splice(1, 0, 0);
	setTimeout(...arguments_);
};

export default setImmediate;
