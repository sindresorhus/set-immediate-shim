# set-immediate-shim

> Simple [`setImmediate`](https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate) [ponyfill](https://ponyfill.com)

Note: This shim is [quite inefficient](https://github.com/sindresorhus/set-immediate-shim/issues/4).

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
