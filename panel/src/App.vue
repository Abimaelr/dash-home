<template>
  <div class="common-layout">
    <el-container v-loading="loading">
      <el-header v-if="shouldRenderSidebar" class="header">
        <div>
          <div class="logo"></div>
          <div class="brand">Angel-I</div>
        </div>

        <div class="toolbar">
          <el-dropdown>
            <div>
              {{ userData?.name }}
              <el-icon style="margin-right: 8px; margin-top: auto">
                <setting :style="{ transform: 'translateY(2px)' }" />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item index="logout" @click="logout">Logout</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
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
              <el-sub-menu index="1">
                <template #title>Home</template>
                <el-menu-item index="installations" route="/">Installations</el-menu-item>
                <el-menu-item index="sensors" route="/sensors">Sensors</el-menu-item>
              </el-sub-menu>
              <el-menu-item index="profile" route="/">Profile</el-menu-item>
              <el-menu-item index="about" route="/about">About </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <el-scrollbar>
            <router-view />
          </el-scrollbar>
        </el-main>
      </el-container>
      <div v-if="shouldRenderSidebar">
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
      </div>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import router from './router'
import { Setting } from '@element-plus/icons-vue'
import useUserStore from '@/stores/userData'

const route = useRoute()
const shouldRenderSidebar = ref(route.path !== '/login')
const isCollapse = ref(false)
const userStore = useUserStore()
const loading = ref(false)
const userData = ref({}) // Defina como null para garantir que seja reativo

watch(
  () => route.path,
  (newValue) => {
    shouldRenderSidebar.value = !['/login', '/logout'].includes(newValue)
  }
)

const currentYear = new Date().getFullYear()

onMounted(async () => {
  loading.value = true
  userData.value = await userStore.getMe()
  loading.value = false
})

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
  background-color: #151617;
  color: #ffffff;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

  font-family: monospace;
}

.toolbar:hover {
  cursor: pointer;
}
</style>
