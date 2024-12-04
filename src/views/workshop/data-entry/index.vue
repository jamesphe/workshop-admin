<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>数据录入</span>
      </div>
      
      <el-tabs v-model="activeTab">
        <el-tab-pane label="产品产量" name="product">
          <div class="form-container">
            <el-form ref="productForm" :model="productForm" label-width="100px">
              <el-form-item label="产品编码">
                <el-select v-model="productForm.productCode" placeholder="请选择产品">
                  <el-option label="产品1" value="P001" />
                  <el-option label="产品2" value="P002" />
                </el-select>
              </el-form-item>
              <el-form-item label="数量">
                <el-input-number v-model="productForm.quantity" :min="0" />
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="员工工时" name="worktime">
          <div class="form-container">
            <el-form ref="worktimeForm" :model="worktimeForm" label-width="100px">
              <el-form-item label="员工">
                <el-select v-model="worktimeForm.employeeId" placeholder="请选择员工">
                  <el-option label="张三" value="E001" />
                  <el-option label="李四" value="E002" />
                </el-select>
              </el-form-item>
              <el-form-item label="工作类别">
                <el-select v-model="worktimeForm.workType" placeholder="请选择工作类别">
                  <el-option label="包装" value="package" />
                  <el-option label="杂工" value="misc" />
                  <el-option label="配酿" value="brewing" />
                  <el-option label="翻酿" value="turning" />
                </el-select>
              </el-form-item>
              <el-form-item label="工时">
                <el-input-number v-model="worktimeForm.hours" :min="0" :max="24" />
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="翻缸数量" name="turning">
          <div class="form-container">
            <el-form ref="turningForm" :model="turningForm" label-width="100px">
              <el-form-item label="员工">
                <el-select v-model="turningForm.employeeId" placeholder="请选择员工">
                  <el-option label="张三" value="E001" />
                  <el-option label="李四" value="E002" />
                </el-select>
              </el-form-item>
              <el-form-item label="翻缸次数">
                <el-input-number v-model="turningForm.count" :min="0" />
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>

      <div class="button-container">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'DataEntry',
  data() {
    return {
      activeTab: 'product',
      productForm: {
        productCode: '',
        quantity: 0
      },
      worktimeForm: {
        employeeId: '',
        workType: '',
        hours: 0
      },
      turningForm: {
        employeeId: '',
        count: 0
      }
    }
  },
  methods: {
    handleSubmit() {
      // 根据当前激活的标签页提交不同的表单
      switch (this.activeTab) {
        case 'product':
          console.log('提交产品产量:', this.productForm)
          break
        case 'worktime':
          console.log('提交工时:', this.worktimeForm)
          break
        case 'turning':
          console.log('提交翻缸:', this.turningForm)
          break
      }
      this.$message.success('提交成功')
    },
    handleReset() {
      // 重置当前激活的表单
      switch (this.activeTab) {
        case 'product':
          this.$refs.productForm.resetFields()
          break
        case 'worktime':
          this.$refs.worktimeForm.resetFields()
          break
        case 'turning':
          this.$refs.turningForm.resetFields()
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  padding: 20px;
}

.button-container {
  text-align: center;
  margin-top: 20px;
}
</style> 