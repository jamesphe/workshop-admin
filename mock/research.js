const Mock = require('mockjs')

// 科研项目数据
const projectList = []
const projectCount = 50

for (let i = 0; i < projectCount; i++) {
  projectList.push(Mock.mock({
    id: '@increment',
    name: '@ctitle(10, 30)',
    code: /^[A-Z]\d{8}$/,
    type: '@pick(["national", "provincial", "municipal", "school"])',
    leader: '@cname',
    startDate: '@date',
    endDate: '@date',
    budget: '@float(10000, 1000000, 2, 2)',
    status: '@pick(["preparing", "ongoing", "completed", "terminated"])',
    description: '@cparagraph(1, 3)',
    members: '@cname, @cname, @cname',
    department: '@pick(["计算机系", "机械系", "电子系"])'
  }))
}

// 科研成果数据
const achievementList = []
const achievementCount = 80

for (let i = 0; i < achievementCount; i++) {
  achievementList.push(Mock.mock({
    id: '@increment',
    name: '@ctitle(10, 30)',
    type: '@pick(["paper", "patent", "book", "award"])',
    author: '@cname',
    'coAuthors|0-3': ['@cname'],
    publishDate: '@date',
    level: '@pick(["national", "provincial", "municipal", "school"])',
    status: '@pick(["verified", "pending"])',
    description: '@cparagraph(1, 2)',
    attachment: '@pick([null, "file.pdf"])',
    department: '@pick(["计算机系", "机械系", "电子系"])'
  }))
}

// 学术活动数据
const activityList = []
const activityCount = 30

for (let i = 0; i < activityCount; i++) {
  activityList.push(Mock.mock({
    id: '@increment',
    name: '@ctitle(10, 30)',
    type: '@pick(["lecture", "conference", "forum", "seminar"])',
    speaker: '@cname',
    date: '@date',
    location: '@city(true)大学',
    status: '@pick(["upcoming", "ongoing", "completed", "cancelled"])',
    description: '@cparagraph(1, 2)',
    organizer: '@pick(["计算机系", "机械系", "电子系"])',
    'participants|10-50': ['@cname']
  }))
}

module.exports = [
  // 获取项目列表
  {
    url: '/vue-element-admin/research/projects',
    type: 'get',
    response: config => {
      const { type, status, keyword, page = 1, limit = 10 } = config.query

      const mockList = projectList.filter(item => {
        if (keyword && !item.name.includes(keyword) && !item.code.includes(keyword)) {
          return false
        }
        if (type && item.type !== type) {
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

  // 获取成果列表
  {
    url: '/vue-element-admin/research/achievements',
    type: 'get',
    response: config => {
      const { type, level, status, keyword, page = 1, limit = 10 } = config.query

      const mockList = achievementList.filter(item => {
        if (keyword && !item.name.includes(keyword) && !item.author.includes(keyword)) {
          return false
        }
        if (type && item.type !== type) {
          return false
        }
        if (level && item.level !== level) {
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

  // 获取活动列表
  {
    url: '/vue-element-admin/research/activities',
    type: 'get',
    response: config => {
      const { type, status, keyword, page = 1, limit = 10 } = config.query

      const mockList = activityList.filter(item => {
        if (keyword && !item.name.includes(keyword) && !item.speaker.includes(keyword)) {
          return false
        }
        if (type && item.type !== type) {
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
  }
] 