# set-immediate-shim

> Simple [`setImmediate`](https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate) [ponyfill](https://ponyfill.com)

The shim uses the native `setImmediate` when available (Node.js), falls back to [`MessageChannel`](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel) for better performance in environments that support it (modern browsers, Deno), and uses `setTimeout` with zero delay as a last resort.

## Install

```sh
npm install set-immediate-shim
```

## Usage

```js
import setImmediateShim from 'set-immediate-shim';

setImmediateShim(() => {
	console.log('2');
});

console.log('1');

//=> 1
//=> 2
```

## Related

- [p-immediate](https://github.com/sindresorhus/p-immediate) - Returns a promise resolved in the next event loop - think `setImmediate()`
