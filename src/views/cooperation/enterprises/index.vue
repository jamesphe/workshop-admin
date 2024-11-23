<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>企业信息库</span>
      </div>
      <div class="filter-container">
        <el-input
          v-model="query.keyword"
          placeholder="企业名称/联系人"
          style="width: 200px"
          class="filter-item"
          clearable
        />
        <el-select v-model="query.industry" placeholder="所属行业" clearable>
          <el-option label="IT/互联网" value="it" />
          <el-option label="制造业" value="manufacturing" />
          <el-option label="金融" value="finance" />
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
        <el-button type="success" icon="el-icon-plus" @click="handleCreate">新增企业</el-button>
      </div>
      <el-table :data="enterpriseList" border style="width: 100%">
        <el-table-column prop="name" label="企业名称" />
        <el-table-column prop="industry" label="所属行业" />
        <el-table-column prop="contact" label="联系人" />
        <el-table-column prop="phone" label="联系电话" />
        <el-table-column prop="address" label="企业地址" />
        <el-table-column prop="cooperationCount" label="合作项目数" width="100" />
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
  name: 'EnterpriseInfo',
  data() {
    return {
      query: {
        keyword: '',
        industry: ''
      },
      enterpriseList: []
    }
  },
  methods: {
    handleSearch() {
      console.log('搜索企业', this.query)
    },
    handleCreate() {
      console.log('新增企业')
    },
    handleEdit(row) {
      console.log('编辑企业', row)
    },
    handleView(row) {
      console.log('查看企业', row)
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