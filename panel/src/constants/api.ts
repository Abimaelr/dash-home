import axios from 'axios'
import router from '../router'

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL
})

function isTokenExpired(token: string) {
  const decodedToken = JSON.parse(atob(token.split('.')[1]))

  const expirationDate = new Date(decodedToken.exp * 1000)

  return expirationDate < new Date()
}

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      if (isTokenExpired(token)) {
        localStorage.removeItem('token')
        router.push('/login')
        return config
      }
      config.headers.Authorization = `${token}`
    } else {
      router.push('/login')
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
