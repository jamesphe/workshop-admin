const Mock = require('mockjs')

const productionData = Mock.mock({
  'dates|7': ['@date("MM-dd")'],
  'production|7': ['@integer(1000, 3000)'],
  'efficiency|7': ['@float(60, 95, 1, 1)'],
  'cost|7': ['@float(1000, 2000, 1, 1)']
})

const todoList = [
  {
    type: 'warning',
    category: '借调申请',
    content: '原酿车间申请借调张三等2人',
    time: '2024-01-15 09:30:00'
  },
  {
    type: 'primary',
    category: '数据录入',
    content: '灌装车间1月14日产量数据待录入',
    time: '2024-01-15 08:00:00'
  },
  {
    type: 'success',
    category: '工资核算',
    content: '12月份工资核算已完成，请查看',
    time: '2024-01-14 17:30:00'
  },
  {
    type: 'info',
    category: '系统通知',
    content: '系统将于今晚22:00进行维护升级',
    time: '2024-01-14 16:00:00'
  }
]

module.exports = [
  // 获取仪表盘数据
  {
    url: '/vue-element-admin/dashboard/data',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: {
          todayProduction: Mock.mock('@integer(2000, 3000)'),
          onDutyCount: Mock.mock('@integer(40, 50)'),
          transferCount: Mock.mock('@integer(3, 8)'),
          totalSalary: Mock.mock('@integer(20000, 30000)'),
          chartData: productionData
        }
      }
    }
  },

  // 获取待办事项
  {
    url: '/vue-element-admin/dashboard/todo',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: todoList
      }
    }
  }
] 