<template>
  <div class="teaching-info">
    <el-row :gutter="20" class="stat-row">
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-header">
            <i class="el-icon-time stat-icon" style="color: #409EFF" />
            <span class="stat-title">教学工作量</span>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ teacherInfo.workload || 0 }}</div>
            <div class="stat-label">学时/周</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-header">
            <i class="el-icon-notebook-2 stat-icon" style="color: #67C23A" />
            <span class="stat-title">授课门数</span>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ teacherInfo.courseCount || 0 }}</div>
            <div class="stat-label">门课程</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-header">
            <i class="el-icon-user-solid stat-icon" style="color: #E6A23C" />
            <span class="stat-title">授课班级</span>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ teacherInfo.classInfo ? teacherInfo.classInfo.length : 0 }}</div>
            <div class="stat-label">个班级</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-header">
            <i class="el-icon-medal-1 stat-icon evaluation" />
            <span class="stat-title">教学评分</span>
          </div>
          <div class="stat-content">
            <el-progress 
              type="dashboard" 
              :percentage="teacherInfo.evaluationScore || 0"
              :color="getScoreColor"
              :format="() => ''"
            >
              <template #default>
                <div class="score-info">
                  <div class="score-value">{{ teacherInfo.evaluationScore || 0 }}</div>
                  <div class="score-label">分</div>
                </div>
              </template>
            </el-progress>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="detail-card">
      <template #header>
        <div class="card-title">
          <i class="el-icon-reading" />
          <span>当前授课</span>
        </div>
      </template>
      <el-table :data="teacherInfo.teachingCourses" border style="width: 100%">
        <el-table-column prop="name" label="课程名称" min-width="180" show-overflow-tooltip />
        <el-table-column prop="credit" label="学分" width="80" align="center" />
        <el-table-column prop="hours" label="课时" width="80" align="center">
          <template #default="scope">
            <el-tag size="small">{{ scope.row.hours }}学时</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="studentCount" label="学生人数" width="100" align="center" />
        <el-table-column prop="classroom" label="上课地点" width="120" show-overflow-tooltip />
        <el-table-column prop="schedule" label="上课时间" width="150" show-overflow-tooltip />
        <el-table-column prop="evaluationScore" label="课程评分" width="100" align="center">
          <template #default="scope">
            <el-tag :type="getScoreType(scope.row.evaluationScore)">
              {{ scope.row.evaluationScore }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="detail-card">
      <template #header>
        <div class="card-title">
          <i class="el-icon-user" />
          <span>授课班级</span>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col v-for="classInfo in teacherInfo.classInfo" :key="classInfo.name" :span="8">
          <el-card shadow="hover" class="class-card">
            <div class="class-header">
              <span class="class-name">{{ classInfo.name }}</span>
              <el-tag size="small" type="primary">{{ classInfo.studentCount }}人</el-tag>
            </div>
            <div class="class-content">
              <div class="info-item">
                <span class="label">班主任：</span>
                <span class="value">{{ classInfo.headTeacher || '否' }}</span>
              </div>
              <div class="info-item">
                <span class="label">课程：</span>
                <span class="value">{{ getClassCourses(classInfo.name) }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="detail-card">
      <template #header>
        <div class="card-title">
          <i class="el-icon-time" />
          <span>教学历史</span>
        </div>
      </template>
      <el-timeline>
        <el-timeline-item
          v-for="(semester, index) in teacherInfo.teachingHistory"
          :key="index"
          :timestamp="semester.semester"
          placement="top"
        >
          <el-card>
            <h4>{{ formatSemester(semester.semester) }}</h4>
            <el-table :data="semester.courses" border size="small">
              <el-table-column prop="name" label="课程名称" min-width="180" />
              <el-table-column prop="credit" label="学分" width="80" align="center" />
              <el-table-column prop="hours" label="课时" width="80" align="center" />
              <el-table-column prop="studentCount" label="学生人数" width="100" align="center" />
              <el-table-column prop="evaluationScore" label="评分" width="100" align="center">
                <template #default="scope">
                  <el-tag :type="getScoreType(scope.row.evaluationScore)">{{ scope.row.evaluationScore }}</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>

    <el-card class="detail-card">
      <template #header>
        <div class="card-title">
          <i class="el-icon-trophy" />
          <span>教学荣誉</span>
        </div>
      </template>
      <div v-if="teacherInfo.honors && teacherInfo.honors.length" class="honor-list">
        <el-row :gutter="20">
          <el-col v-for="honor in teacherInfo.honors" :key="honor.name" :span="8">
            <el-card shadow="hover" class="honor-card">
              <div class="honor-header">
                <span class="honor-name">{{ honor.name }}</span>
                <el-tag size="small" :type="getHonorLevelType(honor.level)">{{ honor.level }}</el-tag>
              </div>
              <div class="honor-content">
                <p><label>获奖年份：</label>{{ honor.year }}</p>
                <p><label>颁发单位：</label>{{ honor.issuer }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div v-else class="empty-block">
        暂无教学荣誉记录
      </div>
    </el-card>
  </div>
</template>

<script>
import { toThousandFilter } from '@/filters'

export default {
  name: 'TeachingInfo',
  filters: {
    toThousandFilter
  },
  props: {
    teacherInfo: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  computed: {
    getScoreColor() {
      const score = this.teacherInfo.evaluationScore || 0
      if (score >= 90) return '#67C23A'
      if (score >= 80) return '#409EFF'
      if (score >= 70) return '#E6A23C'
      return '#F56C6C'
    }
  },
  methods: {
    getScoreType(score) {
      if (score >= 90) return 'success'
      if (score >= 80) return 'primary'
      if (score >= 70) return 'warning'
      return 'danger'
    },
    getHonorLevelType(level) {
      const types = {
        '国家级': 'danger',
        '省级': 'warning',
        '市级': 'success',
        '校级': 'info'
      }
      return types[level] || 'info'
    },
    formatSemester(semester) {
      if (!semester) return ''
      const [year, term] = semester.split('-')
      return `${year}-${Number(year) + 1}学年第${term}学期`
    },
    getClassCourses(className) {
      const courses = this.teacherInfo.teachingCourses || []
      return courses
        .filter(course => course.classes && course.classes.includes(className))
        .map(course => course.name)
        .join('、')
    }
  }
}
</script>

<style lang="scss" scoped>
.teaching-info {
  .stat-row {
    margin-bottom: 20px;
  }

  .stat-card {
    height: 160px;
    display: flex;
    flex-direction: column;
    
    .stat-header {
      display: flex;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #EBEEF5;
      
      .stat-icon {
        font-size: 20px;
        margin-right: 8px;
        
        &.evaluation {
          color: #E6A23C;
        }
      }
      
      .stat-title {
        font-size: 14px;
        color: #606266;
      }
    }

    .stat-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 15px;
      
      .stat-value {
        font-size: 28px;
        font-weight: bold;
        color: #303133;
        line-height: 1.5;
      }
      
      .stat-label {
        margin-top: 5px;
        font-size: 12px;
        color: #909399;
      }

      .score-info {
        text-align: center;
        
        .score-value {
          font-size: 24px;
          font-weight: bold;
          color: #303133;
          line-height: 1.2;
        }
        
        .score-label {
          font-size: 12px;
          color: #909399;
        }
      }
    }
  }

  .detail-card {
    margin-top: 20px;
    
    .card-title {
      display: flex;
      align-items: center;
      height: 32px;
      line-height: 32px;

      i {
        margin-right: 8px;
        font-size: 16px;
        color: #409EFF;
      }
      
      span {
        font-size: 14px;
        font-weight: 500;
        color: #303133;
      }
    }
  }

  .el-progress {
    margin: 0 auto;
  }

  .el-table {
    margin-top: 10px;
    
    .el-tag {
      margin: 0;
    }
  }

  .el-timeline {
    padding: 20px;
    
    .el-timeline-item {
      .el-card {
        margin-top: 10px;
      }
    }
  }

  .class-card,
  .honor-card {
    margin-bottom: 20px;
    
    .class-header,
    .honor-header {
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #EBEEF5;
      
      .class-name,
      .honor-name {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }

  .empty-block {
    padding: 30px 0;
    text-align: center;
    color: #909399;
    font-size: 14px;
  }
}
</style> 