import axios from "axios";

const api = axios.create({
  baseURL: 'https://zany-gold-leopard-cuff.cyclic.app',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
})

export default api;