import "dotenv/config"
import { MongoClient } from "mongodb"

export const DBClient = new MongoClient(
  `mongodb://sujang:${process.env.DB_PW}@cluster0-shard-00-00.qcdis.mongodb.net:27017,cluster0-shard-00-01.qcdis.mongodb.net:27017,cluster0-shard-00-02.qcdis.mongodb.net:27017/?ssl=true&replicaSet=atlas-9jt0g9-shard-0&authSource=admin&retryWrites=true&w=majority`
)

export const collection = DBClient.db("usl").collection("usls")
