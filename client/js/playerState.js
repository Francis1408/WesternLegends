import { API_URL } from '../config.js';

let _player = null;
const _subscribers = [];

export function setPlayerData(data) {
  _player = data;
  _subscribers.forEach(fn => fn(_player));
}

export function getPlayerData() {
  return _player;
}

export function subscribe(fn) {
  _subscribers.push(fn);
}

export async function updatePlayer() {
  const res = await fetch(`${API_URL}/players/me`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if (!res.ok) return;

  const { player } = await res.json();
  setPlayerData(player);  // triggers all subscribers
  return player;
}