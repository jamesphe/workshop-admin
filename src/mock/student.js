const students = [
  {
    studentNumber: '20210101',
    name: '张三',
    gender: 'male',
    className: '软件2101',
    major: '软件工程',
    phoneNumber: '13800138001',
    status: '在读',
    idCard: '330102199901011234',
    birthDate: '1999-01-01',
    ethnicity: '汉族',
    politicalStatus: '共青团员',
    email: 'zhangsan@example.com',
    address: '浙江省杭州市西湖区'
  },
  {
    studentNumber: '20210102',
    name: '李四',
    gender: 'female',
    className: '软件2101',
    major: '软件工程',
    phoneNumber: '13800138002',
    status: '在读',
    idCard: '330102199902022345',
    birthDate: '1999-02-02',
    ethnicity: '汉族',
    politicalStatus: '群众',
    email: 'lisi@example.com',
    address: '浙江省宁波市海曙区'
  },
  {
    studentNumber: '20210103',
    name: '王五',
    gender: 'male',
    className: '计科2101',
    major: '计算机科学与技术',
    phoneNumber: '13800138003',
    status: '休学',
    idCard: '330102199903033456',
    birthDate: '1999-03-03',
    ethnicity: '满族',
    politicalStatus: '共青团员',
    email: 'wangwu@example.com',
    address: '浙江省温州市鹿城区'
  },
  {
    studentNumber: '20210104',
    name: '赵六',
    gender: 'female',
    className: '计科2101',
    major: '计算机科学与技术',
    phoneNumber: '13800138004',
    status: '在读',
    idCard: '330102199904044567',
    birthDate: '1999-04-04',
    ethnicity: '汉族',
    politicalStatus: '中共党员',
    email: 'zhaoliu@example.com',
    address: '浙江省嘉兴市南湖区'
  },
  {
    studentNumber: '20210201',
    name: '孙七',
    gender: 'male',
    className: '网工2102',
    major: '网络工程',
    phoneNumber: '13800138005',
    status: '在读',
    idCard: '330102199905055678',
    birthDate: '1999-05-05',
    ethnicity: '壮族',
    politicalStatus: '共青团员',
    email: 'sunqi@example.com',
    address: '浙江省湖州市吴兴区'
  }
]

export default [
  // 获取学生列表
  {
    url: '/dev-api/api/student/list',
    type: 'get',
    response: config => {
      const { studentNumber, name, className, status, pageNum = 1, pageSize = 10 } = config.query

      const mockList = students.filter(item => {
        if (studentNumber && item.studentNumber.indexOf(studentNumber) < 0) return false
        if (name && item.name.indexOf(name) < 0) return false
        if (className && item.className !== className) return false
        if (status && item.status !== status) return false
        return true
      })

      const pageList = mockList.filter((item, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1))

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
    url: '/dev-api/api/student/detail',
    type: 'get',
    response: config => {
      const { studentNumber } = config.query
      const student = students.find(item => item.studentNumber === studentNumber)
      
      return {
        code: 20000,
        data: student
      }
    }
  },

  // 删除学生
  {
    url: '/dev-api/api/student/delete',
    type: 'delete',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
] 