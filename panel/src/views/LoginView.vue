<template>
  <div class="login-container">
    <el-card class="login-card" shadow="hover">
      <h2>Login</h2>
      <el-form ref="loginForm" :model="formData" :rules="formRules" label-position="top">
        <el-form-item label="Email" prop="email">
          <el-input v-model="formData.email" placeholder="Digite seu email"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            v-model="formData.password"
            type="password"
            placeholder="Digite sua senha"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" :loading="formData.loading">Login</el-button>
          <el-button type="default" @click="clearForm">Clear</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElCard } from 'element-plus'
import { ElMessage } from 'element-plus'
import useUserStore from '../stores/userData'
import router from '@/router'

const userStore = useUserStore()

const token = localStorage.getItem('token')

if (token) {
  router.push('/')
}

const formData = ref({
  email: '',
  password: '',
  loading: false
})

const formRules = {
  email: [
    { required: true, message: 'Por favor, digite seu email', trigger: 'blur' },
    { type: 'email', message: 'Formato de email inválido', trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: 'Por favor, digite sua senha', trigger: 'blur' },
    { min: 6, message: 'A senha deve ter pelo menos 6 caracteres', trigger: 'blur' }
  ]
}

const loginForm = ref(null)

const login = async () => {
  formData.value.loading = true
  loginForm.value.validate(async (valid) => {
    if (valid) {
      try {
        const data = await userStore.login(formData.value.email, formData.value.password)
        ElMessage.success(data.message)
        router.push('/')
        await userStore.getMe()
        formData.value.loading = false
      } catch (err) {
        formData.value.loading = false
        if (err.response.data.message) ElMessage.error(err.response.data.message)
        else ElMessage.error(err.message)
      }
    } else {
      formData.value.loading = false
      return false
    }
  })
}

const clearForm = () => {
  formData.value.email = ''
  formData.value.password = ''
  formData.value.loading = false
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login-card {
  width: 400px;
  padding: 20px;
}
</style>
