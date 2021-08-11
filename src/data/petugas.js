/* eslint-disable*/

const API_URL = 'http://localhost:1337'

export async function getAllPetugas() {
    const response = await fetch(`${API_URL}/auth/users`)
    return response.json()
}