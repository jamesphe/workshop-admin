<template>
  <div class="app-container">
    <!-- 头部信息 -->
    <student-header :student-info="studentInfo" />

    <!-- 操作按钮 -->
    <div class="detail-actions">
      <el-button-group>
        <el-button type="primary" icon="el-icon-edit" size="medium" @click="handleEdit">编辑信息</el-button>
        <el-button type="success" icon="el-icon-printer" size="medium" @click="handlePrint">打印信息</el-button>
        <el-button icon="el-icon-back" size="medium" @click="goBack">返回列表</el-button>
      </el-button-group>
    </div>

    <!-- 详细信息标签页 -->
    <el-card class="detail-tabs" shadow="hover">
      <el-tabs type="border-card">
        <!-- 基本信息 -->
        <el-tab-pane>
          <span slot="label"><i class="el-icon-user" /> 基本信息</span>
          <div class="tab-container">
            <basic-info :student-info="studentInfo" />
          </div>
        </el-tab-pane>

        <!-- 学籍信息 -->
        <el-tab-pane>
          <span slot="label"><i class="el-icon-office-building" /> 学籍信息</span>
          <div class="tab-container">
            <academic-info :student-info="studentInfo" />
          </div>
        </el-tab-pane>

        <!-- 学习信息 -->
        <el-tab-pane>
          <span slot="label"><i class="el-icon-reading" /> 学习信息</span>
          <div class="tab-container">
            <study-info :student-info="studentInfo" />
          </div>
        </el-tab-pane>

        <!-- 奖惩信息 -->
        <el-tab-pane>
          <span slot="label"><i class="el-icon-medal" /> 奖惩信息</span>
          <div class="tab-container">
            <award-info :student-info="studentInfo" />
          </div>
        </el-tab-pane>

        <!-- 证书信息 -->
        <el-tab-pane>
          <span slot="label"><i class="el-icon-document" /> 证书信息</span>
          <div class="tab-container">
            <certificate-info :student-info="studentInfo" />
          </div>
        </el-tab-pane>

        <!-- 联系信息 -->
        <el-tab-pane>
          <span slot="label"><i class="el-icon-phone" /> 联系信息</span>
          <div class="tab-container">
            <contact-info :student-info="studentInfo" />
          </div>
        </el-tab-pane>

        <!-- 系统信息 -->
        <el-tab-pane>
          <span slot="label"><i class="el-icon-setting" /> 系统信息</span>
          <div class="tab-container">
            <system-info :student-info="studentInfo" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getStudent } from '@/api/student'
import StudentHeader from './components/StudentHeader'
import BasicInfo from './components/BasicInfo'
import AcademicInfo from './components/AcademicInfo'
import StudyInfo from './components/StudyInfo'
import AwardInfo from './components/AwardInfo'
import CertificateInfo from './components/CertificateInfo'
import ContactInfo from './components/ContactInfo'
import SystemInfo from './components/SystemInfo'

export default {
  name: 'StudentDetail',
  components: {
    StudentHeader,
    BasicInfo,
    AcademicInfo,
    StudyInfo,
    AwardInfo,
    CertificateInfo,
    ContactInfo,
    SystemInfo
  },
  data() {
    return {
      studentInfo: {}
    }
  },
  created() {
    // 尝试从路由参数获取学生信息
    const studentParam = this.$route.query.student
    if (studentParam) {
      this.studentInfo = JSON.parse(studentParam)
    } else {
      this.getDetail()
    }
  },
  methods: {
    async getDetail() {
      try {
        const { data } = await getStudent(this.$route.params.id)
        this.studentInfo = data
      } catch (error) {
        console.error('获取学生详情失败:', error)
        this.$message.error('获取学生详情失败')
      }
    },
    handleEdit() {
      this.$router.push(`/basic-info/student-info/edit/${this.$route.params.id}`)
    },
    goBack() {
      this.$router.push('/basic-info/student-info')
    },
    handlePrint() {
      window.print()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.app-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 84px);
}

.detail-actions {
  margin: 20px 0;
  text-align: right;
  
  .el-button {
    padding: 10px 20px;
    
    &+.el-button {
      margin-left: 10px;
    }
  }
}

.detail-tabs {
  margin-bottom: 20px;
  border-radius: 4px;
  
  .el-tabs__header {
    margin-bottom: 0;
  }
  
  .el-tabs__nav {
    border-radius: 4px 4px 0 0;
  }
  
  .el-tabs__item {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    
    i {
      margin-right: 5px;
      font-size: 16px;
    }
    
    &.is-active {
      font-weight: bold;
    }
  }
}

.tab-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 0 0 4px 4px;
}

// 打印样式
@media print {
  .app-container {
    padding: 0;
    background-color: #fff;
  }

  .detail-actions {
    display: none;
  }
  
  .el-tabs__header {
    display: none;
  }
  
  .tab-container {
    padding: 0;
    page-break-inside: avoid;
  }
  
  .el-card {
    box-shadow: none !important;
    border: none !important;
  }
}
</style> 