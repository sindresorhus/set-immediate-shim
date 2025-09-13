/**
A `setImmediate` shim.

Uses the native `setImmediate` when available (Node.js), falls back to `MessageChannel` for better performance in environments that support it (modern browsers, Deno), and uses `setTimeout` with zero delay as a last resort.

@example
```
import setImmediateShim from 'set-immediate-shim';

setImmediateShim(() => {
	console.log('2');
});

console.log('1');

//=> 1
//=> 2
```
*/
export default function setImmediate<T extends any[]>(
	callback: (...arguments_: T) => void,
	...arguments_: T
): void;
