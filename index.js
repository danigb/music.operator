'use strict'

var op = {}

/**
 * Get pitch class of a pitch.
 *
 * @name pitchClass
 * @function
 * @param {Array} pitch - the pitch
 * @return {Array} the pitch class of the pitch
 *
 * @example
 * pitchClass([1, -2, 3]) // => [1, -2, nul]
 */
op.pitchClass = function (p) { return p ? [p[0], p[1]] : null }

/**
 * Set octave of a pitch.
 *
 * This function can be partially applied (Integer -> Array -> Array)
 *
 * @name setOctave
 * @function
 * @param {Integer} octave - the octave to set
 * @param {Array} pitch - the pitch
 * @return {Array} the pitch with the given octave
 *
 * @example
 * operator.setOctave(2, [1, 2, 0]) // => [1, 2, 2]
 * // partially applied, you get a function:
 * arrayOfPitchs.map(operator.setOctave(2))
 */
op.setOctave = function (num, arr) {
  if (arguments.length === 1) return function (arr) { return op.setOctave(num, arr) }
  if (!arr) return null
  var copy = arr.slice()
  copy[2] = num
  return copy
}

/**
 * Simplify interval (set the octave to 0)
 *
 * @name simplify
 * @function
 * @param {Array} interval - the interval
 * @return {Array} the simplified interval
 *
 * @example
 * operator.simplify([1, 2, 3]) // => [1, 2, 0]
 */
op.simplify = op.setOctave(0)

/**
 * Set the octave only if not present
 *
 * This function can be partially applied (Integer -> Array -> Array)
 *
 * @name setDefaultOctave
 * @function
 * @param {Integer} octave - the octave number
 * @param {Array} pitch - the pitch array
 *
 * @example
 * op.setDefaultOctave(1, [1, 2, null]) // => [1, 2, 1]
 * op.setDefaultOctave(1, [1, 2, 3]) // => [1, 2, 3]
 * // partially applied:
 * arrayOfPitches.map(op.setDefaultOctave(3))
 */
op.setDefaultOctave = function (oct, arr) {
  if (arguments.length === 1) return function (arr) { return op.setDefaultOctave(oct, arr) }
  if (!arr) return null
  var c = arr.slice()
  c[2] = c[2] === null || c[2] === undefined ? oct : c[2]
  return c
}

var SEMITONES = [0, 2, 4, 5, 7, 9, 11]
/**
 * Get distance in semitones from `[0, 0, 0]` (`'C0'` or `'1P'`)
 *
 * @name semitones
 * @function
 * @param {Array} pitch - the pitch or interval
 * @return {Integer} the distance
 *
 * @example
 * op.semitones([1, 1, 0]) // => 3
 * op.semitones([0, 0, 0]) // => 0
 */
op.semitones = function (i) { return i ? SEMITONES[i[0] % 7] + i[1] + 12 * i[2] : null }

/**
 * Compare the height of two pitches. Can be used as comparator for array.sort()
 * to sort in ascending height (pitch, freq) order
 *
 * @name compare
 * @function
 * @param {Array} first - first pitch
 * @param {Array} second - second pitch
 * @return {Integer} 0 if same height, > 0 if first is higher, < 0 if second is higher
 *
 * @example
 * arrayOfPitches.sort(op.compare) // => array in ascending order
 */
op.compare = function (a, b) { return op.semitones(a) - op.semitones(b) }

// The fifths vector representation of: 1P, 2M, 3M, 4P, 5P, 6M, 7M
var BASE_TO = [ [0, 0], [2, -1], [4, -2], [-1, 1], [1, 0], [3, -1], [5, -2] ]
var BASE_FROM = [ [0, 0], [4, 0], [1, 1], [5, 1], [2, 2], [6, 2], [3, -1] ]

