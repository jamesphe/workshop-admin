<template>
  <div class="app-container">
    <!-- 搜索区域优化 -->
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-form-item label="活动名称">
          <el-input
            v-model="listQuery.name"
            placeholder="请输入活动名称"
            clearable
            style="width: 200px"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        
        <el-form-item label="活动状态">
          <el-select
            v-model="listQuery.status"
            placeholder="请选择状态"
            clearable
            style="width: 160px"
            class="filter-item"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="活动类型">
          <el-select
            v-model="listQuery.type"
            placeholder="请选择类型"
            clearable
            style="width: 160px"
            class="filter-item"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="活动时间">
          <el-date-picker
            v-model="listQuery.timeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 340px"
            class="filter-item"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
          >
            搜索
          </el-button>
          <el-button
            icon="el-icon-refresh"
            @click="resetFilter"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>

      <div class="filter-container">
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-plus"
          @click="handleCreate"
        >
          新建活动
        </el-button>
        <el-button
          :loading="downloadLoading"
          class="filter-item"
          type="primary"
          icon="el-icon-download"
          @click="handleExport"
        >
          导出
        </el-button>
      </div>
    </div>

    <!-- 表格区域样式优化 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="活动名称" min-width="200" align="left">
        <template slot-scope="{row}">
          <router-link :to="'/student-affairs/activities/detail/'+row.id" class="link-type">
            <span>{{ row.name }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column label="活动类型" width="120" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.type === 1 ? 'primary' : 'success'">
            {{ getTypeLabel(row.type) }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="活动状态" width="100" align="center">
        <template slot-scope="{row}">
          <el-tag :type="getStatusType(row.status)">
            {{ getStatusLabel(row.status) }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="活动地点" width="150" align="center">
        <template slot-scope="{row}">
          <span>{{ row.location }}</span>
        </template>
      </el-table-column>

      <el-table-column label="开始时间" width="120" align="center">
        <template slot-scope="{row}">
          <span>{{ row.startTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="结束时间" width="120" align="center">
        <template slot-scope="{row}">
          <span>{{ row.endTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="参与人数" width="150" align="center">
        <template slot-scope="{row}">
          <el-progress 
            :percentage="getParticipationRate(row)"
            :format="format.bind(null, row)"
            :status="getParticipationStatus(row)"
          />
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button 
            type="primary" 
            size="mini"
            @click="handleEdit(row)"
          >
            编辑
          </el-button>
          <el-button
            v-if="row.status === 0"
            size="mini"
            type="success"
            @click="handleSignUp(row)"
          >
            报名
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import request from '@/utils/request'
import Pagination from '@/components/Pagination'

export default {
  name: 'Activities',
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      downloadLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        name: '',
        status: '',
        type: '',
        timeRange: []
      },
      statusOptions: [
        { value: 0, label: '报名中', tagType: 'warning' },
        { value: 1, label: '进行中', tagType: 'success' },
        { value: 2, label: '已结束', tagType: 'info' }
      ],
      typeOptions: [
        { value: 1, label: '学生赛事活动', icon: 'el-icon-trophy' },
        { value: 2, label: '社会实践活动', icon: 'el-icon-suitcase' }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      try {
        const { data } = await request({
          url: '/vue-element-admin/activity/list',
          method: 'get',
          params: this.listQuery
        })
        this.list = data.items
        this.total = data.total
      } catch (error) {
        console.error('获取活动列表失败:', error)
      }
      this.listLoading = false
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    getStatusType(status) {
      const typeMap = {
        0: 'warning',
        1: 'success',
        2: 'info'
      }
      return typeMap[status]
    },
    getParticipationRate(row) {
      if (!row.maxParticipants) return 0
      return Math.round((row.currentParticipants / row.maxParticipants) * 100)
    },
    getParticipationStatus(row) {
      const percentage = this.getParticipationRate(row)
      if (percentage >= 100) return 'success'
      if (percentage >= 80) return 'warning'
      if (percentage < 30) return 'exception'
      return undefined
    },
    format(row, percentage) {
      return `${row.currentParticipants || 0}/${row.maxParticipants || 0}人 (${percentage}%)`
    },
    handleEdit(row) {
      this.$router.push(`/student-affairs/activities/edit/${row.id}`)
    },
    handleSignUp(row) {
      this.$message({
        message: '报名功能开发中...',
        type: 'info'
      })
    },
    handleDelete(row) {
      this.$confirm('确认删除该活动吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        try {
          await request({
            url: '/vue-element-admin/activity/delete',
            method: 'delete',
            params: { id: row.id }
          })
          this.$message.success('删除成功')
          this.getList()
        } catch (error) {
          console.error('删除活动失败:', error)
        }
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    getTypeLabel(type) {
      const option = this.typeOptions.find(item => item.value === type)
      return option ? option.label : ''
    },
    getStatusLabel(status) {
      const option = this.statusOptions.find(item => item.value === status)
      return option ? option.label : ''
    },
    handleCreate() {
      this.$router.push('/student-affairs/activities/create')
    },
    async handleExport() {
      this.downloadLoading = true
      try {
        const { data } = await request({
          url: '/vue-element-admin/activity/export',
          method: 'get',
          params: this.listQuery
        })
        
        if (data.message === '导出成功') {
          this.$message({
            message: '导出成功',
            type: 'success'
          })
        }
      } catch (error) {
        this.$message.error('导出失败')
        console.error('导出失败:', error)
      } finally {
        this.downloadLoading = false
      }
    },
    handleConfig() {
      this.$message({
        message: '设置功能开发中...',
        type: 'info'
      })
    },
    resetFilter() {
      this.listQuery = {
        page: 1,
        limit: 10,
        name: '',
        status: '',
        type: '',
        timeRange: []
      }
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;

  .filter-container {
    margin-bottom: 20px;
    border-radius: 8px;
    
    &:hover {
      box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
      transition: all 0.3s;
    }

    .search-form {
      padding: 20px 0 10px;
      
      .filter-item {
        width: 200px;
        margin-right: 10px;
        
        &.date-range {
          width: 360px;
        }
      }

      .el-input__icon {
        color: #909399;
      }

      .action-buttons {
        margin-left: 10px;
      }
    }

    .operation-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-top: 1px solid #ebeef5;
      margin-top: 10px;

      .add-button {
        font-weight: 500;
      }

      .right-buttons {
        .el-button {
          margin-left: 10px;
        }
      }
    }
  }
}

// 下拉选项样式
.option-icon {
  margin-right: 8px;
  color: #909399;
}

:deep(.el-tag) {
  width: 100%;
  text-align: center;
}

// 按钮动画效果
.el-button {
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-1px);
  }
}

// 输入框样式优化
:deep(.el-input__inner) {
  border-radius: 4px;
  
  &:hover {
    border-color: #409EFF;
  }
}

// 日期选择器样式
:deep(.el-range-editor) {
  .el-range-input {
    &::-webkit-input-placeholder {
      color: #C0C4CC;
    }
  }
  
  .el-range-separator {
    color: #909399;
  }
}

.table-container {
  margin-top: 20px;
  
  .link-type {
    color: #409EFF;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

:deep(.el-table) {
  margin: 10px 0;
  
  th {
    background-color: #f5f7fa !important;
    color: #606266;
    font-weight: 500;
  }
}

.pagination-container {
  padding: 15px 0;
  text-align: center;
}

.filter-container {
  padding-bottom: 10px;
  .filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 10px;
  }
}

.el-button--mini {
  padding: 7px 15px;
  &+.el-button {
    margin-left: 10px;
  }
}

.fixed-width {
  .el-button--mini {
    padding: 7px 10px;
    min-width: 60px;
  }
}

.el-tag {
  margin-right: 10px;
}

.link-type,
.link-type:focus {
  color: #337ab7;
  cursor: pointer;
  &:hover {
    color: rgb(32, 160, 255);
  }
}

.filter-container {
  .filter-item {
    margin-right: 10px;
  }
}
</style> 