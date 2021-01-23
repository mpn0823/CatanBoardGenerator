// returns a zero matrix of given width and height
const matrix = (w, h) => new Array(h).fill(0).map((x) => new Array(w).fill(0));

// unflattens given array into 2d array with w x h dimensions
const unflat = (w, h, arr) =>
  arr.slice(0, h).map((row, i) => arr.slice(i * w, i * w + w));

module.exports = { matrix, unflat };
