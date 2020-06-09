# set-immediate-shim [![Build Status](https://travis-ci.com/sindresorhus/set-immediate-shim.svg?branch=master)](https://travis-ci.com/github/sindresorhus/set-immediate-shim)

> Simple [`setImmediate`](https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate) [ponyfill](https://ponyfill.com)

Note: This shim is quite inefficient, see [`#4`](https://github.com/sindresorhus/set-immediate-shim/issues/4).

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

---

<div align="center">
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-set-immediate-shim?utm_source=npm-set-immediate-shim&utm_medium=referral&utm_campaign=readme">Get professional support for this package with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>
