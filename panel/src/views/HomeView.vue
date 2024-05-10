<template>
  <el-container>
    <el-container>
      <el-main>
        <el-scrollbar>
          <el-table v-loading="loading" :data="tableData" @row-click="handleRowClick">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="address" label="Address" />
          </el-table>
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
const tableData = ref([])

onMounted(async () => {
  loading.value = true
  tableData.value = await getInstallations()

  loading.value = false
})

function handleRowClick(data: any) {
  router.push(`/installation/${data.id}`)
}
</script>

<style scoped></style>
