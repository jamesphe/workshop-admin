<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>资产登记</span>
      </div>
      <div class="filter-container">
        <el-select v-model="query.category" placeholder="资产类别" clearable>
          <el-option label="教学设备" value="teaching" />
          <el-option label="办公设备" value="office" />
          <el-option label="实验设备" value="lab" />
          <el-option label="基建设施" value="infrastructure" />
        </el-select>
        <el-select v-model="query.department" placeholder="使用部门" clearable>
          <el-option label="教务处" value="academic" />
          <el-option label="实验室" value="laboratory" />
          <el-option label="行政办公室" value="admin" />
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
        <el-button type="success" icon="el-icon-plus" @click="handleCreate">新增资产</el-button>
        <el-button type="warning" icon="el-icon-upload2" @click="handleImport">批量导入</el-button>
      </div>
      <el-table :data="assetsList" border style="width: 100%">
        <el-table-column prop="code" label="资产编号" width="120" />
        <el-table-column prop="name" label="资产名称" />
        <el-table-column prop="category" label="资产类别" />
        <el-table-column prop="department" label="使用部门" />
        <el-table-column prop="purchaseDate" label="购置日期" width="100" />
        <el-table-column prop="price" label="购置金额" width="100" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" @click="handleView(row)">查看</el-button>
            <el-button type="text" @click="handlePrint(row)">打印标签</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AssetsRegister',
  data() {
    return {
      query: {
        category: '',
        department: ''
      },
      assetsList: []
    }
  },
  methods: {
    getStatusType(status) {
      const types = {
        normal: 'success',
        maintenance: 'warning',
        scrapped: 'info'
      }
      return types[status] || 'info'
    },
    getStatusText(status) {
      const texts = {
        normal: '正常',
        maintenance: '维修中',
        scrapped: '已报废'
      }
      return texts[status] || status
    },
    handleSearch() {
      console.log('搜索资产', this.query)
    },
    handleCreate() {
      console.log('新增资产')
    },
    handleImport() {
      console.log('批量导入')
    },
    handleEdit(row) {
      console.log('编辑资产', row)
    },
    handleView(row) {
      console.log('查看资产', row)
    },
    handlePrint(row) {
      console.log('打印资产标签', row)
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