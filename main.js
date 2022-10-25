function createMatrix(a, b) {
    let matrix = new Array(a)

    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(b)
    }

    matrix = fillMatrix(matrix)

    return matrix
}

function fillMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = Math.round(Math.random() * 100)
        }
    }

    return matrix
}

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

let arrRazrElems = []

function zhardanoGaussMethod(matrix, k = 1, s = 4) {
  const m = matrix.length;
  const n = matrix[0].length;
  arrRazrElems.push({k, s})
  checkMatrix(matrix, m, n);
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

  for (let i = 0; i < matrix.length; i++) {
    matrix[i].splice(s, 1);
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

function checkMatrix(matrix, m, n) {
  let sum = 0;
  let sumVect = 0;

  for (let i = 0; i < m; i++)
  {
    let rowSum = 0;

    for (let j = 0; j < n; j++)
    {
        sum += matrix[i][j+1];
        rowSum += matrix[i][j+1];
    }

    sumVect += matrix[i][0];

    let vect = matrix[i][0];

    if (rowSum == 0 && vect != 0) {
      console.log("Система не имеет решений");
      drawMatrix(matrix);
      return;
    }

    if (rowSum == vect) {
      console.log("Система совметсна");
      drawMatrix(matrix);
      return;
    }
  }

  if (sum == 0 && sumVect == 0)
  {
      console.WriteLine("Система имеет бесконечное количество решений");
      drawMatrix(matrix);
      return;
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
