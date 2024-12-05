const searchFromNode = (coordinates, matrix, toFind) => {
  const [i, j] = coordinates
  let foundCells = 0;

  // If our first node isn't the correct character, dip out
  if (matrix[i][j] !== toFind[0]) {
    return foundCells;
  }

  const directions = [
    // [i, j]
    [1, 0], // Up
    [1, 1], // up right
    [1, -1], // up left
    [-1, 0], // down
    [-1, 1], // down right
    [-1, -1], // down left
    [0, 1], // right
    [0, -1] // left
  ]

  directions.forEach(([iDirection, jDirection]) => {
    const searchDepth = toFind.length;
    for (let displacement = 1; displacement < searchDepth; displacement++) {
      const toTestI = i + (iDirection * displacement)
      const toTestJ = j + (jDirection * displacement)

      // Hit the boundary of the structure
      if (toTestI < 0 || toTestI >= matrix.length || toTestJ < 0 || toTestJ >= matrix[0].length) {
        // Break, no more searching in this direction
        break;
      }

      // If the char isn't in the correct spot, break the loop
      if (matrix[toTestI][toTestJ] !== toFind[displacement]) {
        break
      }

      // If we're here, we've had the correct value up until this point
      // Check if we're at the end of the string, if we have, iterate the found from this point
      if (displacement === searchDepth - 1) {
        foundCells++;
      }
    }
  })

  return foundCells
}

const findString = (toFind, body) => {
  let total = 0;
  const textRows = body.split('\n');
  const textMatrix = textRows.map(row => row.split(''))
  for (let i = 0; i < textMatrix.length; i++) {
    for (let j = 0; j < textMatrix[0].length; j++) {
      const numFound = searchFromNode([i, j], textMatrix, 'XMAS')
      total += numFound
    }
  }
  console.log({total});
  return total
}

(() => {
  // findString('XMAS', EXAMPLE1);
  findString('XMAS', EXAMPLE3);
})()