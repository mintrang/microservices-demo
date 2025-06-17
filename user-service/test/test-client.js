const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

const packageDefination = protoLoader.loadSync(
  path.join(__dirname, '../protos/user.proto'),
  {
    keepCase: true,
    longs: true,
    enums: true,
    defaults: true,
    oneofs: true
  }
)

const userProto = grpc.loadPackageDefinition(packageDefination).user

const client = new userProto.UserService(
  'localhost:50051',
  grpc.credentials.createInsecure()
)

client.GetUser({id: '3'}, (err, res)=> {
  if(err) {
    console.log('===error===',err)
  } else {
    console.log('====res===', res)
  }
})