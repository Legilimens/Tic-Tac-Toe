const users = require('./lib/users');
const createField = require('./lib/createField');
const checkWinner = require('./lib/checkWinner');

const gameList = [];

// инициализация состояния комнаты
function getInitialGameState() {
  let gameCounter = 0;
  return function (user) {
    gameCounter += 1;
    return ({
      gameId: gameCounter,
      players: {
        1: {
          name: user.email,
          color: '#5b5bec',
          id: user.id,
        },
        2: {
          name: null,
          color: '#f77171',
          id: null,
        },
      },
      currentPlayer: 1,
      field: createField(3, 3),
      winner: null,
    });
  };
}
const generateGame = getInitialGameState();

// создаем комнату
function createGame(userId) {
  const user = users.findUserById(userId);
  const game = JSON.parse(JSON.stringify(generateGame(user)));
  gameList.push(game);
  return game;
}

// присоединяемся к игре
function joinToGame(userId, gameId) {
  const user = users.findUserById(userId);
  const game = gameList.find((el) => el.gameId === gameId);
  // а не создатель ли хочет присоединиться к игре
  // и свободно ли местечко для второго игрока
  if (
    userId !== game.players[1].id
    && game.players[2].id === null
  ) {
    game.players[2].id = user.id;
    game.players[2].name = user.email;
  }
  return game;
}

/**
 * Получить список комнат
 * @return {Array}
 */
function getGameList() {
  return gameList;
}

/**
 * Получить текущее состояние поля
 * @return {Array}
 */
function getField(gameId) {
  const game = gameList.find((el) => el.gameId === gameId);
  return game.field;
}

/**
 * Изменить текущего игрока
 * @param {Number}
 */
function setCurrentPlayer(gameId, player) {
  const game = gameList.find((el) => el.gameId === gameId);
  game.currentPlayer = player;
}

/**
 * Проверка ячейки на пустоту
 * @param {String} x
 * @param {String} y
 *
 * @return {boolean}
 */
function checkValidMove(field, currentPlayer, x, y) {
  return field[x - 1][y - 1] === 0 && field[x - 1][y - 1] !== currentPlayer;
}

/**
 * Сделать ход в координаты X и Y
 * Клиент присылает значения с 1, но нам надо считать с 0
 * @param {String} x
 * @param {String} y
 */
function makeMove(userId, gameId, x, y) {
  // ищем игру
  const game = gameList.find((el) => el.gameId === gameId);
  // если игра существует
  // и победитель в ней не определен
  if (game && !game.winner) {
    // смотрим, не заполнена ли эта ячейка
    // и пользователь пытающийся сделать ход соответствует текущему игроку
    if (
      checkValidMove(game.field, game.currentPlayer, x, y)
      && game.players[game.currentPlayer].id === userId
    ) {
      // записываем значение и сменяем игрока
      game.field[--x][--y] = game.currentPlayer;
      // проверяем победителя
      if (checkWinner(game.field)) {
        game.winner = game.currentPlayer;
        return { status: 'won', player: game.currentPlayer };
      }
      // изменяем текущего игрока
      setCurrentPlayer(gameId, game.currentPlayer !== 1 ? 1 : 2);
      // возвращаем успех
      return { status: 'ok' };
    }
  }
  // иначе возвращаем ошибку
  return { status: 'error' };
}

/**
 * Сбросить игру
 */
function reset(userId, gameId) {
  const game = gameList.find((el) => el.gameId === gameId);
  if (
    game.players[1].id === userId
    || game.players[2].id === userId
  ) {
    game.currentPlayer = 1;
    game.field = createField(3, 3);
    game.winner = null;
  }
  return game;
}

/**
 * Задать предустановленное поле
 * @param {Array} newField
 */
function presetField(gameId, newField) {
  const game = gameList.find((el) => el.gameId === gameId);
  game.field = newField;
}

/**
 * Проверка победителя
 * @param {Number} player
 * @return {boolean}
 */
function isPlayerWon(gameId, player) {
  const game = gameList.find((el) => el.gameId === gameId);
  return game.winner && game.currentPlayer === player;
}

module.exports = {
  createGame,
  joinToGame,
  getGameList,
  getField,
  checkValidMove,
  setCurrentPlayer,
  makeMove,
  reset,
  presetField,
  isPlayerWon,
};
