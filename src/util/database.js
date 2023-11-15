
import { MongoClient } from 'mongodb'
const url = `mongodb+srv://gonggan:${process.env.MONGODB_PASSWORD}@forum.llx7qqw.mongodb.net/?retryWrites=true&w=majority`




let connectDB

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url).connect()
}
export { connectDB }