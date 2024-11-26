import request from '@/utils/request'

export function getStatistics() {
  return request({
    url: '/vue-element-admin/dashboard/statistics',
    method: 'get'
  }).catch(error => {
    console.error('获取统计数据失败:', error)
    return { data: [] }
  })
}

export function getTodoList() {
  return request({
    url: '/vue-element-admin/dashboard/todo',
    method: 'get'
  }).catch(error => {
    console.error('获取待办事项失败:', error)
    return { data: [] }
  })
}

export function getChartData() {
  return request({
    url: '/vue-element-admin/dashboard/chart',
    method: 'get'
  }).catch(error => {
    console.error('获取图表数据失败:', error)
    return { 
      data: {
        xAxis: [],
        series: []
      }
    }
  })
} 