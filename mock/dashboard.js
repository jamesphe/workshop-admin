const Mock = require('mockjs')

const statisticsData = [
  {
    label: '在校教师',
    value: Mock.mock('@integer(2000, 3000)'),
    icon: 'el-icon-user',
    color: '#409EFF',
    growth: Mock.mock('@float(-5, 8, 1, 1)')
  },
  {
    label: '在校学生',
    value: Mock.mock('@integer(30000, 35000)'),
    icon: 'el-icon-reading',
    color: '#67C23A',
    growth: Mock.mock('@float(-5, 8, 1, 1)')
  },
  {
    label: '待办事项',
    value: Mock.mock('@integer(20, 100)'),
    icon: 'el-icon-document',
    color: '#E6A23C',
    growth: Mock.mock('@float(-5, 8, 1, 1)')
  },
  {
    label: '系统消息',
    value: Mock.mock('@integer(0, 50)'),
    icon: 'el-icon-bell',
    color: '#F56C6C',
    growth: Mock.mock('@float(-5, 8, 1, 1)')
  }
]

const todoList = [
  {
    content: '教师资格证年度核验',
    time: Mock.mock('@date("yyyy-MM-dd")'),
    type: 'warning'
  },
  {
    content: '教学质量评估材料提交',
    time: Mock.mock('@date("yyyy-MM-dd")'),
    type: 'success'
  },
  {
    content: '学期教学计划审核',
    time: Mock.mock('@date("yyyy-MM-dd")'),
    type: 'primary'
  },
  {
    content: '教师继续教育课程学习',
    time: Mock.mock('@date("yyyy-MM-dd")'),
    type: 'info'
  },
  {
    content: '实验室安全检查',
    time: Mock.mock('@date("yyyy-MM-dd")'),
    type: 'warning'
  }
]

const chartData = {
  xAxis: ['1月', '2月', '3月', '4月', '5月', '6月'],
  series: [
    {
      name: '教务办理',
      data: Mock.mock({
        'array|6': ['@integer(100, 1000)']
      }).array
    },
    {
      name: '学生事务',
      data: Mock.mock({
        'array|6': ['@integer(100, 1000)']
      }).array
    },
    {
      name: '行政办公',
      data: Mock.mock({
        'array|6': ['@integer(100, 1000)']
      }).array
    }
  ]
}

module.exports = [
  {
    url: '/vue-element-admin/dashboard/statistics',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: statisticsData
      }
    }
  },
  {
    url: '/vue-element-admin/dashboard/todo',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: todoList
      }
    }
  },
  {
    url: '/vue-element-admin/dashboard/chart',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: chartData
      }
    }
  }
] 