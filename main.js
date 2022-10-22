// function createMatrix(a, b) {
//     let matrix = new Array(a)

//     for (let i = 0; i < matrix.length; i++) {
//         matrix[i] = new Array(b)
//     }

//     matrix = fillMatrix(matrix)

//     return matrix
// }

// function fillMatrix(matrix) {
//     for (let i = 0; i < matrix.length; i++) {
//         for (let j = 0; j < matrix[i].length; j++) {
//             matrix[i][j] = Math.round(Math.random() * 100)
//         }
//     }

//     return matrix
// }

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let _matrix = [
  [4, 1, 2, 1, 0],
  [6, 1, 1, 0, 1],
  [10, 1, -1, -2, 3],
];

function zhardanoGaussMethod(matrix, k = 1, s = 4) {
  const m = matrix.length;
  const n = matrix[0].length;

  console.log({ m, n });
  let matrixCopy = JSON.parse(JSON.stringify(matrix));

  drawMatrix(matrix);

  console.log(`k: ${k}\ns: ${s}`);

  if (matrix[k][s] <= 0) {
    console.log("Элемент является не разрешимым");
    return;
  }

  let ks = matrix[k][s];

  for (let i = 0; i < matrix[k].length; i++) {
    matrix[k][i] /= ks;
  }

  for (let i = 0; i < matrix.length; i++) {
    matrix[i][s] /= -ks;
  }

  matrix[k][s] = -matrix[k][s];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i != k && j != s) {
        matrix[i][j] =
          (matrixCopy[i][j] * matrixCopy[k][s] -
            matrixCopy[i][s] * matrixCopy[k][j]) /
          matrixCopy[k][s];
      }
    }
  }

  drawMatrix(matrix);
  return matrix;
}

function drawMatrix(matrix) {
  console.log("\n\n");
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] = +matrix[i][j].toFixed(2);
    }
    console.log(matrix[i].join("  ") + "\n");
  }
}

const start = (matr = _matrix, k, s) => {
  next(zhardanoGaussMethod(matr, k, s));
};

const next = (matr) =>
  rl.question("resume? y/n:\n", function (bool) {
    if (bool === "y") {
      const ksnext = rl.question("enter k,s:\n", function (str) {
        const [k, s] = str.split(",");
        if (k === undefined || s === undefined) {
          ksnext();
        } else {
          start(matr, Number(k), Number(s));
        }
      });
    } else if (bool === "n") {
      rl.close();
    }
  });

rl.on("close", function () {
  process.exit(0);
});

start();
