import CreateProxyMiddleware from 'http-proxy-middleware';

module.exports = (app) => {
  app.use(
    CreateProxyMiddleware(["/"], { target: (process.env.NODE_ENV === 'production') ? `${process.env.PUBLIC_URL}` : 'http://localhost:5000' })
  )
}