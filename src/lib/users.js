// Имитация БД пользователей
const bcrypt = require('bcryptjs');

const users = [];

let id = 1;

function clearUsers() {
  users.length = 0;
  return users;
}

function findUserByEmail(email) {
  return users.find((el) => el.email === email);
}

async function checkMatchPassword(password, userPassword) {
  const res = await bcrypt.compare(password, userPassword);
  return res;
}

async function addUser(email, password) {
  // хешируем пароль с солью в 12 символов
  const hashedPassword = await bcrypt.hash(password, 12);

  users.push({
    id,
    email,
    password: hashedPassword,
  });
  id += 1;
}

module.exports = {
  users,
  clearUsers,
  findUserByEmail,
  checkMatchPassword,
  addUser,
};
