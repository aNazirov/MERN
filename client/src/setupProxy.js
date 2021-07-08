const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5500',
            changeOrigin: true,
        })
    )
    app.use(
        '/uploads',
        createProxyMiddleware({
            target: 'http://localhost:5500',
            changeOrigin: true,
        })
    )
};