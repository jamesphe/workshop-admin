<template>
  <el-card class="score-card">
    <div class="score-header">
      <h3>教学评分</h3>
    </div>
    <div class="score-content">
      <div class="total-score">
        <span class="label">总体评分：</span>
        <el-rate
          v-model="teacherInfo.totalScore"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
        />
      </div>
      <div class="score-details">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="score-item">
              <span class="label">教学质量：</span>
              <el-rate
                v-model="teacherInfo.teachingScore"
                disabled
                show-score
                text-color="#ff9900"
              />
            </div>
          </el-col>
          <el-col :span="8">
            <div class="score-item">
              <span class="label">科研成果：</span>
              <el-rate
                v-model="teacherInfo.researchScore"
                disabled
                show-score
                text-color="#ff9900"
              />
            </div>
          </el-col>
          <el-col :span="8">
            <div class="score-item">
              <span class="label">学生评价：</span>
              <el-rate
                v-model="teacherInfo.studentScore"
                disabled
                show-score
                text-color="#ff9900"
              />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'TeacherScore',
  props: {
    teacherInfo: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.score-card {
  margin-bottom: 20px;
  
  .score-header {
    margin-bottom: 20px;
    
    h3 {
      margin: 0;
      color: #303133;
    }
  }
  
  .score-content {
    .total-score {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #EBEEF5;
    }
    
    .score-item {
      margin-bottom: 15px;
    }
    
    .label {
      display: inline-block;
      min-width: 80px;
      color: #606266;
    }
  }
}
</style> 