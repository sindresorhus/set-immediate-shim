import {randomInt} from 'node:crypto';
import test from 'ava';

const importFresh = async moduleName => import(`${moduleName}?${randomInt(100_000_000)}`);

test.serial('shim', async t => {
	// Force the shim
	const _ = globalThis.setImmediate;
	globalThis.setImmediate = undefined;
	const {default: setImmediateShim} = await importFresh('./index.js');
	globalThis.setImmediate = _;

	await new Promise(resolve => {
		setImmediateShim(() => {
			resolve();
		});
	});

	t.pass();
});

test.serial('pass rest arguments', async t => {
	// Force the shim
	const _ = globalThis.setImmediate;
	globalThis.setImmediate = undefined;
	const {default: setImmediateShim} = await importFresh('./index.js');
	globalThis.setImmediate = _;

	await new Promise(resolve => {
		setImmediateShim((a, b) => {
			t.is(a, 3);
			t.is(b, 5);
			resolve();
		}, 3, 5);
	});

	t.pass();
});

test('validate callback is a function', async t => {
	const {default: setImmediateShim} = await import('./index.js');
	t.throws(() => {
		setImmediateShim('not a function');
	}, {instanceOf: TypeError});

	t.throws(() => {
		setImmediateShim(null);
	}, {instanceOf: TypeError});

	t.throws(() => {
		setImmediateShim(undefined);
	}, {instanceOf: TypeError});
});

test('multiple rapid calls work correctly', async t => {
	const {default: setImmediateShim} = await import('./index.js');
	const results = [];
	const promises = [];

	for (let i = 0; i < 10; i++) {
		promises.push(new Promise(resolve => {
			setImmediateShim(value => {
				results.push(value);
				resolve();
			}, i);
		}));
	}

	await Promise.all(promises);

	t.is(results.length, 10);
	t.deepEqual(results.sort(), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test('works with complex arguments', async t => {
	const {default: setImmediateShim} = await import('./index.js');
	await new Promise(resolve => {
		const object = {foo: 'bar'};
		const array = [1, 2, 3];

		setImmediateShim((number, string, object_, array_) => {
			t.is(number, 42);
			t.is(string, 'hello');
			t.deepEqual(object_, object);
			t.deepEqual(array_, array);
			resolve();
		}, 42, 'hello', object, array);
	});
});

test.serial('setTimeout fallback when MessageChannel unavailable', async t => {
	// Force fallback to setTimeout by removing both setImmediate and MessageChannel
	const originalSetImmediate = globalThis.setImmediate;
	const originalMessageChannel = globalThis.MessageChannel;

	globalThis.setImmediate = undefined;
	globalThis.MessageChannel = undefined;

	const {default: setImmediateShim} = await importFresh('./index.js');

	// Restore globals
	globalThis.setImmediate = originalSetImmediate;
	globalThis.MessageChannel = originalMessageChannel;

	await new Promise(resolve => {
		setImmediateShim((a, b) => {
			t.is(a, 'timeout');
			t.is(b, 'fallback');
			resolve();
		}, 'timeout', 'fallback');
	});

	t.pass();
});

test('execution order: runs after current execution stack', async t => {
	const {default: setImmediateShim} = await import('./index.js');
	const order = [];

	order.push('start');

	setImmediateShim(() => {
		order.push('immediate');
	});

	order.push('sync');

	await new Promise(resolve => {
		setTimeout(() => {
			order.push('timeout');
			resolve();
		}, 0);
	});

	t.deepEqual(order.slice(0, 2), ['start', 'sync']);
	t.true(order.includes('immediate'));
	t.true(order.includes('timeout'));
});

test('error message format matches native setImmediate', async t => {
	const {default: setImmediateShim} = await import('./index.js');

	const error = t.throws(() => {
		setImmediateShim(42);
	}, {instanceOf: TypeError});

	t.true(error.message.includes('The "callback" argument must be of type function'));
	t.true(error.message.includes('Received type number'));
});

test('works with no additional arguments', async t => {
	const {default: setImmediateShim} = await import('./index.js');

	await new Promise(resolve => {
		setImmediateShim(() => {
			t.pass();
			resolve();
		});
	});
});

test('preserves function context when called', async t => {
	const {default: setImmediateShim} = await import('./index.js');

	await new Promise(resolve => {
		const context = {value: 'test'};

		setImmediateShim(function () {
			// In non-strict mode or with explicit binding, 'this' should be preserved
			// But setImmediate doesn't bind context, so this should be undefined/globalThis
			t.not(this, context);
			resolve();
		});
	});
});
