const { matrix, unflat } = require("./util");
const { genRandomMap } = require("./gen");

let buffer = matrix(21, 10);

buffer[0] = [..."        / V \\        "];
buffer[1] = [..."    / V \\   / V \\    "];
buffer[2] = [..."/ V \\   / V \\   / V \\"];
buffer[3] = [..."\\   / V \\   / V \\   /"];
buffer[4] = [..."/ V \\   / V \\   / V \\"];
buffer[5] = [..."\\   / V \\   / V \\   /"];
buffer[6] = [..."/ V \\   / V \\   / V \\"];
buffer[7] = [..."\\   / V \\   / V \\   /"];
buffer[8] = [..."    \\   / V \\   /    "];
buffer[9] = [..."        \\   /        "];

// We need to map the 5x5 array representing a Catan
// map to our ASCII graphics buffer m

const render = (m) => {
  if (m.length === 0) return;
  console.log(m[0].join(""));
  return render(m.slice(1));
};

// changes element at (x,y) in graphics matrix to color
// corresponding to given code
const color = (x, y, code) => {
  buffer[x][y] = `\u001b[${code}m${buffer[x][y]}\u001b[0m`;
};
// colors rectangular region defined by A and B where
// A is the coordinates of the top left element of the
// region and B is the coordinates of the bottom right.
const colorRegion = (A, B, code) => {
  for (i = A[0]; i <= B[0]; i++) {
    for (j = A[1]; j <= B[1]; j++) {
      color(i, j, code);
    }
  }
};

const colorHex = (hex, code) => {
  const [x, y] = hex;
  colorRegion([x, y - 1], [x + 1, y + 1], code);
};

// the V character is the reference point marker for each
// rendered hex.  This function returns array of row, col
// coordinates for each reference point
const hexRefs = (() => {
  let ar = [];
  for (i = 0; i < 10; i++) {
    for (j = 0; j < 21; j++) {
      if (buffer[i][j] === "V") ar = [...ar, [i, j]];
    }
  }
  return ar;
})();

// Use this with hexRefs to map hex coordinates in 5x5 map array
// to the hex reference points in graphics buffer.
const axialCoordinates = [
  [2, 0],
  [1, 1],
  [3, 0],
  [0, 2],
  [2, 1],
  [4, 0],
  [1, 2],
  [3, 1],
  [0, 3],
  [2, 2],
  [4, 1],
  [1, 3],
  [3, 2],
  [0, 4],
  [2, 3],
  [4, 2],
  [1, 4],
  [3, 3],
  [2, 4],
];

const colorCodes = {
  W: 47,
  B: 41,
  D: 46,
  L: 42,
  G: 43,
  O: 40,
};

const flatmap = genRandomMap().flat();

const flatbuffer = buffer.flat();

const updateBuffer = (map, buffer) => {
  map = map.flat().filter((hex) => hex.type !== "X");
  for (i = 0; i < 10; i++) {
    for (j = 0; j < 21; j++) {
      if (buffer[i][j] === "V") {
        buffer[i][j] = map[0].value.toString(16).toUpperCase();
        map = map.slice(1);
      }
    }
  }
  console.log(buffer.flat());
  return buffer;
};

const map = genRandomMap();
const foo = updateBuffer(map, buffer);
render(foo);

// Adding ANSI color codes changes buffer dimensions
