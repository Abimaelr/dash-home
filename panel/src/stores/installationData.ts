import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/constants/api'

export const useInstallationStore = defineStore('installation', () => {
  const installations = ref([])
  const sensors = ref([])
  const installation = ref()
  const alerts = ref([])

  async function getInstallations() {
    const { data } = await api('/installation')
    installations.value = data
    return data
  }

  const loadingInstallationData = ref(false)
  async function getInstallationData(id: number) {
    loadingInstallationData.value = true
    const { data } = await api(`/installation/${id}`)
    installation.value = data
    loadingInstallationData.value = false
    return data
  }

  const loadingInstallationSensor = ref(false)
  async function getSensorsData(id: number) {
    loadingInstallationSensor.value = true
    const { data } = await api(`/installation/${id}/sensors/`)
    sensors.value = data
    loadingInstallationSensor.value = false
    return data
  }

  const loadingAlerts = ref(false)
  async function getAlerts(installationId: number) {
    loadingAlerts.value = true
    const { data } = await api(`/installation/${installationId}/alerts`)
    loadingAlerts.value = false
    alerts.value = data
  }

  return {
    getInstallations,
    getInstallationData,
    getSensorsData,
    getAlerts,
    installations,
    sensors,
    installation,
    loadingInstallationData,
    loadingInstallationSensor,
    loadingAlerts,
    alerts
  }
})
