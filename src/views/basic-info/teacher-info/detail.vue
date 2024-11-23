<template>
  <div class="app-container">
    <!-- 头部信息卡片 -->
    <el-row :gutter="20" class="info-header">
      <el-col :span="6">
        <el-card shadow="hover" class="box-card">
          <div class="user-profile">
            <div class="user-avatar">
              <el-avatar :size="100" :src="teacherInfo.photo || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
            </div>
            <div class="user-info">
              <h2>{{ teacherInfo.name }}</h2>
              <p>{{ teacherInfo.employeeNumber }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="box-card stat-card">
          <div slot="header">
            <span>教学工作量</span>
          </div>
          <div class="stat-value">{{ teacherInfo.workload || 0 }}
            <small>学时/周</small>
          </div>
          <div class="stat-label">当前授课：{{ teacherInfo.courseCount || 0 }}门</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="box-card stat-card">
          <div slot="header">
            <span>科研成果</span>
          </div>
          <div class="stat-value">{{ teacherInfo.publishedPapers || 0 }}
            <small>篇论文</small>
          </div>
          <div class="stat-label">专利：{{ teacherInfo.patents || 0 }}项</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="box-card stat-card">
          <div slot="header">
            <span>教学评分</span>
          </div>
          <div class="stat-value">
            <div class="score-display">
              <span class="score-number">{{ teacherInfo.evaluationScore || 0 }}</span>
              <span class="score-label">分</span>
            </div>
          </div>
          <div class="stat-label">{{ getEvaluationLevel(teacherInfo.evaluationScore) }}</div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 操作按钮 -->
    <div class="detail-actions">
      <el-button type="primary" icon="el-icon-edit" @click="handleEdit">编辑信息</el-button>
      <el-button icon="el-icon-printer" @click="handlePrint">打印信息</el-button>
      <el-button icon="el-icon-back" @click="goBack">返回列表</el-button>
    </div>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-tabs type="border-card">
          <!-- 基本信息 -->
          <el-tab-pane>
            <span slot="label"><i class="el-icon-user" /> 基本信息</span>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-card shadow="hover" class="info-card">
                  <div slot="header">
                    <span>个人信息</span>
                  </div>
                  <div class="info-list">
                    <div class="info-item">
                      <span class="label">姓名：</span>
                      <span class="value">{{ teacherInfo.name }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">性别：</span>
                      <span class="value">{{ teacherInfo.gender === 'male' ? '男' : teacherInfo.gender === 'female' ? '女' : '其他' }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">出生日期：</span>
                      <span class="value">{{ teacherInfo.dateOfBirth }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">身份证号：</span>
                      <span class="value">{{ teacherInfo.idCard }}</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover" class="info-card">
                  <div slot="header">
                    <span>政治信息</span>
                  </div>
                  <div class="info-list">
                    <div class="info-item">
                      <span class="label">民族：</span>
                      <span class="value">{{ teacherInfo.ethnicity }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">国籍：</span>
                      <span class="value">{{ teacherInfo.nationality }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">政治面貌：</span>
                      <el-tag size="small">{{ teacherInfo.politicalStatus }}</el-tag>
                    </div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover" class="info-card">
                  <div slot="header">
                    <span>联系方式</span>
                  </div>
                  <div class="info-list">
                    <div class="info-item">
                      <span class="label">手机号码：</span>
                      <span class="value">{{ teacherInfo.phoneNumber }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">电子邮箱：</span>
                      <span class="value">{{ teacherInfo.email }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">家庭住址：</span>
                      <span class="value">{{ teacherInfo.address }}</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>

          <!-- 教职信息 -->
          <el-tab-pane>
            <span slot="label"><i class="el-icon-office-building" /> 教职信息</span>
            <el-row :gutter="20">
              <el-col :span="16">
                <el-card shadow="hover" class="career-card">
                  <div slot="header">
                    <span>职业发展时间线</span>
                  </div>
                  <el-timeline>
                    <el-timeline-item
                      v-for="(activity, index) in careerTimeline"
                      :key="index"
                      :type="activity.type"
                      :color="activity.color"
                      :timestamp="activity.timestamp"
                    >
                      {{ activity.content }}
                    </el-timeline-item>
                  </el-timeline>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover" class="status-card">
                  <div slot="header">
                    <span>当前状态</span>
                  </div>
                  <div class="status-list">
                    <div class="status-item">
                      <span class="label">所属部门：</span>
                      <span class="value">{{ getDepartmentLabel(teacherInfo.department) }}</span>
                    </div>
                    <div class="status-item">
                      <span class="label">职称：</span>
                      <el-tag :type="getPositionType(teacherInfo.position)">
                        {{ getPositionLabel(teacherInfo.position) }}
                      </el-tag>
                    </div>
                    <div class="status-item">
                      <span class="label">工作状态：</span>
                      <el-tag :type="getStatusType(teacherInfo.employmentStatus)">
                        {{ teacherInfo.employmentStatus }}
                      </el-tag>
                    </div>
                    <div class="status-item">
                      <span class="label">工资等级：</span>
                      <el-tag type="info">{{ teacherInfo.salaryGrade }}</el-tag>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>

          <!-- 教学信息 -->
          <el-tab-pane>
            <span slot="label"><i class="el-icon-reading" /> 教学信息</span>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-card shadow="hover" class="course-card">
                  <div slot="header">
                    <span>当前授课</span>
                    <el-tag style="float: right" type="success">
                      {{ teacherInfo.courseCount }}门课程
                    </el-tag>
                  </div>
                  <el-table
                    :data="teacherInfo.teachingCourses"
                    border
                    style="width: 100%"
                  >
                    <el-table-column prop="name" label="课程名称" />
                    <el-table-column prop="credit" label="学分" width="80" align="center" />
                    <el-table-column prop="hours" label="课时" width="80" align="center">
                      <template #default="{ row }">
                        <el-tag size="small">{{ row.hours }}学时</el-tag>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card shadow="hover" class="class-card">
                  <div slot="header">
                    <span>负责班级</span>
                  </div>
                  <div class="class-list">
                    <el-card
                      v-for="classInfo in teacherInfo.classInfo"
                      :key="classInfo.name"
                      shadow="hover"
                      class="class-item"
                    >
                      <div class="class-name">{{ classInfo.name }}</div>
                      <div class="student-count">
                        <i class="el-icon-user" />
                        {{ classInfo.studentCount }}名学生
                      </div>
                    </el-card>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>

          <!-- 科研信息 -->
          <el-tab-pane>
            <span slot="label"><i class="el-icon-data-analysis" /> 科研信息</span>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-card shadow="hover" class="research-overview">
                  <div class="research-stats">
                    <div class="stat-item">
                      <div class="stat-number">{{ teacherInfo.researchProjectsCount }}</div>
                      <div class="stat-label">在研项目</div>
                    </div>
                    <div class="stat-item">
                      <div class="stat-number">{{ teacherInfo.publishedPapers }}</div>
                      <div class="stat-label">发表论文</div>
                    </div>
                    <div class="stat-item">
                      <div class="stat-number">{{ teacherInfo.patents }}</div>
                      <div class="stat-label">专利数量</div>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 20px">
              <el-col :span="24">
                <el-card shadow="hover" class="awards-card">
                  <div slot="header">
                    <span>获奖情况</span>
                  </div>
                  <el-table
                    :data="teacherInfo.awards"
                    border
                    style="width: 100%"
                  >
                    <el-table-column prop="name" label="奖项名称" show-overflow-tooltip />
                    <el-table-column prop="level" label="获奖级别" width="120" align="center">
                      <template #default="{ row }">
                        <el-tag :type="getAwardLevelType(row.level)">{{ row.level }}</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column prop="date" label="获奖日期" width="120" align="center" />
                  </el-table>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>

          <!-- 其他信息 -->
          <el-tab-pane>
            <span slot="label"><i class="el-icon-more" /> 其他信息</span>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-card shadow="hover" class="emergency-card">
                  <div slot="header">
                    <span>紧急联系信息</span>
                  </div>
                  <div class="emergency-info">
                    <div class="info-item">
                      <i class="el-icon-user" />
                      <span class="label">紧急联系人：</span>
                      <span class="value">{{ teacherInfo.emergencyContact }}</span>
                    </div>
                    <div class="info-item">
                      <i class="el-icon-phone" />
                      <span class="label">紧急电话：</span>
                      <span class="value">{{ teacherInfo.emergencyPhone }}</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card shadow="hover" class="health-card">
                  <div slot="header">
                    <span>健康状况</span>
                  </div>
                  <div class="health-info">
                    <el-tag :type="getHealthStatusType(teacherInfo.healthStatus)">
                      {{ teacherInfo.healthStatus }}
                    </el-tag>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 20px">
              <el-col :span="24">
                <el-card shadow="hover" class="remarks-card">
                  <div slot="header">
                    <span>备注信息</span>
                  </div>
                  <div class="remarks-content">
                    {{ teacherInfo.remarks || '暂无备注信息' }}
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getTeacherDetail } from '@/api/teacher'

export default {
  name: 'TeacherDetail',
  data() {
    return {
      teacherInfo: {}
    }
  },
  computed: {
    careerTimeline() {
      return [
        {
          timestamp: this.teacherInfo.hireDate,
          content: '入职',
          type: 'success',
          color: '#0bbd87'
        },
        {
          timestamp: this.teacherInfo.titleDate,
          content: `获得${this.getPositionLabel(this.teacherInfo.position)}职称`,
          type: 'warning',
          color: '#e6a23c'
        }
        // 可以根据需要添加更多时间线项目
      ]
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      try {
        const { data } = await getTeacherDetail(this.$route.params.id)
        this.teacherInfo = data
      } catch (error) {
        console.error('获取教师详情失败:', error)
      }
    },
    handleEdit() {
      this.$router.push(`/basic-info/teacher-info/edit/${this.$route.params.id}`)
    },
    goBack() {
      this.$router.push('/basic-info/teacher-info')
    },
    getPoliticalStatusLabel(status) {
      const labels = {
        party_member: '中共党员',
        probationary_member: '预备党员',
        league_member: '共青团员',
        masses: '群众'
      }
      return labels[status] || status
    },
    getTitleType(title) {
      const types = {
        professor: 'success',
        associate_professor: 'primary',
        lecturer: 'warning',
        assistant: 'info'
      }
      return types[title] || ''
    },
    getTitleLabel(title) {
      const labels = {
        professor: '教授',
        associate_professor: '副教授',
        lecturer: '讲师',
        assistant: '助教'
      }
      return labels[title] || title
    },
    getTitleStatusType(status) {
      const types = {
        active: 'success',
        pending: 'warning',
        terminated: 'danger'
      }
      return types[status] || ''
    },
    getTitleStatusLabel(status) {
      const labels = {
        active: '在聘',
        pending: '待聘',
        terminated: '解聘'
      }
      return labels[status] || status
    },
    getPositionType(position) {
      const types = {
        full_time: 'success',
        admin: 'primary',
        support: 'info'
      }
      return types[position] || ''
    },
    getPositionLabel(position) {
      const labels = {
        full_time: '专任教师',
        admin: '行政人员',
        support: '教辅人员'
      }
      return labels[position] || position
    },
    getDepartmentLabel(department) {
      if (!department || !Array.isArray(department)) return ''
      const [type, dept] = department
      const typeLabels = {
        teaching: '教学部门',
        admin: '行政部门'
      }
      const deptLabels = {
        computer: '计算机系',
        mechanical: '机械系',
        academic: '教务处',
        student: '学生处'
      }
      return `${typeLabels[type] || type} - ${deptLabels[dept] || dept}`
    },
    getAccountStatusType(status) {
      const types = {
        active: 'success',
        frozen: 'warning',
        disabled: 'danger'
      }
      return types[status] || ''
    },
    getAccountStatusLabel(status) {
      const labels = {
        active: '正常',
        frozen: '冻结',
        disabled: '禁用'
      }
      return labels[status] || status
    },
    getRoleType(role) {
      const types = {
        admin: 'danger',
        department_head: 'warning',
        teacher: 'primary'
      }
      return types[role] || ''
    },
    getRoleLabel(role) {
      const labels = {
        admin: '管理员',
        department_head: '部门负责人',
        teacher: '普通教师'
      }
      return labels[role] || role
    },
    getStatusType(status) {
      const types = {
        '在职': 'success',
        '离职': 'danger',
        '退休': 'info'
      }
      return types[status] || ''
    },
    getScoreType(score) {
      if (score >= 90) return 'success'
      if (score >= 80) return 'primary'
      if (score >= 60) return 'warning'
      return 'danger'
    },
    getEvaluationLevel(score) {
      if (!score) return '暂无评分'
      if (score >= 90) return '优秀'
      if (score >= 80) return '良好'
      if (score >= 70) return '中等'
      if (score >= 60) return '及格'
      return '不及格'
    },
    getAwardLevelType(level) {
      const types = {
        '国家级': 'danger',
        '省级': 'warning',
        '市级': 'success'
      }
      return types[level] || 'info'
    },
    handlePrint() {
      window.print()
    },
    getHealthStatusType(status) {
      const types = {
        '健康': 'success',
        '良好': 'primary',
        '一般': 'warning'
      }
      return types[status] || 'info'
    }
  }
}
</script>

<style lang="scss" scoped>
.info-header {
  margin-bottom: 20px;
}

.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .user-avatar {
    margin-bottom: 15px;
  }

  .user-info {
    h2 {
      margin: 0;
      font-size: 20px;
      color: #303133;
    }
    p {
      margin: 5px 0 0;
      color: #909399;
    }
  }
}

.stat-card {
  .stat-value {
    font-size: 24px;
    font-weight: bold;
    color: #303133;
    margin: 10px 0;

    small {
      font-size: 14px;
      color: #909399;
      margin-left: 5px;
    }
  }

  .stat-label {
    color: #606266;
    font-size: 14px;
  }
}

.detail-actions {
  margin-bottom: 20px;
  text-align: right;
}

.detail-card {
  margin-bottom: 20px;
}

.sub-title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
  margin: 20px 0 15px;
  padding-left: 10px;
  border-left: 3px solid #409EFF;
}

.stat-row {
  margin: 20px 0;
  text-align: center;

  .stat-item {
    padding: 20px;
    background-color: #f5f7fa;
    border-radius: 4px;

    .stat-num {
      font-size: 24px;
      font-weight: bold;
      color: #409EFF;
    }

    .stat-text {
      margin-top: 10px;
      color: #606266;
    }
  }
}

@media print {
  .detail-actions {
    display: none;
  }
}

.info-item {
  margin-bottom: 16px;
  .label {
    display: inline-block;
    width: 100px;
    color: #606266;
  }
  .value {
    color: #303133;
  }
}

.info-card {
  height: 100%;
  .info-list {
    .info-item {
      margin-bottom: 15px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.career-card {
  .el-timeline {
    padding: 20px;
  }
}

.status-card {
  .status-list {
    .status-item {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.class-card {
  .class-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    .class-item {
      text-align: center;
      .class-name {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .student-count {
        color: #909399;
        i {
          margin-right: 5px;
        }
      }
    }
  }
}

.research-overview {
  .research-stats {
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
    .stat-item {
      text-align: center;
      .stat-number {
        font-size: 36px;
        font-weight: bold;
        color: #409EFF;
        margin-bottom: 10px;
      }
      .stat-label {
        color: #606266;
      }
    }
  }
}

.emergency-card, .health-card {
  height: 100%;
  .info-item {
    margin-bottom: 15px;
    i {
      margin-right: 5px;
      color: #409EFF;
    }
  }
}

.remarks-card {
  .remarks-content {
    padding: 20px;
    background-color: #f5f7fa;
    border-radius: 4px;
    min-height: 100px;
  }
}

@media print {
  .el-tabs__header {
    display: none;
  }
}

.score-display {
  text-align: center;
  .score-number {
    font-size: 36px;
    font-weight: bold;
    color: #f56c6c;
  }
  .score-label {
    font-size: 16px;
    color: #909399;
    margin-left: 4px;
  }
}
</style> 