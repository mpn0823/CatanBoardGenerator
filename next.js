const { matrix, unflat } = require("./util");

const resCode = {
  hills: 2,
  fields: 3,
  forest: 4,
  pasture: 5,
  mountains: 6,
  desert: 0,
};

const res = [0, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6];
const val = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];

const shuffle = (arr, shuffled = []) => {
  if (!arr.length) return shuffled;
  const i = Math.floor(Math.random() * arr.length);
  return shuffle(
    [...arr.slice(0, i), ...arr.slice(i + 1)],
    [...shuffled, arr[i]]
  );
};

// 5x5 matrix used to build our other board layers. 1 denotes a valid hex.
const template = matrix(5, 5).map((x, i) =>
  x.map((_, j) => (i + j > 1 && i + j < 7 ? 1 : 0))
);

// Return a 5x5 matrix with resource types randomly assigned to each valid hex.
const randResLayer = (res_ = shuffle(res)) =>
  template.map((x, i) => x.map((_, j) => (template[i][j] ? res_.pop() : 0)));

// Given a valid resLayer, Returns a 5x5 matrix with randomly assigned hex values.
const randValLayer = (resLayer, val_ = shuffle(val)) =>
  resLayer.map((x, i) => x.map((_, j) => (resLayer[i][j] ? val_.pop() : 0)));

const printMatrix = (m) => {
  if (!m.length) {
    console.log();
    return;
  }
  console.log(m[0].map((x) => x.toString(16).toUpperCase()));
  printMatrix(m.slice(1));
};

const resLayer = randResLayer();
const valLayer = randValLayer(resLayer);
printMatrix(resLayer);
printMatrix(valLayer);
