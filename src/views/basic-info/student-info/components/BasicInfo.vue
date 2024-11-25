<template>
  <div class="basic-info">
    <el-descriptions :column="3" border>
      <el-descriptions-item label="出生日期">{{ studentInfo.dateOfBirth }}</el-descriptions-item>
      <el-descriptions-item label="政治面貌">{{ studentInfo.politicalStatus }}</el-descriptions-item>
      <el-descriptions-item label="身份证号">{{ studentInfo.idCard }}</el-descriptions-item>
      <el-descriptions-item label="手机号码">{{ studentInfo.phoneNumber }}</el-descriptions-item>
      <el-descriptions-item label="电子邮箱">{{ studentInfo.email }}</el-descriptions-item>
      <el-descriptions-item label="家庭住址">{{ studentInfo.address }}</el-descriptions-item>
      <el-descriptions-item label="紧急联系人">{{ studentInfo.emergencyContact }}</el-descriptions-item>
      <el-descriptions-item label="紧急联系电话">{{ studentInfo.emergencyPhone }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: 'BasicInfo',
  props: {
    studentInfo: {
      type: Object,
      required: true
    }
  }
}
</script> 