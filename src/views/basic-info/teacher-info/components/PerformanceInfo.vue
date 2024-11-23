<template>
  <div class="performance-info">
    <!-- 行政职务信息 -->
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover" class="duty-card">
          <div slot="header">
            <span>行政职务</span>
          </div>
          <el-descriptions :column="3" border>
            <el-descriptions-item label="当前职务">
              <el-tag type="primary">{{ teacherInfo.administrativeDuties || '无' }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="年度任务">
              {{ teacherInfo.taskCount || 0 }}项
            </el-descriptions-item>
            <el-descriptions-item label="工作状态">
              <el-tag :type="getStatusType(teacherInfo.employmentStatus)">
                {{ teacherInfo.employmentStatus }}
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>

    <!-- 绩效评分 -->
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <el-card shadow="hover" class="score-card">
          <div slot="header">
            <span>绩效评分</span>
          </div>
          <div class="score-content">
            <el-progress
              type="dashboard"
              :percentage="teacherInfo.performanceScore || 0"
              :color="getScoreColor"
            >
              <template #default="{ percentage }">
                <div class="score-info">
                  <div class="score-value">{{ percentage }}</div>
                  <div class="score-label">分</div>
                </div>
              </template>
            </el-progress>
            <div class="score-level">
              {{ getPerformanceLevel(teacherInfo.performanceScore) }}
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" class="chart-card">
          <div slot="header">
            <span>绩效趋势</span>
          </div>
          <div class="chart-content">
            <!-- TODO: 添加绩效趋势图表 -->
            <div class="chart-placeholder">
              <i class="el-icon-data-line" />
              <span>绩效趋势图表</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 考核记录 -->
    <el-card class="detail-card" style="margin-top: 20px">
      <div slot="header">
        <span>考核记录</span>
      </div>
      <el-table :data="assessmentRecords" border style="width: 100%">
        <el-table-column prop="period" label="考核周期" width="120" />
        <el-table-column prop="type" label="考核类型" width="120">
          <template #default="{ row }">
            <el-tag :type="getAssessmentTypeTag(row.type)">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="考核得分" width="100">
          <template #default="{ row }">
            <span :style="{ color: getScoreTextColor(row.score) }">{{ row.score }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="level" label="考核等级" width="100">
          <template #default="{ row }">
            <el-tag :type="getAssessmentLevelTag(row.level)">{{ row.level }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="evaluator" label="考核人" width="120" />
        <el-table-column prop="date" label="考核日期" width="120" />
        <el-table-column prop="comments" label="考核意见" show-overflow-tooltip />
      </el-table>
    </el-card>

    <!-- 考核备注 -->
    <el-card class="detail-card" style="margin-top: 20px">
      <div slot="header">
        <span>考核备注</span>
      </div>
      <div class="notes-content">
        {{ teacherInfo.performanceNotes || '暂无备注' }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PerformanceInfo',
  props: {
    teacherInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      assessmentRecords: [
        {
          period: '2023年度',
          type: '年度考核',
          score: 95,
          level: '优秀',
          evaluator: '张主任',
          date: '2023-12-31',
          comments: '工作认真负责，表现优异'
        },
        {
          period: '2023上半年',
          type: '季度考核',
          score: 88,
          level: '良好',
          evaluator: '李主任',
          date: '2023-06-30',
          comments: '工作完成情况良好'
        }
      ]
    }
  },
  computed: {
    getScoreColor() {
      const score = this.teacherInfo.performanceScore || 0
      if (score >= 90) return '#67C23A'
      if (score >= 80) return '#409EFF'
      if (score >= 70) return '#E6A23C'
      return '#F56C6C'
    }
  },
  methods: {
    getStatusType(status) {
      const types = {
        '在职': 'success',
        '离职': 'danger',
        '退休': 'info'
      }
      return types[status] || ''
    },
    getPerformanceLevel(score) {
      if (!score) return '暂无评分'
      if (score >= 90) return '优秀'
      if (score >= 80) return '良好'
      if (score >= 70) return '合格'
      return '不合格'
    },
    getAssessmentTypeTag(type) {
      const types = {
        '年度考核': 'danger',
        '季度考核': 'warning',
        '月度考核': 'info'
      }
      return types[type] || 'info'
    },
    getAssessmentLevelTag(level) {
      const types = {
        '优秀': 'success',
        '良好': 'primary',
        '合格': 'warning',
        '不合格': 'danger'
      }
      return types[level] || 'info'
    },
    getScoreTextColor(score) {
      if (score >= 90) return '#67C23A'
      if (score >= 80) return '#409EFF'
      if (score >= 70) return '#E6A23C'
      return '#F56C6C'
    }
  }
}
</script>

<style lang="scss" scoped>
.performance-info {
  .score-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    .score-info {
      text-align: center;
      .score-value {
        font-size: 36px;
        font-weight: bold;
        line-height: 1;
      }
      .score-label {
        font-size: 14px;
        color: #909399;
      }
    }

    .score-level {
      margin-top: 16px;
      font-size: 16px;
      color: #606266;
    }
  }

  .chart-content {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;

    .chart-placeholder {
      text-align: center;
      color: #909399;

      i {
        font-size: 48px;
        margin-bottom: 8px;
      }

      span {
        display: block;
      }
    }
  }

  .notes-content {
    padding: 20px;
    background-color: #f5f7fa;
    border-radius: 4px;
    min-height: 100px;
    color: #606266;
    line-height: 1.6;
  }
}
</style> 