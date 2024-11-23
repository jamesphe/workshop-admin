<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>学术活动管理</span>
      </div>
      <div class="filter-container">
        <el-select v-model="query.type" placeholder="活动类型" clearable>
          <el-option label="学术讲座" value="lecture" />
          <el-option label="学术会议" value="conference" />
          <el-option label="学术论坛" value="forum" />
          <el-option label="研讨会" value="seminar" />
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
        <el-button type="success" icon="el-icon-plus" @click="handleCreate">新建活动</el-button>
      </div>
      <el-table :data="activityList" border style="width: 100%">
        <el-table-column prop="name" label="��动名称" />
        <el-table-column prop="type" label="活动类型" />
        <el-table-column prop="speaker" label="主讲人/召集人" />
        <el-table-column prop="date" label="活动日期" />
        <el-table-column prop="location" label="活动地点" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" @click="handleView(row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AcademicActivities',
  data() {
    return {
      query: {
        type: '',
        dateRange: []
      },
      activityList: []
    }
  },
  methods: {
    getStatusType(status) {
      const types = {
        upcoming: 'primary',
        ongoing: 'success',
        completed: 'info',
        cancelled: 'danger'
      }
      return types[status] || 'info'
    },
    getStatusText(status) {
      const texts = {
        upcoming: '即将开始',
        ongoing: '进行中',
        completed: '已结束',
        cancelled: '已取消'
      }
      return texts[status] || status
    },
    handleSearch() {
      console.log('搜索活动', this.query)
    },
    handleCreate() {
      console.log('新建活动')
    },
    handleEdit(row) {
      console.log('编辑活动', row)
    },
    handleView(row) {
      console.log('查看活动', row)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  padding-bottom: 15px;
  .el-select,
  .el-date-picker {
    margin-right: 10px;
  }
}
</style> 