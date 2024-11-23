import request from '@/utils/request'

// 科研项目相关接口
export function getProjectList(query) {
  return request({
    url: '/vue-element-admin/research/projects',
    method: 'get',
    params: query
  })
}

export function getProjectDetail(id) {
  return request({
    url: '/vue-element-admin/research/projects/' + id,
    method: 'get'
  })
}

// 科研成果相关接口
export function getAchievementList(query) {
  return request({
    url: '/vue-element-admin/research/achievements',
    method: 'get',
    params: query
  })
}

export function getAchievementDetail(id) {
  return request({
    url: '/vue-element-admin/research/achievements/' + id,
    method: 'get'
  })
}

// 学术活动相关接口
export function getActivityList(query) {
  return request({
    url: '/vue-element-admin/research/activities',
    method: 'get',
    params: query
  })
}

export function getActivityDetail(id) {
  return request({
    url: '/vue-element-admin/research/activities/' + id,
    method: 'get'
  })
} 