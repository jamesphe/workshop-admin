<template>
  <div class="teaching-info">
    <!-- 教学评分 -->
    <el-card class="info-card">
      <div slot="header">
        <span>教学评分</span>
      </div>
      <div class="score-content">
        <div class="total-score">
          <span class="label">总体评分：</span>
          <span class="score-value">{{ totalScore }} 分</span>
        </div>
        <div class="score-details">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="score-item">
                <span class="label">教学态度：</span>
                <el-rate
                  v-model="attitudeScore"
                  disabled
                  show-score
                  :max="5"
                  :score-template="scoreTemplate"
                />
              </div>
            </el-col>
            <el-col :span="8">
              <div class="score-item">
                <span class="label">教学内容：</span>
                <el-rate
                  v-model="contentScore"
                  disabled
                  show-score
                  :max="5"
                  :score-template="scoreTemplate"
                />
              </div>
            </el-col>
            <el-col :span="8">
              <div class="score-item">
                <span class="label">教学效果：</span>
                <el-rate
                  v-model="effectScore"
                  disabled
                  show-score
                  :max="5"
                  :score-template="scoreTemplate"
                />
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>

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
        <el-table-column prop="evaluationScore" label="教学评分" width="120">
          <template #default="{ row }">
            <el-rate
              v-model="row.evaluationScore"
              disabled
              show-score
              :max="5"
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
  computed: {
    scoreTemplate() {
      return '{value} 分'
    },
    // 计算总体评分（三项评分的平均值）
    totalScore() {
      if (!this.teacherInfo.teachingEvaluation) return 0
      const { attitudeScore, contentScore, effectScore } = this.teacherInfo.teachingEvaluation
      const total = (attitudeScore + contentScore + effectScore) / 3
      return total.toFixed(1)
    },
    // 教学态度评分
    attitudeScore() {
      return this.teacherInfo.teachingEvaluation?.attitudeScore || 0
    },
    // 教学内容评分
    contentScore() {
      return this.teacherInfo.teachingEvaluation?.contentScore || 0
    },
    // 教学效果评分
    effectScore() {
      return this.teacherInfo.teachingEvaluation?.effectScore || 0
    }
  }
}
</script>

<style lang="scss" scoped>
.teaching-info {
  .info-card {
    margin-bottom: 20px;
  }

  .score-content {
    .total-score {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #EBEEF5;
      
      .score-value {
        font-size: 24px;
        color: #ff9900;
        font-weight: bold;
      }
    }
    
    .score-item {
      margin-bottom: 15px;
    }
  }

  .label {
    display: inline-block;
    min-width: 80px;
    color: #606266;
    margin-right: 10px;
  }
}
</style> 