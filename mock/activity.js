const Mock = require('mockjs')

// 生成活动列表数据
let activityList = []
const count = 50

// 初始化活动列表
function initActivityList() {
  activityList = []
  for (let i = 0; i < count; i++) {
    // 随机生成开始时间和结束时间
    // 生成开始时间，确保有合理的活动状态分布
    const now = new Date()
    const randomDays = Mock.Random.integer(-7, 14) // 在当前日期前后14天范围内
    const startDate = new Date(now)
    startDate.setDate(startDate.getDate() + randomDays)
    const startTime = startDate.toISOString().split('T')[0]
    
    // 生成结束时间，活动持续1-7天
    const endDate = new Date(startTime)
    endDate.setDate(endDate.getDate() + Mock.Random.integer(1, 7))
    const endTime = endDate.toISOString().split('T')[0]

    // 生成活动数据
    activityList.push(Mock.mock({
      id: '@increment',
      name() {
        const typeNames = {
          1: [ // 学生赛事活动
            '校园歌手大赛',
            '篮球联赛',
            '乒乓球比赛', 
            '校园马拉松',
            '书法大赛',
            '摄影展览',
            '辩论赛',
            '程序设计大赛',
            '创新创业大赛',
            '英语演讲比赛'
          ],
          2: [ // 社会实践活动
            '暑期"三下乡"',
            '企业实践调研',
            '创新创业实践',
            '文化遗产考察',
            '乡村振兴调研',
            '社区服务实践',
            '环保公益行动',
            '教育帮扶实践',
            '医疗卫生服务',
            '科技支农活动'
          ]
        }
        const year = new Date().getFullYear()
        const semester = new Date().getMonth() < 7 ? '春季' : '秋季'
        const baseName = typeNames[this.type][Mock.Random.integer(0, typeNames[this.type].length - 1)]
        return `${year}年${semester}${baseName}(第${Mock.Random.integer(1, 10)}期)`
      },
      type: '@integer(1, 2)', // 1:学生赛事活动 2:社会实践活动
      location() {
        const locationMap = {
          '校园歌手大赛': ['大礼堂', '音乐厅'],
          '篮球联赛': ['体育馆', '室外篮球场'],
          '乒乓球比赛': ['体育馆', '乒乓球室'],
          '校园马拉松': ['操场', '校园环道'],
          '书法大赛': ['美术馆', '书法室'],
          '摄影展览': ['艺术展厅', '图书馆展览区'],
          '辩论赛': ['大礼堂', '报告厅'],
          '程序设计大赛': ['计算机实验室', '机房'],
          '创新创业大赛': ['报告厅', '会议中心'],
          '英语演讲比赛': ['大礼堂', '国际会议厅'],
          '暑期"三下乡"': ['乡村基地', '社区服务站'],
          '企业实践调研': ['合作企业', '产业园区'],
          '创新创业实践': ['创业孵化基地', '科技园'],
          '文化遗产考察': ['文化遗址', '博物馆'],
          '乡村振兴调研': ['示范村', '农业基地'],
          '社区服务实践': ['社区中心', '服务站'],
          '环保公益行动': ['生态园区', '环保基地'],
          '教育帮扶实践': ['帮扶学校', '教育基地'],
          '医疗卫生服务': ['社区医院', '卫生服务中心'],
          '科技支农活动': ['农业科技园', '示范基地']
        }
        const activityName = this.name.split('年')[1].split('(')[0].slice(2)
        return Mock.Random.pick(locationMap[activityName] || ['会议中心', '报告厅'])
      },
      startTime,
      endTime,
      status() {
        const now = new Date()
        const start = new Date(startTime)
        const end = new Date(endTime)
        if (now < start) return 0 // 报名中
        if (now >= start && now <= end) return 1 // 进行中
        return 2 // 已结束
      },
      maxParticipants: '@integer(50, 200)',
      currentParticipants() {
        const status = this.status
        if (status === 0) {
          return Mock.Random.integer(this.maxParticipants * 0.2, this.maxParticipants * 0.8)
        } else {
          return Mock.Random.integer(this.maxParticipants * 0.6, this.maxParticipants)
        }
      },
      description: '@cparagraph(1, 3)',
      organizer: '@pick(["学生会", "团委", "社团联合会", "院系"])',
      contact: {
        name: '@cname',
        phone: /^1[3-9]\d{9}$/,
        email: '@email'
      },

      // 根据活动类型生成对应的信息
      activityInfo: function() {
        if (this.type === 1) { // 赛事活动特有信息
          return {
            competitionLevel: '@pick(["校级", "市级", "省级", "国家级"])', // 赛事级别
            competitionType: '@pick(["个人赛", "团体赛", "混合赛"])', // 赛事类型
            awards: [ // 奖项设置
              {
                name: '一等奖',
                count: '@integer(1, 3)',
                reward: '@integer(1000, 5000)元'
              },
              {
                name: '二等奖',
                count: '@integer(3, 5)',
                reward: '@integer(500, 1000)元'
              },
              {
                name: '三等奖',
                count: '@integer(5, 10)',
                reward: '@integer(100, 500)元'
              }
            ],
            rules: '@cparagraph(2, 4)', // 比赛规则
            schedule: [ // 赛程安排
              {
                stage: '初赛',
                time: '@datetime("yyyy-MM-dd HH:mm")',
                location: '@pick(["大礼堂", "体育馆", "报告厅"])'
              },
              {
                stage: '决赛',
                time: '@datetime("yyyy-MM-dd HH:mm")',
                location: '@pick(["大礼堂", "体育馆", "报告厅"])'
              }
            ],
            judges: '@integer(3, 7)人' // 评委人数
          }
        } else if (this.type === 2) { // 社会实践活动特有信息
          const practiceSite = Mock.mock('@city')
          const activityName = this.name
          return {
            practiceUnit: () => {
              // 根据实践地点和活动名称生成相关的实践单位
              if (activityName.includes('支教')) {
                return `${practiceSite}第${Mock.Random.integer(1, 10)}中学`
              } else if (activityName.includes('环保')) {
                return `${practiceSite}环境保护局`
              } else if (activityName.includes('医疗')) {
                return `${practiceSite}第${Mock.Random.integer(1, 5)}人民医院`
              } else if (activityName.includes('科技')) {
                return `${practiceSite}科技有限公司`
              } else {
                return `${practiceSite}${Mock.Random.ctitle(2, 4)}单位`
              }
            },
            practiceSite, // 实践地点
            practiceProject: '@ctitle(5, 10)', // 实践项目
            practiceContent: '@cparagraph(1, 2)', // 实践内容
            practiceType: '@pick(["暑期", "学期中", "寒假"])', // 实践类别
            teacherId: /^T\d{5}$/, // 指导教师工号
            requirements: '@cparagraph(1)', // 实践要求
            fundingSupport: '@integer(1000, 5000)元', // 经费支持
            insurance: '@pick(["已购买", "未购买"])', // 保险情况
            emergencyContact: { // 紧急联系人
              name: '@cname',
              phone: /^1[3-9]\d{9}$/,
              relation: '@pick(["父亲", "母亲", "监护人"])'
            }
          }
        }
        return null
      },

      // 报名学生列表
      participants: function() {
        const participants = []
        const count = this.currentParticipants
        for (let i = 0; i < count; i++) {
          const baseInfo = {
            studentId: /^2\d{7}$/,
            name: '@cname',
            className: '@pick(["计算机2101", "计算机2102", "计算机2103", "软件2101", "软件2102"])',
            phone: /^1[3-9]\d{9}$/,
            signUpTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
            status: '@pick([0, 1])', // 0:未签到 1:已
            remark: '@csentence(5, 15)'
          }

          // 根据活动类型添加不同的参与者信息
          if (this.type === 1) { // 赛事活动参与者信息
            Object.assign(baseInfo, {
              teamName: '@ctitle(3, 5)', // 团队名称（如果是团体赛）
              role: '@pick(["队长", "队员"])', // 团队角色
              rank: '@pick(["一等奖", "二等奖", "三等奖", "优胜奖", "未获奖"])', // 获奖情况
              score: '@float(60, 100, 1, 1)' // 比赛得分
            })
          } else if (this.type === 2) { // 社会实践活动参与者信息
            Object.assign(baseInfo, {
              practiceResult: '@pick(["优秀", "良好", "合格", "待评定"])', // 实践成果
              evaluation: '@cparagraph(1)', // 实践评价
              dailyReports: '@integer(3, 10)', // 日志数量
              materials: '@integer(1, 5)' // 提交材料数
            })
          }

          participants.push(baseInfo)
        }
        return participants
      }
    }))
  }
}

