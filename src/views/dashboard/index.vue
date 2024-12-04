<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col v-for="(item, index) in statisticsData" :key="index" :xs="24" :sm="12" :md="6">
        <el-card class="statistics-card" shadow="hover">
          <div class="statistics-content">
            <div class="statistics-icon">
              <i :class="item.icon" :style="{ background: item.color }" />
            </div>
            <div class="statistics-info">
              <div class="statistics-value">{{ item.value }}</div>
              <div class="statistics-label">{{ item.label }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :xs="24" :lg="16">
        <el-card class="chart-card">
          <div slot="header" class="clearfix">
            <div class="chart-header">
              <span class="chart-title">生产数据趋势</span>
              <div class="chart-controls">
                <el-select 
                  v-model="workshopId" 
                  size="small" 
                  placeholder="选择车间" 
                  class="workshop-select"
                >
                  <el-option 
                    v-for="item in workshops" 
                    :key="item.id" 
                    :label="item.name" 
                    :value="item.id" 
                  />
                </el-select>
                <el-radio-group 
                  v-model="chartType" 
                  size="small" 
                  class="chart-type-group"
                >
                  <el-radio-button label="production">产量统计</el-radio-button>
                  <el-radio-button label="efficiency">人员效率</el-radio-button>
                  <el-radio-button label="cost">成本分析</el-radio-button>
                </el-radio-group>
                <el-date-picker
                  v-model="dateRange"
                  class="date-picker"
                  type="daterange"
                  size="small"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="handleDateChange"
                />
              </div>
            </div>
          </div>
          <div class="chart-container">
            <div ref="mainChart" style="width: 100%; height: 350px;" />
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :lg="8">
        <el-card class="todo-card">
          <div slot="header" class="clearfix">
            <span>待办事项</span>
            <el-button style="float: right; padding: 3px 0" type="text">查看全部</el-button>
          </div>
          <el-timeline>
            <el-timeline-item
              v-for="(todo, index) in todoList"
              :key="index"
              :type="todo.type"
              :timestamp="todo.time"
            >
              <el-tag size="small" :type="todo.tagType">{{ todo.category }}</el-tag>
              {{ todo.content }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>快捷功能</span>
          </div>
          <el-row :gutter="20">
            <el-col 
              v-for="(item, index) in quickAccess" 
              :key="index" 
              :xs="12" 
              :sm="8" 
              :md="6" 
              :lg="4"
            >
              <div class="quick-access-item" @click="handleNavigate(item.path)">
                <el-badge :value="item.badge" :hidden="!item.badge">
                  <i :class="item.icon" />
                </el-badge>
                <span>{{ item.title }}</span>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { getDashboardData, getTodoList } from '@/api/dashboard'

export default {
  name: 'Dashboard',
  data() {
    return {
      loading: false,
      workshopId: '',
      chartType: 'production',
      dateRange: '',
      statisticsData: [
        {
          label: '今日产量',
          value: '2,530件',
          icon: 'el-icon-s-data',
          color: '#409EFF'
        },
        {
          label: '在岗人数',
          value: '45人',
          icon: 'el-icon-user',
          color: '#67C23A'
        },
        {
          label: '借调人数',
          value: '6人',
          icon: 'el-icon-share',
          color: '#E6A23C'
        },
        {
          label: '工资总额',
          value: '¥23,789',
          icon: 'el-icon-money',
          color: '#F56C6C'
        }
      ],
      workshops: [
        { id: 1, name: '灌装车间' },
        { id: 2, name: '原酿车间' }
      ],
      todoList: [],
      chartInstance: null,
      quickAccess: [
        {
          title: '数据录入',
          icon: 'el-icon-edit',
          path: '/data-entry',
          badge: ''
        },
        {
          title: '借调申请',
          icon: 'el-icon-share',
          path: '/transfer-request',
          badge: '2'
        },
        {
          title: '工资明细',
          icon: 'el-icon-wallet',
          path: '/salary-details',
          badge: ''
        },
        {
          title: '生产报表',
          icon: 'el-icon-s-data',
          path: '/production-report',
          badge: ''
        },
        {
          title: '员工管理',
          icon: 'el-icon-user',
          path: '/employee-management',
          badge: ''
        },
        {
          title: '系统设置',
          icon: 'el-icon-setting',
          path: '/settings',
          badge: ''
        }
      ]
    }
  },
  mounted() {
    this.initData()
    this.initChart()
    window.addEventListener('resize', this.resizeChart)
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.dispose()
    }
    window.removeEventListener('resize', this.resizeChart)
  },
  methods: {
    async initData() {
      this.loading = true
      try {
        const [dashboardData, todoData] = await Promise.all([
          getDashboardData(),
          getTodoList()
        ])
        
        // 处理仪表盘数据
        if (dashboardData.data) {
          this.statisticsData = [
            {
              label: '今日产量',
              value: `${dashboardData.data.todayProduction}件`,
              icon: 'el-icon-s-data',
              color: '#409EFF'
            },
            {
              label: '在岗人数',
              value: `${dashboardData.data.onDutyCount}人`,
              icon: 'el-icon-user',
              color: '#67C23A'
            },
            {
              label: '借调人数',
              value: `${dashboardData.data.transferCount}人`,
              icon: 'el-icon-share',
              color: '#E6A23C'
            },
            {
              label: '工资总额',
              value: `¥${dashboardData.data.totalSalary.toLocaleString()}`,
              icon: 'el-icon-money',
              color: '#F56C6C'
            }
          ]
          
          // 更新图表数据
          this.updateChart(dashboardData.data.chartData)
        }

        // 处理待办事项数据
        this.todoList = todoData.data?.map(item => ({
          ...item,
          tagType: this.getTagType(item.category)
        })) || []
      } catch (error) {
        console.error('获取数据失败:', error)
        this.$message.error('获取数据失败，请稍后重试')
      } finally {
        this.loading = false
      }
    },

    getTagType(category) {
      const typeMap = {
        '借调申请': 'warning',
        '数据录入': 'primary',
        '工资核算': 'success',
        '系统通知': 'info'
      }
      return typeMap[category] || 'info'
    },

    updateChart(chartData) {
      if (!this.chartInstance || !chartData) return

      const options = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['产量', '人效', '成本']
        },
        xAxis: {
          type: 'category',
          data: chartData.dates
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '产量',
            type: 'line',
            data: chartData.production,
            smooth: true
          },
          {
            name: '人效',
            type: 'line',
            data: chartData.efficiency,
            smooth: true
          },
          {
            name: '成本',
            type: 'line',
            data: chartData.cost,
            smooth: true
          }
        ]
      }

      this.chartInstance.setOption(options)
    },

    initChart() {
      if (!this.$refs.mainChart) return
      this.chartInstance = echarts.init(this.$refs.mainChart)
      this.updateChart()
    },
    resizeChart() {
      if (this.chartInstance) {
        this.chartInstance.resize()
      }
    },
    handleDateChange() {
      this.updateChart()
    },
    handleNavigate(path) {
      this.$router.push(path)
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
  background: #f0f2f5;

  .statistics-card {
    margin-bottom: 20px;
    
    .statistics-content {
      display: flex;
      align-items: center;

      .statistics-icon {
        i {
          padding: 16px;
          border-radius: 8px;
          font-size: 24px;
          color: #fff;
        }
      }

      .statistics-info {
        margin-left: 20px;
        
        .statistics-value {
          font-size: 24px;
          font-weight: bold;
          line-height: 1.2;
        }

        .statistics-label {
          color: #909399;
          font-size: 14px;
        }
      }
    }
  }

  .chart-card {
    margin-bottom: 20px;
    
    @media screen and (max-width: 1200px) {
      margin-bottom: 20px;
    }
  }

  .todo-card {
    margin-bottom: 20px;
  }

  .quick-access-item {
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    border-radius: 4px;
    transition: all 0.3s;

    &:hover {
      background: #f5f7fa;
      transform: translateY(-2px);
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }

    i {
      font-size: 28px;
      color: #409EFF;
      margin-bottom: 12px;
    }

    span {
      font-size: 14px;
      color: #606266;
    }
  }
}
</style>

