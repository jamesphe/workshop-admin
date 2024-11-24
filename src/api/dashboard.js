import request from '@/utils/request'

export function getStatistics() {
  return request({
    url: '/vue-element-admin/dashboard/statistics',
    method: 'get'
  })
}

export function getTodoList() {
  return request({
    url: '/vue-element-admin/dashboard/todo',
    method: 'get'
  })
}

export function getChartData() {
  return request({
    url: '/vue-element-admin/dashboard/chart',
    method: 'get'
  })
} 