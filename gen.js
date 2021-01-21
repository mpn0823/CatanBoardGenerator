const { matrix } = require("./util");

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
// const matrix = (w, h) => new Array(h).fill(0).map((x) => new Array(w).fill(0));

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

console.log(addValues(addTypes(hexes)));
