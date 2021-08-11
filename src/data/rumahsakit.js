/* eslint-disable */

const API_URL = 'http://localhost:1337'

export async function getListRumahsakit() {
  const response = await fetch(`${API_URL}/rumahsakit/list`);
  return response.json();
}

export async function getAllRumahsakit() {
    const response = await fetch(`${API_URL}/rumahsakit`)
    return response.json()
}
