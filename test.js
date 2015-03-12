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
