<template>
  <div class="logout-screen">
    <div class="logout-spinner">
      <svg class="spinner" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
      </svg>
    </div>
    <p class="logout-message">Good-bye...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import router from '@/router'

onMounted(() => {
  setTimeout(() => {
    router.push('/login')
  }, 1000)
})
</script>

<style scoped>
.logout-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.logout-spinner {
  width: 50px;
  height: 50px;
}

.spinner {
  animation: rotate 2s linear infinite;
  width: 50px;
  height: 50px;
}

.path {
  stroke: #007bff;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

.logout-message {
  margin-top: 20px;
  font-size: 18px;
  text-align: center;
  color: #333;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
