<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>科研成果管理</span>
      </div>
      <div class="filter-container">
        <el-select v-model="query.type" placeholder="成果类型" clearable>
          <el-option label="论文" value="paper" />
          <el-option label="专利" value="patent" />
          <el-option label="著作" value="book" />
          <el-option label="获奖" value="award" />
        </el-select>
        <el-date-picker
          v-model="query.year"
          type="year"
          placeholder="选择年份"
          value-format="yyyy"
        />
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
        <el-button type="success" icon="el-icon-plus" @click="handleCreate">添加成果</el-button>
      </div>
      <el-table :data="achievementList" border style="width: 100%">
        <el-table-column prop="name" label="成果名称" />
        <el-table-column prop="type" label="成果类型" />
        <el-table-column prop="author" label="作者/完成人" />
        <el-table-column prop="publishDate" label="发表/获得日期" />
        <el-table-column prop="level" label="级别" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === 'verified' ? 'success' : 'info'">
              {{ row.status === 'verified' ? '已认证' : '待认证' }}
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
  name: 'ResearchAchievements',
  data() {
    return {
      query: {
        type: '',
        year: ''
      },
      achievementList: []
    }
  },
  methods: {
    handleSearch() {
      console.log('搜索成果', this.query)
    },
    handleCreate() {
      console.log('添加成果')
    },
    handleEdit(row) {
      console.log('编辑成果', row)
    },
    handleView(row) {
      console.log('查看成果', row)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  padding-bottom: 15px;
  .el-select,
  .el-date-picker {
    margin-right: 10px;
  }
}
</style> 