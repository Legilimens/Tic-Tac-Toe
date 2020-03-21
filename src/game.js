const createField = require('./lib/createField');
const checkWinner = require('./lib/checkWinner');

// Игровое поле с глубоким копированием вложенных полей
let field = createField(3, 3);
// Текущий игрок
let currentPlayer = 1;

/**
 * Получить текущее состояние поля
 * @return {Array}
 */
function getField() {
  return field;
}

/**
 * Изменить текущего игрока
 * @param {Number}
 */
function setCurrentPlayer(player) {
  currentPlayer = player;
}

/**
 * Проверка ячейки на пустоту
 * @param {String} x
 * @param {String} y
 *
 * @return {boolean}
 */
function checkValidMove(x, y) {
  return field[x - 1][y - 1] === 0 && field[x - 1][y - 1] !== currentPlayer;
}

/**
 * Сбросить игровое поле
 */
function reset() {
  field = createField(3, 3);
  return field;
}

/**
 * Сделать ход в координаты X и Y
 * Клиент присылает значения с 1, но нам надо считать с 0
 * @param {String} x
 * @param {String} y
 */
function makeMove(x, y) {
  // смотрим, не заполнена ли эта ячейка
  if (checkValidMove(x, y)) {
    // записываем значение и сменяем игрока
    field[--x][--y] = currentPlayer;
    // проверяем победителя
    if (checkWinner(field)) {
      return { status: 'won', player: currentPlayer };
    }
    // изменяем текущего игрока
    setCurrentPlayer(currentPlayer !== 1 ? 1 : 2);
    // возвращаем успех
    return { status: 'ok' };
  }
  // иначе возвращаем ошибку
  return { status: 'error' };
}

/**
 * Задать предустановленное поле
 * @param {Array} newField
 */
function presetField(newField) {
  field = newField;
}

/**
 * Проверка победителя
 * @param {Number} player
 * @return {boolean}
 */
function isPlayerWon(player) {
  return checkWinner(field) && currentPlayer === player;
}

module.exports = {
  getField,
  checkValidMove,
  setCurrentPlayer,
  makeMove,
  reset,
  presetField,
  isPlayerWon,
};
