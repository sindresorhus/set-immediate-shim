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
