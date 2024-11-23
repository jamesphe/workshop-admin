import request from '@/utils/request'

// 获取教师列表
export function getTeacherList(query) {
  return request({
    url: '/vue-element-admin/teacher/list',
    method: 'get',
    params: query
  })
}

// 获取教师详情
export function getTeacherDetail(id) {
  return request({
    url: '/vue-element-admin/teacher/detail',
    method: 'get',
    params: { id }
  })
}

// 创建教师
export function createTeacher(data) {
  return request({
    url: '/vue-element-admin/teacher/create',
    method: 'post',
    data
  })
}

// 更新教师
export function updateTeacher(data) {
  return request({
    url: '/vue-element-admin/teacher/update',
    method: 'put',
    data
  })
}

// 删除教师
export function deleteTeacher(id) {
  return request({
    url: '/vue-element-admin/teacher/delete',
    method: 'delete',
    params: { id }
  })
} 