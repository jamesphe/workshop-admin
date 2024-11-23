<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>科研项目管理</span>
      </div>
      <div class="filter-container">
        <el-select v-model="query.type" placeholder="项目类型" clearable>
          <el-option label="国家级项目" value="national" />
          <el-option label="省部级项目" value="provincial" />
          <el-option label="市厅级项目" value="municipal" />
          <el-option label="校级项目" value="school" />
        </el-select>
        <el-select v-model="query.status" placeholder="项目状态" clearable>
          <el-option label="申报中" value="applying" />
          <el-option label="进行中" value="ongoing" />
          <el-option label="已结题" value="completed" />
          <el-option label="已终止" value="terminated" />
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
        <el-button type="success" icon="el-icon-plus" @click="handleCreate">新建项目</el-button>
      </div>
      <el-table :data="projectList" border style="width: 100%">
        <el-table-column prop="name" label="项目名称" />
        <el-table-column prop="type" label="项目类型" />
        <el-table-column prop="leader" label="负责人" />
        <el-table-column prop="startDate" label="开始日期" />
        <el-table-column prop="endDate" label="结束日期" />
        <el-table-column prop="budget" label="经费预算" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template #default="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" @click="handleView(row)">查看</el-button>
            <el-button type="text" @click="handleReport(row)">进度报告</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ResearchProjects',
  data() {
    return {
      query: {
        type: '',
        status: ''
      },
      projectList: []
    }
  },
  methods: {
    getStatusType(status) {
      const types = {
        applying: 'info',
        ongoing: 'primary',
        completed: 'success',
        terminated: 'danger'
      }
      return types[status] || 'info'
    },
    getStatusText(status) {
      const texts = {
        applying: '申报中',
        ongoing: '进行中',
        completed: '已结题',
        terminated: '已终止'
      }
      return texts[status] || status
    },
    handleSearch() {
      console.log('搜索项目', this.query)
    },
    handleCreate() {
      console.log('新建项目')
    },
    handleEdit(row) {
      console.log('编辑项目', row)
    },
    handleView(row) {
      console.log('查看项目', row)
    },
    handleReport(row) {
      console.log('项目进度报告', row)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  padding-bottom: 15px;
  .el-select {
    margin-right: 10px;
  }
}
</style> 