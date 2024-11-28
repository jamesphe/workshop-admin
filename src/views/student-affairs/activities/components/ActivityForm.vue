<template>
  <div class="activity-form">
    <el-form 
      ref="form" 
      :model="formData" 
      :rules="rules"
      label-width="120px"
      class="form-container"
    >
      <!-- 基本信息 -->
      <div class="form-section">
        <el-divider content-position="left">
          <div class="divider-content">
            <i class="el-icon-info section-icon" />
            <span>基本信息</span>
          </div>
        </el-divider>
        
        <div class="form-grid">
          <el-form-item label="活动名称" prop="name">
            <el-input 
              v-model="formData.name" 
              placeholder="请输入活动名称"
              clearable
            />
          </el-form-item>

          <el-form-item label="活动类型" prop="type">
            <el-select 
              v-model="formData.type" 
              placeholder="请选择活动类型"
              :disabled="!!activityId"
              class="full-width"
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <i :class="[item.icon, 'option-icon']" />
                <span>{{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </div>

        <el-form-item label="活动时间" prop="timeRange">
          <el-date-picker
            v-model="formData.timeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            class="date-picker"
          />
        </el-form-item>

        <div class="form-grid">
          <el-form-item label="活动地点" prop="location">
            <el-input 
              v-model="formData.location" 
              placeholder="请输入活动地点"
              clearable
            />
          </el-form-item>

          <el-form-item label="参与人数上限" prop="maxParticipants">
            <el-input-number 
              v-model="formData.maxParticipants" 
              :min="1" 
              :max="1000"
              controls-position="right"
              class="number-input"
            />
          </el-form-item>
        </div>

        <el-form-item label="活动描述" prop="description">
          <el-input
            v-model="formData.description"
            type="textarea"
            :rows="4"
            placeholder="请输入活动描述"
            resize="none"
          />
        </el-form-item>
      </div>

      <!-- 主办方信息 -->
      <div class="form-section">
        <el-divider content-position="left">
          <div class="divider-content">
            <i class="el-icon-office-building section-icon" />
            <span>主办方信息</span>
          </div>
        </el-divider>

        <div class="form-grid">
          <el-form-item label="主办单位" prop="organizer">
            <el-select 
              v-model="formData.organizer" 
              placeholder="请选择主办单位"
              class="full-width"
            >
              <el-option label="学生会" value="学生会" />
              <el-option label="团委" value="团委" />
              <el-option label="社团联合会" value="社团联合会" />
              <el-option label="院系" value="院系" />
            </el-select>
          </el-form-item>

          <el-form-item label="联系人" prop="contact.name">
            <el-input 
              v-model="formData.contact.name" 
              placeholder="请输入联系人姓名"
              clearable 
            />
          </el-form-item>
        </div>

        <div class="form-grid">
          <el-form-item label="联系电话" prop="contact.phone">
            <el-input 
              v-model="formData.contact.phone" 
              placeholder="请输入联系电话"
              clearable
            />
          </el-form-item>

          <el-form-item label="联系邮箱" prop="contact.email">
            <el-input 
              v-model="formData.contact.email" 
              placeholder="请输入联系邮箱"
              clearable
            />
          </el-form-item>
        </div>
      </div>

      <!-- 赛事活动特有信息 -->
      <div v-if="formData.type === 1" class="form-section">
        <el-divider content-position="left">
          <div class="divider-content">
            <i class="el-icon-trophy section-icon" />
            <span>赛事信息</span>
          </div>
        </el-divider>

        <div class="form-grid">
          <el-form-item label="赛事级别" prop="activityInfo.competitionLevel">
            <el-select 
              v-model="formData.activityInfo.competitionLevel" 
              placeholder="请选择赛事级别"
              class="full-width"
            >
              <el-option label="校级" value="校级" />
              <el-option label="市级" value="市级" />
              <el-option label="省级" value="省级" />
              <el-option label="国家级" value="国家级" />
            </el-select>
          </el-form-item>

          <el-form-item label="赛事类型" prop="activityInfo.competitionType">
            <el-select 
              v-model="formData.activityInfo.competitionType" 
              placeholder="请选择赛事类型"
              class="full-width"
            >
              <el-option label="个人赛" value="个人赛" />
              <el-option label="团体赛" value="团体赛" />
              <el-option label="混合赛" value="混合赛" />
            </el-select>
          </el-form-item>
        </div>

        <el-form-item label="比赛规则" prop="activityInfo.rules">
          <el-input
            v-model="formData.activityInfo.rules"
            type="textarea"
            :rows="4"
            placeholder="请输入比赛规则"
            resize="none"
          />
        </el-form-item>
      </div>

      <!-- 社会实践活动特有信息 -->
      <div v-if="formData.type === 2" class="form-section">
        <el-divider content-position="left">
          <div class="divider-content">
            <i class="el-icon-suitcase section-icon" />
            <span>实践信息</span>
          </div>
        </el-divider>

        <div class="form-grid">
          <el-form-item label="实践单位" prop="activityInfo.practiceUnit">
            <el-input 
              v-model="formData.activityInfo.practiceUnit" 
              placeholder="请输入实践单位"
              clearable
            />
          </el-form-item>

          <el-form-item label="实践地点" prop="activityInfo.practiceSite">
            <el-input 
              v-model="formData.activityInfo.practiceSite" 
              placeholder="请输入实践地点"
              clearable
            />
          </el-form-item>
        </div>

        <el-form-item label="实践类别" prop="activityInfo.practiceType">
          <el-select 
            v-model="formData.activityInfo.practiceType" 
            placeholder="请选择实践类别"
            class="full-width"
          >
            <el-option label="暑期" value="暑期" />
            <el-option label="学期中" value="学期中" />
            <el-option label="寒假" value="寒假" />
          </el-select>
        </el-form-item>

        <el-form-item label="实践要求" prop="activityInfo.requirements">
          <el-input
            v-model="formData.activityInfo.requirements"
            type="textarea"
            :rows="4"
            placeholder="请输入实践要求"
            resize="none"
          />
        </el-form-item>
      </div>

      <div class="form-actions">
        <el-button 
          type="primary" 
          :loading="submitting"
          @click="submitForm"
        >
          {{ activityId ? '保存修改' : '立即创建' }}
        </el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'ActivityForm',
  props: {
    activityId: {
      type: [String, Number],
      default: undefined
    },
    activityType: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      formData: {
        name: '',
        type: '',
        timeRange: [],
        location: '',
        maxParticipants: 50,
        description: '',
        organizer: '',
        contact: {
          name: '',
          phone: '',
          email: ''
        },
        activityInfo: {
          competitionLevel: '',
          competitionType: '',
          rules: '',
          practiceUnit: '',
          practiceSite: '',
          practiceType: '',
          requirements: ''
        }
      },
      typeOptions: [
        { value: 1, label: '学生赛事活动', icon: 'el-icon-trophy' },
        { value: 2, label: '社会实践活动', icon: 'el-icon-suitcase' }
      ],
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择活动类型', trigger: 'change' }],
        timeRange: [{ required: true, message: '请选择活动时间', trigger: 'change' }],
        location: [{ required: true, message: '请输入活动地点', trigger: 'blur' }],
        maxParticipants: [{ required: true, message: '请输入参与人数上限', trigger: 'blur' }],
        organizer: [{ required: true, message: '请选择主办单位', trigger: 'change' }],
        'contact.name': [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],
        'contact.phone': [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        'contact.email': [
          { required: true, message: '请输入联系邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.activityId) {
      this.getActivityDetail()
    } else if (this.activityType) {
      this.formData.type = this.activityType
    }
  },
  methods: {
    async getActivityDetail() {
      try {
        const { data } = await request({
          url: '/vue-element-admin/activity/detail',
          method: 'get',
          params: { id: this.activityId }
        })
        
        // 处理日期范围
        this.formData = {
          ...data,
          timeRange: [data.startTime, data.endTime]
        }
      } catch (error) {
        console.error('获取活动详情失败:', error)
        this.$message.error('获取活动详情失败')
      }
    },
    async submitForm() {
      try {
        await this.$refs.form.validate()
        
        const formData = {
          ...this.formData,
          startTime: this.formData.timeRange[0],
          endTime: this.formData.timeRange[1]
        }
        
        const url = this.activityId 
          ? '/vue-element-admin/activity/update'
          : '/vue-element-admin/activity/create'
        
        await request({
          url,
          method: 'post',
          data: formData
        })

        this.$emit('submit-success')
      } catch (error) {
        console.error('提交表单失败:', error)
        this.$message.error('提交失败，请重试')
      }
    },
    cancel() {
      this.$router.push('/student-affairs/activities')
    }
  }
}
</script>

<style lang="scss" scoped>
.activity-form {
  .form-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 30px;
    background: linear-gradient(to bottom, #ffffff, #f8f9fa);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }

  .form-section {
    padding: 28px;
    margin-bottom: 32px;
    background: #ffffff;
    border-radius: 12px;
    border: 1px solid rgba(64, 158, 255, 0.1);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      box-shadow: 0 8px 24px rgba(64, 158, 255, 0.15);
      transform: translateY(-3px);
      border-color: rgba(64, 158, 255, 0.3);
    }

    // 添加进入动画
    @for $i from 1 through 4 {
      &:nth-child(#{$i}) {
        animation: fadeInUp 0.5s ease-out;
        animation-delay: $i * 0.1s;
        animation-fill-mode: both;
      }
    }
  }

  .divider-content {
    display: flex;
    align-items: center;
    color: #303133;
    font-weight: 600;
    font-size: 16px;
    padding: 4px 0;

    .section-icon {
      margin-right: 10px;
      font-size: 20px;
      background: linear-gradient(135deg, #409EFF, #3a8ee6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 2px 4px rgba(64, 158, 255, 0.2));
    }
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-bottom: 24px;
  }

  .el-divider {
    margin: 0 0 28px 0;
    
    &__text {
      font-size: 16px;
      background: #ffffff;
      padding: 0 16px;
    }
  }

  .el-form-item {
    margin-bottom: 24px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateX(4px);
    }

    &__label {
      font-weight: 500;
      color: #606266;
      font-size: 14px;
    }
  }

  // 输入框样式优化
  .el-input, .el-select, .el-date-editor {
    .el-input__inner {
      border-radius: 8px;
      border: 1px solid #dcdfe6;
      padding: 0 15px;
      height: 40px;
      font-size: 14px;
      transition: all 0.3s ease;
      
      &:hover {
        border-color: #409EFF;
      }
      
      &:focus {
        border-color: #409EFF;
        box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.15);
      }
    }
  }

  // 文本域样式优化
  .el-textarea__inner {
    border-radius: 8px;
    padding: 12px;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: #409EFF;
    }
    
    &:focus {
      border-color: #409EFF;
      box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.15);
    }
  }

  .full-width {
    width: 100%;
  }

  .date-picker {
    width: 100%;
    
    .el-range-separator {
      color: #909399;
    }
  }

  .number-input {
    width: 180px;

    .el-input-number__decrease,
    .el-input-number__increase {
      border-radius: 4px;
      background: #f5f7fa;
      transition: all 0.3s;

      &:hover {
        background: #e4e7ed;
      }
    }
  }

  .option-icon {
    margin-right: 10px;
    font-size: 16px;
    color: #409EFF;
  }

  // 按钮区域样式优化
  .form-actions {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 48px;
    padding-top: 32px;
    border-top: 1px solid #ebeef5;

    .el-button {
      min-width: 140px;
      padding: 12px 30px;
      font-size: 15px;
      border-radius: 8px;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      letter-spacing: 1px;

      &:hover {
        transform: translateY(-2px) scale(1.02);
      }

      &--primary {
        background: linear-gradient(135deg, #409EFF 0%, #3a8ee6 100%);
        border: none;
        
        &:hover {
          background: linear-gradient(135deg, #66b1ff 0%, #409EFF 100%);
          box-shadow: 0 8px 16px rgba(64, 158, 255, 0.3);
        }

        &:active {
          transform: translateY(1px) scale(0.98);
        }
      }

      &:not(.el-button--primary) {
        background: #fff;
        border: 1px solid #dcdfe6;
        
        &:hover {
          border-color: #409EFF;
          color: #409EFF;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }

  // 响应式布局优化
  @media screen and (max-width: 768px) {
    .form-container {
      padding: 20px;
    }

    .form-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .form-section {
      padding: 20px;
      margin-bottom: 24px;
    }

    .form-actions {
      flex-direction: column;
      gap: 12px;

      .el-button {
        width: 100%;
      }
    }
  }
}

// 优化动画效果
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 添加滚动条样式
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c0c4cc;
  border-radius: 4px;
  
  &:hover {
    background: #909399;
  }
}

// 添加选中文本样式
::selection {
  background: rgba(64, 158, 255, 0.2);
  color: #409EFF;
}
</style> 