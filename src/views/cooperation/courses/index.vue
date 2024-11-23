<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>合作课程开发</span>
      </div>
      <div class="filter-container">
        <el-select v-model="query.major" placeholder="专业" clearable>
          <el-option label="软件技术" value="software" />
          <el-option label="机械制造" value="mechanical" />
          <el-option label="电子商务" value="ecommerce" />
        </el-select>
        <el-select v-model="query.status" placeholder="开发状态" clearable>
          <el-option label="规划中" value="planning" />
          <el-option label="开发中" value="developing" />
          <el-option label="已完成" value="completed" />
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
        <el-button type="success" icon="el-icon-plus" @click="handleCreate">新建课程</el-button>
      </div>
      <el-table :data="courseList" border style="width: 100%">
        <el-table-column prop="name" label="课程名称" />
        <el-table-column prop="major" label="所属专业" />
        <el-table-column prop="enterprise" label="合作企业" />
        <el-table-column prop="leader" label="负责人" />
        <el-table-column prop="period" label="课时" width="80" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template #default="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" @click="handleView(row)">查看</el-button>
            <el-button type="text" @click="handleResource(row)">课程资源</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CooperationCourses',
  data() {
    return {
      query: {
        major: '',
        status: ''
      },
      courseList: []
    }
  },
  methods: {
    getStatusType(status) {
      const types = {
        planning: 'info',
        developing: 'warning',
        completed: 'success'
      }
      return types[status] || 'info'
    },
    getStatusText(status) {
      const texts = {
        planning: '规划中',
        developing: '开发中',
        completed: '已完成'
      }
      return texts[status] || status
    },
    handleSearch() {
      console.log('搜索课程', this.query)
    },
    handleCreate() {
      console.log('新建课程')
    },
    handleEdit(row) {
      console.log('编辑课程', row)
    },
    handleView(row) {
      console.log('查看课程', row)
    },
    handleResource(row) {
      console.log('管理课程资源', row)
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