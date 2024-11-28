<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">新建活动</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="cancel">
          返回列表
        </el-button>
      </div>
      
      <activity-form
        ref="activityForm"
        @submit-success="handleSubmitSuccess"
      />
    </el-card>
  </div>
</template>

<script>
import ActivityForm from './components/ActivityForm'

export default {
  name: 'CreateActivity',
  components: {
    ActivityForm
  },
  methods: {
    handleSubmitSuccess() {
      this.$message({
        type: 'success',
        message: '创建成功！'
      })
      this.$router.push('/student-affairs/activities')
    },
    cancel() {
      this.$router.push('/student-affairs/activities')
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
}
</style> 