/**
 * Get a pitch or interval measured in fifths and octaves
 *
 * Every interval (or pitch) can be expressed by repeating compare or descending
 * fifths and octaves. For exaple, interval major second is two fifths up and
 * one octave down:
 * `fifths([1, 0, 0]) // => [2, -1]`
 *
 * This representation is useful for calculating interval distances, transpositions
 * or keys
 *
 * @name fifths
 * @function
 * @param {Array} apitch - the pitch or interval as [a-pitch](https://github.com/danigb/a-pitch)
 * @return {Array} an array with the form [fifths, octaves] where both are integers
 *
 * @example
 * var fifths = require('pitch-fifths')
 * fifths([0, 0, 0]) // => [0, 0]
 * fifths([0, 0, 1]) // => [0, 1]
 * fifths([1, 0, 0]) // => [2, -1]
 */
op.fifths = function (t) {
  var base = BASE_TO[t[0] % 7]
  var fifths = base[0] + 7 * t[1]
  var oct = t.length > 2 ? base[1] + t[2] - 4 * t[1] : null
  return [fifths, oct]
}

/*
 * Get the [a-pitch](https://github.com/danigb/a-pitch) structure from a
 * fifths array
 *
 * @param {Array} coord - the fifths array
 * @return {Array} the a-pitch structure
 *
 * @example
 * var fifths = require('pitch-fifths')
 * fifths.toPitch([3, -1]) // => [6, 0, 1]
 */
op.fifths.toPitch = function (coord) {
  var q = coord[0] % 7
  var index = q < 0 ? 7 - Math.abs(q) : q
  var alter = Math.floor((coord[0] + 1) / 7)

  var base = BASE_FROM[index]
  var oct = coord[1] === null ? null : base[1] + alter * 4 + coord[1]
  return [base[0], alter, oct]
}

/**
 * Add two pitches. Can be used to tranpose pitches.
 *
 * @param {Array} first - first pitch
 * @param {Array} second - second pitch
 * @return {Array} both pitches added
 *
 * @example
 * operator.add([3, 0, 0], [4, 0, 0]) // => [0, 0, 1]
 */
function add (a, b) {
  var fifths = a[0] + b[0]
  var octaves = a[1] === null || b[1] === null ? null : a[1] + b[1]
  return [fifths, octaves]
}
op.add = function (a, b) {
  if (!a || !b) return null
  var r = op.fifths.toPitch(add(op.fifths(a), op.fifths(b)))
  var copy = b.slice()
  copy[0] = r[0]
  copy[1] = r[1]
  if (b.length > 2) copy[2] = r[2]
  return copy
}

/**
 * Subtract two pitches or intervals. Can be used to find the distance between pitches.
 *
 * @name subtract
 * @function
 * @param {Array} a - one pitch or interval in [pitch-array](https://github.com/danigb/pitch-array) format
 * @param {Array} b - the other pitch or interval in [pitch-array](https://github.com/danigb/pitch-array) format
 * @return {Array} both pitches or intervals substracted [pitch-array](https://github.com/danigb/pitch-array) format
 *
 * @example
 * operator.subtract([4, 0, 0], [3, 0, 0]) // => [1, 0, 0]
 */
function subtract (a, b) {
  var fifths = b[0] - a[0]
  var octaves = a[1] !== null && b[1] !== null ? b[1] - a[1] : null
  return [fifths, octaves]
}
op.subtract = function (a, b) {
  if (!a || !b) return null
  return op.fifths.toPitch(subtract(op.fifths(a), op.fifths(b)))
}

/**
 * Multiply a pitch or interval by a scalar
 *
 * @name multiply
 * @function
 * @param {Array} n - the scalar
 * @param {Array} a - the pitch or interval in [pitch-array](https://github.com/danigb/pitch-array) format
 * @return {Array} the pitch or interval multiplied in [pitch-array](https://github.com/danigb/pitch-array) format
 *
 * @example
 * operator.multiply(2, [4, 0, 0]) // => [1, 0, 1]
 */
function multiply (m, a) { return [m * a[0], a[1] === null ? null : m * a[1]] }

op.multiply = function (m, a) {
  if (!a) return null
  return op.fifths.toPitch(multiply(+m, op.fifths(a)))
}

module.exports = op
