<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>社团管理</span>
      </div>
      <div class="filter-container">
        <el-button type="primary" icon="el-icon-plus">新建社团</el-button>
      </div>
      <el-table :data="associationList" border style="width: 100%">
        <el-table-column prop="name" label="社团名称" />
        <el-table-column prop="type" label="社团类型" />
        <el-table-column prop="memberCount" label="成员数量" />
        <el-table-column prop="status" label="状态" />
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
  name: 'StudentAssociations',
  data() {
    return {
      associationList: []
    }
  },
  methods: {
    handleEdit(row) {
      console.log('编辑社团', row)
    },
    handleView(row) {
      console.log('查看社团', row)
    }
  }
}
</script>

<style scoped>
</style> 