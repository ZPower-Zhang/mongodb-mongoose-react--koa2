const router = require('koa-router')()

router.prefix('/api')

function getQueryParameters(options) {
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') + '"}')
}

const bcrypt = require('bcryptjs')
const MongodbUser = require('../models/user')

module.exports = {
  async signin(ctx, next) {
    const parameters = getQueryParameters(ctx.req)
    const user = await MongodbUser.findOne({ name: parameters.name })
    console.info('user')
    console.info(user)

    ctx.body = {
      code: 0,
      data: {
        name: user.name,
        email: user.email
      }
    }
  },

  async signup(ctx, next) {
    console.log("22")
    const parameters = getQueryParameters(ctx.req)
    const salt = await bcrypt.genSalt(10)
    let { name, email, password, repassword } = ctx.request.body
    let errMsg = ''
    if (name === '') {
      errMsg = '用户名不能为空'
    } else if (email === '') {
      errMsg = 'email不能为空'
    } else if (password === '') {
      errMsg = '密码不能为空'
    } else if (password !== repassword) {
      errMsg = '两次密码不一样'
    }

    if (errMsg) {
      ctx.body = {
        code: 0,
        data: {
          msg: errMsg
        }
      }
      return
    }

    password = await bcrypt.hash(password, salt)
    const user = {
      name,
      email,
      password
    }

    const ret = await MongodbUser.save(user)
    
    if (ret && ret.error && ret.error.match('duplicate key')) {
      ctx.body = {
        code: 0,
        data: {
          msg: '用户名已存在'
        }
      }
      return
    }
    if (ret && !ret.error) {
      ctx.body = {
        code: 0,
        data: {
          msg: '用户名注册成功'
        }
      }
      return
    }

    // const user = await MongodbUser.findOne({ name: parameters.name })
    // console.log('ctx')
    // console.log(ctx)
    // ctx.body = {
    //   code: 0,
    //   data: {
    //     name: 'user.name',
    //     email: 'user.email'
    //   }
    // }
  }
}
