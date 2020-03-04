const { MongoClient } = require('mongodb')
const config = require('./config')
const { db } = config

const mongoUrl = `mongodb+srv://${db.username}:${db.password}@${db.cluster}?retryWrites=true`
let connection

async function connectDB () {
  if (connection) return connection

  let client
  try {
    client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true
    })
    connection = client.db(db.name)
  } catch (error) {
    console.error('Could not connect to db', mongoUrl, error)
    process.exit(1)
  }

  return connection
}

module.exports = connectDB
