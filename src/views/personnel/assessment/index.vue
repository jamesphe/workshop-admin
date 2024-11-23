<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>教职工考核管理</span>
      </div>
      <div class="filter-container">
        <el-select v-model="query.year" placeholder="选择年度" clearable>
          <el-option label="2024年度" value="2024" />
          <el-option label="2023年度" value="2023" />
        </el-select>
        <el-select v-model="query.period" placeholder="考核周期" clearable>
          <el-option label="年度考核" value="year" />
          <el-option label="学期考核" value="semester" />
          <el-option label="月度考核" value="month" />
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
        <el-button type="success" icon="el-icon-plus" @click="handleCreate">新建考核</el-button>
      </div>
      <el-table :data="assessmentList" border style="width: 100%">
        <el-table-column prop="teacherName" label="教师姓名" />
        <el-table-column prop="department" label="所属部门" />
        <el-table-column prop="position" label="职务" />
        <el-table-column prop="assessmentPeriod" label="考核周期" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === 'completed' ? 'success' : 'warning'">
              {{ row.status === 'completed' ? '已完成' : '进行中' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="考核得分" />
        <el-table-column label="操作" width="250">
          <template #default="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" @click="handleView(row)">查看</el-button>
            <el-button type="text" @click="handleDownload(row)">导出</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'TeacherAssessment',
  data() {
    return {
      query: {
        year: '',
        period: ''
      },
      assessmentList: []
    }
  },
  methods: {
    handleSearch() {
      console.log('搜索考核', this.query)
    },
    handleCreate() {
      console.log('新建考核')
    },
    handleEdit(row) {
      console.log('编辑考核', row)
    },
    handleView(row) {
      console.log('查看考核', row)
    },
    handleDownload(row) {
      console.log('导出考核', row)
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