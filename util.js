// returns a zero matrix of given width and height
const matrix = (w, h) => new Array(h).fill(0).map((x) => new Array(w).fill(0));

module.exports = { matrix };
