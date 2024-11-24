const Mock = require('mockjs')

const students = []
const count = 100

for (let i = 0; i < count; i++) {
  students.push(Mock.mock({
    id: '@increment',
    studentNumber: /^2020\d{6}$/,
    name: '@cname',
    gender: '@pick(["male", "female"])',
    dateOfBirth: '@date',
    politicalStatus: '@pick(["群众", "共青团员", "中共党员"])',
    department: ['@pick(["理工学院", "文学院"])', '@pick(["计算机系", "机械系", "中文系", "外语系"])'],
    major: '@pick(["计算机科学与技术", "软件工程", "机械工程", "中国语言文学", "英语"])',
    grade: '@pick([2020, 2021, 2022, 2023])',
    class: '@natural(1, 10)',
    status: '@pick(["在读", "休学", "退学", "毕业"])',
    gpa: '@float(2, 4, 2, 2)',
    credits: '@integer(0, 150)',
    ranking: '@integer(1, 100)',
    totalStudents: 100,
    phoneNumber: /^1[3-9]\d{9}$/,
    email: '@email'
  }))
}

module.exports = [
  {
    url: '/student/list',
    type: 'get',
    response: config => {
      const { keyword, department, grade, status, page = 1, limit = 10 } = config.query

      const mockList = students.filter(item => {
        if (keyword && !item.name.includes(keyword) && !item.studentNumber.includes(keyword)) {
          return false
        }
        if (department && department.length && !department.every((dep, index) => item.department[index] === dep)) {
          return false
        }
        if (grade && item.grade !== parseInt(grade)) {
          return false
        }
        if (status && item.status !== status) {
          return false
        }
        return true
      })

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/student/:id',
    type: 'get',
    response: config => {
      const { id } = config.params
      const student = students.find(item => item.id === parseInt(id))
      return {
        code: 20000,
        data: student
      }
    }
  },
  {
    url: '/student',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/student/:id',
    type: 'put',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/student/:id',
    type: 'delete',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
] 