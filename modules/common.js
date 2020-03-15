const readlineSync = require('readline-sync');

function move(field) {
  let emptyCoord = false;
  let coord = null;
  while (!emptyCoord) {
    coord = readlineSync.question('', { limit: /[1-3],[1-3]$/i }).split(',');
    if (field[coord[0] - 1][coord[1] - 1] === 0) {
      emptyCoord = true;
    } else {
      console.log('Выбранная клетка уже занята, попробуйте другой вариант:');
    }
  }
  return coord;
}

module.exports = {
  move,
};
