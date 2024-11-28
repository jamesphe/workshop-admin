<template>
  <el-card class="basic-info-card">
    <div slot="header" class="card-header">
      <span class="title">基本信息</span>
      <div class="status-tag">
        <el-tag 
          :type="getStatusType" 
          effect="dark"
          size="medium"
        >
          {{ statusMap[data.status] }}
        </el-tag>
      </div>
    </div>

    <el-row :gutter="20" class="info-content">
      <el-col :span="8" class="info-item">
        <div class="label">活动名称</div>
        <div class="value">{{ data.name }}</div>
      </el-col>
      <el-col :span="8" class="info-item">
        <div class="label">活动类型</div>
        <div class="value">
          <el-tag 
            :type="data.type === 1 ? 'primary' : 'success'" 
            effect="plain"
          >
            {{ typeMap[data.type] }}
          </el-tag>
        </div>
      </el-col>
      <el-col :span="8" class="info-item">
        <div class="label">活动地点</div>
        <div class="value">
          <i class="el-icon-location-outline" />
          {{ data.location }}
        </div>
      </el-col>
      <el-col :span="8" class="info-item">
        <div class="label">开始时间</div>
        <div class="value">
          <i class="el-icon-time" />
          {{ data.startTime }}
        </div>
      </el-col>
      <el-col :span="8" class="info-item">
        <div class="label">结束时间</div>
        <div class="value">
          <i class="el-icon-time" />
          {{ data.endTime }}
        </div>
      </el-col>
      <el-col :span="8" class="info-item">
        <div class="label">参与人数</div>
        <div class="value">
          <el-progress 
            :percentage="participationRate" 
            :format="format"
            :status="getProgressStatus"
          />
        </div>
      </el-col>
    </el-row>

    <div v-if="data.description" class="description">
      <div class="label">活动描述</div>
      <div class="value">{{ data.description }}</div>
    </div>

    <div v-if="data.contact" class="contact-info">
      <div class="label">联系方式</div>
      <div class="contact-details">
        <span v-if="data.contact.name" class="contact-item">
          <i class="el-icon-user" />
          {{ data.contact.name }}
        </span>
        <span v-if="data.contact.phone" class="contact-item">
          <i class="el-icon-phone" />
          {{ data.contact.phone }}
        </span>
        <span v-if="data.contact.email" class="contact-item">
          <i class="el-icon-message" />
          {{ data.contact.email }}
        </span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'BasicInfo',
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({
        status: 0,
        currentParticipants: 0,
        maxParticipants: 0
      })
    }
  },
  data() {
    return {
      typeMap: {
        1: '学生赛事活动',
        2: '社会实践活动'
      },
      statusMap: {
        0: '报名中',
        1: '进行中',
        2: '已结束'
      }
    }
  },
  computed: {
    getStatusType() {
      const typeMap = {
        0: 'warning',
        1: 'success',
        2: 'info'
      }
      return typeMap[this.data.status || 0]
    },
    participationRate() {
      const maxParticipants = this.data.maxParticipants || 0
      const currentParticipants = this.data.currentParticipants || 0
      if (!maxParticipants) return 0
      return Math.round((currentParticipants / maxParticipants) * 100)
    },
    getProgressStatus() {
      if (this.participationRate >= 100) return 'success'
      if (this.participationRate >= 80) return 'warning'
      return ''
    }
  },
  methods: {
    format(percentage) {
      const current = this.data.currentParticipants || 0
      const max = this.data.maxParticipants || 0
      return `${current}/${max}人 (${percentage}%)`
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-info-card {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .title {
      font-size: 16px;
      font-weight: 600;
      color: #303133;
    }
  }

  .info-content {
    padding: 20px 0;
  }

  .info-item {
    margin-bottom: 20px;
    
    .label {
      font-size: 13px;
      color: #909399;
      margin-bottom: 8px;
    }

    .value {
      font-size: 14px;
      color: #303133;
      
      i {
        margin-right: 5px;
        color: #909399;
      }
    }
  }

  .description {
    padding: 15px;
    background: #f8f9fa;
    border-radius: 4px;
    margin: 10px 0;

    .label {
      font-size: 13px;
      color: #909399;
      margin-bottom: 8px;
    }

    .value {
      font-size: 14px;
      color: #606266;
      line-height: 1.6;
    }
  }

  .contact-info {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #ebeef5;

    .label {
      font-size: 13px;
      color: #909399;
      margin-bottom: 12px;
    }

    .contact-details {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;

      .contact-item {
        display: flex;
        align-items: center;
        color: #606266;
        
        i {
          margin-right: 5px;
          color: #909399;
        }
      }
    }
  }

  :deep(.el-progress-bar__outer) {
    border-radius: 4px;
  }

  :deep(.el-tag) {
    border-radius: 4px;
    padding: 0 10px;
    height: 24px;
    line-height: 22px;
  }
}
</style> 