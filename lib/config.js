require('dotenv').config()

const db = {
  port: process.env.DB_PORT || 27017,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  collection: process.env.DB_COLLECTION,
  cluster: process.env.DB_CLUSTER,
  name: process.env.DB_NAME
}

module.exports = {
  db
}
