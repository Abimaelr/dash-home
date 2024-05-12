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
              <el-card @click.native="handleCardClick(installation)" class="card">
                <div>{{ installation.address }}</div>
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
el-row {
  margin: 0;
  overflow-x: hidden;
}

.card {
  cursor: pointer;
}
</style>
