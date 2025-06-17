require('module-alias/register');

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
const { createProxyMiddleware } = require("http-proxy-middleware")



const { swaggerUi, specs, } = require('@/config/swagger');
const path = require('path');
dotenv.config()
const app = express()

app.use(cors())
app.use(express.json());
app.use(morgan('dev'))



const grpc = require('@grpc/grpc-js')
const protoLoading = require('@grpc/proto-loader')

const packageDefinition = protoLoading.loadSync(
  path.join(__dirname, './protos/user.proto'),
  {keepCase: true, longs: String, oneofs: true, enums: String, defaults: true}
)

const userProto = grpc.loadPackageDefinition(packageDefinition).user

const userClient = new userProto.UserService(
  'localhost:50051',
  grpc.credentials.createInsecure()
)

app.get('/api/v1/users/:id', (req, res)=> {

  console.log('===vao day k===')
  userClient.GetUser({id: req.params.id}, (error, response)=> {
    if(error){
      console.log('===trang error===', error)
      return res.status(500).json({error: error})
    }
    res.json(response)
  })
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.listen(3000, () => {
  console.log('API Gateway is running on port 3000')
})
