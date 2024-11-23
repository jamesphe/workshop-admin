<template>
  <div class="system-info">
    <!-- 账号信息 -->
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover" class="account-card">
          <div slot="header">
            <span>账号信息</span>
          </div>
          <el-descriptions :column="3" border>
            <el-descriptions-item label="用户名">
              {{ teacherInfo.username }}
            </el-descriptions-item>
            <el-descriptions-item label="账号状态">
              <el-tag :type="getAccountStatusType(teacherInfo.accountStatus)">
                {{ getAccountStatusLabel(teacherInfo.accountStatus) }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="最后登录">
              {{ teacherInfo.lastLogin }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>

    <!-- 角色权限 -->
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="24">
        <el-card shadow="hover" class="role-card">
          <div slot="header">
            <span>角色权限</span>
          </div>
          <div class="role-content">
            <div class="role-item">
              <div class="role-label">系统角色</div>
              <div class="role-value">
                <el-tag :type="getRoleType(teacherInfo.role)">
                  {{ getRoleLabel(teacherInfo.role) }}
                </el-tag>
              </div>
            </div>
            <div class="role-item">
              <div class="role-label">权限说明</div>
              <div class="role-value">{{ getRoleDescription(teacherInfo.role) }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 操作记录 -->
    <el-card class="detail-card" style="margin-top: 20px">
      <div slot="header">
        <span>操作记录</span>
      </div>
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in operationLogs"
          :key="index"
          :type="activity.type"
          :color="activity.color"
          :timestamp="activity.timestamp"
          :size="activity.size"
        >
          <el-card class="timeline-card">
            <h4>{{ activity.title }}</h4>
            <p>{{ activity.content }}</p>
            <div class="operation-meta">
              <span class="operator">操作人：{{ activity.operator }}</span>
              <span class="ip">IP地址：{{ activity.ip }}</span>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>

    <!-- 安全设置 -->
    <el-card class="detail-card" style="margin-top: 20px">
      <div slot="header">
        <span>安全设置</span>
      </div>
      <div class="security-list">
        <div class="security-item">
          <div class="security-info">
            <div class="security-title">登录密码</div>
            <div class="security-desc">用于保护账号信息安全</div>
          </div>
          <div class="security-action">
            <el-button type="text">修改密码</el-button>
          </div>
        </div>
        <el-divider />
        <div class="security-item">
          <div class="security-info">
            <div class="security-title">手机验证</div>
            <div class="security-desc">用于接收验证码和重要通知</div>
          </div>
          <div class="security-action">
            <el-tag v-if="teacherInfo.phoneNumber" type="success">已绑定</el-tag>
            <el-button v-else type="text">绑定手机</el-button>
          </div>
        </div>
        <el-divider />
        <div class="security-item">
          <div class="security-info">
            <div class="security-title">邮箱验证</div>
            <div class="security-desc">用于接收系统通知和找回密码</div>
          </div>
          <div class="security-action">
            <el-tag v-if="teacherInfo.email" type="success">已绑定</el-tag>
            <el-button v-else type="text">绑定邮箱</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'SystemInfo',
  props: {
    teacherInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      operationLogs: [
        {
          timestamp: '2024-03-15 14:30:00',
          title: '登录系统',
          content: '通过账号密码登录系统',
          operator: '张三',
          ip: '192.168.1.100',
          type: 'primary'
        },
        {
          timestamp: '2024-03-14 16:20:00',
          title: '修改个人信息',
          content: '更新了联系方式',
          operator: '张三',
          ip: '192.168.1.100',
          type: 'warning'
        }
      ]
    }
  },
  methods: {
    getAccountStatusType(status) {
      const types = {
        active: 'success',
        frozen: 'warning',
        disabled: 'danger'
      }
      return types[status] || 'info'
    },
    getAccountStatusLabel(status) {
      const labels = {
        active: '正常',
        frozen: '冻结',
        disabled: '禁用'
      }
      return labels[status] || status
    },
    getRoleType(role) {
      const types = {
        admin: 'danger',
        department_head: 'warning',
        teacher: 'primary'
      }
      return types[role] || 'info'
    },
    getRoleLabel(role) {
      const labels = {
        admin: '管理员',
        department_head: '部门负责人',
        teacher: '普通教师'
      }
      return labels[role] || role
    },
    getRoleDescription(role) {
      const descriptions = {
        admin: '拥有系统所有功能的操作权限',
        department_head: '可以管理本部门的教师和课程信息',
        teacher: '可以查看和维护个人信息，提交相关申请'
      }
      return descriptions[role] || '暂无说明'
    }
  }
}
</script>

<style lang="scss" scoped>
.system-info {
  .role-content {
    padding: 20px;

    .role-item {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }

      .role-label {
        color: #909399;
        margin-bottom: 8px;
      }

      .role-value {
        color: #303133;
        line-height: 1.6;
      }
    }
  }

  .timeline-card {
    h4 {
      margin: 0;
      font-size: 16px;
      color: #303133;
      font-weight: 500;
    }

    p {
      margin: 8px 0;
      color: #606266;
    }

    .operation-meta {
      font-size: 12px;
      color: #909399;

      .operator {
        margin-right: 16px;
      }
    }
  }

  .security-list {
    .security-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;

      .security-info {
        .security-title {
          font-size: 16px;
          color: #303133;
          margin-bottom: 8px;
        }

        .security-desc {
          color: #909399;
          font-size: 14px;
        }
      }
    }
  }
}
</style> 