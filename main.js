// ASCII representation of a Settlers board
const boardTemplate = `        
          _             
      _ / V \\ _       
  _ / V \\ R / V \\ _
/ V \\ R / V \\ R / V \\
\\ R / V \\ R / V \\ R /
/ V \\ R / V \\ R / V \\
\\ R / V \\ R / V \\ R /
/ V \\ R / V \\ R / V \\
\\ R / V \\ R / V \\ R /
    \\ R / V \\ R /
        \\ R /
`;

// maps hex coordinates to their order in the
// ASCII string representation of the board
const coorMap = [
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

const wool = new Array(4).fill("W");
const brick = new Array(3).fill("B");
const desert = new Array(1).fill("D");
const lumber = new Array(4).fill("L");
const grain = new Array(4).fill("G");
const ore = new Array(3).fill("O");

const tiles = [...desert, ...lumber, ...grain, ...brick, ...wool, ...ore];
const values = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];

// shuffles and returns copy of array
const shuffle = (arr, shuffled = []) => {
  if (arr.length === 0) return shuffled;
  const i = Math.floor(Math.random() * arr.length);
  return shuffle(
    [...arr.slice(0, i), ...arr.slice(i + 1)],
    [...shuffled, arr[i]]
  );
};

// returns a zero matrix of given width and height
const matrix = (w, h) => new Array(h).fill(0).map((x) => new Array(w).fill(0));

const hexes = matrix(5, 5)
  .map((x, i) => x.map((y, j) => (y = { x: i, y: j })))
  .flat()
  .filter((hex) => hex.x + hex.y > 1 && hex.x + hex.y < 7);

// randomly assigns resources types to each hex
const addTypes = (hexes) => {
  const shuffledTiles = shuffle(tiles);
  return hexes.map((hex, i) => ({
    ...hex,
    type: shuffledTiles[i],
  }));
};

// randomly assigns values to each hex
const addValues = (hexes) => {
  const shuffledValues = shuffle(values);
  const desertHex = hexes.filter((hex) => hex.type === "D")[0];
  return hexes
    .filter((hex) => hex.type !== "D")
    .map((hex, i) => ({ ...hex, value: shuffledValues[i] }))
    .concat([{ ...desertHex, value: 0 }]);
};

// returns all the neighboring hexes of the given hex
const getNeighbors = (hex) =>
  hexes.filter(
    (hex_) =>
      hex_.x <= hex.x + 1 &&
      hex_.x >= hex.x - 1 &&
      hex_.y <= hex.y + 1 &&
      hex_.y >= hex.y - 1 &&
      hex_.x - hex.x !== hex_.y - hex.y
  );

// prints ASCII representation of board to the console
const renderBoard = (hexes, board = boardTemplate, map = coorMap) => {
  // there is no elegant way to do this so I'm just going
  // to hard code everything
  // map hex coordinates to their order in the ASCII string
  if (map.length === 0) return console.log(board);
  const currentHex = hexes.find(
    (hex) => hex.x === map[0][0] && hex.y === map[0][1]
  );
  let str;
  if (!currentHex.value) {
    str = board.replace("R", " ").replace("V", " ");
  } else {
    str = board
      .replace("R", currentHex.type)
      .replace("V", currentHex.value.toString(16));
  }

  return renderBoard(hexes, str, map.slice(1));
};

// renderBoard(addValues(addTypes(hexes)));

let m = matrix(21, 10);

const printM = (m) => {
  if (m.length === 0) return;
  console.log(m[0].join(""));
  return printM(m.slice(1));
};

m[0] = [..."        / V \\        "];
m[1] = [..."    / V \\   / V \\    "];
m[2] = [..."/ V \\   / V \\   / V \\"];
m[3] = [..."\\   / V \\   / V \\   /"];
m[4] = [..."/ V \\   / V \\   / V \\"];
m[5] = [..."\\   / V \\   / V \\   /"];
m[6] = [..."/ V \\   / V \\   / V \\"];
m[7] = [..."\\   / V \\   / V \\   /"];
m[8] = [..."    \\   / V \\   /    "];
m[9] = [..."        \\   /        "];

printM(m);

// changes element at (x,y) in graphics matrix to color
// corresponding to given code
const color = (x, y, code) => {
  m[x][y] = `\u001b[${code}m${m[x][y]}\u001b[0m`;
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

printM(m);

colorRegion([0, 9], [1, 11], 47);
colorRegion([1, 5], [2, 7], 42);
colorRegion([1, 13], [2, 15], 43);
colorRegion([1, 13], [2, 15], 30);

printM(m);
