const { Given, Then } = require('cucumber');
const assert = require('assert');
const request = require('supertest');
const app = require('../src/server');
const controller = require('../src/game');
const statuses = require('../src/lib/statuses');

let lastResult = {};

Given('пустое поле', () => {
  controller.reset();
});

Given('ходит игрок {int}', (player) => {
  controller.setCurrentPlayer(player);
});

Given('игрок ходит в клетку {int}, {int}', async (x, y) => {
  const res = await request(app)
    .post('/move')
    .send({ x, y });
  lastResult = res;
});

Then('поле становится {string}', (field) => {
  assert.equal(controller.getField().join('|'), field);
});

Given('поле {string}', (someField) => {
  // создаем массив подходящей нам структуры, приводя при этом строки к числам
  const newField = someField.split('|').map((el) => el.split(',').map((item) => +item));
  controller.presetField(newField);
});

Then('возвращается ошибка', () => {
  assert.equal(lastResult.status, statuses.error);
});

Then('победил игрок {int}', (player) => {
  assert.equal(controller.isPlayerWon(player), true);
});
