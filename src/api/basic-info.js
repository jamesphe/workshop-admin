import request from '@/utils/request'

// 教师一张表接口
export function getTeacherInfo(teacherId) {
  return request({
    url: '/api/teacher/info',
    method: 'get',
    params: { teacherId }
  })
}

export function updateTeacherInfo(data) {
  return request({
    url: '/api/teacher/info',
    method: 'put',
    data
  })
}

// 学生一张表接口
export function getStudentInfo(studentId) {
  return request({
    url: '/api/student/info',
    method: 'get',
    params: { studentId }
  })
}

export function updateStudentInfo(data) {
  return request({
    url: '/api/student/info',
    method: 'put',
    data
  })
} 