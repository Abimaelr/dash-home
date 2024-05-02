<template>
  <el-container class="layout-container-demo" style="height: 500px">
    <el-aside width="200px" class="sidebar">
      <el-scrollbar>
        <el-link href="/">Home</el-link><br />
        <el-link href="/login" type="primary">Login</el-link>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-main>
        <el-scrollbar>
          <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="address" label="Address" />
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles'
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>

<style scoped>
.el-container {
  height: 100%;
}
.sidebar {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.el-link {
  margin-bottom: 10px;
}
.el-main {
  padding: 0;
}
.el-scrollbar {
  height: calc(100% - 40px); /* Remove scrollbar height from container height */
}
</style>
