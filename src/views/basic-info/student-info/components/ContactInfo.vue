<template>
  <div class="contact-info">
    <!-- 个人联系方式 -->
    <div class="section-title">个人联系方式</div>
    <el-descriptions :column="2" border>
      <el-descriptions-item label="手机号码">{{ studentInfo.phoneNumber }}</el-descriptions-item>
      <el-descriptions-item label="电子邮箱">{{ studentInfo.email }}</el-descriptions-item>
      <el-descriptions-item label="家庭住址" :span="2">{{ studentInfo.address }}</el-descriptions-item>
    </el-descriptions>

    <!-- 紧急联系人 -->
    <div class="section-title">紧急联系人信息</div>
    <el-descriptions :column="2" border>
      <el-descriptions-item label="紧急联系人">{{ studentInfo.emergencyContact }}</el-descriptions-item>
      <el-descriptions-item label="紧急联系电话">{{ studentInfo.emergencyPhone }}</el-descriptions-item>
    </el-descriptions>

    <!-- 宿舍信息 -->
    <div class="section-title">宿舍信息</div>
    <el-descriptions :column="2" border>
      <el-descriptions-item label="宿舍号">{{ studentInfo.dormitory }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: 'ContactInfo',
  props: {
    studentInfo: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.section-title {
  margin: 20px 0 10px;
  font-size: 16px;
  font-weight: bold;
  
  &:first-child {
    margin-top: 0;
  }
}

.el-descriptions {
  margin-bottom: 20px;
}
</style> 