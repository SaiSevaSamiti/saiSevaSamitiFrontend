import axios from 'axios'

// we need to pass the baseURL as an object
const API = axios.create({
  // baseURL: 'http://localhost:5500/',
  baseURL: 'https://sai-seva-samiti-backend.vercel.app',
})

export default API
