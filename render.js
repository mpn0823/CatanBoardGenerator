const { matrix, unflat } = require("./util");
const { genRandomMap } = require("./gen");

let buffer = matrix(21, 10);

buffer[0] = [..."        _V            "];
buffer[1] = [..."     __/ #\\__        "];
buffer[2] = [..."   >/ #\\__/ #\\<     "];
buffer[3] = [..." / #\\__/ #\\__/ #\\  "];
buffer[4] = [..." \\__/ #\\__/ #\\__/  "];
buffer[5] = [...">/ #\\__/ #\\__/ #\\< "];
buffer[6] = [..." \\__/ #\\__/ #\\__/  "];
buffer[7] = [..." / #\\__/ #\\__/ #\\  "];
buffer[8] = [...">\\__/ #\\__/ #\\__/< "];
buffer[9] = [..."    \\__/ #\\__/      "];
buffer[10] = [..."     ^ \\__/ ^       "];

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
  buffer[x][y] = `\u001b[${code};1m${buffer[x][y]}\u001b[0m`;
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
  W: 48, // wool    white
  B: 48, // bricks  red
  D: 46, // desert  cyan
  L: 48, // lumber  green
  G: 48, // grain   yellow
  O: 48, // ore     black
};

const flatmap = genRandomMap().flat();

const flatbuffer = buffer.flat();

const drawValues = (map, buffer) => {
  map = map.flat().filter((hex) => hex.type !== "X");
  for (i = 0; i < 10; i++) {
    for (j = 0; j < 21; j++) {
      if (buffer[i][j] === "V") {
        buffer[i][j] = map[0].value.toString(16).toUpperCase();
        map = map.slice(1);
      }
    }
  }

  return buffer;
};

const map = genRandomMap();
// buffer = drawValues(map, buffer);

// Adding ANSI color codes changes buffer dimensions

const foo = () => {
  hexRefs.forEach((ref, i) => {
    const [x, y] = axialCoordinates[i];
    const { type } = map[x][y];
    const code = colorCodes[type];
    colorHex(ref, code);
  });
};

render(buffer);
