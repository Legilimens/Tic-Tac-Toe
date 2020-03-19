const readlineSync = require('readline-sync');

function getEmptyField() {
  return JSON.parse(JSON.stringify(Array(3).fill(Array(3).fill(0))));
}

function checkCorrectMove(x, y, field) {
  return field[--x][--y] === 0;
}

function getPlayerMove(field) {
  let emptyCoord = false;
  let coord = null;
  while (!emptyCoord) {
    coord = readlineSync.question('', { limit: /[1-3],[1-3]$/i }).split(',');
    if (checkCorrectMove(coord[0], coord[1], field)) {
      emptyCoord = true;
    } else {
      console.log('Выбранная клетка уже занята, попробуйте другой вариант:');
    }
  }
  return coord;
}

function setPlayerMove(x, y, field, player) {
  field[--x][--y] = player;
  return field;
}

function move(field, player) {
  const coord = getPlayerMove(field);
  return setPlayerMove(coord[0], coord[1], field, player);
}

function changePlayer(player) {
  return player === 1 ? 2 : 1;
}

module.exports = {
  getPlayerMove,
  checkCorrectMove,
  setPlayerMove,
  getEmptyField,
  move,
  changePlayer,
};
