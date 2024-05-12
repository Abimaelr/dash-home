import api from '@/constants/api'

import { defineStore } from 'pinia'

interface UserData {
  username: string
  email: string
  // Outros dados do usuário
}

interface UserStoreState {
  isLoggedIn: boolean
  userData: UserData | null
}

const useUserStore = defineStore('user', {
  state: (): UserStoreState => ({
    isLoggedIn: false,
    userData: null
  }),

  actions: {
    async login(email: string, password: string) {
      const { data } = await api.post('login', { email, password })
      localStorage.setItem('token', data.token)
      return data
    },

    logout() {
      this.isLoggedIn = false
      this.clearUserData()
    },

    async getMe() {
      const { data } = await api.get('login/me')
      this.setUserData(data)
      this.isLoggedIn = true
    },

    setUserData(userData: UserData) {
      this.userData = userData
    },

    clearUserData() {
      this.userData = null
    }
  },

  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    userData: (state) => state.userData
  }
})

export default useUserStore
