import request from '@/utils/request'

// 获取学生列表
export function getStudentList(params) {
  return request({
    url: '/vue-element-admin/student/list',
    method: 'get',
    params
  })
}

// 获取学生详情
export function getStudent(id) {
  return request({
    url: '/vue-element-admin/student/detail',
    method: 'get',
    params: { id }
  })
}

// 创建学生
export function createStudent(data) {
  return request({
    url: '/vue-element-admin/student/create',
    method: 'post',
    data
  })
}

// 更新学生
export function updateStudent(data) {
  return request({
    url: '/vue-element-admin/student/update',
    method: 'put',
    data
  })
}

// 删除学生
export function deleteStudent(id) {
  return request({
    url: '/vue-element-admin/student/delete',
    method: 'delete',
    params: { id }
  })
} 