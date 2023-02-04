import axios from "axios"

export const BASE_URL = 'https://cryxxxen.pythonanywhere.com/'

export const instance = axios.create({baseURL: BASE_URL})





