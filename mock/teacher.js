const Mock = require('mockjs')

// 使用 Random User API 生成亚裔教师头像
const getAvatarUrl = (gender) => {
  // 根据性别选择不同的头像集合
  // gender 为 'male', 'female' 或 'other'
  let portraitType = 'men'
  if (gender === 'female') {
    portraitType = 'women'
  } else if (gender === 'other') {
    // 对于其他性别随机选择
    portraitType = Mock.Random.pick(['men', 'women'])
  }
  
  // 使用 randomuser.me 的 API 参数来获取中国头像
  // 添加 ?nat=CN 参数来获取中国头像
  // 生成0-99的随机数作为头像id
  const id = Mock.Random.integer(0, 99)
  return `https://randomuser.me/api/portraits/${portraitType}/${id}.jpg?nat=CN`
}

// 定义班级列表
const classList = [
  '计算机2101班',
  '计算机2102班',
  '计算机2103班',
  '计算机2201班',
  '计算机2202班',
  '计算机2203班',
  '计算机2301班',
  '计算机2302班',
  '计算机2303班'
]

// 定义职称晋升历程
const generateCareerPath = (hireDate, position) => {
  const careerPath = []
  const positions = ['助教', '讲师', '副教授', '教授']
  const currentIndex = positions.indexOf(position)
  
  let currentDate = new Date(hireDate)
  
  // 入职记录
  careerPath.push({
    title: '入职',
    content: '加入学校，任助教职务',
    date: hireDate,
    type: 'success'
  })

  // 职称晋升记录
  for (let i = 1; i <= currentIndex; i++) {
    currentDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + Mock.Random.integer(3, 5)))
    careerPath.push({
      title: '职称晋升',
      content: `晋升为${positions[i]}`,
      date: Mock.Random.date('yyyy-MM-dd', currentDate.toISOString().split('T')[0]),
      type: 'warning'
    })
  }

  // 添加行政职务记录
  if (Mock.Random.boolean()) {
    careerPath.push({
      title: '行政任命',
      content: Mock.Random.pick(['担任教研室主任', '担任系主任', '担任教务处长']),
      date: Mock.Random.date('yyyy-MM-dd', currentDate.toISOString().split('T')[0]),
      type: 'info'
    })
  }

  return careerPath.sort((a, b) => new Date(a.date) - new Date(b.date))
}

// 生成教学课程历史
const generateTeachingHistory = () => {
  const history = []
  const semesters = ['2022-2023-1', '2022-2023-2', '2023-2024-1', '2023-2024-2']
  
  semesters.forEach(semester => {
    const courseCount = Mock.Random.integer(1, 3)
    const courses = []
    for (let i = 0; i < courseCount; i++) {
      courses.push({
        name: Mock.Random.pick(['Java程序设计', '数据结构', '计算机网络', '操作系统', '软件工程', '数据库原理']),
        credit: Mock.Random.float(2, 4, 1, 1),
        hours: Mock.Random.integer(32, 64),
        studentCount: Mock.Random.integer(30, 120),
        evaluationScore: Mock.Random.float(80, 100, 1, 1)
      })
    }
    history.push({
      semester,
      courses
    })
  })
  
  return history
}

// 生成教师证书
const generateCertificates = () => {
  const certificates = []
  const count = Mock.Random.integer(2, 5)
  
  for (let i = 0; i < count; i++) {
    certificates.push({
      name: Mock.Random.pick([
        '高等学校教师资格证',
        '教学能力认证证书',
        '普通话等级证书',
        '计算机等级证书',
        '教学成果奖证书',
        '优秀教师证书'
      ]),
      number: Mock.Random.string('upper', 4) + Mock.Random.string('number', 8),
      issueDate: Mock.Random.date(),
      issuer: Mock.Random.pick(['教育部', '省教育厅', '市教育局', '学校']),
      validUntil: Mock.Random.date()
    })
  }
  
  return certificates
}

const teacherList = []
const count = 100

