const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')

const connectDB = require('./config/db')
dotenv.config()
const app = express()


connectDB()

app.use(cors())
app.use(morgan('dev'))

app.listen(4000, ()=> {
  console.log('user service is running on port 4000')
})