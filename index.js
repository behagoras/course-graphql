'use strict'

// const { buildSchema } = require('graphql')
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const { readFileSync } = require('fs')
const { join } = require('path')

const app = express()
const gqlMiddleware = require('express-graphql')

// Data
const port = process.env.port || 3000
const resolvers = require('./lib/resolvers')

const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8')

// Definir schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

// Middlewares
app.use(express.json())

app.use('/api', gqlMiddleware({
  schema, // Cómo funciona la api
  rootValue: resolvers, // de dónde viene la data
  graphiql: true // entorno graphiql para probar queries
}))

app.listen(port, () => {
  console.log('App listening on port http://localhost:' + port)
})
