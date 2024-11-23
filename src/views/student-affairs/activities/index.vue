<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>活动管理</span>
      </div>
      <div class="filter-container">
        <el-button type="primary" icon="el-icon-plus">新建活动</el-button>
      </div>
      <el-table :data="activityList" border style="width: 100%">
        <el-table-column prop="name" label="活动名称" />
        <el-table-column prop="startTime" label="开始时间" />
        <el-table-column prop="endTime" label="结束时间" />
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
  name: 'StudentActivities',
  data() {
    return {
      activityList: []
    }
  },
  methods: {
    handleEdit(row) {
      console.log('编辑活动', row)
    },
    handleView(row) {
      console.log('查看活动', row)
    }
  }
}
</script>

<style scoped>
</style> 