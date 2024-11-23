<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>资产报废</span>
      </div>
      <div class="filter-container">
        <el-input
          v-model="query.keyword"
          placeholder="资产编号/名称"
          style="width: 200px"
          class="filter-item"
          clearable
        />
        <el-select v-model="query.status" placeholder="审批状态" clearable>
          <el-option label="待审批" value="pending" />
          <el-option label="已通过" value="approved" />
          <el-option label="已驳回" value="rejected" />
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
        <el-button type="success" icon="el-icon-plus" @click="handleCreate">申请报废</el-button>
      </div>
      <el-table :data="scrapList" border style="width: 100%">
        <el-table-column prop="assetCode" label="资产编号" width="120" />
        <el-table-column prop="assetName" label="资产名称" />
        <el-table-column prop="department" label="使用部门" />
        <el-table-column prop="scrapReason" label="报废原因" />
        <el-table-column prop="applyDate" label="申请日期" width="100" />
        <el-table-column prop="approver" label="审批人" width="100" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" @click="handleApprove(row)">审批</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AssetsScrap',
  data() {
    return {
      query: {
        keyword: '',
        status: ''
      },
      scrapList: []
    }
  },
  methods: {
    getStatusType(status) {
      const types = {
        pending: 'warning',
        approved: 'success',
        rejected: 'danger'
      }
      return types[status] || 'info'
    },
    getStatusText(status) {
      const texts = {
        pending: '待审批',
        approved: '已通过',
        rejected: '已驳回'
      }
      return texts[status] || status
    },
    handleSearch() {
      console.log('搜索报废记录', this.query)
    },
    handleCreate() {
      console.log('申请报废')
    },
    handleEdit(row) {
      console.log('编辑报废申请', row)
    },
    handleApprove(row) {
      console.log('审批报废申请', row)
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