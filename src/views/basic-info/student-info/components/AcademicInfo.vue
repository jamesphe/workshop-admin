<template>
  <div class="academic-info">
    <el-descriptions :column="3" border>
      <el-descriptions-item label="入学日期">{{ studentInfo.enrollmentDate }}</el-descriptions-item>
      <el-descriptions-item label="预计毕业日期">{{ studentInfo.expectedGraduationDate }}</el-descriptions-item>
      <el-descriptions-item label="学生类型">{{ studentInfo.studentType }}</el-descriptions-item>
      <el-descriptions-item label="学历层次">{{ studentInfo.educationLevel }}</el-descriptions-item>
      <el-descriptions-item label="学籍状态">
        <el-tag :type="getStatusType(studentInfo.status)">{{ studentInfo.status }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="宿舍信息">{{ studentInfo.dormitory }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: 'AcademicInfo',
  props: {
    studentInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    getStatusType(status) {
      const types = {
        '在读': 'success',
        '休学': 'warning',
        '退学': 'danger',
        '毕业': 'info'
      }
      return types[status] || ''
    }
  }
}
</script> 