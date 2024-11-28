<template>
  <div class="practice-info">
    <div class="section-title">实践活动详情</div>
    
    <!-- 基本信息卡片 -->
    <el-card class="info-card" shadow="hover">
      <div class="card-header">
        <i class="el-icon-office-building" />
        <span>单位信息</span>
      </div>
      <el-row :gutter="20" class="info-content">
        <el-col :span="8" class="info-item">
          <div class="label">实践单位</div>
          <div class="value">{{ info.practiceUnit }}</div>
        </el-col>
        <el-col :span="8" class="info-item">
          <div class="label">实践地点</div>
          <div class="value">
            <i class="el-icon-location" />
            {{ info.practiceSite }}
          </div>
        </el-col>
        <el-col :span="8" class="info-item">
          <div class="label">实践类别</div>
          <div class="value">
            <el-tag size="medium" effect="plain" type="success">
              {{ info.practiceType }}
            </el-tag>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 项目信息卡片 -->
    <el-card class="info-card" shadow="hover">
      <div class="card-header">
        <i class="el-icon-document" />
        <span>项目信息</span>
      </div>
      <div class="project-content">
        <div class="project-item">
          <div class="label">项目名称</div>
          <div class="value highlight">{{ info.practiceProject }}</div>
        </div>
        <div class="project-item">
          <div class="label">实践内容</div>
          <div class="value content-box">{{ info.practiceContent }}</div>
        </div>
        <div class="project-item">
          <div class="label">实践要求</div>
          <div class="value content-box">{{ info.requirements }}</div>
        </div>
      </div>
    </el-card>

    <!-- 其他信息卡片 -->
    <el-card class="info-card" shadow="hover">
      <div class="card-header">
        <i class="el-icon-info" />
        <span>其他信息</span>
      </div>
      <el-row :gutter="20" class="info-content">
        <el-col :span="8" class="info-item">
          <div class="label">指导教师工号</div>
          <div class="value">{{ info.teacherId }}</div>
        </el-col>
        <el-col :span="8" class="info-item">
          <div class="label">经费支持</div>
          <div class="value highlight">{{ info.fundingSupport }}</div>
        </el-col>
        <el-col :span="8" class="info-item">
          <div class="label">保险情况</div>
          <div class="value">
            <el-tag 
              :type="info.insurance === '已购买' ? 'success' : 'danger'"
              effect="dark"
              size="small"
            >
              {{ info.insurance }}
            </el-tag>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 紧急联系人卡片 -->
    <el-card class="info-card" shadow="hover">
      <div class="card-header">
        <i class="el-icon-phone" />
        <span>紧急联系人</span>
      </div>
      <div class="contact-content">
        <template v-if="info.emergencyContact">
          <div class="contact-item">
            <i class="el-icon-user" />
            <span class="label">姓名：</span>
            <span class="value">{{ info.emergencyContact.name }}</span>
          </div>
          <div class="contact-item">
            <i class="el-icon-mobile-phone" />
            <span class="label">电话：</span>
            <span class="value">{{ info.emergencyContact.phone }}</span>
          </div>
          <div class="contact-item">
            <i class="el-icon-connection" />
            <span class="label">关系：</span>
            <span class="value">{{ info.emergencyContact.relation }}</span>
          </div>
        </template>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PracticeInfo',
  props: {
    info: {
      type: Object,
      required: true,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.practice-info {
  .section-title {
    font-size: 16px;
    font-weight: 600;
    color: #303133;
    margin-bottom: 20px;
  }

  .info-card {
    margin-bottom: 20px;
    border-radius: 8px;
    
    &:hover {
      transform: translateY(-2px);
      transition: all 0.3s;
    }

    .card-header {
      padding: 0 0 15px;
      border-bottom: 1px solid #ebeef5;
      margin-bottom: 15px;
      
      i {
        color: #409EFF;
        margin-right: 8px;
      }
      
      span {
        font-size: 15px;
        font-weight: 500;
        color: #303133;
      }
    }
  }

  .info-content {
    .info-item {
      margin-bottom: 15px;
      
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
  }

  .project-content {
    .project-item {
      margin-bottom: 20px;
      
      .label {
        font-size: 13px;
        color: #909399;
        margin-bottom: 8px;
      }

      .value {
        font-size: 14px;
        color: #303133;
        
        &.highlight {
          color: #409EFF;
          font-weight: 500;
        }
        
        &.content-box {
          padding: 12px;
          background: #f8f9fa;
          border-radius: 4px;
          line-height: 1.6;
        }
      }
    }
  }

  .contact-content {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 10px;

    .contact-item {
      display: flex;
      align-items: center;
      
      i {
        color: #409EFF;
        margin-right: 8px;
        font-size: 16px;
      }

      .label {
        color: #909399;
        margin-right: 5px;
      }

      .value {
        color: #303133;
        font-weight: 500;
      }
    }
  }

  :deep(.el-tag) {
    border-radius: 4px;
    padding: 0 10px;
  }
}
</style> 