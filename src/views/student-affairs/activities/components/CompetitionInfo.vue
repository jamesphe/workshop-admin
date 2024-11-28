<template>
  <div class="competition-info">
    <div class="section-title">赛事活动详情</div>

    <!-- 基本信息卡片 -->
    <el-card class="info-card" shadow="hover">
      <div class="card-header">
        <i class="el-icon-trophy" />
        <span>赛事信息</span>
      </div>
      <el-row :gutter="20" class="info-content">
        <el-col :span="8" class="info-item">
          <div class="label">赛事级别</div>
          <div class="value">
            <el-tag 
              :type="getLevelType(info.competitionLevel)" 
              effect="dark"
            >
              {{ info.competitionLevel }}
            </el-tag>
          </div>
        </el-col>
        <el-col :span="8" class="info-item">
          <div class="label">赛事类型</div>
          <div class="value">
            <el-tag type="info" effect="plain">
              {{ info.competitionType }}
            </el-tag>
          </div>
        </el-col>
        <el-col :span="8" class="info-item">
          <div class="label">评委人数</div>
          <div class="value">
            <i class="el-icon-user" />
            {{ info.judges }}
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 赛程安排卡片 -->
    <el-card class="info-card" shadow="hover">
      <div class="card-header">
        <i class="el-icon-date" />
        <span>赛程安排</span>
      </div>
      <div class="schedule-content">
        <el-timeline>
          <el-timeline-item
            v-for="(stage, index) in info.schedule"
            :key="index"
            :type="getTimelineItemType(index)"
            :timestamp="stage.time"
            placement="top"
          >
            <el-card class="timeline-card">
              <h4>{{ stage.stage }}</h4>
              <p class="location">
                <i class="el-icon-location" />
                {{ stage.location }}
              </p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>

    <!-- 奖项设置卡片 -->
    <el-card class="info-card" shadow="hover">
      <div class="card-header">
        <i class="el-icon-medal" />
        <span>奖项设置</span>
      </div>
      <div class="awards-content">
        <el-row :gutter="20">
          <el-col 
            v-for="(award, index) in info.awards" 
            :key="index" 
            :span="8"
          >
            <div class="award-card" :class="`award-${index + 1}`">
              <div class="award-name">{{ award.name }}</div>
              <div class="award-detail">
                <div class="count">
                  <i class="el-icon-user" />
                  {{ award.count }}个名额
                </div>
                <div class="reward">
                  <i class="el-icon-money" />
                  {{ award.reward }}
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 比赛规则卡片 -->
    <el-card class="info-card" shadow="hover">
      <div class="card-header">
        <i class="el-icon-document-checked" />
        <span>比赛规则</span>
      </div>
      <div class="rules-content">
        {{ info.rules }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CompetitionInfo',
  props: {
    info: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  methods: {
    getLevelType(level) {
      const typeMap = {
        '国家级': 'danger',
        '省级': 'warning',
        '市级': 'success',
        '校级': 'info'
      }
      return typeMap[level] || 'info'
    },
    getTimelineItemType(index) {
      const types = ['primary', 'success', 'warning', 'danger']
      return types[index % types.length]
    }
  }
}
</script>

<style lang="scss" scoped>
.competition-info {
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

  .schedule-content {
    padding: 20px 0;

    .timeline-card {
      h4 {
        margin: 0;
        font-size: 14px;
        color: #303133;
      }

      .location {
        margin: 5px 0 0;
        font-size: 13px;
        color: #909399;
        
        i {
          margin-right: 5px;
        }
      }
    }
  }

  .awards-content {
    padding: 10px;

    .award-card {
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      color: #fff;
      margin-bottom: 15px;

      &.award-1 {
        background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
      }

      &.award-2 {
        background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
      }

      &.award-3 {
        background: linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%);
      }

      .award-name {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .award-detail {
        font-size: 13px;
        
        .count {
          margin-bottom: 5px;
          i {
            margin-right: 5px;
          }
        }
        
        .reward {
          i {
            margin-right: 5px;
          }
        }
      }
    }
  }

  .rules-content {
    padding: 15px;
    background: #f8f9fa;
    border-radius: 4px;
    line-height: 1.6;
    color: #606266;
    font-size: 14px;
  }

  :deep(.el-timeline-item__node) {
    width: 12px;
    height: 12px;
  }

  :deep(.el-tag) {
    border-radius: 4px;
    padding: 0 10px;
  }
}
</style> 