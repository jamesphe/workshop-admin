import request from '@/utils/request'

// 获取学生列表
export function getStudentList(params) {
  return request({
    url: '/student/list',
    method: 'get',
    params
  })
}

// 获取学生详情
export function getStudent(id) {
  return request({
    url: `/student/${id}`,
    method: 'get'
  })
}

// 创建学生
export function createStudent(data) {
  return request({
    url: '/student',
    method: 'post',
    data
  })
}

// 更新学生
export function updateStudent(id, data) {
  return request({
    url: `/student/${id}`,
    method: 'put',
    data
  })
}

// 删除学生
export function deleteStudent(id) {
  return request({
    url: `/student/${id}`,
    method: 'delete'
  })
} 