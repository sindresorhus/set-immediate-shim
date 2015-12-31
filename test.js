'use strict';
var test = require('ava');
var requireUncached = require('require-uncached');

test.cb('shim', function (t) {
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

	t.false(called);
});

test.cb('pass rest arguments', function (t) {
	// force the shim
	var _ = setImmediate;
	setImmediate = null;
	var setImmediateShim = requireUncached('./');
	setImmediate = _;

	setImmediateShim(function (a, b) {
		t.is(a, 3);
		t.is(b, 5);
		t.end();
	}, 3, 5);
});
