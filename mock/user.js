const tokens = {
  'WS0001': {
    token: 'workshop-token',
    roles: ['workshop']
  },
  'LD0001': {
    token: 'leader-token',
    roles: ['leader']
  },
  'AD0001': {
    token: 'admin-token',
    roles: ['admin']
  }
}

const users = {
  'workshop-token': {
    roles: ['workshop'],
    name: '张主任',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    introduction: '车间主任'
  },
  'leader-token': {
    roles: ['leader'],
    name: '王总',
    avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
    introduction: '领导'
  },
  'admin-token': {
    roles: ['admin'],
    name: '管理员',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    introduction: '系统管理员'
  }
}

module.exports = [
  // 用户登录
  {
    url: '/vue-element-admin/user/login',
    type: 'post',
    response: config => {
      const { username, password, role } = config.body
      const token = tokens[username]

      // 验证用户名
      if (!token) {
        return {
          code: 60204,
          message: '账号或密码不正确。'
        }
      }

      // 验证密码
      const validPasswords = {
        'WS0001': 'ws123456',
        'LD0001': 'ld123456',
        'AD0001': 'ad123456'
      }

      if (password !== validPasswords[username]) {
        return {
          code: 60204,
          message: '账号或密码不正确。'
        }
      }

      // 验证角色 - 直接使用前端传来的role进行验证
      if (!token.roles.includes(role)) {
        return {
          code: 60205,
          message: '账号与所选角色不匹配。'
        }
      }

      return {
        code: 20000,
        data: {
          token: token.token,
          roles: token.roles
        }
      }
    }
  },

  // 获取用户信息
  {
    url: '/vue-element-admin/user/info.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      if (!info) {
        return {
          code: 50008,
          message: '登录失败，无法获取用户详细信息。'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // 用户登出
  {
    url: '/vue-element-admin/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
