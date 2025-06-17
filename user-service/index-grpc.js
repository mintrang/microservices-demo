const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')


const packageDefination = protoLoader.loadSync(
  path.join(__dirname, './protos/user.proto'),
  { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true }
)

const userProto = grpc.loadPackageDefinition(packageDefination).user

const users = {
  "1": { id: 1, name: 'trang', email: 'trang@gmail.com' },
  '2': { id: 2, name: 'trang', email: 'trang@gmail.com' },
}

const GetUser = (call, callback) => {
  const user = users[call.request.id]
  if (!user) {
    return callback(new Error('Cannot find user!'))
  }
  callback(null, user)
}

const server = new grpc.Server()
server.addService(userProto.UserService.service, { GetUser: GetUser })
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('GRPC user service running at http://0.0.0.0:50051')
  server.start()
})