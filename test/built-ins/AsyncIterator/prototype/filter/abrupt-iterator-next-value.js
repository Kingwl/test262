// Copyright (C) 2020 Rick Waldron. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-asynciteratorprototype.filter
description: >
  Returns abrupt when value accessor is abrupt.
info: |
  %AsyncIterator.prototype%.filter ( filterer )

  %AsyncIterator.prototype%.filter is a built-in async generator function which, when called, performs the following prelude steps:

    Let iterated be ? GetIteratorDirect(this value).
    If IsCallable(filterer) is false, throw a TypeError exception.

  The body of %AsyncIterator.prototype%.filter is composed of the following steps:

    Let lastValue be undefined.
    Repeat,
      Let next be ? Await(? IteratorNext(value, lastValue)).
      If ? IteratorComplete(next) is true, return undefined.
      Let value be ? IteratorValue(next).

includes: [iterators.js]
features: [async-iteration, iterator-helpers]
flags: [async]
---*/
let valueCount = 0;

class Test262AsyncIteratorAbrupt extends Test262AsyncIterator {
  async next() {
    this.nextCalls++;

    return {
      get value() {
        valueCount++;
        throw new Test262Error();
      }
    };
  }
}

(async () => {
  let count = 0;
  let iterator = new Test262AsyncIteratorAbrupt([0, 1, 2, 3]);
  assert.sameValue(iterator.nextCalls, 0, 'The value of iterator.nextCalls is 0');

  try {
    count++;
    await iterator.filter(v => v);
  } catch (e) {
    count++;
    assert.sameValue(e instanceof Test262Error, true, 'The result of evaluating `(e instanceof Test262Error)` is true');
  }

  assert.sameValue(valueCount, 1, 'The value of `valueCount` is 1');
  assert.sameValue(iterator.nextCalls, 1, 'The value of iterator.nextCalls is 1');
  assert.sameValue(iterator.iterable.length, 4, 'The value of iterator.iterable.length is 4');
})().then($DONE, $DONE);
