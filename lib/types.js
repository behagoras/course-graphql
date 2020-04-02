'use strict'

const connectDb = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
  Course: {
    people: async ({ people }) => {
      try {
        const db = await connectDb()
        const ids = people ? people.map((id) => ObjectID(id)) : []
        const peopleData = ids.length > 0
          ? await db.collection('students')
            .find({ _id: { $in: ids } })
            .toArray()
          : []
        return peopleData
      } catch (error) {
        errorHandler('error', error)
        return (error)
      }
    }
  },
  Student: {

  }
}
