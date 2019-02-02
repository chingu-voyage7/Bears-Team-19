const env = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[env]
const db = require('knex')(configuration)

module.exports = db
