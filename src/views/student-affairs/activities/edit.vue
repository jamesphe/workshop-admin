<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>编辑活动</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="goBack">
          返回列表
        </el-button>
      </div>
      
      <activity-form
        ref="activityForm"
        :activity-id="activityId"
        :activity-type="activityType"
        @submit-success="handleSubmitSuccess"
      />
    </el-card>
  </div>
</template>

<script>
import ActivityForm from './components/ActivityForm'

export default {
  name: 'ActivityEdit',
  components: {
    ActivityForm
  },
  data() {
    return {
      activityId: undefined,
      activityType: undefined,
      loading: false
    }
  },
  created() {
    this.activityId = this.$route.params.id
    this.activityType = parseInt(this.$route.query.type)
  },
  methods: {
    goBack() {
      this.$router.push('/student-affairs/activities')
    },
    handleSubmitSuccess() {
      this.$message({
        type: 'success',
        message: '活动更新成功！'
      })
      this.goBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
}
</style> 