# set-immediate-shim [![Build Status](https://travis-ci.org/sindresorhus/set-immediate-shim.svg?branch=master)](https://travis-ci.org/sindresorhus/set-immediate-shim)

> Simple [`setImmediate`](https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate) [ponyfill](https://ponyfill.com)


## Install

```
$ npm install set-immediate-shim
```


## Usage

```js
const setImmediateShim = require('set-immediate-shim');

setImmediateShim(() => {
	console.log('2');
});

console.log('1');

//=> 1
//=> 2
```


## Related

- [p-immediate](https://github.com/sindresorhus/p-immediate) - Returns a promise resolved in the next event loop - think `setImmediate()`


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
