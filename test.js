/* eslint-disable no-global-assign */
import test from 'ava';
import importFresh from 'import-fresh';

test.cb('shim', t => {
	let called = false;

	// Force the shim
	const _ = setImmediate;
	setImmediate = null;
	const setImmediateShim = importFresh('.');
	setImmediate = _;

	setImmediateShim(() => {
		called = true;
		t.end();
	});

	t.false(called);
});

test.cb('pass rest arguments', t => {
	// Force the shim
	const _ = setImmediate;
	setImmediate = null;
	const setImmediateShim = importFresh('.');
	setImmediate = _;

	setImmediateShim((a, b) => {
		t.is(a, 3);
		t.is(b, 5);
		t.end();
	}, 3, 5);
});
