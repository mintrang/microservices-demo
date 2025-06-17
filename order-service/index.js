require('module-alias/register');

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')

const router = require('@/routers/index')
const connectDB = require('@/config/db')
const { swaggerUi, specs,} = require('@/config/swagger')
dotenv.config()
const app = express()

app.use(express.json()); 
connectDB()

app.use(cors())
app.use(morgan('dev'))

app.use('/api/v1/orders',router)


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.listen(4002, ()=> {
  console.log('user service is running on port 4002')
})
