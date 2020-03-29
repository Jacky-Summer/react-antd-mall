const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/manage', {
        target: 'http://adminv2.happymmall.com',
        changeOrigin: true,
        pathRewrite: {
            '^/manage': '/manage'
        }
    })
  )
}