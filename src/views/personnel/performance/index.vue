<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>绩效分析</span>
      </div>
      <div class="filter-container">
        <el-date-picker
          v-model="query.dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
        <el-select v-model="query.department" placeholder="选择部门" clearable>
          <el-option label="教务处" value="academic" />
          <el-option label="学生处" value="student" />
          <el-option label="人事处" value="personnel" />
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
        <el-button type="success" icon="el-icon-download" @click="handleExport">导出报告</el-button>
      </div>
      <div class="chart-container">
        <div class="chart-item">
          <h3>部门绩效得分分布</h3>
          <!-- 这里放置图表组件 -->
        </div>
        <div class="chart-item">
          <h3>绩效趋势分析</h3>
          <!-- 这里放置图表组件 -->
        </div>
      </div>
      <el-table :data="performanceList" border style="width: 100%; margin-top: 20px">
        <el-table-column prop="department" label="部门" />
        <el-table-column prop="avgScore" label="平均得分" />
        <el-table-column prop="maxScore" label="最高得分" />
        <el-table-column prop="minScore" label="最低得分" />
        <el-table-column prop="completionRate" label="任务完成率" />
        <el-table-column label="操作" width="150">
          <template #default="{ row }">
            <el-button type="text" @click="handleDetail(row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PerformanceAnalysis',
  data() {
    return {
      query: {
        dateRange: [],
        department: ''
      },
      performanceList: []
    }
  },
  methods: {
    handleSearch() {
      console.log('搜索绩效', this.query)
    },
    handleExport() {
      console.log('导出绩效报告')
    },
    handleDetail(row) {
      console.log('查看绩效详情', row)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  padding-bottom: 15px;
  .el-date-picker,
  .el-select {
    margin-right: 10px;
  }
}
.chart-container {
  display: flex;
  margin: 20px 0;
  .chart-item {
    flex: 1;
    min-height: 300px;
    margin: 0 10px;
    padding: 15px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    h3 {
      margin: 0 0 15px;
      font-size: 16px;
      color: #303133;
    }
  }
}
</style> 