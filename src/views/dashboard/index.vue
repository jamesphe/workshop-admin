<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <!-- 顶部数据卡片 -->
      <el-col
        v-for="(item, index) in statisticsData"
        :key="index"
        :span="6"
      >
        <el-card class="statistics-card" :body-style="{ padding: '20px' }">
          <div class="statistics-content">
            <div class="statistics-icon">
              <i :class="item.icon" :style="{ background: item.color }" />
            </div>
            <div class="statistics-info">
              <div class="statistics-value">{{ item.value }}</div>
              <div class="statistics-label">{{ item.label }}</div>
            </div>
          </div>
          <div class="statistics-footer">
            <span>{{ item.growth }}%</span>
            <span>较上月</span>
          </div>
        </el-card>
      </el-col>

      <!-- 主要内容区 -->
      <el-col :span="16" style="margin-top: 20px;">
        <el-card>
          <div slot="header" class="clearfix">
            <span>业务办理情况</span>
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              size="small"
              style="float: right"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
          <div class="chart-container">
            <!-- 这里需要引入echarts组件 -->
            <div ref="mainChart" style="width: 100%; height: 350px;" />
          </div>
        </el-card>
      </el-col>

      <!-- 右侧信息栏 -->
      <el-col :span="8" style="margin-top: 20px;">
        <el-card class="todo-card">
          <div slot="header" class="clearfix">
            <span>待办事项</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              查看全部
            </el-button>
          </div>
          <el-timeline>
            <el-timeline-item
              v-for="(todo, index) in todoList"
              :key="index"
              :timestamp="todo.time"
              :type="todo.type"
            >
              {{ todo.content }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>

      <!-- 快捷功能区 -->
      <el-col :span="24" style="margin-top: 20px;">
        <el-card>
          <div slot="header" class="clearfix">
            <span>快捷功能</span>
          </div>
          <el-row :gutter="20">
            <el-col
              v-for="(item, index) in quickAccess"
              :key="index"
              :span="4"
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
import { mapGetters } from 'vuex'
import { getStatistics, getTodoList, getChartData } from '@/api/dashboard'
import * as echarts from 'echarts'

export default {
  name: 'Dashboard',
  data() {
    return {
      dateRange: '',
      statisticsData: [],
      todoList: [],
      chartInstance: null,
      quickAccess: [
        {
          title: '教师一张表',
          icon: 'el-icon-user-solid',
          path: '/basic-info/teacher-info',
          badge: ''
        },
        {
          title: '学生一张表',
          icon: 'el-icon-user',
          path: '/basic-info/student-info',
          badge: ''
        },
        {
          title: '党建工作',
          icon: 'el-icon-s-flag',
          path: '/party-building',
          badge: '2'
        },
        {
          title: '科研管理',
          icon: 'el-icon-s-management',
          path: '/research',
          badge: ''
        },
        {
          title: '人事管理',
          icon: 'el-icon-s-custom',
          path: '/hr',
          badge: ''
        },
        {
          title: '资产管理',
          icon: 'el-icon-office-building',
          path: '/assets',
          badge: '3'
        }
      ],
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'roles',
      'name'
    ])
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
        const [statsRes, todoRes] = await Promise.all([
          getStatistics(),
          getTodoList()
        ])
        this.statisticsData = statsRes.data || []
        this.todoList = todoRes.data || []
      } catch (error) {
        console.error('获取仪表盘数据失败:', error)
        this.$message.error('获取数据失败，请稍后重试')
      } finally {
        this.loading = false
      }
    },
    async initChart() {
      try {
        const { data } = await getChartData()
        if (!data || !this.$refs.mainChart) return

        this.chartInstance = echarts.init(this.$refs.mainChart)
        this.chartInstance.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['教务办理', '学生事务', '行政办公']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: data.xAxis
          },
          yAxis: {
            type: 'value'
          },
          series: data.series.map(item => ({
            name: item.name,
            type: 'line',
            data: item.data,
            smooth: true
          }))
        })
      } catch (error) {
        console.error('初始化图表失败:', error)
        this.$message.error('图表加载失败，请稍后重试')
      }
    },
    resizeChart() {
      if (this.chartInstance) {
        this.chartInstance.resize()
      }
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

    .statistics-footer {
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #ebeef5;
      font-size: 13px;
      color: #606266;
    }
  }

  .quick-access-item {
    text-align: center;
    padding: 20px 0;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: #f5f7fa;
      border-radius: 4px;
    }

    i {
      font-size: 28px;
      color: #409EFF;
      margin-bottom: 8px;
      display: block;
    }

    span {
      font-size: 14px;
      color: #606266;
    }
  }

  .chart-container {
    position: relative;
    width: 100%;
    height: 350px;
  }

  .todo-card {
    .el-timeline {
      padding-left: 0;
    }
  }
}
</style>
