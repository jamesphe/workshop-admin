import request from '@/utils/request'

// 获取活动列表
export function getActivityList(query) {
  return request({
    url: '/vue-element-admin/activity/list',
    method: 'get',
    params: query
  })
}

// 获取活动详情
export function getActivityDetail(id) {
  return request({
    url: '/vue-element-admin/activity/detail',
    method: 'get',
    params: { id }
  })
}

// 创建活动
export function createActivity(data) {
  return request({
    url: '/vue-element-admin/activity/create',
    method: 'post',
    data
  })
}

// 更新活动
export function updateActivity(data) {
  return request({
    url: '/vue-element-admin/activity/update',
    method: 'post',
    data
  })
}

// 删除活动
export function deleteActivity(id) {
  return request({
    url: '/vue-element-admin/activity/delete',
    method: 'delete',
    params: { id }
  })
}

// 导出活动列表
export function exportActivity(query) {
  return request({
    url: '/vue-element-admin/activity/export',
    method: 'get',
    params: query
  })
} 