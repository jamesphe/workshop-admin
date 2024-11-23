<template>
  <div class="app-container">
    <!-- 头部信息 -->
    <teacher-header :teacher-info="teacherInfo" />

    <!-- 操作按钮 -->
    <div class="detail-actions">
      <el-button-group>
        <el-button type="primary" icon="el-icon-edit" @click="handleEdit">编辑信息</el-button>
        <el-button type="success" icon="el-icon-printer" @click="handlePrint">打印信息</el-button>
        <el-button icon="el-icon-back" @click="goBack">返回列表</el-button>
      </el-button-group>
    </div>

    <!-- 详细信息标签页 -->
    <el-card class="detail-tabs">
      <el-tabs type="border-card">
        <!-- 基本信息 -->
        <el-tab-pane>
          <span slot="label"><i class="el-icon-user" /> 基本信息</span>
          <basic-info :teacher-info="teacherInfo" />
        </el-tab-pane>

        <!-- 教职信息 -->
        <el-tab-pane>
          <span slot="label"><i class="el-icon-office-building" /> 教职信息</span>
          <career-info :teacher-info="teacherInfo" />
        </el-tab-pane>

        <!-- 教学信息 -->
        <el-tab-pane>
          <span slot="label"><i class="el-icon-reading" /> 教学信息</span>
          <teaching-info :teacher-info="teacherInfo" />
        </el-tab-pane>

        <!-- 科研信息 -->
        <el-tab-pane>
          <span slot="label"><i class="el-icon-data-analysis" /> 科研信息</span>
          <research-info :teacher-info="teacherInfo" />
        </el-tab-pane>

        <!-- 行政与绩效信息 -->
        <el-tab-pane>
          <span slot="label"><i class="el-icon-s-check" /> 行政与绩效</span>
          <performance-info :teacher-info="teacherInfo" />
        </el-tab-pane>

        <!-- 系统与权限信息 -->
        <el-tab-pane>
          <span slot="label"><i class="el-icon-setting" /> 系统与权限</span>
          <system-info :teacher-info="teacherInfo" />
        </el-tab-pane>

        <!-- 扩展信息 -->
        <el-tab-pane>
          <span slot="label"><i class="el-icon-more" /> 扩展信息</span>
          <extra-info :teacher-info="teacherInfo" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getTeacherDetail } from '@/api/teacher'
import TeacherHeader from './components/TeacherHeader'
import BasicInfo from './components/BasicInfo'
import CareerInfo from './components/CareerInfo'
import TeachingInfo from './components/TeachingInfo'
import ResearchInfo from './components/ResearchInfo'
import PerformanceInfo from './components/PerformanceInfo'
import SystemInfo from './components/SystemInfo'
import ExtraInfo from './components/ExtraInfo'

export default {
  name: 'TeacherDetail',
  components: {
    TeacherHeader,
    BasicInfo,
    CareerInfo,
    TeachingInfo,
    ResearchInfo,
    PerformanceInfo,
    SystemInfo,
    ExtraInfo
  },
  data() {
    return {
      teacherInfo: {}
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
    handlePrint() {
      window.print()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.detail-actions {
  margin: $spacing-large 0;
  text-align: right;
}

.detail-tabs {
  margin-bottom: $spacing-large;
}

@media print {
  .detail-actions {
    display: none;
  }
  
  .el-tabs__header {
    display: none;
  }
}
</style> 