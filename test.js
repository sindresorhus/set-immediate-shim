'use strict';
var test = require('ava');
var requireUncached = require('require-uncached');

test(function (t) {
	var called = false;

	// force the shim
	var _ = setImmediate;
	setImmediate = null;
	var setImmediateShim = requireUncached('./');
	setImmediate = _;

	setImmediateShim(function () {
		called = true;
		t.end();
	});

	t.assert(!called);
});

test(function (t) {
	var called = false;

	// force the shim
	var _ = setImmediate;
	setImmediate = null;
	var setImmediateShim = requireUncached('./');
	setImmediate = _;

	setImmediateShim(function (a, b) {
		var max = Math.max(a, b);
		console.log('max', max)
		t.assert(max === 5);
		t.end();
	}, 3, 5);
	t.assert(!called);
});
