<template>
  <div class="system-info">
    <!-- 账号信息 -->
    <div class="section-title">账号信息</div>
    <el-descriptions :column="3" border>
      <el-descriptions-item label="账号状态">
        <el-tag :type="getAccountStatusType(studentInfo.accountStatus)">
          {{ getAccountStatusLabel(studentInfo.accountStatus) }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="最后登录时间">{{ studentInfo.lastLoginTime }}</el-descriptions-item>
    </el-descriptions>

    <!-- 系统备注 -->
    <div class="section-title">系统备注</div>
    <el-descriptions :column="1" border>
      <el-descriptions-item label="备注信息">{{ studentInfo.remarks || '暂无备注' }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: 'SystemInfo',
  props: {
    studentInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    getAccountStatusType(status) {
      const types = {
        active: 'success',
        locked: 'warning',
        disabled: 'danger'
      }
      return types[status] || 'info'
    },
    getAccountStatusLabel(status) {
      const labels = {
        active: '正常',
        locked: '锁定',
        disabled: '禁用'
      }
      return labels[status] || status
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