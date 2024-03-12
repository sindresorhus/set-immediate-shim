/**
A `setImmediate` shim.

If the environment supports `setImmediate`, it uses that; otherwise, it falls back to `setTimeout` with a 0ms delay.
*/
export default function setImmediate<T extends any[]>(
	callback: (...arguments_: T) => void,
	...arguments_: T
): void;
