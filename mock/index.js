const Mock = require('mockjs')
const { param2Obj } = require('./utils')

const user = require('./user')
const role = require('./role')
const article = require('./article')
const search = require('./remote-search')
const student = require('./student')
const teacher = require('./teacher')
const dashboard = require('./dashboard')

function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          body: body && JSON.parse(body),
          type: type,
          query: param2Obj(url),
          params: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  const mocks = [
    ...user,
    ...role,
    ...article,
    ...search,
    ...student,
    ...teacher,
    ...dashboard
  ]

  // 注册所有 mock 接口
  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

module.exports = {
  mocks: [
    ...user,
    ...role,
    ...article,
    ...search,
    ...student,
    ...teacher
  ],
  mockXHR
}
