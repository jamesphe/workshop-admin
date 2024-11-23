<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover" class="info-section">
        <div slot="header" class="section-header">
          <i class="el-icon-user-solid" />
          <span>个人信息</span>
        </div>
        <div class="info-list">
          <div class="info-item">
            <span class="label">姓名：</span>
            <span class="value">{{ teacherInfo.name }}</span>
          </div>
          <div class="info-item">
            <span class="label">性别：</span>
            <span class="value">{{ teacherInfo.gender === 'male' ? '男' : teacherInfo.gender === 'female' ? '女' : '其他' }}</span>
          </div>
          <div class="info-item">
            <span class="label">出生日期：</span>
            <span class="value">{{ teacherInfo.dateOfBirth }}</span>
          </div>
          <div class="info-item">
            <span class="label">身份证号：</span>
            <span class="value">{{ teacherInfo.idCard }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover" class="info-section">
        <div slot="header" class="section-header">
          <i class="el-icon-location" />
          <span>政治信息</span>
        </div>
        <div class="info-list">
          <div class="info-item">
            <span class="label">民族：</span>
            <span class="value">{{ teacherInfo.ethnicity }}</span>
          </div>
          <div class="info-item">
            <span class="label">国籍：</span>
            <span class="value">{{ teacherInfo.nationality }}</span>
          </div>
          <div class="info-item">
            <span class="label">政治面貌：</span>
            <el-tag size="small">{{ teacherInfo.politicalStatus }}</el-tag>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover" class="info-section">
        <div slot="header" class="section-header">
          <i class="el-icon-phone" />
          <span>联系方式</span>
        </div>
        <div class="info-list">
          <div class="info-item">
            <span class="label">手机号码：</span>
            <span class="value">{{ teacherInfo.phoneNumber }}</span>
          </div>
          <div class="info-item">
            <span class="label">电子邮箱：</span>
            <span class="value">{{ teacherInfo.email }}</span>
          </div>
          <div class="info-item">
            <span class="label">家庭住址：</span>
            <span class="value">{{ teacherInfo.address }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'BasicInfo',
  props: {
    teacherInfo: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.info-section {
  height: 100%;
  
  .section-header {
    display: flex;
    align-items: center;
    
    i {
      margin-right: 8px;
      font-size: 18px;
      color: #606266;
    }
  }
  
  .info-list {
    .info-item {
      margin-bottom: 16px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .label {
        display: inline-block;
        width: 80px;
        color: #909399;
      }
      
      .value {
        color: #303133;
      }
    }
  }
}
</style> 