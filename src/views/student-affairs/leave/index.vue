<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>请销假管理</span>
      </div>
      <div class="filter-container">
        <el-input
          v-model="query.keyword"
          placeholder="学生姓名/学号"
          style="width: 200px"
          class="filter-item"
          clearable
        />
        <el-select v-model="query.type" placeholder="请假类型" clearable>
          <el-option label="事假" value="personal" />
          <el-option label="病假" value="sick" />
          <el-option label="实习" value="practice" />
          <el-option label="其他" value="other" />
        </el-select>
        <el-select v-model="query.status" placeholder="审批状态" clearable>
          <el-option label="待审批" value="pending" />
          <el-option label="已批准" value="approved" />
          <el-option label="已驳回" value="rejected" />
          <el-option label="已销假" value="completed" />
        </el-select>
        <el-date-picker
          v-model="query.dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
      </div>
      <el-table :data="leaveList" border style="width: 100%">
        <el-table-column prop="studentName" label="学生姓名" />
        <el-table-column prop="studentId" label="学号" />
        <el-table-column prop="className" label="班级" />
        <el-table-column prop="type" label="请假类型" />
        <el-table-column prop="startDate" label="开始日期" width="100" />
        <el-table-column prop="endDate" label="结束日期" width="100" />
        <el-table-column prop="duration" label="请假时长" width="100" />
        <el-table-column prop="reason" label="请假原因" show-overflow-tooltip />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template #default="{ row }">
            <el-button
              v-if="row.status === 'pending'"
              type="text"
              @click="handleApprove(row)"
            >审批</el-button>
            <el-button
              v-if="row.status === 'approved'"
              type="text"
              @click="handleComplete(row)"
            >销假</el-button>
            <el-button type="text" @click="handleView(row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'StudentLeave',
  data() {
    return {
      query: {
        keyword: '',
        type: '',
        status: '',
        dateRange: []
      },
      leaveList: []
    }
  },
  methods: {
    getStatusType(status) {
      const types = {
        pending: 'warning',
        approved: 'success',
        rejected: 'danger',
        completed: 'info'
      }
      return types[status] || 'info'
    },
    getStatusText(status) {
      const texts = {
        pending: '待审批',
        approved: '已批准',
        rejected: '已驳回',
        completed: '已销假'
      }
      return texts[status] || status
    },
    handleSearch() {
      console.log('搜索请假记录', this.query)
    },
    handleApprove(row) {
      console.log('审批请假', row)
    },
    handleComplete(row) {
      console.log('销假', row)
    },
    handleView(row) {
      console.log('查看请假详情', row)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  padding-bottom: 15px;
  .filter-item,
  .el-select,
  .el-date-picker {
    margin-right: 10px;
  }
}
</style> 