// Copyright (C) 2020 Rick Waldron. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-atomics.and
description: >
  Atomics.and throws when operating on non-sharable integer TypedArrays
includes: [testTypedArray.js]
features: [ArrayBuffer, Atomics, TypedArray, arrow-function]
---*/
testWithNonAtomicsFriendlyTypedArrayConstructors(TA => {
  const buffer = new ArrayBuffer(TA.BYTES_PER_ELEMENT * 4);
  const view = new TA(buffer);

  assert.throws(TypeError, function() {
    Atomics.and(view, 0, 1);
  }, `Atomics.and(new ${TA.name}(buffer), 0, 1) throws TypeError`);
});
