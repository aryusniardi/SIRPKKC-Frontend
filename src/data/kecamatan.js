/* eslint-disable */

const API_URL = 'http://localhost:1337';

export async function getListKecamatan() {
  const response = await fetch(`${API_URL}/kecamatan/list`);
  return response.json();
}

export async function getAllKecamatan() {
  const response = await fetch(`${API_URL}/kecamatan`);
  return response.json();
}

export async function getKecamatan({ name }) {
  const response = await fetch(`${API_URL}/kecamatan/${name}`);
  return response.json();
}
