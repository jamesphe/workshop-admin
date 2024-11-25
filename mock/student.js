const Mock = require('mockjs')

// 生成学生头像
const getAvatarUrl = (gender) => {
  // 使用更年轻的头像集合
  const youngMaleIds = [33, 42, 45, 47, 52, 55, 57, 61, 65, 68, 72, 75, 77, 83, 85]
  const youngFemaleIds = [31, 34, 37, 44, 46, 48, 53, 56, 58, 63, 66, 69, 73, 76, 79]
  
  let portraitType = 'men'
  let availableIds = youngMaleIds
  
  if (gender === 'female') {
    portraitType = 'women'
    availableIds = youngFemaleIds
  }
  
  // 从预设的年轻头像ID中随机选择
  const id = Mock.Random.pick(availableIds)
  return `https://randomuser.me/api/portraits/${portraitType}/${id}.jpg`
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

// 生成学习经历
const generateStudyHistory = () => {
  const history = []
  const semesters = ['2022-2023-1', '2022-2023-2', '2023-2024-1', '2023-2024-2']
  
  semesters.forEach(semester => {
    const courseCount = Mock.Random.integer(4, 6)
    const courses = []
    let totalScore = 0
    
    // 生成课程信息
    for (let i = 0; i < courseCount; i++) {
      const score = Mock.Random.integer(60, 100)
      totalScore += score
      courses.push({
        name: Mock.Random.pick([
          '语文',
          '数学',
          '英语',
          '计算机应用基础',
          '计算机网络基础',
          '数据库基础',
          'Java程序设计',
          'Web前端开发',
          '软件测试基础',
          '网络安全基础',
          '操作系统基础',
          '职业素养',
          '就业指导'
        ]),
        credit: Mock.Random.integer(2, 4),
        score,
        teacher: Mock.Random.cname()
      })
    }

    history.push({
      semester,
      averageScore: (totalScore / courseCount).toFixed(1),
      ranking: Mock.Random.integer(1, 100),
      courses
    })
  })
  
  return history
}

// 生成证书信息
const generateCertificates = () => {
  const certificates = []
  const count = Mock.Random.integer(1, 4)
  
  for (let i = 0; i < count; i++) {
    certificates.push({
      name: Mock.Random.pick([
        '大学英语四级证书',
        '大学英语六级证书',
        '计算机等级证书',
        '普通话等级证书',
        '教师资格证书'
      ]),
      number: Mock.Random.string('upper', 4) + Mock.Random.string('number', 8),
      issueDate: Mock.Random.date(),
      issuer: Mock.Random.pick(['教育部', '省教育厅', '市教育局', '学校']),
      score: Mock.Random.integer(425, 600)
    })
  }
  
  return certificates
}

// 根据性别生成姓名
const generateName = (gender) => {
  // 常见姓氏
  const surnames = ['张', '王', '李', '赵', '陈', '刘', '杨', '黄', '周', '吴']
  
  // 男性名字常用字
  const maleNames = ['伟', '强', '军', '磊', '明', '超', '浩', '光', '建', '晓', '志', '宇', '兴', '旭']
  
  // 女性名字常用字
  const femaleNames = ['芳', '娟', '敏', '静', '秀', '丽', '婷', '颖', '洁', '燕', '玲', '雪', '琳', '莉']
  
  const surname = Mock.Random.pick(surnames)
  const nameChars = gender === 'male' ? maleNames : femaleNames
  
  // 随机生成一个或两个字的名字
  const nameLength = Mock.Random.integer(1, 2)
  let name = ''
  for (let i = 0; i < nameLength; i++) {
    name += Mock.Random.pick(nameChars)
  }
  
  return surname + name
}

const studentList = []
const count = 100

for (let i = 0; i < count; i++) {
  const totalCredits = Mock.Random.integer(0, 150)
  const requiredCredits = 150
  const averageScore = Mock.Random.integer(60, 100)
  const gender = Mock.Random.pick(['male', 'female'])  // 先生成性别
  const name = generateName(gender)  // 根据性别生成对应的姓名

  studentList.push({
    // 基本信息
    id: i + 1,
    name,  // 使用生成的姓名
    studentNumber: `2020${Mock.Random.string('number', 6)}`,
    gender,  // 使用生成的性别
    dateOfBirth: Mock.Random.date(),
    politicalStatus: Mock.Random.pick(['群众', '共青团员', '中共党员']),
    department: [
      Mock.Random.pick(['理工学院', '文学院']),
      Mock.Random.pick(['计算机系', '机械系', '中文系', '外语系'])
    ],
    major: Mock.Random.pick(['计算机科学与技术', '软件工程', '机械工程', '中国语言文学', '英语']),
    grade: Mock.Random.pick([2020, 2021, 2022, 2023]),
    class: Mock.Random.pick(classList),
    status: Mock.Random.pick(['在读', '休学', '退学', '毕业']),
    photo: getAvatarUrl(gender),  // 使用相同的性别生成头像

    // 学籍信息
    enrollmentDate: Mock.Random.date(),
    expectedGraduationDate: Mock.Random.date(),
    studentType: Mock.Random.pick(['普通全日制', '专升本', '第二学位']),
    educationLevel: Mock.Random.pick(['本科', '专科']),
    dormitory: `学生公寓${Mock.Random.natural(1, 20)}栋${Mock.Random.natural(101, 601)}`,

    // 学习信息
    averageScore,
    totalCredits,
    requiredCredits,
    ranking: Mock.Random.integer(1, 100),
    totalStudents: 100,
    studyHistory: generateStudyHistory(),
    currentCourses: Array(Mock.Random.integer(4, 6)).fill().map(() => ({
      name: Mock.Random.pick(['高等数学', '大学物理', '程序设计', '数据结构', '计算机网络', '操作系统']),
      credit: Mock.Random.integer(2, 4),
      teacher: Mock.Random.cname(),
      classroom: `${Mock.Random.integer(1, 9)}号楼${Mock.Random.integer(101, 505)}`,
      schedule: `周${Mock.Random.integer(1, 5)} ${Mock.Random.integer(1, 5)}-${Mock.Random.integer(6, 8)}节`
    })),

    // 奖惩信息
    awards: Array(Mock.Random.integer(0, 3)).fill().map(() => ({
      name: Mock.Random.pick(['三好学生', '优秀学生干部', '学科竞赛奖', '创新创业奖']),
      level: Mock.Random.pick(['校级', '市级', '省级', '国家级']),
      date: Mock.Random.date()
    })),
    scholarships: Array(Mock.Random.integer(0, 2)).fill().map(() => ({
      name: Mock.Random.pick(['国家奖学金', '国家励志奖学金', '校级奖学金', '企业奖学金']),
      amount: Mock.Random.pick([8000, 5000, 3000, 2000]),
      date: Mock.Random.date()
    })),
    punishments: Array(Mock.Random.integer(0, 1)).fill().map(() => ({
      name: Mock.Random.pick(['违反课堂纪律', '违反宿舍规定', '考试作弊']),
      type: Mock.Random.pick(['警告', '严重警告', '记过', '记大过']),
      date: Mock.Random.date()
    })),

    // 联系信息
    phoneNumber: Mock.mock(/^1[3-9]\d{9}$/),
    email: Mock.Random.email(),
    address: `${Mock.Random.province()}${Mock.Random.city()}${Mock.Random.county()}${Mock.Random.ctitle(10)}`,
    idCard: Mock.mock(/^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[0-9X]$/),
    emergencyContact: Mock.Random.cname(),
    emergencyPhone: Mock.mock(/^1[3-9]\d{9}$/),

    // 系统信息
    accountStatus: Mock.Random.pick(['active', 'locked', 'disabled']),
    lastLoginTime: Mock.Random.datetime(),
    remarks: Mock.Random.cparagraph(1),

    // 证书信息
    certificates: generateCertificates()
  })
}

module.exports = [
  // 获取学生列表
  {
    url: '/vue-element-admin/student/list',
    type: 'get',
    response: config => {
      const { keyword, department, grade, status, page = 1, limit = 10 } = config.query

      const mockList = studentList.filter(item => {
        if (keyword && !item.name.includes(keyword) && !item.studentNumber.includes(keyword)) {
          return false
        }
        if (department && department.length > 0) {
          const [type, dept] = department
          if (item.department[0] !== type || item.department[1] !== dept) {
            return false
          }
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

  // 获取学生详情
  {
    url: '/vue-element-admin/student/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      const student = studentList.find(item => item.id === +id)
      return {
        code: 20000,
        data: student
      }
    }
  },

  // 创建学生
  {
    url: '/vue-element-admin/student/create',
    type: 'post',
    response: config => {
      const student = {
        id: Mock.mock('@increment'),
        ...config.body
      }
      studentList.unshift(student)
      return {
        code: 20000,
        data: student
      }
    }
  },

  // 更新学生
  {
    url: '/vue-element-admin/student/update',
    type: 'put',
    response: config => {
      const { id } = config.body
      const index = studentList.findIndex(item => item.id === id)
      if (index > -1) {
        studentList[index] = Object.assign(studentList[index], config.body)
        return {
          code: 20000,
          data: studentList[index]
        }
      }
      return {
        code: 50000,
        message: '学生不存在'
      }
    }
  },

  // 删除学生
  {
    url: '/vue-element-admin/student/delete',
    type: 'delete',
    response: config => {
      const { id } = config.query
      const index = studentList.findIndex(item => item.id === +id)
      if (index > -1) {
        studentList.splice(index, 1)
        return {
          code: 20000,
          data: 'success'
        }
      }
      return {
        code: 50000,
        message: '学生不存在'
      }
    }
  }
] 