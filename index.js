'use strict'

const { buildSchema } = require('graphql')
const express = require('express')
const gqlMiddleware = require('express-graphql')

const app = express()

const port = process.env.port || 3000

// Definir schema

const schema = buildSchema(`
  type Query {
    hello:String
    greetings:String
  }
`)

const resolvers = {
  hello: () => // Igual al query de abajo { hello }
    'Hello World',
  greetings: () =>
    'Hello to all'
}

app.use('/api', gqlMiddleware({
  schema, // Cómo funciona la api
  rootValue: resolvers, // de dónde viene la data
  graphiql: true // entorno graphiql para probar queries
}))

app.listen(port, () => {
  console.log('App listening on port http://localhost:' + port)
})
