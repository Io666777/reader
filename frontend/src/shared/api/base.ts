import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000/book', // Твой роут в Hono
  headers: {
    'Content-Type': 'application/json'
  }
})