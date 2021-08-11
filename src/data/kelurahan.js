/* eslint-disable */

const API_URL = 'http://localhost:1337';

export async function getListKelurahan() {
    const response = await fetch(`${API_URL}/kelurahan/list`)
    return response.json()
}

export async function getAllKelurahan() {
    const response = await fetch(`${API_URL}/kelurahan`)
    return response.json()
}

export async function getKelurahan({name}) {
    const response = await fetch(`${API_URL}/kelurahan/${name}`)
    return response.json()
}