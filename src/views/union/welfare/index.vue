<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>福利管理</span>
      </div>
      <div class="filter-container">
        <el-select v-model="query.type" placeholder="福利类型" clearable>
          <el-option label="节日福利" value="festival" />
          <el-option label="生日福利" value="birthday" />
          <el-option label="慰问金" value="condolence" />
          <el-option label="其他福利" value="other" />
        </el-select>
        <el-select v-model="query.status" placeholder="发放状态" clearable>
          <el-option label="待发放" value="pending" />
          <el-option label="已发放" value="distributed" />
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
        <el-button type="success" icon="el-icon-plus" @click="handleCreate">新增福利</el-button>
      </div>
      <el-table :data="welfareList" border style="width: 100%">
        <el-table-column prop="name" label="福利名称" />
        <el-table-column prop="type" label="福利类型" />
        <el-table-column prop="amount" label="福利金额" width="100" />
        <el-table-column prop="recipients" label="发放对象" />
        <el-table-column prop="planDate" label="计划发放日期" width="100" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === 'distributed' ? 'success' : 'warning'">
              {{ row.status === 'distributed' ? '已发放' : '待发放' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template #default="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" @click="handleView(row)">查看</el-button>
            <el-button type="text" @click="handleDistribute(row)">发放</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'UnionWelfare',
  data() {
    return {
      query: {
        type: '',
        status: ''
      },
      welfareList: []
    }
  },
  methods: {
    handleSearch() {
      console.log('搜索福利', this.query)
    },
    handleCreate() {
      console.log('新增福利')
    },
    handleEdit(row) {
      console.log('编辑福利', row)
    },
    handleView(row) {
      console.log('查看福利', row)
    },
    handleDistribute(row) {
      console.log('发放福利', row)
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