var vows = require('vows')
var assert = require('assert')
var notation = require('music.notation')
var op = require('../')

function add (a, b) { return notation.str(op.add(notation.arr(a), notation.arr(b))) }
function sub (a, b) { return notation.str(op.subtract(notation.arr(a), notation.arr(b))) }
function mul (m, a) { return notation.str(op.multiply(m, notation.arr(a))) }

vows.describe('pitch-op').addBatch({
  'add': {
    'add ascending intervals': function () {
      assert.equal(add('2M', '2M'), '3M')
      assert.equal(add('2M', '2m'), '3m')
      assert.equal(add('2M', '8P'), '9M')
      assert.equal(add('4P', '4P'), '7m')
    },
    'add intervals to notes': function () {
      assert.equal(add('2M', 'E'), 'F#')
      assert.equal(add('2M', 'B3'), 'C#4')
    },
    'add ascending descending intervals': function () {
      assert.equal(add('2M', '-2M'), '1P')
      assert.equal(add('5P', '-2M'), '4P')
      assert.equal(add('-2M', '5P'), '4P')
      assert.equal(add('4P', '-5P'), '-2M')
      assert.equal(add('1P', '-2m'), '-2m')
      assert.equal(add('1P', '-9m'), '-9m')
      assert.equal(add('-9m', '8P'), '-2m')
      assert.equal(add('8P', '-9m'), '-2m')
      assert.equal(add('8P', '-2M'), '7m')
    },
    'add descending intervals': function () {
      assert.equal(add('-2M', '-2M'), '-3M')
    },
    'null resilient': function () {
      assert.equal(op.add(null, [1, 0, 0]))
    }
  },
  'subtract': {
    'subtract ascending notations': function () {
      assert.equal(sub('2M', '2M'), '1P')
      assert.equal(sub('2M', '2m'), '1d')
      assert.equal(sub('2M', '8P'), '7m')
      assert.equal(sub('4P', '4P'), '1P')
    },
    'subtract ascending descending notations': function () {
      assert.equal(sub('2M', '-2M'), '-3M')
      assert.equal(sub('5P', '-2M'), '-6M')
      assert.equal(sub('-2M', '5P'), '6M')
      assert.equal(sub('4P', '-5P'), '-8P')
      assert.equal(sub('1P', '-2m'), '-2m')
      assert.equal(sub('1P', '-9m'), '-9m')
      assert.equal(sub('-9m', '8P'), '16m')
      assert.equal(sub('8P', '-9m'), '-16m')
      assert.equal(sub('8P', '-2M'), '-9M')
    },
    'subtract descending notations': function () {
      assert.equal(sub('-2M', '-2M'), '1P')
      assert.equal(sub('-2M', '-4P'), '-3m')
    }
  },
  'multiply': {
    'multiply ascending notations': function () {
      assert.deepEqual(op.multiply(-7, [4, 0, 0]), [0, -1, -4])
      assert.equal(mul(3, '2M'), '4A')
      assert.equal(mul(-1, '5P'), '-5P')
      assert.equal(mul(-2, '5P'), '-9M')
    },
    'multiply descending notations': function () {
      assert.equal(mul(2, '-3M'), '-5A')
    }
  }
}).export(module)
