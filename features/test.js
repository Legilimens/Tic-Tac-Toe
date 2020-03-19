const { Given, Then } = require('cucumber');
const assert = require('assert');
const {
  getEmptyField, setPlayerMove, changePlayer, checkCorrectMove,
} = require('../modules/common');
const checkWinner = require('../modules/checkWinner');

let field = getEmptyField();
const emptyFieldInString = '0,0,0|0,0,0|0,0,0';
let player = null;
let moveStatus = null;

Given('пустое поле', () => {
  assert.equal(field.join('|'), emptyFieldInString);
});

Given('ходит игрок {int}', (activePlayer) => {
  player = activePlayer;
});

Given('игрок ходит в клетку {int}, {int}', (x, y) => {
  moveStatus = checkCorrectMove(x, y, field);
  if (moveStatus) {
    field = setPlayerMove(x, y, field, player);
    player = changePlayer(player);
  }
});

Then('поле становится {string}', (string) => {
  assert.equal(field.join('|'), string);
});

Given('поле {string}', (someField) => {
  field = someField.split('|').map((el) => el.split(',').map((item) => +item));
});

Then('возвращается ошибка', () => {
  assert.equal(moveStatus, false);
});

Then('победил текущий игрок', () => {
  assert.equal(checkWinner(field), true);
});