// 在模块加载时立即初始化活动列表
initActivityList()

// 获取活动详情 - 从 activityList 中获取
function getActivity(id) {
  return activityList.find(item => item.id === parseInt(id)) || null
}

module.exports = [
  // 获取活动列表
  {
    url: '/vue-element-admin/activity/list',
    type: 'get',
    response: config => {
      const { page = 1, limit = 10, type, status, name } = config.query
      
      let filteredList = [...activityList]
      
      // 根据查询条件过滤
      if (type !== '' && type !== undefined) {
        const typeNum = parseInt(type)
        filteredList = filteredList.filter(item => item.type === typeNum)
      }
      if (status !== '' && status !== undefined) {
        const statusNum = parseInt(status)
        filteredList = filteredList.filter(item => item.status === statusNum)
      }
      if (name && name.trim()) {
        filteredList = filteredList.filter(item => item.name.includes(name.trim()))
      }

      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const pageList = filteredList.slice(startIndex, endIndex)

      return {
        code: 20000,
        data: {
          total: filteredList.length,
          items: pageList
        }
      }
    }
  },

  // 获取活动详情
  {
    url: '/vue-element-admin/activity/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      const activity = getActivity(id)
      
      if (!activity) {
        return {
          code: 50004,
          message: '活动不存在'
        }
      }
      
      return {
        code: 20000,
        data: activity
      }
    }
  },

  // 创建活动
  {
    url: '/vue-element-admin/activity/create',
    type: 'post',
    response: config => {
      const activity = config.body
      
      // 生成新的ID
      const newId = activityList.length > 0 
        ? Math.max(...activityList.map(item => item.id)) + 1 
        : 1
      
      const newActivity = {
        ...activity,
        id: newId,
        createTime: new Date().toISOString(),
        currentParticipants: 0
      }
      
      activityList.unshift(newActivity)
      
      return {
        code: 20000,
        data: newActivity
      }
    }
  },

  // 更新活动
  {
    url: '/vue-element-admin/activity/update',
    type: 'post',
    response: config => {
      const { id } = config.body
      const index = activityList.findIndex(item => item.id === parseInt(id))
      
      if (index === -1) {
        return {
          code: 50004,
          message: '活动不存在'
        }
      }
      
      activityList[index] = {
        ...activityList[index],
        ...config.body,
        updateTime: new Date().toISOString()
      }

      return {
        code: 20000,
        data: activityList[index]
      }
    }
  },

  // 删除活动
  {
    url: '/vue-element-admin/activity/delete',
    type: 'delete',
    response: config => {
      const { id } = config.query
      const index = activityList.findIndex(item => item.id === parseInt(id))
      
      if (index === -1) {
        return {
          code: 50004,
          message: '活动不存在'
        }
      }
      
      activityList.splice(index, 1)

      return {
        code: 20000,
        data: {
          message: '删除成功'
        }
      }
    }
  },

  // 导出活动列表
  {
    url: '/vue-element-admin/activity/export',
    type: 'get',
    response: config => {
      const { type, status } = config.query
      let exportList = [...activityList]
      
      // 根据查询条件过滤导出数据
      if (type) {
        exportList = exportList.filter(item => item.type === parseInt(type))
      }
      if (status !== undefined) {
        exportList = exportList.filter(item => item.status === parseInt(status))
      }

      return {
        code: 20000,
        data: {
          list: exportList,
          message: '导出成功'
        }
      }
    }
  }
] 