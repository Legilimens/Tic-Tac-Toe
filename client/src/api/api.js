import axios from 'axios';

export async function getGameList() {
  return axios.get('/getGameList');
}