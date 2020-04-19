import axios from 'axios';

export async function getGameList() {
  return axios.get('/getGameList');
}

export async function getGameState(gameId) {
  return axios.post('/getGame', { gameId });
}

export async function registration({email, password}) {
  return axios.post('/register', { email, password});
}

export async function auth({email, password}) {
  return axios.post('/login', { email, password});
}