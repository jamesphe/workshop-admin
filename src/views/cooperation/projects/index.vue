<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>合作项目管理</span>
      </div>
      <div class="filter-container">
        <el-select v-model="query.type" placeholder="项目类型" clearable>
          <el-option label="实习实训" value="training" />
          <el-option label="技术研发" value="research" />
          <el-option label="人才培养" value="education" />
        </el-select>
        <el-select v-model="query.status" placeholder="项目状态" clearable>
          <el-option label="筹备中" value="preparing" />
          <el-option label="进行中" value="ongoing" />
          <el-option label="已结束" value="completed" />
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
        <el-button type="success" icon="el-icon-plus" @click="handleCreate">新建项目</el-button>
      </div>
      <el-table :data="projectList" border style="width: 100%">
        <el-table-column prop="name" label="项目名称" />
        <el-table-column prop="type" label="项目类型" />
        <el-table-column prop="enterprise" label="合作企业" />
        <el-table-column prop="startDate" label="开始日期" width="100" />
        <el-table-column prop="endDate" label="结束日期" width="100" />
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
  name: 'CooperationProjects',
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
        preparing: 'info',
        ongoing: 'primary',
        completed: 'success'
      }
      return types[status] || 'info'
    },
    getStatusText(status) {
      const texts = {
        preparing: '筹备中',
        ongoing: '进行中',
        completed: '已结束'
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