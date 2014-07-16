/* Work in progress - examples of how to use the framework. */

// Define a function and the unit tests for it.
var SampleFunction = create(function (a, b) {
  return a + b;
}).test(function () {
  assert(this(1, 2)).toBe(3);
}).test(function () {
  assert(this(1, 1)).not.toBe(3);
});

// Execute a created function.
var sample = SampleFunction(1, 2); // 3