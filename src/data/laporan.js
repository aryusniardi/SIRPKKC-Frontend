/* eslint-disable */

const API_URL = 'http://localhost:1337';

export async function getLaporan({tahun, bulan}) {
    const data = {
        tahun: tahun,
        bulan: bulan
    }

    const response = await fetch(`${API_URL}/laporan`, data)

    return response.json()
}