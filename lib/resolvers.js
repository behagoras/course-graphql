const mutations = require('./mutations')
const queries = require('./queries')
const types = require('./types')

const resolvers = {
  Query: queries,
  Mutation: mutations,
  ...types
}

module.exports = resolvers
