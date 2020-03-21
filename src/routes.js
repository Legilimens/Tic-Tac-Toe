const router = require('express').Router();
const controller = require('./game');
const statuses = require('./lib/statuses');

router.get('/', (req, res) => res.send('This is Tic-Tac-Toe game'));

router.get('/getField', (req, res) => {
  res.send(controller.getField());
});

router.get('/resetField', (req, res) => {
  res.send(controller.reset());
});

router.post('/move', (req, res) => {
  const { x, y } = req.body;
  const move = controller.makeMove(x, y);
  res.status(statuses[move.status]).send(move);
});

module.exports = router;
