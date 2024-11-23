<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>学生一张表</span>
      </div>
      <el-form ref="studentForm" :model="studentForm" label-width="120px">
        <el-form-item label="基本信息">
          <!-- 基本信息字段 -->
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'StudentInfo',
  data() {
    return {
      studentForm: {
        // 表单数据结构
      }
    }
  },
  methods: {
    // 表单方法
  }
}
</script>

<style scoped>
</style> 