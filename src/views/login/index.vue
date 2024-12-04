<template>
  <div class="login-container">
    <div class="login-box">
      <div class="platform-info">
        <img src="@/assets/logo.svg" class="platform-logo" alt="logo">
        <h2 class="platform-name">车间管理系统</h2>
        <p class="platform-desc">山西水塔醋业生产管理平台</p>
      </div>
      
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on">
        <div class="welcome-text">
          <p class="welcome">欢迎登录</p>
          <p class="sub-welcome">请使用您的工号和密码登录系统</p>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="工号"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="大写锁定已开启" placement="right" manual>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="密码"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:20px;" @click.native.prevent="handleLogin">
          {{ loading ? '登录中...' : '登 录' }}
        </el-button>

        <div class="login-footer">
          <div class="role-select">
            <span class="role-item" :class="{ active: currentRole === 'workshop' }" @click="switchRole('workshop')">车间主任</span>
            <span class="role-item" :class="{ active: currentRole === 'leader' }" @click="switchRole('leader')">领导</span>
            <span class="role-item" :class="{ active: currentRole === 'admin' }" @click="switchRole('admin')">管理员</span>
          </div>
          <div class="copyright">© 2024 山西水塔醋业 版权所有</div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {
    // 删除未使用的 SocialSign 组件
  },
  data() {
    // 自定义用户名验证规则
    const validateUsername = (rule, value, callback) => {
      // 检查是否为空
      if (!value) {
        callback(new Error('请输入工号'))
        return
      }
      
      // 验证工号格式
      const usernamePattern = {
        workshop: /^WS\d{4}$/, // WS0001-WS9999
        leader: /^LD\d{4}$/, // LD0001-LD9999
        admin: /^AD\d{4}$/ // AD0001-AD9999
      }
      
      const pattern = usernamePattern[this.currentRole]
      if (!pattern.test(value)) {
        callback(new Error('工号格式不正确'))
        return
      }
      
      callback()
    }

    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
        return
      }
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
        return
      }
      callback()
    }

    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      currentRole: 'workshop',
      mockAccounts: {
        workshop: {
          username: 'WS0001', // 车间主任工号
          password: 'ws123456'
        },
        leader: {
          username: 'LD0001', // 领导工号
          password: 'ld123456'
        },
        admin: {
          username: 'AD0001', // 管理员工号
          password: 'ad123456'
        }
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
    this.loginForm.username = this.mockAccounts[this.currentRole].username
    this.loginForm.password = this.mockAccounts[this.currentRole].password
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', {
            username: this.loginForm.username,
            password: this.loginForm.password,
            role: this.currentRole
          }).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(error => {
            this.$message.error(error || '登录失败')
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    switchRole(role) {
      this.currentRole = role
      this.loginForm.username = this.mockAccounts[role].username
      this.loginForm.password = this.mockAccounts[role].password
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100vh;
  width: 100%;
  background: url('~@/assets/factory-bg.png') center center / cover no-repeat fixed;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
    backdrop-filter: blur(5px);
  }

  .login-box {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .platform-info {
    text-align: center;
    margin-bottom: 25px;

    .platform-logo {
      width: 90px;
      height: 90px;
      margin-bottom: 15px;
      filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
    }

    .platform-name {
      color: #fff;
      font-size: 32px;
      font-weight: 600;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      letter-spacing: 2px;
      margin-bottom: 8px;
    }

    .platform-desc {
      color: rgba(255, 255, 255, 0.9);
      font-size: 16px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }
  }

  .login-form {
    width: 440px;
    max-width: 90%;
    padding: 35px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .welcome-text {
    text-align: center;
    margin-bottom: 30px;

    .welcome {
      font-size: 24px;
      color: #2c3e50;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .sub-welcome {
      font-size: 14px;
      color: #7f8c8d;
    }
  }

  .el-form-item {
    border: 1px solid #e8e8e8;
    background: #fff;
    border-radius: 12px;
    margin-bottom: 25px;
    transition: all 0.3s ease;
    overflow: hidden;
    position: relative;
    
    &:hover {
      border-color: #409EFF;
      box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
    }

    &:focus-within {
      border-color: #409EFF;
      box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.15);
    }
  }

  .el-input {
    width: 100%;
    
    input {
      color: #2c3e50;
      font-size: 15px;
      padding: 12px 15px 12px 45px !important;
      height: 52px;
      background: transparent;
      border: none;
      border-radius: 12px;
      transition: all 0.3s;
      
      &::placeholder {
        color: #95a5a6;
        font-size: 14px;
      }

      &:focus {
        background: rgba(64, 158, 255, 0.02);
        
        & + .svg-container {
          .svg-icon {
            color: #409EFF;
          }
        }
      }
    }
  }

  .el-button--primary {
    height: 48px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    background: #409EFF;
    border: none;
    transition: all 0.3s ease;
    margin-top: 10px;

    &:hover {
      background: #66b1ff;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .login-footer {
    text-align: center;
    
    .role-select {
      margin-bottom: 15px;
      display: flex;
      justify-content: center;
      gap: 15px;

      .role-item {
        padding: 6px 12px;
        font-size: 14px;
        color: #666;
        cursor: pointer;
        border-radius: 4px;
        transition: all 0.3s ease;

        &:hover {
          color: #409EFF;
          background: rgba(64, 158, 255, 0.1);
        }

        &.active {
          color: #409EFF;
          background: rgba(64, 158, 255, 0.1);
          font-weight: 500;
        }
      }
    }

    .copyright {
      font-size: 12px;
      color: #999;
      margin-top: 15px;
    }
  }

  .svg-container {
    padding: 0 15px;
    color: #909399;
    font-size: 18px;
    transition: all 0.3s;
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center;
    
    .svg-icon {
      transition: all 0.3s;
    }
  }

  .show-pwd {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #909399;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;

    &:hover {
      color: #409EFF;
      background: rgba(64, 158, 255, 0.1);
    }
  }

  .el-form-item--password {
    .el-input input {
      padding-right: 45px !important;
    }
  }

  @keyframes input-focus {
    0% {
      background: transparent;
    }
    100% {
      background: rgba(64, 158, 255, 0.02);
    }
  }

  @media screen and (max-width: 768px) {
    .login-form {
      padding: 25px;
    }

    .platform-info {
      .platform-logo {
        width: 70px;
        height: 70px;
      }

      .platform-name {
        font-size: 26px;
      }

      .platform-desc {
        font-size: 14px;
      }
    }

    .welcome-text {
      .welcome {
        font-size: 20px;
      }
    }

    .login-footer {
      .role-select {
        gap: 10px;
        
        .role-item {
          padding: 4px 8px;
          font-size: 13px;
        }
      }
    }

    .el-form-item {
      margin-bottom: 20px;
    }

    .el-input input {
      height: 48px;
      font-size: 14px;
    }

    .svg-container {
      font-size: 16px;
    }
  }
}
</style>
