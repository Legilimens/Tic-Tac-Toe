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
    try {
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
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...' });
    }
  },
);

router.post(
  '/login',
  [
    check('email', 'Введите корректный email!').normalizeEmail().isEmail(),
    check('password', 'Необходимо ввести пароль!').exists(),
  ],
  async (req, res) => {
    try {
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

      return res.json({ token, userId: user.id });
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...' });
    }
  },
);

router.get('/getGameList', (req, res) => {
  try {
    return res.send(controller.getGameList());
  } catch (e) {
    return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...' });
  }
});

router.get('/createGame', auth.authMiddleware, (req, res) => {
  try {
    const game = controller.createGame(req.user.userId);
    return res.status(201).json({ message: 'Игра успешно создана', game });
  } catch (e) {
    return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...' });
  }
});

router.post(
  '/joinToGame',
  [
    auth.authMiddleware,
    check('gameId', 'Отсутствует идентификатор игры!').exists(),
  ],
  (req, res) => {
    try {
      const { gameId } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: 'Допущены ошибки!',
          errors: errors.array(),
        });
      }

      const game = controller.joinToGame(req.user.userId, gameId);
      return res.send(game);
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...' });
    }
  },
);

router.post('/getGame', check('gameId', 'Отсутствует идентификатор игры!').exists(), (req, res) => {
  try {
    const { gameId } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Допущены ошибки!',
        errors: errors.array(),
      });
    }

    return res.send(controller.getGame(gameId));
  } catch (e) {
    return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...' });
  }
});

router.post('/getField', check('gameId', 'Отсутствует идентификатор игры!').exists(), (req, res) => {
  try {
    const { gameId } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Допущены ошибки!',
        errors: errors.array(),
      });
    }

    return res.send(controller.getField(gameId));
  } catch (e) {
    return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...' });
  }
});

router.get(
  '/resetField',
  [
    check('gameId', 'Отсутствует идентификатор игры!').exists(),
    auth.authMiddleware,
  ],
  (req, res) => {
    try {
      const { gameId } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: 'Допущены ошибки!',
          errors: errors.array(),
        });
      }

      return res.send(controller.reset(req.user.userId, gameId));
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...' });
    }
  },
);

router.post(
  '/move',
  [
    check('gameId', 'Отсутствует идентификатор игры!').exists(),
    auth.authMiddleware,
  ],
  (req, res) => {
    try {
      const { gameId, x, y } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: 'Допущены ошибки!',
          errors: errors.array(),
        });
      }

      const move = controller.makeMove(req.user.userId, gameId, x, y);

      return res.status(statuses[move.status]).send(move);
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...' });
    }
  },
);

module.exports = router;
