import request from '@/utils/request'

export function getDashboardData() {
  return request({
    url: '/vue-element-admin/dashboard/data',
    method: 'get'
  })
}

export function getTodoList() {
  return request({
    url: '/vue-element-admin/dashboard/todo',
    method: 'get'
  })
} 