'use strict'

const connectDb = require('./db')

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = { teacher: '', topic: '' }
    const newCourse = { ...defaults, ...input }
    try {
      const db = await connectDb()
      const course = await db.collection('courses').insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      console.error('error createCourse:', error)
    }
    return newCourse
  }
}
