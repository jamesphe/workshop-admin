<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>会员管理</span>
      </div>
      <div class="filter-container">
        <el-input
          v-model="query.keyword"
          placeholder="姓名/工号"
          style="width: 200px"
          class="filter-item"
          clearable
        />
        <el-select v-model="query.department" placeholder="所属部门" clearable>
          <el-option label="教务处" value="academic" />
          <el-option label="学生处" value="student" />
          <el-option label="后勤处" value="logistics" />
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
        <el-button type="success" icon="el-icon-plus" @click="handleCreate">新增会员</el-button>
      </div>
      <el-table :data="memberList" border style="width: 100%">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="employeeId" label="工号" width="100" />
        <el-table-column prop="department" label="所属部门" />
        <el-table-column prop="joinDate" label="入会日期" width="100" />
        <el-table-column prop="phone" label="联系电话" width="120" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">
              {{ row.status === 'active' ? '在会' : '退会' }}
            </el-tag>
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
  name: 'UnionMembers',
  data() {
    return {
      query: {
        keyword: '',
        department: ''
      },
      memberList: []
    }
  },
  methods: {
    handleSearch() {
      console.log('搜索会员', this.query)
    },
    handleCreate() {
      console.log('新增会员')
    },
    handleEdit(row) {
      console.log('编辑会员', row)
    },
    handleView(row) {
      console.log('查看会员', row)
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