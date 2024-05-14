<script setup lang="ts">
import { useInstallationStore } from '@/stores/installationData'
import { ref, onMounted, watch } from 'vue'
import router from '@/router'
import { Iphone, Location, OfficeBuilding, Tickets, User } from '@element-plus/icons-vue'

const { params } = router.currentRoute.value
const installationStore = useInstallationStore()

const today = new Date()

const selectedDateRange = ref([new Date(new Date().setDate(0)), new Date()])

const pickerOptions = {
  shortcuts: [
    {
      text: 'Hoje',
      onClick: () => {
        const start = new Date()
        const end = new Date()
        selectedDateRange.value = [start, end]
        handleDateChange()
      }
    },
    {
      text: 'Últimos 7 dias',
      onClick: () => {
        const start = new Date()
        start.setDate(start.getDate() - 6)
        const end = new Date()
        selectedDateRange.value = [start, end]
        handleDateChange()
      }
    }
  ]
}

const fetchData = async () => {
  Promise.all([
    installationStore.getInstallationData(Number(params.id)),
    installationStore.getSensorsData(Number(params.id), {
      startDate: selectedDateRange.value[0],
      endDate: selectedDateRange.value[1]
    }),
    installationStore.getAlerts(Number(params.id), {
      startDate: selectedDateRange.value[0],
      endDate: selectedDateRange.value[1]
    })
  ])
}

const handleDateChange = () => {
  fetchData()
}

onMounted(() => {
  fetchData()
})

watch(selectedDateRange, (newValue) => {
  const [startDate, endDate] = newValue
  installationStore.getSensorsData(Number(params.id), {
    startDate,
    endDate
  })
  installationStore.getAlerts(Number(params.id), {
    startDate: selectedDateRange.value[0],
    endDate: selectedDateRange.value[1]
  })
})

const transformData = (sensor) => {
  return sensor.data.map((data) => [new Date(data.date_time), data.value])
}
</script>

<template>
  <el-descriptions
    class="margin-top"
    title="Information"
    :column="3"
    v-loading="installationStore.loadingInstallationData"
  >
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <office-building />
          </el-icon>
          Address
        </div>
      </template>
      {{ installationStore?.installation?.address }}
    </el-descriptions-item>
  </el-descriptions>

  <div>
    <div class="form-container">
      <el-form class="form" label-width="80px">
        <el-form-item label="Data" class="date-picker-item">
          <el-date-picker
            type="daterange"
            v-model="selectedDateRange"
            :picker-options="pickerOptions"
            placeholder="Selecionar Data"
            @change="handleDateChange"
            class="date-picker"
          />
        </el-form-item>
      </el-form>
    </div>

    <div v-if="!installationStore.loadingInstallationSensor">
      <div v-for="(sensor, index) in installationStore.sensors" :key="index" :loading="true">
        <el-text size="large">{{ sensor.alias }}</el-text>
        <line-chart
          :data="transformData(sensor)"
          :key="index"
          :curve="true"
          :pointStyle="'none'"
          :library="{
            legend: { position: 'top' },
            xtitle: 'Timestamp',
            ytitle: sensor.type
          }"
        />
      </div>
    </div>
    <div v-else v-loading="true" :style="{ height: '500px' }"></div>
    <el-divider></el-divider>
    <el-table
      :data="installationStore.alerts"
      border
      style="width: 100%"
      :v-loading="installationStore.loadingInstallationSensor"
    >
      <el-table-column prop="id" label="Alert ID" width="180"></el-table-column>
      <el-table-column prop="sensor_id" label="Sensor ID" width="180"></el-table-column>
      <el-table-column prop="date_time" label="Data e Hora" width="180"></el-table-column>
      <el-table-column prop="alias" label="Alias"></el-table-column>
      <el-table-column prop="description" label="Message"></el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.form-container {
  margin-left: auto;
  text-align: right;
  width: 300px;
  margin-right: 20px;
}

.form {
  width: 100%;
}
</style>
