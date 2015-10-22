var vows = require('vows')
var assert = require('assert')
var fifths = require('../').fifths
var notation = require('music.notation')

function t (intervals) {
  return intervals.split(' ').map(notation.arr).map(fifths)
    .map(fifths.toPitch).map(notation.str).join(' ')
}

vows.describe('pitch-fifths').addBatch({
  'fifths': {
    'from array to fifths': function () {
      assert.deepEqual(fifths([1, 0, 0]), [2, -1])
      assert.deepEqual(fifths([7, 0, 0]), [0, 0])
    },
    'without octaves': function () {
      assert.deepEqual(fifths([1, 0, null]), [2, null])
      assert.deepEqual(fifths([1, 1, null]), [9, null])
      assert.deepEqual(fifths([1, 2, null]), [16, null])
      assert.deepEqual(fifths([1, -1, null]), [-5, null])
      assert.deepEqual(fifths([1, -2, null]), [-12, null])
    },
    'ascending interval fifths': function () {
      assert.deepEqual(fifths(notation.arr('1P')), [0, 0])
      assert.deepEqual(fifths(notation.arr('8P')), [0, 1])
      assert.deepEqual(fifths(notation.arr('2M')), [2, -1])
      assert.deepEqual(fifths(notation.arr('5P')), [1, 0])
      assert.deepEqual(fifths(notation.arr('4P')), [-1, 1])
      assert.deepEqual(fifths(notation.arr('7M')), [5, -2])
      assert.deepEqual(fifths(notation.arr('1d')), [-7, 4])
      assert.deepEqual(fifths(notation.arr('8d')), [-7, 5])
      assert.deepEqual(fifths(notation.arr('1A')), [7, -4])
      assert.deepEqual(fifths(notation.arr('1AA')), [14, -8])
    },
    'descending interval fifths': function () {
      assert.deepEqual(fifths(notation.arr('-4P')), [1, -1])
      assert.deepEqual(fifths(notation.arr('-5P')), [-1, 0])
    }
  },
  'fifths.toPitch': {
    'convert back to a-pitch': function () {
      assert.deepEqual(fifths.toPitch([0, 0]), [0, 0, 0])
      assert.deepEqual(fifths.toPitch([7, 0]), [0, 1, 4])
      assert.deepEqual(fifths.toPitch([1, 0]), [4, 0, 0])
      assert.deepEqual(fifths.toPitch([2, 0]), [1, 0, 1])
      assert.deepEqual(fifths.toPitch([2, -1]), [1, 0, 0])
      assert.deepEqual(fifths.toPitch([0, 1]), [0, 0, 1])
      assert.deepEqual(fifths.toPitch([7, -4]), [0, 1, 0])
      assert.deepEqual(fifths.toPitch([14, -8]), [0, 2, 0])
      assert.deepEqual(fifths.toPitch([14, -7]), [0, 2, 1])
      assert.deepEqual(fifths.toPitch([-1, 0]), [3, 0, -1])
      assert.deepEqual(fifths.toPitch([-2, 1]), [6, -1, -1])
      assert.deepEqual(fifths.toPitch([-3, 0]), [2, -1, -2])
      assert.deepEqual(fifths.toPitch([-7, 0]), [0, -1, -4])
      assert.deepEqual(fifths.toPitch([-8, 0]), [3, -1, -5])
      assert.deepEqual(fifths.toPitch([-9, 0]), [6, -2, -6])
    },
    'without octaves': function () {
      assert.deepEqual(fifths.toPitch([2, null]), [1, 0, null])
      assert.deepEqual(fifths.toPitch([-9, null]), [6, -2, null])
      assert.deepEqual(fifths.toPitch([-1, null]), [3, 0, null])
      assert.deepEqual(fifths.toPitch([-8, null]), [3, -1, null])
    },
    'intervals to fifths and back to intervals': function () {
      assert.deepEqual(t('1P 2M 3M 4P 5P 6M 7M'), '1P 2M 3M 4P 5P 6M 7M')
      assert.deepEqual(t('8P 9M 10M 11P 12P 13M 14M'), '8P 9M 10M 11P 12P 13M 14M')
      assert.deepEqual(t('-1P -2M -3M -4P -5P -6M -7M'), '1P -2M -3M -4P -5P -6M -7M')
      assert.deepEqual(t('-8P -9M -10M -11P -12P -13M -14M'), '-8P -9M -10M -11P -12P -13M -14M')
    }
  }
}).export(module)
