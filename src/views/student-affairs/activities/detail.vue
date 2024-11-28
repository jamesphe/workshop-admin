<template>
  <div class="app-container">
    <el-card class="main-card">
      <div slot="header" class="page-header">
        <span class="title">活动详情</span>
        <el-button 
          class="back-btn"
          type="primary" 
          icon="el-icon-back" 
          @click="$router.back()"
        >返回</el-button>
      </div>

      <basic-info :data="activityData" class="section-card" />

      <el-card class="section-card">
        <competition-info 
          v-if="activityData.type === 1" 
          :info="activityData.activityInfo" 
        />
        <practice-info 
          v-else-if="activityData.type === 2" 
          :info="activityData.activityInfo" 
        />
      </el-card>

      <el-card class="section-card">
        <div slot="header" class="section-header">
          <span class="title">参与者列表</span>
          <el-button 
            v-if="activityData.status === 0"
            class="add-btn"
            type="primary" 
            size="small"
            icon="el-icon-plus"
            @click="handleAddParticipant"
          >
            添加参与者
          </el-button>
        </div>

        <el-table 
          :data="activityData.participants" 
          border 
          style="width: 100%"
          :header-cell-style="{ background: '#f5f7fa' }"
          stripe
        >
          <el-table-column prop="studentId" label="学号" min-width="100" />
          <el-table-column prop="name" label="姓名" min-width="90" />
          <el-table-column prop="className" label="班级" min-width="120" />
          <el-table-column prop="phone" label="联系电话" min-width="120" />
          <el-table-column prop="signUpTime" label="报名时间" min-width="150" />
          <el-table-column prop="status" label="签到状态" min-width="100">
            <template slot-scope="{ row }">
              <el-tag :type="row.status === 1 ? 'success' : 'warning'">
                {{ row.status === 1 ? '已签到' : '未签到' }}
              </el-tag>
            </template>
          </el-table-column>

          <template v-if="activityData.type === 1">
            <el-table-column 
              v-if="activityData.activityInfo && activityData.activityInfo.competitionType !== '个人赛'"
              prop="teamName" 
              label="团队名称" 
              min-width="120"
            />
            <el-table-column prop="role" label="角色" min-width="90" />
            <el-table-column prop="rank" label="获奖情况" min-width="120">
              <template slot-scope="{ row }">
                <el-tag :type="getAwardTagType(row.rank)">{{ row.rank }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="score" label="得分" min-width="90" align="center" />
          </template>

          <template v-else-if="activityData.type === 2">
            <el-table-column prop="practiceResult" label="实践成果" min-width="120">
              <template slot-scope="{ row }">
                <el-tag :type="getPracticeResultType(row.practiceResult)">{{ row.practiceResult }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="dailyReports" label="日志数量" min-width="90" align="center">
              <template slot-scope="{ row }">
                <el-button type="text" @click="handleViewReports(row)">
                  {{ row.dailyReports }}篇
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="materials" label="材料数" min-width="90" align="center">
              <template slot-scope="{ row }">
                <el-button type="text" @click="handleViewMaterials(row)">
                  {{ row.materials }}份
                </el-button>
              </template>
            </el-table-column>
          </template>

          <el-table-column label="操作" min-width="150" fixed="right">
            <template slot-scope="{ row }">
              <el-button type="text" @click="handleEditParticipant(row)">编辑</el-button>
              <el-button 
                v-if="activityData.type === 2" 
                type="text" 
                @click="handleEvaluate(row)"
              >
                评价
              </el-button>
              <el-button type="text" style="color: #F56C6C" @click="handleRemoveParticipant(row)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-card>

    <!-- 对话框样式优化 -->
    <el-dialog 
      :title="dialogTitle" 
      :visible.sync="dialogVisible" 
      width="50%"
      :close-on-click-modal="false"
      custom-class="custom-dialog"
    >
      <el-form 
        :model="participantForm" 
        label-width="100px"
        class="participant-form"
      >
        <el-form-item label="学号">
          <el-input v-model="participantForm.studentId" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="participantForm.name" />
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="participantForm.className" />
        </el-form-item>
        <el-form-item label="签到状态">
          <el-select v-model="participantForm.status">
            <el-option label="未签到" :value="0" />
            <el-option label="已签到" :value="1" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitParticipantForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'
import BasicInfo from './components/BasicInfo'
import CompetitionInfo from './components/CompetitionInfo'
import PracticeInfo from './components/PracticeInfo'

export default {
  name: 'ActivityDetail',
  components: {
    BasicInfo,
    CompetitionInfo,
    PracticeInfo
  },
  data() {
    return {
      activityData: {
        status: 0,
        currentParticipants: 0,
        maxParticipants: 0,
        type: 1,
        participants: []
      },
      dialogVisible: false,
      dialogTitle: '',
      participantForm: {
        studentId: '',
        name: '',
        className: '',
        status: 0
      },
      editingParticipantIndex: -1
    }
  },
  created() {
    this.getActivityDetail()
  },
  methods: {
    async getActivityDetail() {
      try {
        const { data } = await request({
          url: '/vue-element-admin/activity/detail',
          method: 'get',
          params: {
            id: this.$route.params.id
          }
        })
        this.activityData = data
      } catch (error) {
        console.error('获取活动详情失败:', error)
        this.$message.error('获取活动详情失败')
      }
    },
    handleAddParticipant() {
      this.dialogTitle = '添加参与者'
      this.participantForm = {
        studentId: '',
        name: '',
        className: '',
        status: 0
      }
      this.editingParticipantIndex = -1
      this.dialogVisible = true
    },
    handleEditParticipant(row) {
      this.dialogTitle = '编辑参与者'
      this.participantForm = { ...row }
      this.editingParticipantIndex = this.activityData.participants.indexOf(row)
      this.dialogVisible = true
    },
    handleRemoveParticipant(row) {
      this.$confirm('确定要移除该参与者吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.activityData.participants.indexOf(row)
        this.activityData.participants.splice(index, 1)
        this.$message.success('移除成功')
        // 这里应该调用后端 API 来更新数据
      }).catch(() => {
        this.$message.info('已取消移除')
      })
    },
    submitParticipantForm() {
      if (this.editingParticipantIndex === -1) {
        // 添加新参与者
        this.activityData.participants.push(this.participantForm)
      } else {
        // 更新现有参与者
        this.$set(this.activityData.participants, this.editingParticipantIndex, this.participantForm)
      }
      this.dialogVisible = false
      this.$message.success('操作成功')
      // 这里应该调用后端 API 来更新数据
    },
    getAwardTagType(rank) {
      const types = {
        '一等奖': 'success',
        '二等奖': 'primary',
        '三等奖': 'warning',
        '优胜奖': 'info',
        '未获奖': ''
      }
      return types[rank] || ''
    },
    getPracticeResultType(result) {
      const types = {
        '优秀': 'success',
        '良好': 'primary',
        '合格': 'warning',
        '待评定': 'info'
      }
      return types[result] || ''
    },
    handleViewReports(row) {
      this.$message('查看日志功能开发中')
    },
    handleViewMaterials(row) {
      this.$message('查看材料功能开发中')
    },
    handleEvaluate(row) {
      this.$message('评价功能开发中')
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
  
  .main-card {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;

    .title {
      font-size: 18px;
      font-weight: bold;
      color: #303133;
    }

    .back-btn {
      padding: 9px 15px;
    }
  }

  .section-card {
    margin-top: 20px;
    border-radius: 8px;
    
    &:hover {
      box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
      transition: all 0.3s;
    }
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 16px;
      font-weight: 500;
      color: #303133;
    }

    .add-btn {
      padding: 8px 15px;
    }
  }

  :deep(.el-table) {
    margin: 10px 0;
    
    th {
      background-color: #f5f7fa !important;
      color: #606266;
      font-weight: 500;
    }

    .el-button--text {
      padding: 0 8px;
      
      &:hover {
        color: #409EFF;
        text-decoration: underline;
      }
    }

    // 添加表格横向滚动条样式
    .el-table__body-wrapper::-webkit-scrollbar {
      height: 8px;
    }
    
    .el-table__body-wrapper::-webkit-scrollbar-thumb {
      background: #dcdfe6;
      border-radius: 4px;
    }
    
    .el-table__body-wrapper::-webkit-scrollbar-track {
      background: #f5f7fa;
    }

    // 优化表格内容溢出处理
    .cell {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.custom-dialog {
  .participant-form {
    padding: 20px;
    
    .el-form-item {
      margin-bottom: 20px;
    }
  }

  .dialog-footer {
    text-align: right;
    padding-top: 10px;
    
    .el-button {
      padding: 9px 20px;
    }
  }
}

// 标签样式优化
:deep(.el-tag) {
  border-radius: 4px;
  padding: 0 8px;
  height: 24px;
  line-height: 22px;
}

// 按钮过渡动画
.el-button {
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-1px);
  }
}

// 优化移动端显示
@media screen and (max-width: 768px) {
  .section-card {
    margin: 10px 0;
  }
  
  :deep(.el-table) {
    font-size: 13px;
    
    .el-button--text {
      padding: 0 4px;
    }
  }
}
</style> 