function checkHorizont(field) {
  for (let r = 0; r < field.length; r++) {
    for (let c = 0; c < field[r].length; c++) {
      if (field[r][c + 2]) {
        if (
          field[r][c] === field[r][c + 1]
          && field[r][c] === field[r][c + 2]
          && field[r][c] !== 0
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function checkVertical(field) {
  for (let r = 0; r < field.length; r++) {
    for (let c = 0; c < field[r].length; c++) {
      if (field[r + 2]) {
        if (
          field[r][c] === field[r + 1][c]
          && field[r][c] === field[r + 2][c]
          && field[r][c] !== 0
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function checkDiagonalRight(field) {
  for (let r = 0; r < field.length; r++) {
    for (let c = 0; c < field[r].length; c++) {
      if (field[r + 2] && field[r + 2][c + 2]) {
        if (
          field[r][c] === field[r + 1][c + 1]
          && field[r][c] === field[r + 2][c + 2]
          && field[r][c] !== 0
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function checkDiagonalLeft(field) {
  for (let r = 0; r < field.length; r++) {
    for (let c = 0; c < field[r].length; c++) {
      if (field[r + 2] && field[r + 2][c - 2]) {
        if (
          field[r][c] === field[r + 1][c - 1]
          && field[r][c] === field[r + 2][c - 2]
          && field[r][c] !== 0
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

const checkWinner = (field) => {
  if (
    checkHorizont(field)
    || checkVertical(field)
    || checkDiagonalRight(field)
    || checkDiagonalLeft(field)
  ) {
    return true;
  }
  return false;
};

module.exports = checkWinner;
