<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>综合测评</span>
      </div>
      <div class="filter-container">
        <el-select v-model="query.semester" placeholder="选择学期" clearable>
          <el-option label="2023-2024学年第一学期" value="2023-1" />
          <el-option label="2023-2024学年第二学期" value="2023-2" />
        </el-select>
        <el-button type="primary" icon="el-icon-search">查询</el-button>
      </div>
      <el-table :data="evaluationList" border style="width: 100%">
        <el-table-column prop="studentName" label="学生姓名" />
        <el-table-column prop="studentId" label="学号" />
        <el-table-column prop="className" label="班级" />
        <el-table-column prop="moralScore" label="德育成绩" />
        <el-table-column prop="studyScore" label="智育成绩" />
        <el-table-column prop="physicalScore" label="体育成绩" />
        <el-table-column prop="totalScore" label="总分" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="text" @click="handleDetail(row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'StudentEvaluation',
  data() {
    return {
      query: {
        semester: ''
      },
      evaluationList: []
    }
  },
  methods: {
    handleDetail(row) {
      console.log('查看详情', row)
    }
  }
}
</script>

<style scoped>
</style> 