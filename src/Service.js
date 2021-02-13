import axios from 'axios';
import { getFromStorage } from './storage';
const _token = 'mX1IzTbIiXrb28fKwTNzNo5ZfHJiUjUuZmyXjgBtKguodfSFWOqCi00iMSz1';
const _url = 'https://soccer.sportmonks.com/api/v2.0/teams';
const serverUrl = 'http://localhost:8000/users';

export async function getSoccerTeams() {
  const url = `${_url}?api_token=${_token}`;
  return axios.get(url);
}

function request(url, method, isToken, body) {
  let token = getFromStorage('token');
  if (token) {
    token = token.token;
  }
  const headers = new Headers({
    mode: 'no-cors',
    'Content-Type': 'application/json'
  });
  if (isToken) {
    headers.set('Authorization', `Token ${token}`);
  }

  return fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  }).then(res => res.json());
}

export async function serverLogin(obj) {
  const url = `${serverUrl}/login`;
  return request(url, 'POST', false, obj);
}

export async function serverRegister(obj) {
  const url = `${serverUrl}/`;
  return request(url, 'POST', false, obj);
}

export async function serverGetFavorites() {
  const url = `${serverUrl}/favorites`;
  return request(url, 'GET', true);
}

export async function serverUpdateFavorites(favorites) {
  const url = `${serverUrl}/favorites`;
  return request(url, 'PUT', true, { favorites });
}
