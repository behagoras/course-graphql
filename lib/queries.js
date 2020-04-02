'use strict'

const connectDb = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
  getCourses: async () => {
    try {
      const db = await connectDb()
      return await db.collection('courses').find().toArray()
    } catch (error) {
      errorHandler('getCourses error', error)
      return []
    }
  },
  getCourse: async (root, { id }) => {
    try {
      const db = await connectDb()
      return await db.collection('courses').findOne({ _id: ObjectID(id) }) // no es un array porque sólo es un elemento
    } catch (error) {
      errorHandler('getCourse error', error)
      return []
    }
  },
  getStudents: async () => {
    try {
      const db = await connectDb()
      return await db.collection('students').find().toArray()
    } catch (error) {
      errorHandler('getStudents error', error)
      return []
    }
  },
  getStudent: async (root, { id }) => {
    try {
      const db = await connectDb()
      return await db.collection('students').findOne({ _id: ObjectID(id) }) // no es un array porque sólo es un elemento
    } catch (error) {
      errorHandler('getStudent error', error)
      return []
    }
  }
}
