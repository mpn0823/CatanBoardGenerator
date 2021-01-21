const { matrix } = require("./util");

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
