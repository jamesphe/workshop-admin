<template>
  <div class="teacher-header">
    <!-- 基本信息卡片 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover" class="profile-card">
          <div class="user-profile">
            <div class="user-avatar">
              <el-avatar 
                :size="120" 
                :src="teacherInfo.photo || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
                fit="cover"
              />
              <div class="status-badge" :class="getStatusClass(teacherInfo.employmentStatus)">
                {{ teacherInfo.employmentStatus }}
              </div>
            </div>
            <div class="user-info">
              <h2>{{ teacherInfo.name }}</h2>
              <p class="employee-id">{{ teacherInfo.employeeNumber }}</p>
              <el-tag 
                :type="getPositionType(teacherInfo.position)"
                effect="dark"
                class="position-tag"
              >
                {{ getPositionLabel(teacherInfo.position) }}
              </el-tag>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 教学工作量 -->
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-header">
            <i class="el-icon-reading stat-icon teaching" />
            <span class="stat-title">教学工作量</span>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ teacherInfo.workload || 0 }}</div>
            <div class="stat-label">学时/周</div>
          </div>
          <div class="stat-footer">
            <span>当前授课：</span>
            <el-tag size="small" type="success">{{ teacherInfo.courseCount || 0 }}门课程</el-tag>
          </div>
        </el-card>
      </el-col>

      <!-- 科研成果 -->
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-header">
            <i class="el-icon-data-analysis stat-icon research" />
            <span class="stat-title">科研成果</span>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ teacherInfo.publishedPapers || 0 }}</div>
            <div class="stat-label">发表论文</div>
          </div>
          <div class="stat-footer">
            <span>专利：</span>
            <el-tag size="small" type="warning">{{ teacherInfo.patentsCount || 0 }}项</el-tag>
          </div>
        </el-card>
      </el-col>

      <!-- 教学评分 -->
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-header">
            <i class="el-icon-medal-1 stat-icon evaluation" />
            <span class="stat-title">教学评分</span>
          </div>
          <div class="stat-content">
            <el-progress 
              type="circle" 
              :percentage="teacherInfo.evaluationScore || 0"
              :color="getScoreColor"
              :stroke-width="10"
            >
              <template #default="{ percentage }">
                <div class="score-info">
                  <div class="score-value">{{ percentage }}</div>
                  <div class="score-label">分</div>
                </div>
              </template>
            </el-progress>
            <div class="score-level">
              {{ getEvaluationLevel(teacherInfo.evaluationScore) }}
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 快捷信息栏 -->
    <el-card class="quick-info" shadow="hover">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="info-item">
            <i class="el-icon-office-building" />
            <div class="info-content">
              <div class="info-label">所属部门</div>
              <div class="info-value">{{ getDepartmentLabel(teacherInfo.department) }}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="info-item">
            <i class="el-icon-phone" />
            <div class="info-content">
              <div class="info-label">联系电话</div>
              <div class="info-value">{{ teacherInfo.phoneNumber }}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="info-item">
            <i class="el-icon-message" />
            <div class="info-content">
              <div class="info-label">电子邮箱</div>
              <div class="info-value">{{ teacherInfo.email }}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="info-item">
            <i class="el-icon-date" />
            <div class="info-content">
              <div class="info-label">入职日期</div>
              <div class="info-value">{{ teacherInfo.hireDate }}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'TeacherHeader',
  props: {
    teacherInfo: {
      type: Object,
      required: true
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
    getStatusClass(status) {
      const classes = {
        '在职': 'status-active',
        '离职': 'status-inactive',
        '退休': 'status-retired'
      }
      return classes[status] || 'status-inactive'
    },
    getPositionType(position) {
      const types = {
        '教授': 'success',
        '副教授': 'primary',
        '讲师': 'warning',
        '助教': 'info'
      }
      return types[position] || ''
    },
    getPositionLabel(position) {
      return position || '未设置'
    },
    getDepartmentLabel(department) {
      if (!department || !Array.isArray(department)) return '未设置'
      const [type, dept] = department
      return `${type} - ${dept}`
    },
    getEvaluationLevel(score) {
      if (!score) return '暂无评分'
      if (score >= 90) return '优秀'
      if (score >= 80) return '良好'
      if (score >= 70) return '中等'
      if (score >= 60) return '及格'
      return '不及格'
    }
  }
}
</script>

<style lang="scss" scoped>
.teacher-header {
  .profile-card {
    .user-profile {
      text-align: center;
      
      .user-avatar {
        position: relative;
        margin-bottom: 20px;
        
        .status-badge {
          position: absolute;
          bottom: 0;
          right: 50%;
          transform: translateX(50%);
          padding: 2px 12px;
          border-radius: 12px;
          font-size: 12px;
          color: #fff;
          
          &.status-active {
            background-color: #67C23A;
          }
          
          &.status-inactive {
            background-color: #909399;
          }
          
          &.status-retired {
            background-color: #E6A23C;
          }
        }
      }

      .user-info {
        h2 {
          margin: 0;
          font-size: 24px;
          color: #303133;
          font-weight: 500;
        }

        .employee-id {
          margin: 8px 0;
          color: #909399;
          font-size: 14px;
        }

        .position-tag {
          margin-top: 8px;
        }
      }
    }
  }

  .stat-card {
    height: 100%;
    
    .stat-header {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      
      .stat-icon {
        font-size: 24px;
        margin-right: 8px;
        
        &.teaching {
          color: #409EFF;
        }
        
        &.research {
          color: #67C23A;
        }
        
        &.evaluation {
          color: #E6A23C;
        }
      }
      
      .stat-title {
        font-size: 16px;
        font-weight: 500;
      }
    }

    .stat-content {
      text-align: center;
      padding: 16px 0;
      
      .stat-value {
        font-size: 36px;
        font-weight: bold;
        color: #303133;
      }
      
      .stat-label {
        margin-top: 8px;
        color: #909399;
      }

      .score-info {
        .score-value {
          font-size: 24px;
          font-weight: bold;
        }
        
        .score-label {
          font-size: 12px;
          margin-left: 2px;
        }
      }

      .score-level {
        margin-top: 8px;
        color: #606266;
      }
    }

    .stat-footer {
      text-align: center;
      color: #909399;
      font-size: 14px;
    }
  }

  .quick-info {
    margin-top: 20px;
    
    .info-item {
      display: flex;
      align-items: center;
      
      i {
        font-size: 24px;
        color: #409EFF;
        margin-right: 12px;
      }
      
      .info-content {
        .info-label {
          font-size: 12px;
          color: #909399;
          margin-bottom: 4px;
        }
        
        .info-value {
          font-size: 14px;
          color: #303133;
        }
      }
    }
  }
}
</style> 