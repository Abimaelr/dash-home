import api from '@/constants/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface UserData {
  name: string
  email: string
  // Outros dados do usuário
}

interface UserStoreState {
  isLoggedIn: Ref<boolean>
  userData: Ref<UserData | null>
}

const useUserStore = defineStore('user', {
  state: (): UserStoreState => ({
    userData: ref(null)
  }),

  actions: {
    async login(email: string, password: string) {
      const { data } = await api.post('login', { email, password })
      localStorage.setItem('token', data.token)

      return data
    },

    logout() {
      localStorage.removeItem('token')
      this.isLoggedIn.value = false
    },

    async getMe() {
      const { data } = await api.get('login/me')
      return data
    }
  }
})

export default useUserStore
