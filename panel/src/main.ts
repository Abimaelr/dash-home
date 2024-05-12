import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

// router.beforeEach((to, from, next) => {
//   console.log('a')
//   const token = localStorage.getItem('token')
//   if (!token) {
//     next('login')
//   } else {
//     next()
//   }
// })

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {})
app.use(VueChartkick)

app.mount('#app')
