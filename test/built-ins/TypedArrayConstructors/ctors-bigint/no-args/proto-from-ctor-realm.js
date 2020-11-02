// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-typedarray
description: Default [[Prototype]] value derived from realm of the newTarget
info: |
    [...]
    3. Return ? AllocateTypedArray(constructorName, NewTarget,
       "%TypedArrayPrototype%", 0).

    22.2.4.2.1 Runtime Semantics: AllocateTypedArray

    1. Let proto be ? GetPrototypeFromConstructor(newTarget, defaultProto).
    [...]

    9.1.14 GetPrototypeFromConstructor

    [...]
    3. Let proto be ? Get(constructor, "prototype").
    4. If Type(proto) is not Object, then
       a. Let realm be ? GetFunctionRealm(constructor).
       b. Let proto be realm's intrinsic object named intrinsicDefaultProto.
    5. Return proto.
includes: [testBigIntTypedArray.js]
features: [BigInt, Reflect, Reflect.construct, TypedArray, cross-realm]
---*/

var other = $262.createRealm().global;
var C = new other.Function();
C.prototype = null;

testWithBigIntTypedArrayConstructors(function(TA) {
  var ta = Reflect.construct(TA, [], C);

  assert.sameValue(Object.getPrototypeOf(ta), other[TA.name].prototype);
});
