/* eslint-disable */

const API_URL = 'http://localhost:1337';

export async function getAllPasien() {
  const response = await fetch(`${API_URL}/pasien`);
  return response.json();
}

export async function getPasien({ name }) {
  const response = await fetch(`${API_URL}/pasien/${name}`);
  return response.json();
}
