'use strict'

const { graphql, buildSchema } = require('graphql')

// Definir schema

// Tipos primarios Int, String, Float, Boolean

const schema = buildSchema(`
  type Query {
    hello:String
    greetings:String
  }
`)

const resolver = {
  hello: () => // Igual al query de abajo { hello }
    'Hello World',
  greetings: () =>
    'Hello to all'
}

// Ejecutar el query hello
// graphql(schema:Schema, query:string, resolvers:Object)
graphql(schema, '{ hello }', resolver).then((data) => {
  console.log('Logged Output : data', data)
})
