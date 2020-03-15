const { move } = require('./common');
const checkWinner = require('./checkWinner');

function ticTackToe() {
  // deep clone массива, чтобы не работать с ссылкой в каждой строке
  const field = JSON.parse(JSON.stringify(Array(3).fill(Array(3).fill(0))));

  let winner = null;
  let player = 1;

  console.log('Игрок 1 играет за Х, игрок 2 играет за О');
  console.group('Поле для игры:');
  field.map((el) => console.log(el));
  console.groupEnd();

  while (!winner) {
    console.log(`Ход игрока ${player}. Введите координаты горизонтали и вертикали:`);

    const coord = move(field);
    // записываем его выбор со значением текущего игрока
    field[--coord[0]][--coord[1]] = player;

    console.group('Ход сделан. Текущее поле игры:');
    field.map((el) => console.log(el));
    console.groupEnd();

    // првоеряем победителя
    if (checkWinner(field)) {
      winner = player;
      break;
    }

    // изменяем текущего игрока
    player = player !== 1 ? 1 : 2;
  }

  console.log(`Победил ${player} игрок! Поздравляю!`);
}

module.exports = ticTackToe;
