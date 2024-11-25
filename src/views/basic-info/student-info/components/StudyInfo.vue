<template>
  <div class="study-info">
    <!-- 学习概况卡片 -->
    <el-card class="overview-card" shadow="hover">
      <div slot="header" class="card-header">
        <span><i class="el-icon-data-analysis" /> 学习概况</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="stat-item">
            <div class="stat-label">平均成绩</div>
            <div class="stat-value">
              <el-tooltip effect="dark" placement="top">
                <div slot="content">
                  成绩等级说明：<br>
                  90-100分：优秀<br>
                  80-89分：良好<br>
                  70-79分：中等<br>
                  60-69分：及格<br>
                  60分以下：不及格
                </div>
                <el-tag :type="getScoreType(studentInfo.averageScore)" size="medium">
                  {{ studentInfo.averageScore }}分 ({{ getScoreLevel(studentInfo.averageScore) }})
                </el-tag>
              </el-tooltip>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="stat-item">
            <div class="stat-label">已修/总学分</div>
            <div class="stat-value">
              <el-progress 
                :percentage="(studentInfo.totalCredits / studentInfo.requiredCredits) * 100"
                :format="() => `${studentInfo.totalCredits}/${studentInfo.requiredCredits}`"
                :status="getCreditsStatus(studentInfo.totalCredits, studentInfo.requiredCredits)"
              />
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="stat-item">
            <div class="stat-label">专业排名</div>
            <div class="stat-value">
              <span class="ranking">{{ studentInfo.ranking }}</span>
              <span class="total">/{{ studentInfo.totalStudents }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 当前课程卡片 -->
    <el-card class="course-card" shadow="hover">
      <div slot="header" class="card-header">
        <span><i class="el-icon-reading" /> 当前课程</span>
      </div>
      <el-table :data="studentInfo.currentCourses" border style="width: 100%">
        <el-table-column prop="name" label="课程名称" min-width="180" />
        <el-table-column prop="credit" label="学分" width="80" align="center" />
        <el-table-column prop="teacher" label="任课教师" width="120" align="center" />
        <el-table-column prop="classroom" label="教室" width="120" align="center" />
        <el-table-column prop="schedule" label="上课时间" width="150" align="center">
          <template #default="{ row }">
            <el-tag size="medium">{{ row.schedule }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 学习历史卡片 -->
    <el-card class="history-card" shadow="hover">
      <div slot="header" class="card-header">
        <span><i class="el-icon-time" /> 学习历史</span>
      </div>
      <el-timeline>
        <el-timeline-item
          v-for="term in studentInfo.studyHistory"
          :key="term.semester"
          :timestamp="term.semester"
          placement="top"
          :type="getTimelineItemType(term.gpa)"
        >
          <el-card class="semester-card">
            <div class="semester-header">
              <div class="semester-stats">
                <span class="stat">
                  学期平均分：
                  <el-tooltip effect="dark" placement="top">
                    <div slot="content">
                      成绩等级说明：<br>
                      90-100分：优秀<br>
                      80-89分：良好<br>
                      70-79分：中等<br>
                      60-69分：及格<br>
                      60分以下：不及格
                    </div>
                    <el-tag :type="getScoreType(term.averageScore)" size="small">
                      {{ term.averageScore }}分 ({{ getScoreLevel(term.averageScore) }})
                    </el-tag>
                  </el-tooltip>
                </span>
                <span class="stat">
                  专业排名：
                  <el-tag type="info" size="small">
                    第{{ term.ranking }}名 / 共{{ studentInfo.totalStudents }}人
                  </el-tag>
                </span>
              </div>
            </div>
            <el-table 
              :data="term.courses" 
              border 
              size="small" 
              style="width: 100%; margin-top: 10px"
            >
              <el-table-column prop="name" label="课程名称" min-width="180" />
              <el-table-column prop="credit" label="学分" width="80" align="center" />
              <el-table-column prop="teacher" label="任课教师" width="120" align="center" />
              <el-table-column prop="score" label="成绩" width="100" align="center">
                <template #default="{ row }">
                  <el-tag :type="getScoreType(row.score)" size="small">{{ row.score }}</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'StudyInfo',
  props: {
    studentInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    getScoreType(score) {
      if (score >= 90) return 'success'
      if (score >= 80) return 'primary'
      if (score >= 70) return 'warning'
      if (score >= 60) return 'info'
      return 'danger'
    },
    getScoreLevel(score) {
      if (score >= 90) return '优秀'
      if (score >= 80) return '良好'
      if (score >= 70) return '中等'
      if (score >= 60) return '及格'
      return '不及格'
    },
    getCreditsStatus(current, required) {
      const percentage = (current / required) * 100
      if (percentage >= 100) return 'success'
      if (percentage >= 80) return 'primary'
      if (percentage >= 60) return 'warning'
      return 'exception'
    },
    getTimelineItemType(gpa) {
      if (gpa >= 3.5) return 'success'
      if (gpa >= 3.0) return 'primary'
      if (gpa >= 2.0) return 'warning'
      return 'danger'
    }
  }
}
</script>

<style lang="scss" scoped>
.study-info {
  .overview-card,
  .course-card,
  .history-card {
    margin-bottom: 20px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }

  .card-header {
    display: flex;
    align-items: center;
    
    i {
      margin-right: 8px;
      font-size: 16px;
    }
  }

  .stat-item {
    text-align: center;
    padding: 10px;
    
    .stat-label {
      color: #909399;
      font-size: 14px;
      margin-bottom: 10px;
    }
    
    .stat-value {
      font-size: 24px;
      font-weight: bold;
      
      .ranking {
        color: #409EFF;
      }
      
      .total {
        color: #909399;
        font-size: 16px;
      }
    }
  }

  .semester-card {
    .semester-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .semester-stats {
      .stat {
        margin-right: 20px;
        font-size: 14px;
        
        &:last-child {
          margin-right: 0;
        }

        .el-tag {
          margin-left: 8px;
        }
      }
    }
  }

  .el-timeline {
    padding: 20px;
  }

  .el-progress {
    margin-top: 8px;
  }
}
</style> 