
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
    
function zhardanoGaussMethod(m, n, k, s) { 
    let matrix = [ [ -3, 5, -3 ], [ -1, -2, 2 ]]
    let matrixCopy = [ [ -3, 5, -3 ], [ -1, -2, 2 ]]
    drawMatrix(matrix)

    console.log(`k: ${k}\ns: ${s}`)

    if (matrix[k][s] <= 0) {
        console.log("Элемент является не разрешимым")
        return 
    }

    let ks = matrix[k][s]
    
    for (let i = 0; i < matrix[k].length; i++) {
        matrix[k][i] /= ks
    }

    for (let i = 0; i < matrix.length; i++) {
        matrix[i][s] /= -ks
    }

    matrix[k][s] = -matrix[k][s]

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i != k && j != s) {
                matrix[i][j] = (matrixCopy[i][j] * matrixCopy[k][s] - (matrixCopy[i][s] * (matrixCopy[k][j]))) / matrixCopy[k][s]
            }
        }
    }
    
    drawMatrix(matrix)
} 

function drawMatrix(matrix) {
    console.log( '\n\n')
    for(let i = 0; i<matrix.length; i++) {
        for(let j = 0; j<matrix[i].length; j++) {
            matrix[i][j] = +matrix[i][j].toFixed(2)
        }
        console.log(matrix[i].join('  ') + '\n')
    }
}   
    
console.log(zhardanoGaussMethod(2, 3, 1, 2))

let arr = [1, 3, 5, 7, 9, 10]
///O(n) LogN
function yoptaBinarySearch(array, item) {
    let low = 0
    let high = array.length - 1

    
    while(low <= high) {
        let mid = (low + high) / 2
        if (mid % 2 !== 0 ) {
            mid = Math.floor(mid)
        }
        let guess = array[mid]

        if (guess == item) {
            return mid
        }

        if (guess > item) {
            high = mid -1
        }
        else {
            low = mid + 1
        }
    }
 
    return "lox ebaniy net takogo elementa!"
}

console.log(yoptaBinarySearch(arr, 9))

