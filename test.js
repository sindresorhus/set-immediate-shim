/* eslint-disable no-global-assign, no-native-reassign */
import test from 'ava';
import requireUncached from 'require-uncached';

test.cb('shim', t => {
	let called = false;

	// force the shim
	const _ = setImmediate;
	setImmediate = null;
	const setImmediateShim = requireUncached('./');
	setImmediate = _;

	setImmediateShim(() => {
		called = true;
		t.end();
	});

	t.false(called);
});

test.cb('pass rest arguments', t => {
	// force the shim
	const _ = setImmediate;
	setImmediate = null;
	const setImmediateShim = requireUncached('./');
	setImmediate = _;

	setImmediateShim((a, b) => {
		t.is(a, 3);
		t.is(b, 5);
		t.end();
	}, 3, 5);
});
