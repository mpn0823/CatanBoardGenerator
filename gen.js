const { matrix, unflat } = require("./util");

const wool = new Array(4).fill("W");
const brick = new Array(3).fill("B");
const desert = new Array(1).fill("D");
const lumber = new Array(4).fill("L");
const grain = new Array(4).fill("G");
const ore = new Array(3).fill("O");

// shuffles and returns copy of array
const shuffle = (arr, shuffled = []) => {
  if (arr.length === 0) return shuffled;
  const i = Math.floor(Math.random() * arr.length);
  return shuffle(
    [...arr.slice(0, i), ...arr.slice(i + 1)],
    [...shuffled, arr[i]]
  );
};

const resources = [...desert, ...lumber, ...grain, ...brick, ...wool, ...ore];
const values = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];

const map = matrix(5, 5).map((x, i) =>
  x.map((_, j) => (i + j > 1 && i + j < 7 ? [i, j] : [0, 0]))
);

// Tuples are the coordinate offsets for every
// neighboring hex
const edge = [
  [0, -1],
  [1, -1],
  [1, 0],
  [0, 1],
  [-1, 1],
  [-1, 0],
];

// Each vertex in a hex defined by two edges
const vertex = [
  [edge[0], edge[1]],
  [edge[1], edge[2]],
  [edge[2], edge[3]],
  [edge[3], edge[4]],
  [edge[5], edge[6]],
  [edge[6], edge[1]],
];

// Returns the hex's neighbor on given edge
const neighbor = (hex, edge, map) => {
  const [x, y] = hex;
  const [i, j] = edge;
  return map[x + i][y + j];
};

// Returns array of given hex and two neighbors
// that share the same given vertex
const position = (hex, vertex, map) => [
  hex,
  neighbor(hex, vertex[0], map),
  neighbor(hex, vertex[1], map),
];

console.log(map.flat());
console.log(unflat(5, 5, map.flat()));
