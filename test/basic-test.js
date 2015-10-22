var vows = require('vows')
var assert = require('assert')
var op = require('../')

vows.describe('pitch-op').addBatch({
  'pitchClass': function () {
    assert.deepEqual(op.pitchClass([1, 2, 3]), [ 1, 2 ])
    assert.equal(op.pitchClass(null), null)
  },
  'set octave': function () {
    assert.deepEqual(op.setOctave(2, [1, 2, 3]), [1, 2, 2])
    assert.deepEqual(op.setOctave(2, [1, 0]), [ 1, 0, 2 ])
    var src = [ [1, 2, 3], [4, 5, 6] ]
    assert.deepEqual(src.map(op.setOctave(2)), [ [ 1, 2, 2 ], [ 4, 5, 2 ] ])
    assert.equal(op.setOctave(2, null), null)
  },
  'simplify interval': function () {
    assert.deepEqual(op.simplify([1, 2, 3]), [1, 2, 0])
    assert.equal(op.simplify(null), null)
  },
  'default octave': function () {
    assert.deepEqual(op.setDefaultOctave(3, [1, 2]), [1, 2, 3])
    assert.deepEqual(op.setDefaultOctave(3, [1, 2, 0]), [1, 2, 0])
    assert.deepEqual(op.setDefaultOctave(3, null), null)
    var src = [ [1, 2, null], [4, 5, 1] ]
    assert.deepEqual(src.map(op.setDefaultOctave(2)), [ [ 1, 2, 2 ], [ 4, 5, 1 ] ])
  },
  'semitones': function () {
    assert.equal(op.semitones([0, 0, 0]), 0)
    assert.equal(op.semitones([1, 1, 0]), 3)
  },
  'comparator': function () {
    var src = [ [1, 0, 0], [3, 0, 0], [2, 0, 0] ]
    assert.deepEqual(src.sort(op.compare), [ [ 1, 0, 0 ], [ 2, 0, 0 ], [ 3, 0, 0 ] ])
  }
}).export(module)
