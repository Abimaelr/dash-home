<template>
  <div class="common-layout">
    <el-container>
      <el-header v-if="shouldRenderSidebar" class="header">
        <div class="logo"></div>
        <div class="brand">Angel-I</div>
      </el-header>
      <el-container class="layout-container">
        <el-aside width="200px" v-if="shouldRenderSidebar">
          <el-scrollbar>
            <el-menu
              :default-active="route.name"
              class="sidebar-menu"
              router
              collapse-transition
              :collapse="isCollapse"
            >
              <el-menu-item index="home" route="/">Home</el-menu-item>
              <el-menu-item index="logout" @click="logout">Logout</el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <el-scrollbar>
            <router-view />
          </el-scrollbar>
        </el-main>
      </el-container>
      <el-container v-if="shouldRenderSidebar">
        <el-footer>
          <el-divider></el-divider>
          <div class="footer-content">
            <div class="footer-logo"></div>
            <div class="footer-brand">
              Abimael Rocha de Albuquerque - <span id="current-year">{{ currentYear }}</span> - All
              Rights Reserved
            </div>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import router from './router'

const route = useRoute()
const shouldRenderSidebar = ref(route.path !== '/login')
const isCollapse = ref(false)

const shouldGoToLogin = ref(localStorage.getItem('token'))

watch(
  () => route.path,
  (newValue) => {
    shouldRenderSidebar.value = !['/login', '/logout'].includes(newValue)
  }
)

const currentYear = new Date().getFullYear()
// document.getElementById('current-year').textContent = currentYear

function logout() {
  localStorage.clear()
  router.push('/logout')
}
</script>

<style scoped>
.common-layout {
  display: flex;
  height: 100vh;
  flex-direction: column;
}

.el-menu-item {
  height: 50px;
  line-height: 50px;
}
.header {
  background-color: #2c3e50;
  color: #ffffff; /* Cor do texto no header */
  padding: 10px 20px; /* Espaçamento interno do header */
}

.brand {
  color: aliceblue;
  font-weight: 800;
  font-size: xx-large;
  font-family: monospace;
}

.footer {
  height: 50px;
}

.footer-content {
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 10px 0; */
}

.footer-logo {
  /* Estilos do logotipo do footer */
}

.footer-brand {
  color: rgb(77, 77, 77);

  /* font-size: xx-large; */
  font-family: monospace;
}
</style>
