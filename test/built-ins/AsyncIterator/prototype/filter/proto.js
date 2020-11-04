// Copyright (C) 2020 Rick Waldron. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-asynciteratorprototype.filter
description: >
  The value of the [[Prototype]] internal slot of AsyncIterator.prototype.filter is the
  intrinsic object %AsyncGeneratorFunction%.
includes: [hidden-constructors.js]
features: [iterator-helpers]
---*/

assert.sameValue(
  Object.getPrototypeOf(AsyncIterator.prototype.filter),
  AsyncGeneratorFunction.prototype,
  'Object.getPrototypeOf(AsyncIterator.prototype.filter) must return the value of AsyncGeneratorFunction.prototype'
);
