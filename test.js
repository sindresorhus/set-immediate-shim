'use strict';
var test = require('ava');
var requireUncached = require('require-uncached');

test('shim', function (t) {
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

test('pass rest arguments', function (t) {
	// force the shim
	var _ = setImmediate;
	setImmediate = null;
	var setImmediateShim = requireUncached('./');
	setImmediate = _;

	setImmediateShim(function (a, b) {
		t.assert(a === 3);
		t.assert(b === 5);
		t.end();
	}, 3, 5);
});
