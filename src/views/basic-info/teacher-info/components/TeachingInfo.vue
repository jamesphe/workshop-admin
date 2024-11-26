<template>
  <div class="teaching-info">
    <!-- 当前教学课程 -->
    <el-card class="info-card">
      <div slot="header">
        <span>当前教学课程</span>
      </div>
      <el-table :data="teacherInfo.teachingCourses || []" border>
        <el-table-column prop="name" label="课程名称" />
        <el-table-column prop="credit" label="学分" width="80" />
        <el-table-column prop="hours" label="课时" width="80" />
        <el-table-column prop="studentCount" label="学生人数" width="100" />
        <el-table-column prop="classroom" label="教室" width="120" />
        <el-table-column prop="schedule" label="上课时间" width="150" />
        <el-table-column prop="evaluationScore" label="教学评分" width="100">
          <template #default="{ row }">
            <el-progress
              :percentage="Number(row.evaluationScore)"
              :status="getProgressStatus(row.evaluationScore)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 授课班级 -->
    <el-card class="info-card">
      <div slot="header">
        <span>授课班级</span>
      </div>
      <el-table :data="teacherInfo.classInfo || []" border>
        <el-table-column prop="name" label="班级名称" />
        <el-table-column prop="studentCount" label="学生人数" width="120" />
      </el-table>
    </el-card>

    <!-- 教学评分 -->
    <el-card class="info-card">
      <div slot="header">
        <span>教学评分</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="score-item">
            <span class="label">总体评分：</span>
            <el-progress
              :percentage="Number(teacherInfo.evaluationScore) || 0"
              :status="getProgressStatus(teacherInfo.evaluationScore)"
            />
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'TeachingInfo',
  props: {
    teacherInfo: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  methods: {
    getProgressStatus(score) {
      if (!score) return 'exception'
      score = Number(score)
      if (score >= 90) return 'success'
      if (score >= 75) return 'warning'
      return 'exception'
    }
  }
}
</script>

<style lang="scss" scoped>
.teaching-info {
  .info-card {
    margin-bottom: 20px;
  }
  .score-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .label {
      width: 100px;
      margin-right: 10px;
    }
  }
}
</style> 