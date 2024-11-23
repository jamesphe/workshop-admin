<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>资产维护</span>
      </div>
      <div class="filter-container">
        <el-input
          v-model="query.keyword"
          placeholder="资产编号/名称"
          style="width: 200px"
          class="filter-item"
          clearable
        />
        <el-select v-model="query.status" placeholder="维护状态" clearable>
          <el-option label="待维修" value="pending" />
          <el-option label="维修中" value="processing" />
          <el-option label="已完成" value="completed" />
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
        <el-button type="success" icon="el-icon-plus" @click="handleCreate">登记维护</el-button>
      </div>
      <el-table :data="maintenanceList" border style="width: 100%">
        <el-table-column prop="assetCode" label="资产编号" width="120" />
        <el-table-column prop="assetName" label="资产名称" />
        <el-table-column prop="faultDesc" label="故障描述" />
        <el-table-column prop="maintainer" label="维护人" width="100" />
        <el-table-column prop="startDate" label="开始日期" width="100" />
        <el-table-column prop="endDate" label="完成日期" width="100" />
        <el-table-column prop="cost" label="维护费用" width="100" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" @click="handleComplete(row)">完成维护</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AssetsMaintenance',
  data() {
    return {
      query: {
        keyword: '',
        status: ''
      },
      maintenanceList: []
    }
  },
  methods: {
    getStatusType(status) {
      const types = {
        pending: 'warning',
        processing: 'primary',
        completed: 'success'
      }
      return types[status] || 'info'
    },
    getStatusText(status) {
      const texts = {
        pending: '待维修',
        processing: '维修中',
        completed: '已完成'
      }
      return texts[status] || status
    },
    handleSearch() {
      console.log('搜索维护记录', this.query)
    },
    handleCreate() {
      console.log('登记维护')
    },
    handleEdit(row) {
      console.log('编辑维护记录', row)
    },
    handleComplete(row) {
      console.log('完成维护', row)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  padding-bottom: 15px;
  .filter-item {
    margin-right: 10px;
  }
}
</style> 