'use strict';
module.exports = typeof setImmediate === 'function' ? setImmediate : (...args) => {
	args.splice(1, 0, 0);
	setTimeout(...args);
};
