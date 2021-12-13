import CreateProxyMiddleware from 'http-proxy-middleware';

module.exports = (app) => {
  app.use(
    CreateProxyMiddleware(["/"], { target: 'http://localhost:5000' })
  )
}