'use strict'

const connectDb = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = { teacher: '', topic: '' }
    const newCourse = { ...defaults, ...input }
    try {
      const db = await connectDb()
      const course = await db.collection('courses').insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      errorHandler('error createCourse:', error)
    }
    return newCourse
  },
  editCourse: async (root, { _id, input }) => {
    try {
      const db = await connectDb()
      await db.collection('courses').updateOne(
        { _id: ObjectID(_id) },
        { $set: input }
      )
      const course = db.collection('courses').findOne({ _id: ObjectID(_id) })
      return course
    } catch (error) {
      errorHandler('error createCourse:', error)
      return []
    }
  },
  deleteCourse: async (root, { _id }) => {
    try {
      const db = await connectDb()
      await db.collection('courses').deleteOne({ _id: ObjectID(_id) })
      return `Course ${_id} deleted`
    } catch (error) {
      errorHandler('error deleteCourse:', error)
      return `Unable to delete ${_id} user`
    }
  },
  createStudent: async (root, { input }) => {
    const newStudent = input
    try {
      const db = await connectDb()
      const student = await db.collection('students').insertOne(newStudent)
      newStudent._id = student.insertedId
    } catch (error) {
      errorHandler('error createCourse:', error)
    }
    return newStudent
  },
  editStudent: async (root, { _id, input }) => {
    try {
      const db = await connectDb()
      await db.collection('students').updateOne(
        { _id: ObjectID(_id) },
        { $set: input }
      )
      const student = db.collection('students').findOne({ _id: ObjectID(_id) })
      return student
    } catch (error) {
      errorHandler('error createStudent:', error)
      return []
    }
  },
  deleteStudent: async (root, { _id }) => {
    try {
      const db = await connectDb()
      await db.collection('students').deleteOne({ _id: ObjectID(_id) })
      return `User ${_id} deleted`
    } catch (error) {
      errorHandler('error createStudent:', error)
      return `Unable to delete ${_id} user`
    }
  },
  addPeople: async (root, { courseId, personId }) => {
    try {
      const db = await connectDb()
      const course = await db.collection('courses').findOne({ _id: ObjectID(courseId) })
      const person = await db.collection('students').findOne({ _id: ObjectID(personId) })
      if (!course || !person) throw new Error('course or person does not exists')
      await db.collection('courses').updateOne(
        { _id: ObjectID(courseId) },
        { $addToSet: { people: ObjectID(personId) } }
      )
      return course
    } catch (error) {
      errorHandler('error addPeople:', error)
    }
  }

}
