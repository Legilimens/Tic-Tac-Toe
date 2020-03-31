const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const controller = require('./game');
const statuses = require('./lib/statuses');
const users = require('./lib/users');
const auth = require('../middleware/auth.middleware');

router.get('/', (req, res) => res.send('This is Tic-Tac-Toe game'));

router.post(
  '/register',
  [
    check('email', 'Некорректный email!').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов!').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Допущены ошибки в регистрационных данных!',
        errors: errors.array(),
      });
    }

    const candidate = users.findUserByEmail(email);
    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь уже существует!' });
    }

    await users.addUser(email, password);

    return res.status(201).json({ message: 'Пользователь создан' });
  },
);

router.post(
  '/login',
  [
    check('email', 'Введите корректный email!').normalizeEmail().isEmail(),
    check('password', 'Необходимо ввести пароль!').exists(),
  ],
  async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Допущены ошибки в данных авторизации!',
        errors: errors.array(),
      });
    }

    const user = users.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Неверный email и/или пароль, попробуйте снова!' });
    }

    const isPasswordMatch = await users.checkMatchPassword(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Неверный email и/или пароль, попробуйте снова!' });
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' },
    );

    return res.json({ token });
  },
);

router.get('/getField', (req, res) => {
  res.send(controller.getField());
});

router.get('/resetField', auth.authMiddleware, (req, res) => {
  res.send(controller.reset());
});

router.post('/move', auth.authMiddleware, (req, res) => {
  const { x, y } = req.body;
  const move = controller.makeMove(x, y);
  res.status(statuses[move.status]).send(move);
});

module.exports = router;
