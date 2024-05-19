<template>
  <el-container class="container">
    <el-container>
      <el-main>
        <el-scrollbar>
          <el-row>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="sensor in sensors" :key="sensor.id">
              <el-card @click="handleCardClick(sensor)" class="card">
                <div class="card-content">
                  <div class="">{{ sensor.alias }}</div>
                  <div class="">{{ sensor.code }}</div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useSensorStore } from '../stores/sensorData'
import { onMounted, ref } from 'vue'
import router from '@/router'

const { getSensors, sensors, loading } = useSensorStore()

onMounted(async () => {
  await getSensors()
})

function handleCardClick(installation: any) {
  router.push(`/installation/${installation.id}`)
}
</script>

<style scoped>
.el-card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  margin: 15px;
}

.el-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.card-content {
  padding: 20px;
  margin: 10px;
}
</style>
