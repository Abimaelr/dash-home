<template>
  <div class="common-layout">
    <el-container class="layout-container" style="height: 100%">
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

function logout() {
  localStorage.clear()
  router.push('logout')
}
</script>

<style scoped>
.common-layout {
  background-color: antiquewhite;
  min-height: '100vh';
}
/* 
.el-scrollbar {
  height: calc(100% - 40px);
} */

.el-menu-item {
  height: 50px;
  line-height: 50px;
}
</style>
