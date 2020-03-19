const { move, getEmptyField, changePlayer } = require('./common');
const checkWinner = require('./checkWinner');

function ticTackToe() {
  let field = getEmptyField();

  let winner = null;
  let player = 1;

  console.log('Игрок 1 играет за Х, игрок 2 играет за О');
  console.group('Поле для игры:');
  field.map((el) => console.log(el));
  console.groupEnd();

  while (!winner) {
    console.log(`Ход игрока ${player}. Введите координаты горизонтали и вертикали:`);

    field = move(field, player);

    console.group('Ход сделан. Текущее поле игры:');
    field.map((el) => console.log(el));
    console.groupEnd();

    // првоеряем победителя
    if (checkWinner(field)) {
      winner = player;
      break;
    }

    // изменяем текущего игрока
    player = changePlayer(player);
  }

  console.log(`Победил ${player} игрок! Поздравляю!`);
}

module.exports = ticTackToe;
