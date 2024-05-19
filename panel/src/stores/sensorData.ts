import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/constants/api'

export const useSensorStore = defineStore('sensor', () => {
  const sensors = ref([])
  const sensor = ref({})
  const loading = ref(false)

  const getSensors = async () => {
    loading.value = true
    try {
      const response = await api.get('sensors')
      sensors.value = response.data
    } catch (error) {
      console.error('Error fetching sensors:', error)
    } finally {
      loading.value = false
    }
  }

  const getSensor = async (id: number) => {
    try {
      loading.value = true
      const response = await api.get(`sensors/${id}`)
      sensor.value = response.data
      loading.value = false
      return response.data
    } catch (error) {
      console.error('Error fetching sensor:', error)
    }
  }

  const registerNewSensor = async (payload) => {
    try {
      const { data } = await api.post('sensors', payload)
      sensors.value.push(data)
    } catch (error) {
      console.error('Error registering new sensor:', error)
    }
  }

  const addNewAlertTrigger = async (payload) => {
    try {
      await api.post('sensors/alert-trigger', payload)
    } catch (error) {
      console.error('Error registering new trigger:', error)
    }
  }

  return {
    sensors,
    loading,
    getSensors,
    registerNewSensor,
    addNewAlertTrigger,
    getSensor
  }
})
