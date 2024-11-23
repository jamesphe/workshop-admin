const Mock = require('mockjs')

const teacherList = []
const count = 100

for (let i = 0; i < count; i++) {
  teacherList.push(Mock.mock({
    // 1. 基本信息
    id: '@increment',
    name: '@cname',
    gender: '@pick(["male", "female", "other"])',
    dateOfBirth: '@date',
    idCard: /^\d{18}$/,
    nationality: '中国',
    ethnicity: '@pick(["汉族", "满族", "回族", "藏族", "维吾尔族"])',
    politicalStatus: '@pick(["中共党员", "中共预备党员", "共青团员", "民主党派", "群众"])',
    phoneNumber: /^1[3-9]\d{9}$/,
    email: '@email',
    address: '@county(true)',
    photo: '@image("200x200")',

    // 2. 教职信息
    employeeNumber: /^T\d{6}$/,
    department: '@pick([["教学部门", "计算机系"], ["教学部门", "机械系"], ["行政部门", "教务处"], ["行政部门", "学生处"]])',
    position: '@pick(["教授", "副教授", "讲师", "助教"])',
    employmentType: '@pick(["正式", "兼职", "临时"])',
    hireDate: '@date',
    contractEndDate: '@date',
    employmentStatus: '@pick(["在职", "离职", "退休"])',
    salaryGrade: '@pick(["一级", "二级", "三级", "四级"])',
    workload: '@integer(10, 20)',
    teachingSubject: '@pick(["Java程序设计", "数据结构", "计算机网络", "操作系统"])',

    // 3. 教学与科研信息
    teachingCourses: function() {
      const courses = []
      const count = Mock.Random.integer(1, 4)
      for (let i = 0; i < count; i++) {
        courses.push({
          name: Mock.Random.pick(['Java程序设计', '数据结构', '计算机网络', '操作系统']),
          credit: Mock.Random.float(2, 4, 1, 1),
          hours: Mock.Random.integer(32, 64)
        })
      }
      return courses
    },
    courseCount: '@integer(1, 4)',
    classInfo: function() {
      const classes = []
      const count = Mock.Random.integer(1, 3)
      for (let i = 0; i < count; i++) {
        classes.push({
          name: `计算机${Mock.Random.integer(1, 4)}班`,
          studentCount: Mock.Random.integer(30, 45)
        })
      }
      return classes
    },
    evaluationScore: '@float(80, 100, 1, 1)',
    researchProjectsCount: '@integer(0, 5)',
    publishedPapers: '@integer(0, 10)',
    patents: '@integer(0, 3)',
    awards: function() {
      const awards = []
      const count = Mock.Random.integer(0, 3)
      for (let i = 0; i < count; i++) {
        awards.push({
          name: Mock.Random.ctitle(10, 20),
          level: Mock.Random.pick(['国家级', '省级', '市级']),
          date: Mock.Random.date()
        })
      }
      return awards
    },

    // 4. 行政与绩效信息
    administrativeDuties: '@pick(["教研室主任", "系主任", "教务处长", null])',
    performanceScore: '@float(60, 100, 1, 1)',
    performanceNotes: '@cparagraph(1)',
    taskCount: '@integer(5, 15)',

    // 5. 系统登录与权限
    username: function() {
      return this.employeeNumber.toLowerCase()
    },
    accountStatus: '@pick(["active", "frozen", "disabled"])',
    lastLogin: '@datetime',
    role: '@pick(["teacher", "admin", "department_head"])',

    // 6. 扩展信息
    emergencyContact: '@cname',
    emergencyPhone: /^1[3-9]\d{9}$/,
    healthStatus: '@pick(["健康", "良好", "一般"])',
    remarks: '@cparagraph(1)'
  }))
}

module.exports = [
  // 获取教师列表
  {
    url: '/vue-element-admin/teacher/list',
    type: 'get',
    response: config => {
      const { keyword, department, position, employmentType, employmentStatus, page = 1, limit = 10 } = config.query

      const mockList = teacherList.filter(item => {
        if (keyword && !item.name.includes(keyword) && !item.employeeNumber.includes(keyword)) {
          return false
        }
        if (department && department.length > 0) {
          const [type, dept] = department
          if (item.department[0] !== type || item.department[1] !== dept) {
            return false
          }
        }
        if (position && item.position !== position) {
          return false
        }
        if (employmentType && item.employmentType !== employmentType) {
          return false
        }
        if (employmentStatus && item.employmentStatus !== employmentStatus) {
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

  // 获取教师详情
  {
    url: '/vue-element-admin/teacher/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      const teacher = teacherList.find(item => item.id === +id)
      return {
        code: 20000,
        data: teacher
      }
    }
  },

  // 创建教师
  {
    url: '/vue-element-admin/teacher/create',
    type: 'post',
    response: config => {
      const teacher = {
        id: Mock.mock('@increment'),
        ...config.body
      }
      teacherList.unshift(teacher)
      return {
        code: 20000,
        data: teacher
      }
    }
  },

  // 更新教师
  {
    url: '/vue-element-admin/teacher/update',
    type: 'put',
    response: config => {
      const { id } = config.body
      const index = teacherList.findIndex(item => item.id === id)
      if (index > -1) {
        teacherList[index] = Object.assign(teacherList[index], config.body)
        return {
          code: 20000,
          data: teacherList[index]
        }
      }
      return {
        code: 50000,
        message: '教师不存在'
      }
    }
  },

  // 删除教师
  {
    url: '/vue-element-admin/teacher/delete',
    type: 'delete',
    response: config => {
      const { id } = config.query
      const index = teacherList.findIndex(item => item.id === +id)
      if (index > -1) {
        teacherList.splice(index, 1)
        return {
          code: 20000,
          data: 'success'
        }
      }
      return {
        code: 50000,
        message: '教师不存在'
      }
    }
  }
] 