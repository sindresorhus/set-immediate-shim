'use strict';
module.exports = typeof setImmediate === 'function' ? setImmediate :
  function setImmediate() {
    var args = Array.prototype.slice.apply(arguments);
    var fn = args.shift();
    console.log('fn', fn, 'args', args);
    setTimeout(function() {
      fn.apply(null, args);
    }, 0);
  };
