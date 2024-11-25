<template>
  <el-card class="student-header">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-avatar
          :size="120"
          :src="studentInfo.photo"
          fit="cover"
        />
      </el-col>
      <el-col :span="20">
        <el-descriptions :column="3">
          <el-descriptions-item label="姓名">{{ studentInfo.name }}</el-descriptions-item>
          <el-descriptions-item label="学号">{{ studentInfo.studentNumber }}</el-descriptions-item>
          <el-descriptions-item label="性别">
            {{ studentInfo.gender === 'male' ? '男' : studentInfo.gender === 'female' ? '女' : '其他' }}
          </el-descriptions-item>
          <el-descriptions-item label="院系">{{ getDepartmentLabel(studentInfo.department) }}</el-descriptions-item>
          <el-descriptions-item label="专业">{{ studentInfo.major }}</el-descriptions-item>
          <el-descriptions-item label="班级">{{ studentInfo.class }}</el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'StudentHeader',
  props: {
    studentInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    getDepartmentLabel(department) {
      if (!department || !Array.isArray(department)) return ''
      const [college, dept] = department
      return `${college} - ${dept}`
    }
  }
}
</script>

<style lang="scss" scoped>
.student-header {
  margin-bottom: 20px;
}
</style> 