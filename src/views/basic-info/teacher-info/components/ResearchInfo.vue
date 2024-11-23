<template>
  <div class="research-info">
    <!-- 科研概览 -->
    <el-row :gutter="20" class="research-overview">
      <el-col :span="24">
        <el-card shadow="hover" class="overview-card">
          <div class="overview-stats">
            <div class="stat-item">
              <div class="stat-icon">
                <i class="el-icon-s-cooperation" style="color: #409EFF" />
              </div>
              <div class="stat-info">
                <div class="stat-number">{{ teacherInfo.researchProjectsCount || 0 }}</div>
                <div class="stat-label">在研项目</div>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <i class="el-icon-document" style="color: #67C23A" />
              </div>
              <div class="stat-info">
                <div class="stat-number">{{ teacherInfo.publishedPapers || 0 }}</div>
                <div class="stat-label">发表论文</div>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <i class="el-icon-medal" style="color: #E6A23C" />
              </div>
              <div class="stat-info">
                <div class="stat-number">{{ teacherInfo.patentsCount || 0 }}</div>
                <div class="stat-label">专利数量</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 科研项目 -->
    <el-card class="detail-card">
      <div slot="header">
        <span>科研项目</span>
      </div>
      <el-table :data="teacherInfo.researchProjects" border style="width: 100%">
        <el-table-column prop="name" label="项目名称" min-width="200" show-overflow-tooltip />
        <el-table-column prop="code" label="项目编号" width="120" />
        <el-table-column prop="role" label="担任角色" width="100">
          <template #default="{ row }">
            <el-tag :type="row.role === '主持人' ? 'success' : 'info'">{{ row.role }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="项目类型" width="100">
          <template #default="{ row }">
            <el-tag :type="getProjectTypeTag(row.type)">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="项目状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getProjectStatusTag(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="funding" label="经费(万元)" width="120">
          <template #default="{ row }">
            {{ (row.funding / 10000).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column label="起止时间" width="200">
          <template #default="{ row }">
            {{ row.startDate }} 至 {{ row.endDate }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 论文发表 -->
    <el-card class="detail-card">
      <div slot="header">
        <span>论文发表</span>
      </div>
      <el-table :data="teacherInfo.papers" border style="width: 100%">
        <el-table-column prop="title" label="论文题目" min-width="200" show-overflow-tooltip />
        <el-table-column prop="journal" label="发表期刊" width="150" show-overflow-tooltip />
        <el-table-column prop="type" label="收录类型" width="100">
          <template #default="{ row }">
            <el-tag :type="getPaperTypeTag(row.type)">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="发表日期" width="120" />
        <el-table-column prop="impact" label="影响因子" width="100" />
        <el-table-column prop="authors" label="作者" width="200" show-overflow-tooltip />
      </el-table>
    </el-card>

    <!-- 专利信息 -->
    <el-card class="detail-card">
      <div slot="header">
        <span>专利信息</span>
      </div>
      <el-table :data="teacherInfo.patents" border style="width: 100%">
        <el-table-column prop="name" label="专利名称" min-width="200" show-overflow-tooltip />
        <el-table-column prop="type" label="专利类型" width="120">
          <template #default="{ row }">
            <el-tag :type="getPatentTypeTag(row.type)">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="专利状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getPatentStatusTag(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="专利号" width="150" />
        <el-table-column prop="date" label="申请日期" width="120" />
        <el-table-column prop="inventors" label="发明人" width="200" show-overflow-tooltip />
      </el-table>
    </el-card>

    <!-- 获奖情况 -->
    <el-card class="detail-card">
      <div slot="header">
        <span>获奖情况</span>
      </div>
      <el-table :data="teacherInfo.awards" border style="width: 100%">
        <el-table-column prop="name" label="奖项名称" min-width="200" show-overflow-tooltip />
        <el-table-column prop="level" label="获奖级别" width="100">
          <template #default="{ row }">
            <el-tag :type="getAwardLevelTag(row.level)">{{ row.level }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="grade" label="获奖等级" width="100">
          <template #default="{ row }">
            <el-tag :type="getAwardGradeTag(row.grade)">{{ row.grade }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="获奖日期" width="120" />
        <el-table-column prop="issuer" label="颁奖单位" width="150" show-overflow-tooltip />
        <el-table-column prop="members" label="获奖成员" width="200" show-overflow-tooltip />
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ResearchInfo',
  props: {
    teacherInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    getProjectTypeTag(type) {
      const types = {
        '国家级': 'danger',
        '省部级': 'warning',
        '市厅级': 'success',
        '校级': 'info'
      }
      return types[type] || 'info'
    },
    getProjectStatusTag(status) {
      const types = {
        '在研': 'success',
        '结题': 'info',
        '验收': 'warning'
      }
      return types[status] || 'info'
    },
    getPaperTypeTag(type) {
      const types = {
        'SCI': 'danger',
        'EI': 'warning',
        'CSSCI': 'success',
        '核心期刊': 'info'
      }
      return types[type] || 'info'
    },
    getPatentTypeTag(type) {
      const types = {
        '发明专利': 'danger',
        '实用新型专利': 'warning',
        '外观设计专利': 'info'
      }
      return types[type] || 'info'
    },
    getPatentStatusTag(status) {
      const types = {
        '申请中': 'warning',
        '已授权': 'success',
        '已转让': 'info'
      }
      return types[status] || 'info'
    },
    getAwardLevelTag(level) {
      const types = {
        '国家级': 'danger',
        '省级': 'warning',
        '市级': 'success'
      }
      return types[level] || 'info'
    },
    getAwardGradeTag(grade) {
      const types = {
        '特等奖': 'danger',
        '一等奖': 'warning',
        '二等奖': 'success',
        '三等奖': 'info'
      }
      return types[grade] || 'info'
    }
  }
}
</script>

<style lang="scss" scoped>
.research-info {
  .research-overview {
    margin-bottom: 20px;
  }

  .overview-card {
    .overview-stats {
      display: flex;
      justify-content: space-around;
      padding: 20px 0;

      .stat-item {
        display: flex;
        align-items: center;

        .stat-icon {
          font-size: 48px;
          margin-right: 20px;
        }

        .stat-info {
          .stat-number {
            font-size: 24px;
            font-weight: bold;
            color: #303133;
          }

          .stat-label {
            margin-top: 8px;
            color: #909399;
          }
        }
      }
    }
  }

  .detail-card {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style> 