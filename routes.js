const { Router } = require('@xdn/core/router')
const { nextRoutes } = require('@xdn/next')
const { API, SSR, cacheResponse } = require('./cache')

module.exports = new Router()
  .match('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('.next/static/service-worker.js')
  })
  .get('/xdn-devtools.:ext', ({ serveStatic }) => {
    serveStatic('node_modules/@xdn/devtools/xdn-devtools.:ext')
  })
  .match('/', cacheResponse(SSR))
  .match('/api/', cacheResponse(API))
  .match('/s/:categorySlug*', cacheResponse(SSR))
  .match('/api/s/:categorySlug*', cacheResponse(API))
  .match('/p/:productId', cacheResponse(SSR))
  .match('/api/p/:productId', cacheResponse(API))
  .use(nextRoutes)
  .fallback(({ proxy }) => proxy('legacy'))
