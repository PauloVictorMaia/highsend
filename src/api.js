import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
// 'https://zany-gold-leopard-cuff.cyclic.app'
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
})

export default api;