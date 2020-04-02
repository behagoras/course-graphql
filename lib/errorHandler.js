'use strict'

const errorHandler = (error) => {
  console.error(error)
  throw new Error('Falló en la operación del servidor')
}

module.exports = errorHandler
