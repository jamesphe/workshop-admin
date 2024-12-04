<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>工资明细</span>
        <el-date-picker
          v-model="month"
          type="month"
          style="float: right; margin-left: 10px;"
          placeholder="选择月份"
          @change="handleMonthChange"
        />
      </div>

      <el-table :data="salaryList" style="width: 100%">
        <el-table-column prop="employeeName" label="员工姓名" />
        <el-table-column prop="workType" label="工作类别" />
        <el-table-column prop="workHours" label="工时" />
        <el-table-column prop="turningCount" label="翻缸次数" />
        <el-table-column prop="basicSalary" label="基本工资" />
        <el-table-column prop="bonus" label="奖金" />
        <el-table-column prop="totalSalary" label="总计">
          <template slot-scope="scope">
            <span style="color: #f56c6c; font-weight: bold">
              {{ scope.row.totalSalary }}
            </span>
          </template>
        </el-table-column>
      </el-table>

      <div class="summary-container">
        <el-descriptions title="车间工资汇总" :column="3" border>
          <el-descriptions-item label="总人数">20人</el-descriptions-item>
          <el-descriptions-item label="总工时">1580小时</el-descriptions-item>
          <el-descriptions-item label="总工资">¥158,000</el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'WorkshopSalary',
  data() {
    return {
      month: '',
      salaryList: [
        {
          employeeName: '张三',
          workType: '包装',
          workHours: 160,
          turningCount: 0,
          basicSalary: 4800,
          bonus: 500,
          totalSalary: 5300
        },
        {
          employeeName: '李四',
          workType: '翻酿',
          workHours: 150,
          turningCount: 45,
          basicSalary: 4500,
          bonus: 900,
          totalSalary: 5400
        }
      ]
    }
  },
  methods: {
    handleMonthChange(val) {
      console.log('选择月份:', val)
      // 这里添加获取指定月份工资数据的逻辑
    }
  }
}
</script>

<style lang="scss" scoped>
.summary-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 4px;
}
</style> 