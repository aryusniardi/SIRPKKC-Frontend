/* eslint-disable */

const API_URL = 'http://localhost:1337';

export async function getListDiagnosa() {
  const response = await fetch(`${API_URL}/diagnosa`);
  return response.json();
}