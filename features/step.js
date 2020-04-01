const { Given, Then } = require('cucumber');
const assert = require('assert');
const request = require('supertest');
const app = require('../src/server');
const controller = require('../src/game');
const users = require('../src/lib/users');
const statuses = require('../src/lib/statuses');

let lastResult = {};
let token = '';

Given('пустая база пользователей', () => {
  users.clearUsers();
});

Given('имеется пользователь {string}, {string}', async (email, password) => {
  await users.addUser(email, password);
});

Given('регистрация с использованием {string} и {string}', async (email, password) => {
  const res = await request(app)
    .post('/register')
    .send({ email, password });
  lastResult = res;
});

Given('авторизация с использованием {string} и {string}', async (email, password) => {
  const res = await request(app)
    .post('/login')
    .send({ email, password });
  lastResult = res;
  token = res.body.token;
});

Then('успешная регистрация', () => {
  assert.equal(lastResult.status, statuses.created);
});

Then('успешная авторизация', () => {
  assert.equal(lastResult.status, statuses.ok);
});

Then('ошибка регистрации', () => {
  assert.equal(lastResult.status, statuses.error);
});

Then('ошибка авторизации', () => {
  assert.equal(lastResult.status, statuses.error);
});

Given('{string} присутствует в базе пользоателей', (player) => {
  assert.ok(users.findUserByEmail(player));
});

Given('{string} не присутствует в базе пользоателей', (player) => {
  assert.equal(users.findUserByEmail(player), undefined);
});

Given('создается новая игра', async () => {
  const res = await request(app)
    .get('/createGame')
    .set('Authorization', `Bearer ${token}`)
    .expect(201);
  lastResult = res;
});

Given('игрок присоединяется в созданную комнату', async () => {
  await request(app)
    .post('/joinToGame')
    .set('Authorization', `Bearer ${token}`)
    .send({ gameId: lastResult.body.game.gameId })
    .expect(200);
});

Given('ходит игрок {int}', (player) => {
  controller.setCurrentPlayer(lastResult.body.game.gameId, player);
});

Given('игрок ходит в клетку {int}, {int}', async (x, y) => {
  await request(app)
    .post('/move')
    .set('Authorization', `Bearer ${token}`)
    .send({ gameId: lastResult.body.game.gameId, x, y });
});

Then('поле становится {string}', async (field) => {
  const res = await request(app)
    .post('/getField')
    .send({ gameId: lastResult.body.game.gameId })
    .expect(200);
  assert.equal(res.body.join('|'), field);
});

Given('поле {string}', (someField) => {
  // создаем массив подходящей нам структуры, приводя при этом строки к числам
  const newField = someField.split('|').map((el) => el.split(',').map((item) => +item));
  controller.presetField(newField);
});

Then('возвращается ошибка хода', () => {
  assert.equal(lastResult.status, statuses.error);
});

Then('победил игрок {int}', (player) => {
  assert.equal(controller.isPlayerWon(player), true);
});
