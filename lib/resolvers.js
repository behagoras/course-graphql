const connectDb = require('./db')
const { ObjectID } = require('mongodb')

const resolvers = {
  Query: {
    getCourses: async () => {
      try {
        const db = await connectDb()
        return await db.collection('courses').find().toArray()
      } catch (error) {
        console.error('getCourses error', error)
        return []
      }
    },
    getCourse: async (root, { id }) => {
      try {
        const db = await connectDb()
        return await db.collection('courses').findOne({ _id: ObjectID(id) }) // no es un array porque sólo es un elemento
      } catch (error) {
        console.error('getCourse error', error)
        return []
      }
    }
  }
}

module.exports = resolvers
