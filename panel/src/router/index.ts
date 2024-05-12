import { createRouter, createWebHistory } from 'vue-router'
import ViewInstallationView from '@/views/ViewInstallationView.vue'

import LoginViewVue from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LoginViewVue
    },
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/installation/:id', name: 'installation', component: ViewInstallationView },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    { path: '/logout', name: 'logout', component: () => import('../views/LogoutView.vue') },
    { path: '/403', name: 'forbidden', component: () => import('../views/ForbiddenView.vue') }
  ]
})

export default router
