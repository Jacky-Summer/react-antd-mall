const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/manage', {
        target: 'http://adminv2.happymmall.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
            '^/manage': '/manage'
        }
    }),
    createProxyMiddleware('/user/logout.do', {
      target: 'http://adminv2.happymmall.com',
      changeOrigin: true,
      secure: false
    })
  )
}