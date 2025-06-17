const dotenv = require('dotenv')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

const connectDB = require('./config/db')
const userHandler = require('./handles/userHandler')
dotenv.config()
connectDB()

const packageDefination = protoLoader.loadSync(
  path.join(__dirname, './protos/user.proto'),
  { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true }
)

const userProto = grpc.loadPackageDefinition(packageDefination).user


const server = new grpc.Server()
server.addService(userProto.UserService.service, {
  GetUser: userHandler.GetUser,
  ListUser: userHandler.ListUser,
  CreateUser: userHandler.CreateUser,
})


server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('GRPC user service running at http://0.0.0.0:50051')
})