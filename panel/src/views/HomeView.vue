<template>
  <el-container class="container">
    <el-container>
      <el-main>
        <el-scrollbar>
          <el-row>
            <el-col
              :xs="24"
              :sm="12"
              :md="8"
              :lg="6"
              v-for="installation in installationData"
              :key="installation.id"
            >
              <el-card @click="handleCardClick(installation)" class="card">
                <div class="card-content">
                  <div class="installation-address">{{ installation.address }}</div>
                  <div class="last-active">
                    Last Active: {{ installation.last_active ?? 'N/A' }}
                  </div>
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
import { useInstallationStore } from '@/stores/installationData'
import { onMounted, ref } from 'vue'
import router from '@/router'

const { getInstallations } = useInstallationStore()

const loading = ref(false)
const installationData = ref([])

onMounted(async () => {
  loading.value = true
  installationData.value = await getInstallations()
  loading.value = false
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
}

.el-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.card-content {
  padding: 20px;
}

.installation-address {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.last-active {
  font-size: 14px;
  color: #666;
}
</style>
