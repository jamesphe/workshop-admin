<template>
  <div class="career-info">
    <!-- 职称信息卡片 -->
    <el-card class="info-card">
      <div slot="header">
        <div class="card-title">
          <i class="el-icon-medal-1" />
          <span>职称信息</span>
        </div>
      </div>
      <el-descriptions :column="3" border>
        <el-descriptions-item label="当前职称">
          <el-tag :type="getPositionType(teacherInfo.position)">
            {{ teacherInfo.position }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="职称评定日期">
          {{ teacherInfo.titleDate }}
        </el-descriptions-item>
        <el-descriptions-item label="职称证书编号">
          {{ teacherInfo.titleCertificateNo || '暂无' }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- 任职信息卡片 -->
    <el-card class="info-card">
      <div slot="header">
        <div class="card-title">
          <i class="el-icon-office-building" />
          <span>任职信息</span>
        </div>
      </div>
      <el-descriptions :column="3" border>
        <el-descriptions-item label="所属部门">
          {{ getDepartmentLabel(teacherInfo.department) }}
        </el-descriptions-item>
        <el-descriptions-item label="入职日期">
          {{ teacherInfo.hireDate }}
        </el-descriptions-item>
        <el-descriptions-item label="工号">
          {{ teacherInfo.employeeNumber }}
        </el-descriptions-item>
        <el-descriptions-item label="聘用类型">
          <el-tag>{{ teacherInfo.employmentType }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="合同到期">
          {{ teacherInfo.contractEndDate }}
        </el-descriptions-item>
        <el-descriptions-item label="工作状态">
          <el-tag :type="getStatusType(teacherInfo.employmentStatus)">
            {{ teacherInfo.employmentStatus }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- 教师资格证书 -->
    <el-card class="info-card">
      <div slot="header">
        <div class="card-title">
          <i class="el-icon-collection-tag" />
          <span>教师资格证书</span>
        </div>
      </div>
      <el-descriptions :column="3" border>
        <el-descriptions-item label="证书类型">
          高等学校教师资格证
        </el-descriptions-item>
        <el-descriptions-item label="证书编号">
          {{ teacherInfo.teacherCertificateNo || '暂无' }}
        </el-descriptions-item>
        <el-descriptions-item label="发证日期">
          {{ teacherInfo.teacherCertificateDate }}
        </el-descriptions-item>
        <el-descriptions-item label="任教学科">
          {{ teacherInfo.teachingSubject }}
        </el-descriptions-item>
        <el-descriptions-item label="发证机关">
          {{ teacherInfo.teacherCertificateIssuer || '教育部' }}
        </el-descriptions-item>
        <el-descriptions-item label="证书状态">
          <el-tag type="success">有效</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- 职业发展历程 -->
    <el-card class="info-card">
      <div slot="header">
        <div class="card-title">
          <i class="el-icon-time" />
          <span>职业发展历程</span>
        </div>
      </div>
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in teacherInfo.careerPath"
          :key="index"
          :type="activity.type"
          :color="activity.color"
          :timestamp="activity.date"
          :size="activity.size"
        >
          <el-card class="timeline-card">
            <h4>{{ activity.title }}</h4>
            <p>{{ activity.content }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>

    <!-- 其他证书 -->
    <el-card class="info-card">
      <div slot="header">
        <div class="card-title">
          <i class="el-icon-document" />
          <span>其他证书</span>
        </div>
      </div>
      <div v-if="teacherInfo.certificates && teacherInfo.certificates.length" class="certificate-list">
        <el-row :gutter="20">
          <el-col v-for="cert in teacherInfo.certificates" :key="cert.number" :span="8">
            <el-card shadow="hover" class="certificate-item">
              <div class="cert-header">
                <span class="cert-name">{{ cert.name }}</span>
                <el-tag size="mini" type="success">有效</el-tag>
              </div>
              <div class="cert-content">
                <p><label>证书编号：</label>{{ cert.number }}</p>
                <p><label>发证日期：</label>{{ cert.issueDate }}</p>
                <p><label>发证机构：</label>{{ cert.issuer }}</p>
                <p><label>有效期至：</label>{{ cert.validUntil }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div v-else class="empty-block">
        暂无其他证书信息
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CareerInfo',
  props: {
    teacherInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    getPositionType(position) {
      const types = {
        '教授': 'success',
        '副教授': 'primary',
        '讲师': 'warning',
        '助教': 'info'
      }
      return types[position] || ''
    },
    getStatusType(status) {
      const types = {
        '在职': 'success',
        '离职': 'danger',
        '退休': 'info'
      }
      return types[status] || ''
    },
    getDepartmentLabel(department) {
      if (!department || !Array.isArray(department)) return '未设置'
      const [type, dept] = department
      return `${type} - ${dept}`
    }
  }
}
</script>

<style lang="scss" scoped>
.career-info {
  .info-card {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    .card-title {
      display: flex;
      align-items: center;

      i {
        margin-right: 8px;
        font-size: 18px;
        color: #409EFF;
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
      margin: 8px 0 0;
      color: #606266;
      font-size: 14px;
    }
  }

  .certificate-list {
    .certificate-item {
      margin-bottom: 20px;

      .cert-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        .cert-name {
          font-size: 16px;
          font-weight: 500;
          color: #303133;
        }
      }

      .cert-content {
        p {
          margin: 8px 0;
          color: #606266;
          font-size: 14px;

          label {
            color: #909399;
            margin-right: 8px;
          }
        }
      }
    }
  }

  .empty-block {
    text-align: center;
    color: #909399;
    padding: 30px 0;
  }
}
</style> 