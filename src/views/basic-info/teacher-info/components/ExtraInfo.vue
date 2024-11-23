<template>
  <div class="extra-info">
    <!-- 紧急联系信息 -->
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover" class="contact-card">
          <div slot="header">
            <div class="header-title">
              <i class="el-icon-warning-outline" />
              <span>紧急联系信息</span>
            </div>
          </div>
          <el-descriptions :column="3" border>
            <el-descriptions-item label="紧急联系人">
              {{ teacherInfo.emergencyContact }}
            </el-descriptions-item>
            <el-descriptions-item label="紧急电话">
              {{ teacherInfo.emergencyPhone }}
            </el-descriptions-item>
            <el-descriptions-item label="健康状况">
              <el-tag :type="getHealthStatusType(teacherInfo.healthStatus)">
                {{ teacherInfo.healthStatus }}
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>

    <!-- 其他信息 -->
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="24">
        <el-card shadow="hover" class="other-card">
          <div slot="header">
            <div class="header-title">
              <i class="el-icon-more" />
              <span>其他信息</span>
            </div>
          </div>
          <el-form label-width="120px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="婚姻状况">
                  <el-tag size="medium">{{ teacherInfo.maritalStatus || '未设置' }}</el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="子女状况">
                  <el-tag size="medium">{{ teacherInfo.childrenStatus || '未设置' }}</el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="居住地址">
                  <span>{{ teacherInfo.residentialAddress || '未设置' }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="特长爱好">
                  <span>{{ teacherInfo.hobbies || '未设置' }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="血型">
                  <el-tag size="medium" type="info">{{ teacherInfo.bloodType || '未设置' }}</el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="过敏史">
                  <span>{{ teacherInfo.allergies || '无' }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <!-- 备注信息 -->
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="24">
        <el-card shadow="hover" class="remarks-card">
          <div slot="header">
            <div class="header-title">
              <i class="el-icon-document" />
              <span>备注信息</span>
            </div>
          </div>
          <div class="remarks-content">
            {{ teacherInfo.remarks || '暂无备注信息' }}
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 附件信息 -->
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="24">
        <el-card shadow="hover" class="attachments-card">
          <div slot="header">
            <div class="header-title">
              <i class="el-icon-paperclip" />
              <span>附件信息</span>
            </div>
          </div>
          <div v-if="teacherInfo.attachments && teacherInfo.attachments.length" class="attachments-list">
            <div v-for="(file, index) in teacherInfo.attachments" :key="index" class="attachment-item">
              <i class="el-icon-document" />
              <span class="file-name">{{ file.name }}</span>
              <div class="file-actions">
                <el-button type="text" @click="handleDownload(file)">下载</el-button>
                <el-button type="text" @click="handlePreview(file)">预览</el-button>
              </div>
            </div>
          </div>
          <div v-else class="no-data">
            暂无附件
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ExtraInfo',
  props: {
    teacherInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    getHealthStatusType(status) {
      const types = {
        '健康': 'success',
        '良好': 'primary',
        '一般': 'warning'
      }
      return types[status] || 'info'
    },
    handleDownload(file) {
      console.log('下载文件', file)
      this.$message.success('开始下载文件：' + file.name)
    },
    handlePreview(file) {
      console.log('预览文件', file)
      this.$message.info('预览文件：' + file.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.extra-info {
  .header-title {
    display: flex;
    align-items: center;
    i {
      margin-right: 8px;
      font-size: 18px;
      color: #909399;
    }
  }

  .remarks-content {
    padding: 20px;
    background-color: #f5f7fa;
    border-radius: 4px;
    min-height: 100px;
    color: #606266;
    line-height: 1.6;
  }

  .attachments-list {
    .attachment-item {
      display: flex;
      align-items: center;
      padding: 12px;
      border-bottom: 1px solid #ebeef5;

      &:last-child {
        border-bottom: none;
      }

      i {
        color: #909399;
        margin-right: 8px;
      }

      .file-name {
        flex: 1;
        color: #606266;
      }

      .file-actions {
        .el-button {
          padding: 0 8px;
        }
      }
    }
  }

  .no-data {
    text-align: center;
    color: #909399;
    padding: 30px 0;
  }
}
</style> 