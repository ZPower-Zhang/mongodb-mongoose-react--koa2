const router = require('koa-router')()
const users = require('./user')

router.prefix('/api')

async function isLoginUser(ctx, next) {
  if (!ctx.session.user) {
    ctx.flash = { warning: '未登录, 请先登录' }
    return ctx.redirect('/signin')
  }
  await next()
}

async function isAdmin(ctx, next) {
  if (!ctx.session.user) {
    ctx.flash = { warning: '未登录, 请先登录' }
    return ctx.redirect('/signin')
  }
  if (!ctx.session.user.isAdmin) {
    ctx.flash = { warning: '没有权限' }
    return ctx.redirect('back')
  }
  await next()
}
module.exports = (app) => {
  router.post('/signup', users.signup)
  router.get('/signin', users.signin)
  app
    .use(router.routes())
    .use(router.allowedMethods())

  // 404
  app.use(async (ctx, next) => {
    await ctx.render('404', {
      title: 'page not find'
    })
  })
}

// module.exports = (app) => {
//   router.get('/', require('./home').index)
//   // router.get('/signup', require('./signup').index)
//   router.get('/signup', require('./user').signup)
//   router.post('/signup', require('./user').signup)
//   router.get('/signin', require('./user').signin)
//   router.post('/signin', require('./user').signin)
//   router.get('/signout', isLoginUser, require('./user').signout)

//   app
//     .use(router.routes())
//     .use(router.allowedMethods())

//   // 404
//   app.use(async (ctx, next) => {
//     await ctx.render('404', {
//       title: 'page not find'
//     })
//   })
// }

// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: Mongodb.query().name
//   })
// })

// router.get('/signup', async (ctx, next) => {
//   await ctx.render('signup', {

//   })
// })

// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

// module.exports = router
