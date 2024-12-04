<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>借调管理</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handleAdd">新增借调</el-button>
      </div>

      <el-table :data="transferList" style="width: 100%">
        <el-table-column prop="employeeName" label="员工姓名" />
        <el-table-column prop="fromWorkshop" label="原车间" />
        <el-table-column prop="toWorkshop" label="借调车间" />
        <el-table-column prop="startDate" label="开始日期" />
        <el-table-column prop="endDate" label="结束日期" />
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === '已批准' ? 'success' : 'warning'">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增借调对话框 -->
    <el-dialog title="新增借调" :visible.sync="dialogVisible">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="员工">
          <el-select v-model="form.employeeId" placeholder="请选择员工">
            <el-option label="张三" value="E001" />
            <el-option label="李四" value="E002" />
          </el-select>
        </el-form-item>
        <el-form-item label="借调车间">
          <el-select v-model="form.toWorkshop" placeholder="请选择车间">
            <el-option label="车间1" value="W001" />
            <el-option label="车间2" value="W002" />
          </el-select>
        </el-form-item>
        <el-form-item label="借调日期">
          <el-date-picker
            v-model="form.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Transfer',
  data() {
    return {
      transferList: [
        {
          employeeName: '张三',
          fromWorkshop: '包装车间',
          toWorkshop: '灌装车间',
          startDate: '2024-01-01',
          endDate: '2024-01-07',
          status: '已批准'
        }
      ],
      dialogVisible: false,
      form: {
        employeeId: '',
        toWorkshop: '',
        dateRange: []
      }
    }
  },
  methods: {
    handleAdd() {
      this.dialogVisible = true
    },
    handleSubmit() {
      console.log('提交借调申请:', this.form)
      this.$message.success('提交成功')
      this.dialogVisible = false
    }
  }
}
</script> 