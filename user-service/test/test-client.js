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

client.GetUser({ id: '684fc15401b72af89bca5e62' }, (err, res) => {
  if (err) {
    console.log('===error===', err)
  } else {
    console.log('====res===', res)
  }
})

console.log('====list user====')
client.ListUser({}, (err, res) => {
  if (err) {
    console.log('===error===', err)
  } else {
    console.log('====res===', res)
  }
})

client.CreateUser({ name: 'trangxinh', email: 'mail@mgial.com' }, (err, res) => {
  if (err) {
    console.log('===error===', err)
  } else {
    console.log('====res===', res)
  }
})