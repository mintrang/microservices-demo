require('module-alias/register');

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
const { createProxyMiddleware } = require("http-proxy-middleware")

const { swaggerUi, specs, } = require('@/config/swagger')
dotenv.config()
const app = express()

app.use(cors())
app.use(express.json());
app.use(morgan('dev'))

app.use((req, res, next) => {
  console.log(`[Gateway] Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use('/api/users', createProxyMiddleware({
  target: process.env.USER_SERVICE_URL || 'http://localhost:4000',
  changeOrigin: true,
  pathRewrite: {
    '^/api/users': '/api/users'
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[Gateway] FORWARD: ${req.method} ${req.originalUrl} → ${process.env.USER_SERVICE_URL || 'http://localhost:4000'}/api/users`);
  },
  onError: (err, req, res) => {
    console.error('❌ Proxy error:', err.message);
    res.status(500).send('Gateway proxy error');
  }
}));



app.use('/api/products', createProxyMiddleware({
  target: process.env.PRODUCT_SERVICE_URL,
  changeOrigin: true,
}))

app.use('/api/orders', createProxyMiddleware({
  target: process.env.ORDER_SERVICE_URL,
  changeOrigin: true,
}))


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.listen(3000, () => {
  console.log('API Gateway is running on port 3000')
})