for (let i = 0; i < count; i++) {
  const hireDate = Mock.Random.date()
  const position = Mock.Random.pick(['教授', '副教授', '讲师', '助教'])
  
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
    photo() {
      return getAvatarUrl(this.gender)
    },

    // 2. 教职信息
    employeeNumber: /^T\d{6}$/,
    department: '@pick([["教学部门", "计算机系"], ["教学部门", "机械系"], ["行政部门", "教务处"], ["行政部门", "学生处"]])',
    position,
    employmentType: '@pick(["正式", "兼职", "临时"])',
    hireDate,
    contractEndDate: '@date',
    employmentStatus() {
      const random = Math.random() * 100
      if (random < 85) return '在职'
      if (random < 95) return '离职'
      return '退休'
    },
    salaryGrade: '@pick(["一级", "二级", "三级", "四级"])',
    workload: '@integer(10, 20)',
    teachingSubject: '@pick(["Java程序设计", "数据结构", "计算机网络", "操作系统"])',
    
    // 教职经历
    careerPath() {
      return generateCareerPath(hireDate, position)
    },
    
    // 教学历史
    teachingHistory() {
      return generateTeachingHistory()
    },
    
    // 证书信息
    certificates() {
      return generateCertificates()
    },
    
    // 教学荣誉
    honors() {
      const honors = []
      const count = Mock.Random.integer(0, 5)
      for (let i = 0; i < count; i++) {
        honors.push({
          name: Mock.Random.pick([
            '优秀教师',
            '教学名师',
            '教学成果奖',
            '教学质量优秀奖',
            '教书育人奖'
          ]),
          level: Mock.Random.pick(['校级', '市级', '省级', '国家级']),
          year: Mock.Random.integer(2020, 2024),
          issuer: Mock.Random.pick(['教育部', '省教育厅', '市教育局', '学校'])
        })
      }
      return honors
    },

    // 3. 教学信息 (保持原有内容，增加更多细节)
    teachingCourses: function() {
      const courses = []
      const count = Mock.Random.integer(1, 4)
      for (let i = 0; i < count; i++) {
        courses.push({
          name: Mock.Random.pick(['Java程序设计', '数据结构', '计算机网络', '操作系统', '软件工程', '数据库原理']),
          credit: Mock.Random.float(2, 4, 1, 1),
          hours: Mock.Random.integer(32, 64),
          studentCount: Mock.Random.integer(30, 120),
          classroom: `${Mock.Random.integer(1, 9)}号楼${Mock.Random.integer(101, 505)}`,
          schedule: `周${Mock.Random.integer(1, 5)} ${Mock.Random.integer(1, 5)}-${Mock.Random.integer(6, 8)}节`,
          evaluationScore: Mock.Random.float(80, 100, 1, 1)
        })
      }
      return courses
    },

    // 4. 教学与科研信息
    courseCount: '@integer(1, 4)',
    classInfo: function() {
      const classes = []
      const count = Mock.Random.integer(1, 3)
      // 从预定义的班级列表中随机选择不重复的班级
      const selectedClasses = Mock.Random.shuffle(classList).slice(0, count)
      selectedClasses.forEach(className => {
        classes.push({
          name: className,
          studentCount: Mock.Random.integer(30, 45)
        })
      })
      return classes
    },
    evaluationScore: '@float(80, 100, 1, 1)',
    researchProjects: function() {
      const projects = []
      const count = Mock.Random.integer(1, 5)
      for (let i = 0; i < count; i++) {
        projects.push({
          name: Mock.Random.ctitle(10, 20),
          code: /^[A-Z]\d{8}$/,
          role: Mock.Random.pick(['主持人', '参与者']),
          type: Mock.Random.pick(['国家级', '省部级', '市厅级', '校级']),
          status: Mock.Random.pick(['在研', '结题', '验收']),
          startDate: Mock.Random.date(),
          endDate: Mock.Random.date(),
          funding: Mock.Random.float(50000, 1000000, 2, 2)
        })
      }
      return projects
    },
    researchProjectsCount: '@integer(1, 5)',
    papers: function() {
      const papers = []
      const count = Mock.Random.integer(0, 10)
      for (let i = 0; i < count; i++) {
        papers.push({
          title: Mock.Random.ctitle(20, 50),
          journal: Mock.Random.ctitle(5, 10) + '期刊',
          type: Mock.Random.pick(['SCI', 'EI', 'CSSCI', '核心期刊']),
          date: Mock.Random.date(),
          impact: Mock.Random.float(0, 10, 2, 2),
          authors: Mock.Random.cname() + ',' + Mock.Random.cname() + ',' + Mock.Random.cname()
        })
      }
      return papers
    },
    publishedPapers: '@integer(0, 10)',
    patents: function() {
      const patents = []
      const count = Mock.Random.integer(0, 3)
      for (let i = 0; i < count; i++) {
        patents.push({
          name: Mock.Random.ctitle(10, 30),
          type: Mock.Random.pick(['发明专利', '实用新型专利', '外观设计专利']),
          status: Mock.Random.pick(['申请中', '已授权', '已转让']),
          number: /^[A-Z]\d{8}\.[0-9]$/,
          date: Mock.Random.date(),
          inventors: Mock.Random.cname() + ',' + Mock.Random.cname()
        })
      }
      return patents
    },
    patentsCount: '@integer(0, 3)',
    awards: function() {
      const awards = []
      const count = Mock.Random.integer(0, 5)
      for (let i = 0; i < count; i++) {
        awards.push({
          name: Mock.Random.ctitle(10, 30),
          level: Mock.Random.pick(['国家级', '省级', '市级']),
          grade: Mock.Random.pick(['特等奖', '一等奖', '二等奖', '三等奖']),
          date: Mock.Random.date(),
          issuer: Mock.Random.ctitle(3, 10),
          members: Mock.Random.cname() + ',' + Mock.Random.cname()
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