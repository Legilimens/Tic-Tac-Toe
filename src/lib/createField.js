/**
 * Функция создания игрового поля
 * @param {Number} x
 * @param {Number} y
 */
function createField(x, y) {
  // Игровое поле с глубоким копированием вложенных полей
  return JSON.parse(JSON.stringify(Array(x).fill(Array(y).fill(0))));
}

module.exports = createField;
