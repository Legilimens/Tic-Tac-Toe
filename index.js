const readlineSync = require('readline-sync');
const ticTackToe = require('./modules/ticTackToe');

console.log('Добро пожаловать в игру "Крестики-нолики"!\n');

let wantToPlayAgain = true;
while (wantToPlayAgain) {
  ticTackToe();
  const playAgain = +readlineSync.keyIn(`Play again?
    [1] - Yes
    [2] - No
  : `, { limit: '$<1-2>' });

  if (playAgain === 1) {
    console.clear();
  } else {
    console.log('Bye!');
    wantToPlayAgain = false;
  }
}
